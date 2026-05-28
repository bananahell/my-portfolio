import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageSwitcher } from './components/language-switcher/language-switcher';
import { NgClass } from '@angular/common';
import { Theme } from './core/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TranslocoPipe, LanguageSwitcher, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  themeService = inject(Theme);
  menuOpen = signal(false);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
