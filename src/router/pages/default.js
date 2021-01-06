
import { DOMAIN_TITLE } from '@/.env';

// @user Routes
import HomePage from '@/pages/Home.vue';
import NotFoundPage from '@/pages/NotFound.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { isAuth: true, title: `${DOMAIN_TITLE} | home` }
  },
  {
    path: '*',
    component: NotFoundPage,
    meta: { title: `${DOMAIN_TITLE} | not found` }
  }
];
