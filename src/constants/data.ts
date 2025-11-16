import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Emploi du temps',
    url: '/dashboard/etudiants/emploi-du-temps',
    icon: 'calendar',
    isActive: false,
    shortcut: ['e', 't'],
    items: []
  },
  {
    title: 'Notes',
    url: '/dashboard/etudiants/notes',
    icon: 'school',
    isActive: false,
    shortcut: ['n', 'n'],
    items: []
  },
  {
    title: 'Rapport de paiements',
    url: '/dashboard/etudiants/rapport-paiements',
    icon: 'reportMoney',
    isActive: false,
    shortcut: ['r', 'p'],
    items: []
  },
  {
    title: 'Assiduités',
    url: '/dashboard/etudiants/presence',
    icon: 'clipboardCheck',
    isActive: false,
    shortcut: ['p', 'p'],
    items: []
  },
  {
    title: 'Mes cours',
    url: '/dashboard/mes-cours',
    icon: 'book',
    isActive: false,
    shortcut: ['m', 'c'],
    items: []
  },
  {
    title: 'Profil',
    url: '/dashboard/profil',
    icon: 'user2',
    isActive: false,
    shortcut: ['p', 'r'],
    items: []
  }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
