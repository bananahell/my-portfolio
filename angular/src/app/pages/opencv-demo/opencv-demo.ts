import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-opencv-demo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './opencv-demo.html',
  styleUrl: './opencv-demo.scss',
})
export class OpenCVDemo {}
