import { Component, inject, signal } from '@angular/core';
import { TranslocoService, TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [TranslocoPipe], // ← required for the pipe in template
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher {
  private translocoService = inject(TranslocoService);

  readonly langs = ['en-US', 'pt-BR'];

  readonly langShortNames: Record<string, string> = {
    'en-US': 'EN-US',
    'pt-BR': 'PT-BR',
  };

  activeLang = signal<string>(this.translocoService.getActiveLang());

  switchLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.activeLang.set(lang);
  }
}
