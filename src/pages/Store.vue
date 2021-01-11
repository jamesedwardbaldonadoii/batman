<template>
  <div class="p-8 h-full overflow-auto">
    <div class="flex h-full items-start">
      <div class="flex flex-col pr-4 h-full flex-1">
        <div class="flex items-center justify-between flex-1">
          <div class="mr-1 text-lg font-bold">
            Store Builder
          </div>
          <app-button
            size="sm"
            icon="plus"
            color="green"
            label="Open a Store"
          />
        </div>
        <TemplateBuilder />
      </div>

      <div class="w-96 h-full">
        <OnlineStore />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/Button';
import OnlineStore from '@/module/store/list';
import TemplateBuilder from '@/module/templateBuilder/builder';

export default {
  name: 'BuildStorePage',

  components: {
    AppButton,
    OnlineStore,
    TemplateBuilder
  },

  data () {
    return {};
  }
};
</script>
