import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Projects } from './pages/projects/projects';
import { Blog } from './pages/blog/blog';
import { Now } from './pages/now/now';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'projects', component: Projects },
  { path: 'blog', component: Blog },
  { path: 'now', component: Now },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' },
];
