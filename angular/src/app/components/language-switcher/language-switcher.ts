import { Component, inject, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { AsyncPipe } from '@angular/common';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher {
  private translocoService = inject(TranslocoService);

  readonly langs = ['en-US', 'pt-BR'];

  readonly langShortNames: Record<string, string> = {
    'en-US': 'EN',
    'pt-BR': 'PT',
  };

  private readonly langNameKeys: Record<string, string> = {
    'en-US': 'lang.english',
    'pt-BR': 'lang.portuguese',
  };

  activeLang = signal<string>(this.translocoService.getActiveLang());

  switchLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.activeLang.set(lang);
  }

  getLabel(targetLangCode: string): Observable<string> {
    const switchTo$ = this.translocoService.selectTranslate('lang.switchTo');
    const nameKey = this.langNameKeys[targetLangCode] || 'lang.english';
    const name$ = this.translocoService.selectTranslate(nameKey);
    return combineLatest([switchTo$, name$]).pipe(map(([switchTo, name]) => `${switchTo} ${name}`));
  }
}
