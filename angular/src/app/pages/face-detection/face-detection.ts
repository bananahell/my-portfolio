import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-face-detection',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './face-detection.html',
  styleUrl: './face-detection.scss',
})
export class FaceDetection {}
