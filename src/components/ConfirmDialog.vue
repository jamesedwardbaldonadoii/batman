<template>
  <AppModal
    close-on-overlay
    :show.sync="showDialog"
  >
    <div
      v-if="content.header"
      slot="header"
    >
      {{ content.header }}
    </div>

    <div slot="body">
      {{ content.body }}
    </div>

    <div
      class="w-full flex justify-between"
      slot="footer"
    >
      <AppButton
        class="h-10"
        size="md"
        color="white"
        label="Cancel"
        @click="onCancel"
      />

      <AppButton
        class="h-10"
        size="md"
        color="green"
        label="Confirm"
        @click="onConfirm"
      />
    </div>
  </AppModal>
</template>

<script>

import AppModal from './Modal.vue';
import AppButton from './Button.vue';

export default {
  name: 'AppConfirmDialog',

  components: {
    AppModal,
    AppButton
  },

  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    showDialog: {
      get () {
        return this.show;
      },
      set (value) {
        if (!value) {
          this.onCancel();
        }

        return value;
      }
    },
    content () {
      return this.$store.state.confirmDialog.content;
    }
  },

  methods: {
    onCancel () {
      this.$bus.$emit('dialog-confirm', false);
    },

    onConfirm () {
      this.$bus.$emit('dialog-confirm', true);
    }
  }
};

</script>
