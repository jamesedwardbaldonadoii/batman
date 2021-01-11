<template>
  <div
    class="ml-2"
    :ref="template.id"
  >
    <div
      class="template-wrapper relative h-10 overflow-hidden"
    >
      <div
        class="template-level w-full text-white"
        :style="{backgroundColor: colorLuminance(`#${color}`, -0.27)}"
      >
        <small>({{ template.children.length }})</small> <b>{{ template.attr.replace('Template', '').toLowerCase() }}</b>
        <small class="block">
          {{ template.id }}
        </small>
      </div>
      <template-level
        v-for="i in template.children"
        :key="i.id"
        :template="i"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'TemplateLevel',

  components: {

  },

  data () {
    return {
      color: (Math.random() * 0xFFF000 << 0).toString(16),
      styles: {}
    };
  },

  props: {
    template: {
      type: Object,
      required: true
    }
  },

  methods: {
    /**
     * @param {String} hex
     * @param {String} lum
     * @description to make the random color darker
     */
    colorLuminance (hex, lum) {
      // validate hex string
      hex = String(hex).replace(/[^0-9a-f]/gi, '');
      if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }

      lum = lum || 0;

      // convert to decimal and change luminosity
      var rgb = '#'; var c; var i;
      for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ('00' + c).substr(c.length);
      }

      return rgb;
    }
  }
};
</script>

<style lang="scss" scoped>
.template-level {
  @apply cursor-pointer rounded-l pl-1 py-1 shadow absolute transition-all duration-200 top-0 -right-1/2 text-xs whitespace-nowrap;

  &:hover {
    right: 0;
  }
}
</style>
