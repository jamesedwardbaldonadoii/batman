<template>
  <div
    ref="template-builder"
    class="template-builder h-full w-full flex rounded-l overflow-hidden border-gray-700 border border-solid"
  >
    <div class="w-18 flex-none h-full bg-gray-800 relative">
      <div
        class="active-options bg-gray-500 absolute h-16 left-0 w-full transition-all ease-linear"
        :style="style"
      />

      <div
        :ref="index"
        class="cursor-pointer z-10 relative"
        :class="{ 'active': option.isActive }"
        v-for="(option, index) in options"
        :key="index"
        @click="navigateOptions(index)"
      >
        <div
          class="options w-full p-3 flex flex-col items-center text-gray-400"
        >
          <AppIcon
            width="w-6"
            height="h-6"
            :color="option.isActive ? 'text-gray-100' : 'text-gray-400'"
            :name="option.icon"
          />
          <div class="text-xs pt-1">
            {{ option.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="w-52 flex-none bg-gray-500">
      item here
    </div>
    <div
      class="w-full max-w-full flex-1 bg-gray-100 px-8 py-6"
    >
      <div
        ref="editor-container"
        class="w-full overflow-hidden"
      >
        <div
          class="w-full"
          :ref="page.id"
          v-for="(page, index) in pages"
          :key="page.id"
          :style="pageStyle"
        >
          <div class="text-gray-500 font-bold">
            {{ `Page ${ index + 1 } - ${ page.title }` }}
          </div>
          <div class="bg-white mt-2">
            <v-stage
              ref="stage"
              :config="configKonva"
            >
              <v-layer ref="layer">
                <v-circle :config="configCircle" />
              </v-layer>
            </v-stage>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppIcon from '@/components/Icons';

export default {

  components: {
    AppIcon
  },

  props: {
    shop: {
      type: Boolean,
      default: false
    }
  },

  mounted () {
    this.ro = new ResizeObserver(this.onResize).observe(this.$refs['editor-container']);
    this.onResize();
  },

  data () {
    return {
      ro: null,
      pages: [
        {
          id: this.generateRandomId(),
          title: 'Add page title'
        }
      ],
      configKonva: {
        width: 100,
        height: 200
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true
      },
      options: [
        { icon: 'templateIcon', isActive: true, name: 'Template' },
        { icon: 'images', isActive: false, name: 'Images' },
        { icon: 'upload', isActive: false, name: 'Upload' },
        { icon: 'pacman', isActive: false, name: 'Objects' },
        { icon: 'textIcon', isActive: false, name: 'Text' },
        { icon: 'textIcon', isActive: false, name: 'Background' },
        { icon: 'textIcon', isActive: false, name: 'Folder' },
        { icon: 'cart', isActive: false, name: 'Shop' }
      ],
      pageStyle: {
        height: 0
      },
      style: {
        top: 0
      }
    };
  },

  methods: {
    /**
     * @param {String} id options id
     * @description set the active tab for editor options and set others, false
     */
    navigateOptions (id) {
      this.positionActiveTab(id);

      this.options.forEach((i, $index) => {
        i.isActive = $index === id;
      });
    },

    /**
     * @param {Number} id get element to ref
     * @description set the active tab state
     */
    positionActiveTab (id) {
      const elTemplateBuilder = this.$refs['template-builder'].getBoundingClientRect();
      const el = this.$refs[id][0].getBoundingClientRect();

      this.style.top = `${el.top - elTemplateBuilder.top - 1}px`;
    },

    onResize () {
      const editorContainerPosition = this.$refs['editor-container'].getBoundingClientRect();
      const { width, height } = editorContainerPosition;

      this.pageStyle.height = `${width * 9 / 16}px`;
      this.configKonva.width = width;
      this.configKonva.height = height;
    },

    /**
     * @description generate random Id
     */
    generateRandomId () {
      const min = 1;
      const max = 100000;
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  },

  destroyed () {
    delete this.ro;
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
