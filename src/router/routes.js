// single pages
import loginPage from '@/pages/Login.vue';
import RegisterPage from '@/pages/Register.vue';
import StorePage from '@/onlineStore/Store.vue';
import Shop from './pages/shop';

import Default from './pages/default'; // default routes
import { DOMAIN_TITLE } from '@/.env';

export const routes = [
  ...Default,
  {
    path: '/login',
    name: 'login',
    component: loginPage,
    meta: { title: `${DOMAIN_TITLE} | login` }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta: { title: `${DOMAIN_TITLE} | login` }
  },
  {
    path: '/',
    name: 'store',
    component: StorePage,
    meta: { title: 'Store' }
  },
  Shop
];
