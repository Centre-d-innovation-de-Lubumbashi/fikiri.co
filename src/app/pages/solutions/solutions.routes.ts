import { Routes } from '@angular/router';

export const solutionsRoutes: Routes = [
  {
    path: '',
    title: 'Solutions',
    loadComponent: () => import('./list/solutions.component').then((c) => c.SolutionsComponent)
  },
  {
    path: ':id',
    title: 'Solutions',
    loadComponent: () => import('./detail/solution.component').then((c) => c.SolutionComponent)
  }
];
