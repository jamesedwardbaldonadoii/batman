<template>
  <div class="h-full flex flex-col overflow-hidden">
    <div>Build YOUR OWN TEMPLATE HERE</div>

    <TemplateBuilder
      shop
    />
  </div>
</template>

<script>
import TemplateBuilder from '@/module/template/TemplateBuilder';

export default {

  components: {
    TemplateBuilder
  },

  data () {
    return {};
  }
};
</script>
