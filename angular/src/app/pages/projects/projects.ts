import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

interface Project {
  route: string;
  titleKey: string;
  descriptionKey: string;
  tagKey: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  opencvProjects: Project[] = [
    {
      route: 'opencv/grayscale',
      titleKey: 'projects.cards.grayscale.title',
      descriptionKey: 'projects.cards.grayscale.desc',
      tagKey: 'projects.cards.tag',
    },
    {
      route: 'opencv/face-detection',
      titleKey: 'projects.cards.face.title',
      descriptionKey: 'projects.cards.face.desc',
      tagKey: 'projects.cards.tag',
    },
    {
      route: 'opencv/canny',
      titleKey: 'projects.cards.canny.title',
      descriptionKey: 'projects.cards.canny.desc',
      tagKey: 'projects.cards.tag',
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
