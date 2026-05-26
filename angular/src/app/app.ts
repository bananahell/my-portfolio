import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageSwitcher } from './components/language-switcher/language-switcher';
import { Theme } from './core/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TranslocoPipe, LanguageSwitcher],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  themeService = inject(Theme);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
