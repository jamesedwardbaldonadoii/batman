<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current"
    :class="[width, height, color]"
    viewBox="0 0 32 32"
  >
    <path d="M28 8h-6v-4c0-1.1-0.9-2-2-2h-8c-1.1 0-2 0.9-2 2v4h-6c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-16c0-2.2-1.8-4-4-4zM12 4h8v4h-8v-4zM24 22h-6v6h-4v-6h-6v-4h6v-6h4v6h6v4z" />
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
