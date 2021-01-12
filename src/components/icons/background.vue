<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current"
    :class="[width, height, color]"
    viewBox="0 0 32 32"
  >
    <path d="M0 0v32h32v-32h-32zM16 30v-14h-14v-14h14v14h14v14h-14z" />
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
