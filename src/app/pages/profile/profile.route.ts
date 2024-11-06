import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
  {
    path: '',
    title: 'Profile',
    loadComponent: () => import('./profile.component').then((c) => c.ProfileComponent)
  }
];
