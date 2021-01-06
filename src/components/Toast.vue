<template>
  <div
    class="app-toast flex items-center"
    :class="classList"
    @click="remove"
  >
    <span class="app-toast_icon">
      <svg
        class="h-6 w-auto"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
    {{ item.message }}
  </div>
</template>

<script>
export default {
  name: 'AppToast',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  methods: {
    remove () {
      this.$emit('remove', this.item.id);
    }
  },
  computed: {
    classList () {
      return {
        default: this.item.type === 'default',
        success: this.item.type === 'success',
        info: this.item.type === 'info',
        warning: this.item.type === 'warning',
        error: this.item.type === 'error'
      };
    }
  },
  mounted () {
    if (this.item.duration) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.remove();
      }, this.item.duration);
    }
  }
};
</script>
