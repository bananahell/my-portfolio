import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-sdl-breakout',
  standalone: true,
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './sdl-breakout.html',
  styleUrl: './sdl-breakout.scss',
})
export class SdlBreakout {}
