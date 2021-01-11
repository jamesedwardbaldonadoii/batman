<template>
  <app-dropdown
    :options="dataTypes"
    :placeholder="placeholder"
    :btn-size="size"
    @select="onSelectTemplate"
  />
</template>

<script>

import AppDropdown from '@/components/Dropdown';

export default {
  name: 'AvailableTemplate',

  components: {
    AppDropdown
  },

  props: {
    size: {
      type: String,
      default: 'md'
    },
    placeholder: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      dataTypes: [
        { label: 'header', value: 'TemplateHeader' },
        { label: 'navigation', value: 'TemplateNavigation' },
        { label: 'div', value: 'TemplateDiv' },
        { label: 'text', value: 'TemplateText' },
        { label: 'carousel', value: 'TemplateCarousel' },
        { label: 'footer', value: 'TemplateFooter' }
      ],
      template: [
        { id: this.getRandomInt(), attr: 'templateHeader' }
      ]
    };
  },

  methods: {
    /**
     * @param {String} item
     * @description push new tags on template
     */
    onSelectTemplate (item) {
      this.$listeners.select({
        id: this.getRandomInt(),
        attr: item,
        children: []
      });
    },

    /**
     * @return {Number} generate random number
     */
    getRandomInt () {
      const min = 1;
      const max = 10000000;
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }
};
</script>
