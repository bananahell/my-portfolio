import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Project {
  route: string;
  title: string;
  description: string;
  tag: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  opencvProjects: Project[] = [
    {
      route: 'opencv/grayscale',
      title: 'Grayscale Filter',
      description: 'Turn your webcam feed into black & white in real time.',
      tag: 'OpenCV',
    },
    {
      route: 'opencv/face-detection',
      title: 'Face Detection',
      description: 'Detect faces in your webcam feed using OpenCV.js.',
      tag: 'OpenCV',
    },
  ];

  currentIndex = signal(0);
  readonly len = this.opencvProjects.length;

  readonly activeProject = computed(() => this.opencvProjects[this.currentIndex()]);
  readonly leftProject = computed(() => {
    if (this.len <= 1) {
      return null;
    }
    const idx = (this.currentIndex() - 1 + this.len) % this.len;
    return this.opencvProjects[idx];
  });
  readonly rightProject = computed(() => {
    if (this.len <= 1) {
      return null;
    }
    const idx = (this.currentIndex() + 1) % this.len;
    return this.opencvProjects[idx];
  });

  readonly arrowsDisabled = computed(() => this.len <= 1);

  previous(): void {
    if (this.len <= 1) {
      return;
    }
    this.currentIndex.update((i) => (i - 1 + this.len) % this.len);
  }

  next(): void {
    if (this.len <= 1) {
      return;
    }
    this.currentIndex.update((i) => (i + 1) % this.len);
  }

  setCurrent(index: number): void {
    this.currentIndex.set(index);
  }
}
