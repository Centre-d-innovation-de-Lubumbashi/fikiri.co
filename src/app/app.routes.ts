import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { auhtRoutes } from './pages/auth/auth.routes';
import { landingRoutes } from './pages/landing/landing.routes';
import { solutionsRoutes } from './pages/solutions/solutions.routes';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: landingRoutes
  },
  {
    path: '',
    component: LayoutComponent,
    children: auhtRoutes
  },
  {
    path: 'solutions',
    component: LayoutComponent,
    children: solutionsRoutes
  },
  {
    path: '**',
    component: LayoutComponent,
    children: landingRoutes
  }
];