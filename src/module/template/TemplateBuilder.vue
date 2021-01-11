<template>
  <div class="template-builder h-full w-full flex rounded-l overflow-hidden border-gray-700 border border-solid">
    <div class="w-18 h-full bg-gray-800 relative">
      <div class="active-options bg-gray-500 absolute top-0 h-16 left-0 w-full" />

      <div
        class="cursor-pointer z-10 relative"
        :class="{ 'active': option.isActive }"
        v-for="option in options"
        :key="option.icon"
      >
        <div
          class="options w-full p-3 flex flex-col items-center text-gray-400"
        >
          <AppIcon
            width="w-6"
            height="h-6"
            color="text-gray-100"
            :name="option.icon"
          />
          <div class="text-xs pt-1">
            {{ option.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="w-64 bg-gray-500">
      itesm here
    </div>
    <div class="w-full flex-1 bg-white">
      editor here
    </div>
  </div>
</template>

<script>
import AppIcon from '@/components/Icons';

export default {

  components: {
    AppIcon
  },

  data () {
    return {
      options: [
        { icon: 'templateIcon', isActive: true, name: 'Template' },
        { icon: 'images', isActive: false, name: 'Images' },
        { icon: 'upload', isActive: false, name: 'Upload' },
        { icon: 'pacman', isActive: false, name: 'Objects' },
        { icon: 'textIcon', isActive: false, name: 'Text' },
        { icon: 'textIcon', isActive: false, name: 'Background' },
        { icon: 'textIcon', isActive: false, name: 'Folder' },
        { icon: 'cart', isActive: false, name: 'Shop' }
      ]
    };
  },

  methods: {
    /**
     * @param {String} id options id
     * @description set the active tab for editor options and set others, false
     */
    navigateOptions (id) {

    }
  }
};
</script>

<style lang="scss" scoped>
.template-builder {
  .active-options {
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      overflow: hidden;
      right: 0;
    }

    &::before {
      top: -8px;
      background: radial-gradient(circle closest-side,transparent 0,transparent 50%,rgb(100, 116, 139) 0) 200% 200%/400% 400%;
    }

    &::after {
      transform: scaleY(-1);
      bottom: -8px;
      background: radial-gradient(circle closest-side,transparent 0,transparent 50%,rgb(100, 116, 139) 0) 200% 200%/400% 400%;
    }
  }

  .active {
    @apply text-gray-100;

    .options {
      @apply text-gray-100;
    }
  }
}
</style>
