<template>
  <div class="w-full h-full flex flex-col pt-2">
    <div class="flex justify-between">
      <app-input
        placeholder="Template Name"
      />
      <available-template
        @select="onSelectTemplate"
        placeholder="Start Building"
      />
    </div>
    <div class="w-full flex-1 flex">
      <div class="w-20">
        <template-level
          v-for="i in template"
          :key="i.id"
          :template="i"
        />
      </div>
      <div class="w-full overflow-auto flex-1 bg-white">
        <template-editor
          :show.sync="showEditor"
          @select="onNewTemplate"
        />
        <template-wrapper
          v-for="i in template"
          :key="i.id"
          :template="i"
          @selected="onSelect"
        />
        <div>
          {{ template }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AppInput from '@/components/Input';
import TemplateEditor from '@/components/TemplateEditor';
import TemplateWrapper from '@/components/builder/TemplateWrapper';
import AvailableTemplate from '@/components/builder/AvailableTemplate';
import TemplateLevel from '@/components/builder/TemplateLevel.vue';

export default {
  name: 'BuildStorePage',

  components: {
    AvailableTemplate,
    AppInput,
    TemplateWrapper,
    TemplateLevel,
    TemplateEditor
  },

  data () {
    return {
      showEditor: false,
      activeTemplate: null,
      dataTypes: [],
      template: []
    };
  },

  methods: {
    /**
     * @param {String} template
     * @description push new tags on template
     */
    onSelectTemplate (template) {
      this.template.push(template);
    },

    /**
     * @param {Object} template
     * @description trigger when new child template is added
     */
    onNewTemplate (template) {
      this.activeTemplate.children.push(template);
    },

    /**
     * @param {Object} template
     * @description trigger when you select a tempalate to update
     */
    onSelect (template, el) {
      this.showEditor = true;
      this.activeTemplate = template;

      this.$store.commit('builder/SET_ACTIVE_TEMPLATE', template);

      this.$bus.$emit('builder:update-editor-position', el.$refs[template.id]);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
