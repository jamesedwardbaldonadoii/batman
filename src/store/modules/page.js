export default {
  namespaced: true,
  state: {
    /**
     * flag if online store
     */
    isStore: false
  },

  mutations: {
    SET_IS_ONLINE_STORE (state, value) {
      state.isStore = value;
    }
  }
};
