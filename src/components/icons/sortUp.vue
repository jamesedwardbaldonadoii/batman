<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current"
    :class="[width, height, color]"
    viewBox="0 0 320 512"
  >
    <path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z" />
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
