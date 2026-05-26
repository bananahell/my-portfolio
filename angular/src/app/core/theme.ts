import { Injectable, signal } from '@angular/core';

export type ThemeType = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class Theme {
  readonly currentTheme = signal<ThemeType>(this.getInitialTheme());

  constructor() {
    this.applyTheme(this.currentTheme());
  }

  toggleTheme(): void {
    const next = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  setTheme(theme: ThemeType): void {
    this.currentTheme.set(theme);
    localStorage.setItem('theme', theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: ThemeType): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  private getInitialTheme(): ThemeType {
    const stored = localStorage.getItem('theme') as ThemeType | null;
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }
}
