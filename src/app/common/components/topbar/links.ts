import { ILink } from './types/link.type';

export const authLinks: ILink[] = [
  {
    name: 'Se connecter',
    path: '/sign-in',
    exact: true
  },
  {
    name: "S'inscrire",
    path: '/sign-up',
    exact: true
  }
];

export const commonLinks: ILink[] = [
  {
    name: 'Accueil',
    path: '/',
    exact: true
  },
  {
    name: 'Solutions',
    path: '/solutions',
    exact: false
  }
];
