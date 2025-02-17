import $store from '../store';
import { AuthService } from '@/services/auth.service';

/**
 * Current user state initialization
 * @WARN Must be always first in middleware chain
 */
export async function initCurrentUserStateMiddleware (to, from, next) {
  const currentUserId = $store.state.user.currentUser._id;

  if (AuthService.hasRefreshToken() && !currentUserId) {
    try {
      await AuthService.debounceRefreshTokens();
      await $store.dispatch('user/getCurrent');
      next();
    } catch (error) {
      this.$store.commit('toast/NEW', { type: 'error', message: error.message }, { root: true });
    }
  } else {
    next();
  }
}

/**
 * Check access permission to auth routes
 */
export function checkAccessMiddleware (to, from, next) {
  const currentUserId = $store.state.user.currentUser._id;
  const isAuthRoute = to.matched.some(item => item.meta.isAuth);

  if (isAuthRoute && currentUserId) {
    return next();
  }
  if (isAuthRoute) {
    return next({ name: 'login' });
  }
  next();
}

export function setPageTitleMiddleware (to, from, next) {
  const pageTitle = to.matched.find(item => item.meta.title);

  if (pageTitle) {
    window.document.title = pageTitle.meta.title;
  }
  next();
}
