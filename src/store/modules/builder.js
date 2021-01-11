export default {
  namespaced: true,
  state: {
    /**
     * active template
     */
    activeTemplate: null
  },

  mutations: {
    SET_ACTIVE_TEMPLATE (state, value) {
      state.activeTemplate = value;
    }
  }
};
