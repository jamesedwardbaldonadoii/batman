<template>
  <div class="absolute inset-0">
    <div
      class="app-loader absolute centered inline-flex items-center"
      :class="loaderSizeClass"
    >
      <div class="m-px w-1/4" />
      <div class="m-px w-1/4" />
      <div class="m-px w-1/4" />
      <div class="m-px w-1/4" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLoader',

  props: {
    size: {
      type: String,
      default: 'md'
    }
  },

  computed: {
    loaderSizeClass () {
      let size;

      switch (this.size) {
        case 'sm':
          size = 'w-5 h-4';
          break;
        case 'lg':
          size = 'w-10 h-8';
          break;
        case 'xl':
          size = 'w-12 h-10';
          break;
        default:
          size = 'w-8 h-4';
      }

      return size;
    }
  }
};
</script>
