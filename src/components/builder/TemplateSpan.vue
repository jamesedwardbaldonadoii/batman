<template>
  <span
    ref="span"
    class="relative cursor-pointer hover:shadow"
    :style="style"
  >
    <slot>
      Add Some content Here
    </slot>
  </span>
</template>

<script>

export default {
  name: 'TemplateHeader',

  components: {

  },

  data () {
    return {
      isEditing: false,
      isActiveChildren: false,
      template: [],
      style: {
        minHeight: '40px',
        height: 'auto'
      }
    };
  },

  methods: {
  }
};
</script>
