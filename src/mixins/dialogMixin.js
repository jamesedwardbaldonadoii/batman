export default {
  computed: {
    $dialog () {
      return {
        confirm: this.confirmDialog,
        toast: this.toastDialog,
        alert: this.alert
      };
    }
  },

  methods: {
    confirmDialog ({ header, body } = {}) {
      // @header Dialog Header
      // @body Dialog Message

      return new Promise((resolve, reject) => {
        // Open confirm dialog view
        this.$store.commit('confirmDialog/OPEN', {
          content: { header, body }
        });

        try {
          // Create a listener
          this.$bus.$on('dialog-confirm', (confirm) => {
            resolve(confirm);

            // remove listener
            this.$bus.$off('dialog-confirm');//

            // close dialog
            this.$store.commit('confirmDialog/CLOSE');
          });
        } catch (err) {
          reject(err);
        }
      });
    },

    toastDialog ({ type, message, duration } = {}) {
      //           : REQUIRED : DEFAULT : ENUM
      // @type     : false    : default : default, success, info, error, warning
      // @message  : false    : ''      :
      // @duration : false    : 2000    :

      // open toast//
      this.$store.commit('toast/NEW', { type, message, duration });
    },

    alert () {
      // to do
    }
  }
};
