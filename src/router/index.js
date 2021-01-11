import Vue from 'vue';
import Router from 'vue-router';

import { initCurrentUserStateMiddleware, checkAccessMiddleware, setPageTitleMiddleware } from './middlewares';
import { subdomainsWidlcardMiddleware } from './subdomains';

import { routes } from './routes';

Vue.use(Router);

const router = new Router({
  linkActiveClass: 'is-active',
  mode: 'history',
  routes
});

router.beforeEach(subdomainsWidlcardMiddleware);
router.beforeEach(initCurrentUserStateMiddleware);
router.beforeEach(checkAccessMiddleware);
router.beforeEach(setPageTitleMiddleware);

export default router;
