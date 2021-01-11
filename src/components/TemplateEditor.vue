<template>
  <div
    v-show="show"
    class="p-2 block border border-solid border-gray-200 bg-white shadow rounded z-20 transition-all duration-150 ease-linear"
    :style="styles"
  >
    <AvailableTemplate
      class="mr-1"
      @select="onSelectTemplate"
      size="sm"
      placeholder="Template"
    />

    <app-button
      class="mr-1"
      size="sm"
      label="Grid"
    />

    <app-button
      class="mr-1"
      size="sm"
      label="Background"
    />

    <app-button
      class="mr-1"
      size="sm"
      label="CSS"
    />

    <app-button
      class="mr-1"
      size="sm"
      color="red"
      label="Remove"
    />

    <app-button
      size="sm"
      color="gray"
      label="Close"
      @click="onCloseEditor"
    />
  </div>
</template>

<script>

import AppButton from '@/components/Button';
import AvailableTemplate from '@/components/builder/AvailableTemplate';

export default {
  name: 'TemplateEditor',

  components: {
    AppButton,
    AvailableTemplate
  },

  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  mounted () {
    this.$bus.$on('builder:update-editor-position', (ref) => {
      this.positionEditor(ref);
    });
  },

  beforeDestroy () {
    this.$bus.$off('builder:update-editor-position');
  },

  data () {
    return {
      styles: {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '400px'
      }
    };
  },

  methods: {
    /**
     * @param {String} item
     * @description push new tags on template
     */
    onSelectTemplate (item) {
      this.$listeners.select(item);
    },

    /**
     * @param {HTMLElement} ref
     * @description set new position for the editor base on the position of the selected template
     * @requires ref the selected template
     */
    positionEditor (ref) {
      if (!ref) {
        return;
      }

      const elPos = ref.getBoundingClientRect();
      const left = `${(elPos.left + (elPos.width / 2) - 200)}px`;
      const top = `${(elPos.top - 72)}px`;

      this.styles.left = left;
      this.styles.top = top;
    },

    /**
     * @param {String} item
     * @description push new tags on template
     */
    onCloseEditor () {
      this.$emit('update:show', false);
    }
  }
};
</script>
