import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

declare var cv: any;

@Component({
  selector: 'app-canny-edge',
  standalone: true,
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './canny-edge.html',
  styleUrl: './canny-edge.scss',
})
export class CannyEdge implements OnInit, OnDestroy {
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('hiddenCanvas', { static: true }) hiddenCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasElement', { static: true }) canvasElement!: ElementRef<HTMLCanvasElement>;

  private stream: MediaStream | null = null;
  private animationId = 0;
  opencvReady = false;
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
      this.startCamera();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://docs.opencv.org/4.8.0/opencv.js';
    script.async = true;
    script.onload = () => {
      console.log('OpenCV.js loaded');
      if (cv.Mat) {
        this.opencvReady = true;
        this.startCamera();
      } else {
        cv['onRuntimeInitialized'] = () => {
          this.opencvReady = true;
          this.startCamera();
        };
      }
    };
    script.onerror = () => {
      this.cameraError = 'Failed to load OpenCV.js. Please reload the page.';
      console.error('OpenCV.js load failed');
    };
    document.body.appendChild(script);
  }

  private async startCamera(): Promise<void> {
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
    const hiddenCtx = hiddenCanvas.getContext('2d', { willReadFrequently: true });
    const process = () => {
      this.animationId = requestAnimationFrame(process);
      if (
        video.readyState >= video.HAVE_ENOUGH_DATA &&
        video.videoWidth > 0 &&
        video.videoHeight > 0
      ) {
        hiddenCanvas.width = video.videoWidth;
        hiddenCanvas.height = video.videoHeight;
        outputCanvas.width = video.videoWidth;
        outputCanvas.height = video.videoHeight;
        hiddenCtx!.drawImage(video, 0, 0, hiddenCanvas.width, hiddenCanvas.height);
        try {
          const src = cv.imread(hiddenCanvas);
          if (src.empty()) {
            return;
          }
          const gray = new cv.Mat();
          cv.cvtColor(src, gray, cv.COLOR_BGR2GRAY);
          const edges = new cv.Mat();
          cv.Canny(gray, edges, 50, 150);
          const bgr = new cv.Mat();
          cv.cvtColor(edges, bgr, cv.COLOR_GRAY2BGR);
          cv.imshow(outputCanvas, bgr);
          src.delete();
          gray.delete();
          edges.delete();
          bgr.delete();
        } catch (e) {
          console.warn('Canny edge processing error:', e);
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
