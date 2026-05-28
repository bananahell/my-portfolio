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
      tagKey: 'projects.cards.opencvTag',
    },
    {
      route: 'opencv/face-detection',
      titleKey: 'projects.cards.face.title',
      descriptionKey: 'projects.cards.face.desc',
      tagKey: 'projects.cards.opencvTag',
    },
    {
      route: 'opencv/canny',
      titleKey: 'projects.cards.canny.title',
      descriptionKey: 'projects.cards.canny.desc',
      tagKey: 'projects.cards.opencvTag',
    },
  ];

  opencvCurrentIndex = signal(0);
  readonly opencvLen = this.opencvProjects.length;

  readonly activeOpencvProject = computed(() => this.opencvProjects[this.opencvCurrentIndex()]);
  readonly leftOpencvProject = computed(() => {
    if (this.opencvLen <= 1) {
      return null;
    }
    const idx = (this.opencvCurrentIndex() - 1 + this.opencvLen) % this.opencvLen;
    return this.opencvProjects[idx];
  });
  readonly rightOpencvProject = computed(() => {
    if (this.opencvLen <= 1) {
      return null;
    }
    const idx = (this.opencvCurrentIndex() + 1) % this.opencvLen;
    return this.opencvProjects[idx];
  });
  readonly opencvArrowsDisabled = computed(() => this.opencvLen <= 1);

  opencvPrevious(): void {
    if (this.opencvLen <= 1) {
      return;
    }
    this.opencvCurrentIndex.update((i) => (i - 1 + this.opencvLen) % this.opencvLen);
  }
  opencvNext(): void {
    if (this.opencvLen <= 1) {
      return;
    }
    this.opencvCurrentIndex.update((i) => (i + 1) % this.opencvLen);
  }
  setOpencvCurrent(index: number): void {
    this.opencvCurrentIndex.set(index);
  }

  sdl2Projects: Project[] = [
    {
      route: 'sdl/breakout',
      titleKey: 'projects.cards.breakout.title',
      descriptionKey: 'projects.cards.breakout.desc',
      tagKey: 'projects.cards.sdlTag',
    },
  ];

  sdl2CurrentIndex = signal(0);
  readonly sdl2Len = this.sdl2Projects.length;

  readonly activeSdl2Project = computed(() => this.sdl2Projects[this.sdl2CurrentIndex()]);
  readonly leftSdl2Project = computed(() => {
    if (this.sdl2Len <= 1) return null;
    const idx = (this.sdl2CurrentIndex() - 1 + this.sdl2Len) % this.sdl2Len;
    return this.sdl2Projects[idx];
  });
  readonly rightSdl2Project = computed(() => {
    if (this.sdl2Len <= 1) return null;
    const idx = (this.sdl2CurrentIndex() + 1) % this.sdl2Len;
    return this.sdl2Projects[idx];
  });
  readonly sdl2ArrowsDisabled = computed(() => this.sdl2Len <= 1);

  sdl2Previous(): void {
    if (this.sdl2Len <= 1) return;
    this.sdl2CurrentIndex.update((i) => (i - 1 + this.sdl2Len) % this.sdl2Len);
  }
  sdl2Next(): void {
    if (this.sdl2Len <= 1) return;
    this.sdl2CurrentIndex.update((i) => (i + 1) % this.sdl2Len);
  }
  setSdl2Current(index: number): void {
    this.sdl2CurrentIndex.set(index);
  }
}
