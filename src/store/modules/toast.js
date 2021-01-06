/**
 * toast notification module
 */
export default {
  namespaced: true,
  state: {
    toastsList: []
  },

  mutations: {
    NEW (state, payload) {
      const toast = {
        id: new Date().getTime(),
        message: typeof payload === 'string' ? payload : payload.message,
        type: payload.type || 'default',
        duration: payload.duration || 2000
      };

      if (payload.type === 'error') {
        toast.duration = 0;
      }

      state.toastsList.push({ ...toast });
    },
    REMOVE (state, payload) {
      state.toastsList = state.toastsList.filter(({ id }) => id !== payload.id);
    },
    CLEAR_LIST (state) {
      state.toastsList = [];
    }
  }
};
