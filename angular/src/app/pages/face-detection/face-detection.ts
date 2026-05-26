import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

declare var cv: any;

@Component({
  selector: 'app-face-detection',
  standalone: true,
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './face-detection.html',
  styleUrl: './face-detection.scss',
})
export class FaceDetection implements OnInit, OnDestroy {
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('hiddenCanvas', { static: true }) hiddenCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasElement', { static: true }) canvasElement!: ElementRef<HTMLCanvasElement>;

  private readonly DETECT_WIDTH = 320;
  private readonly DETECT_HEIGHT = 240;
  private stream: MediaStream | null = null;
  private animationId = 0;
  private classifier: any = null;
  opencvReady = false;
  cascadeReady = false;
  cameraError = '';

  ngOnInit(): void {
    this.loadOpenCV();
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  private loadOpenCV(): void {
    if (typeof cv !== 'undefined' && cv.Mat) {
      this.opencvReady = true;
      this.loadCascade();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://docs.opencv.org/4.8.0/opencv.js';
    script.async = true;
    script.onload = () => {
      console.log('OpenCV.js loaded');
      if (cv.Mat) {
        this.opencvReady = true;
        this.loadCascade();
      } else {
        cv['onRuntimeInitialized'] = () => {
          this.opencvReady = true;
          this.loadCascade();
        };
      }
    };
    script.onerror = () => {
      this.cameraError = 'Failed to load OpenCV.js. Please reload the page.';
      console.error('OpenCV.js load failed');
    };
    document.body.appendChild(script);
  }

  private async loadCascade(): Promise<void> {
    try {
      const cascadeUrl =
        'https://raw.githubusercontent.com/opencv/opencv/master' +
        '/data/haarcascades/haarcascade_frontalface_default.xml';
      const response = await fetch(cascadeUrl);
      const data = await response.text();
      cv.FS_createDataFile('/tmp', 'haarcascade_frontalface_default.xml', data, true, false, false);
      this.classifier = new cv.CascadeClassifier();
      this.classifier.load('/tmp/haarcascade_frontalface_default.xml');
      this.cascadeReady = true;
      this.startCamera();
    } catch (err) {
      this.cameraError = 'Failed to load face detection model.';
      console.error('Cascade load error:', err);
    }
  }

  private async startCamera(): Promise<void> {
    if (!this.cascadeReady) {
      return;
    }
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = this.videoElement.nativeElement;
      video.srcObject = this.stream;
      video.onloadedmetadata = () => {
        video.play().then(() => {
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            this.processFrames();
          } else {
            setTimeout(() => this.processFrames(), 200);
          }
        });
      };
    } catch (err: any) {
      this.cameraError = `Camera error: ${err.message || err}`;
      console.error(err);
    }
  }

  private processFrames(): void {
    const video = this.videoElement.nativeElement;
    const hiddenCanvas = this.hiddenCanvas.nativeElement;
    const outputCanvas = this.canvasElement.nativeElement;
    hiddenCanvas.width = this.DETECT_WIDTH;
    hiddenCanvas.height = this.DETECT_HEIGHT;
    const hiddenCtx = hiddenCanvas.getContext('2d', { willReadFrequently: true });
    const process = () => {
      this.animationId = requestAnimationFrame(process);
      if (
        video.readyState >= video.HAVE_ENOUGH_DATA &&
        video.videoWidth > 0 &&
        video.videoHeight > 0
      ) {
        outputCanvas.width = video.videoWidth;
        outputCanvas.height = video.videoHeight;
        hiddenCtx!.drawImage(video, 0, 0, this.DETECT_WIDTH, this.DETECT_HEIGHT);
        try {
          const src = cv.imread(hiddenCanvas);
          if (src.empty()) {
            return;
          }
          const gray = new cv.Mat();
          cv.cvtColor(src, gray, cv.COLOR_BGR2GRAY);
          const faces = new cv.RectVector();
          this.classifier.detectMultiScale(gray, faces, 1.1, 5, 0, new cv.Size(30, 30));
          const scaleX = video.videoWidth / this.DETECT_WIDTH;
          const scaleY = video.videoHeight / this.DETECT_HEIGHT;
          const outputCtx = outputCanvas.getContext('2d');
          if (outputCtx) {
            outputCtx.drawImage(video, 0, 0, outputCanvas.width, outputCanvas.height);
          }
          if (outputCtx) {
            outputCtx.strokeStyle = '#00FF00';
            outputCtx.lineWidth = 2;
            for (let i = 0; i < faces.size(); i++) {
              const face = faces.get(i);
              const x = face.x * scaleX;
              const y = face.y * scaleY;
              const w = face.width * scaleX;
              const h = face.height * scaleY;
              outputCtx.strokeRect(x, y, w, h);
            }
          }
          src.delete();
          gray.delete();
          faces.delete();
        } catch (e) {
          console.warn('Face detection processing error:', e);
        }
      }
    };
    requestAnimationFrame(process);
  }

  private stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
