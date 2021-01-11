<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current"
    :class="[width, height, color]"
    viewBox="0 0 32 32"
  >
    <path d="M10.063 26l1.8-6h8.274l1.8 6h3.551l-6-20h-6.976l-6 20h3.551zM14.863 10h2.274l1.8 6h-5.874l1.8-6z" />
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
