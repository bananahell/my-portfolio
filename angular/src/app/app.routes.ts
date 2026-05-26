import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Projects } from './pages/projects/projects';
import { Blog } from './pages/blog/blog';
import { Now } from './pages/now/now';
import { Contact } from './pages/contact/contact';
import { GrayscaleDemo } from './pages/grayscale-demo/grayscale-demo';
import { FaceDetection } from './pages/face-detection/face-detection';
import { CannyEdge } from './pages/canny-edge/canny-edge';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'projects', component: Projects },
  { path: 'projects/opencv/grayscale', component: GrayscaleDemo },
  { path: 'projects/opencv/face-detection', component: FaceDetection },
  { path: 'projects/opencv/canny', component: CannyEdge },
  { path: 'blog', component: Blog },
  { path: 'now', component: Now },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' },
];
