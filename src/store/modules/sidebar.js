export default {
  namespaced: true,
  state: {
    showLeft: false,
    pin: false,
    view: null
  },

  mutations: {
    /**
     * @showLeft Mutation
     */
    TOGGLE_LEFT_SIDEBAR (state) {
      state.showLeft = !state.showLeft;
    },
    SHOW_LEFT_SIDEBAR (state) {
      state.showLeft = true;
    },
    HIDE_LEFT_SIDEBAR (state) {
      state.showLeft = false;
    },

    /**
     * @pin Mutation
     */
    PIN_SIDEBAR (state) {
      state.pin = true;
    },
    UNPIN_SIDEBAR (state) {
      state.pin = false;
    }
  }
};
