import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Projects } from './pages/projects/projects';
import { Blog } from './pages/blog/blog';
import { Now } from './pages/now/now';
import { Contact } from './pages/contact/contact';
import { OpenCVDemo } from './pages/opencv-demo/opencv-demo';
import { GrayscaleDemo } from './pages/grayscale-demo/grayscale-demo';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'projects', component: Projects },
  { path: 'projects/opencv', component: OpenCVDemo },
  { path: 'projects/opencv/grayscale', component: GrayscaleDemo },
  { path: 'blog', component: Blog },
  { path: 'now', component: Now },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' },
];
