import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

interface Project {
  route: string;
  title: string;
  description: string;
  tag: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink, NgClass],
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

  previous(): void {
    this.currentIndex.update((i) => (i > 0 ? i - 1 : this.opencvProjects.length - 1));
  }

  next(): void {
    this.currentIndex.update((i) => (i < this.opencvProjects.length - 1 ? i + 1 : 0));
  }

  setCurrent(index: number): void {
    this.currentIndex.set(index);
  }

  getCardClass(index: number): string {
    const diff = index - this.currentIndex();
    const len = this.opencvProjects.length;
    if (diff === 0) {
      return 'active';
    }
    if (diff === -1 || diff === len - 1) {
      return 'left';
    }
    if (diff === 1 || diff === -(len - 1)) {
      return 'right';
    }
    return 'hidden';
  }
}
