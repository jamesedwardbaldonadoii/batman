/**
 * Confirm Dialog Module
 * @param {Object} [content]
 *  @header : Modal Header *Optional
 *  @body : Modal Body *Required
 *
 * @example using the dialog
 *  this.$store.commit('confirmDialog/OPEN', {
 *    content : {
 *      header : 'Confirm Delete',
 *      body : 'Are you sure you want to delete this item?'
 *    }
 *  })
 */
export default {
  namespaced: true,

  state: {
    show: false,
    content: {}
  },

  mutations: {
    OPEN (state, payload) {
      state.show = true;
      state.content = payload.content;
    },
    CLOSE (state) {
      state.show = false;
      state.content = {};
    }
  }
};
