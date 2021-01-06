<template>
  <transition name="modal">
    <div
      class="modal-mask"
      v-if="show"
    >
      <div
        class="modal-wrapper"
        @click="onClickOverlay"
        ref="overlay"
      >
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              {{ title }}
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body" />
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <app-button
                class="w-14 h-10"
                size="sm"
                label="OK"
                color="blue"
                @click="close"
              />
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import AppButton from '@/components/Button';

export default {
  name: 'AppModal',
  components: {
    AppButton
  },

  props: {
    show: {
      type: Boolean,
      default: false
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    closeOnOverlay: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    }
  },

  methods: {
    close () {
      this.$emit('update:show', false);
    },

    onClickOverlay ($event) {
      if (this.closeOnOverlay && $event && $event.target === this.$refs.overlay) {
        this.close();
      }
    }
  }
};
</script>
