<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current"
    :class="[width, height, color]"
    viewBox="0 0 24 24"
  >
    <path d="M2.016 12q0-4.125 2.93-7.055t7.055-2.93 7.055 2.93 2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055z" />
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    }
  }
};
</script>
