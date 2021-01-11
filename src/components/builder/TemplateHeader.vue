<template>
  <header
    :ref="id"
    :id="id"
    class="relative cursor-pointer hover:shadow"
    :style="style"
    v-on="$listeners"
  >
    <slot>
      Add Some content Here
    </slot>
  </header>
</template>

<script>

export default {
  name: 'TemplateHeader',

  components: {

  },

  props: {
    id: {
      type: [String, Number],
      required: true
    }
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
