import { DOMAIN } from '@/.env';
import $store from '../store';

/**
 * Check if routes has subdomain
 */
export function subdomainsWidlcardMiddleware (to, from, next) {
  const subdir = window.location.host.split('.')[0];
  const storePage = 'store';

  $store.commit('page/SET_IS_ONLINE_STORE', subdir !== DOMAIN);

  if (subdir !== DOMAIN && to.name !== storePage) {
    next({ name: storePage, params: {} });
  } else {
    next();
  }
}
