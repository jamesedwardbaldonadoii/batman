<template>
  <component
    :ref="template.id"
    :id="template.id"
    :is="template.attr"
    @click="onSelect"
  >
    <template-wrapper
      v-for="i in template.children"
      :key="i.id"
      :template="i"
      @selected="onUpdate"
    />
  </component>
</template>

<script>

import TemplateDiv from '@/components/builder/TemplateDiv';
import TemplateHeader from '@/components/builder/TemplateHeader';

export default {
  name: 'TemplateWrapper',

  components: {
    TemplateDiv,
    TemplateHeader
  },

  props: {
    template: {
      type: Object,
      required: true
    }
  },

  methods: {
    onSelect (e) {
      e.stopPropagation();
      this.$listeners.selected(this.template, this.$refs[this.template.id]);
    },
    onUpdate (tpl, el) {
      this.$listeners.selected(tpl, el);
    }
  }
};
</script>
