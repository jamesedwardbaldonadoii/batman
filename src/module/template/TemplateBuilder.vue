<template>
  <div
    ref="template-builder"
    class="template-builder h-full w-full transition-all ease-linear flex rounded-l overflow-hidden border-gray-700 border border-solid"
    :class="{ 'fixed inset-0 z-50': isFullscreen }"
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
    <div class="w-80 flex-none bg-gray-500">
      <transition name="slide">
        <component
          @click="onItemSelect"
          :is="activeTab"
        />
      </transition>
    </div>
    <div
      class="w-full flex-1 flex flex-col bg-gray-100 overflow-auto"
    >
      <TemplateController :toggle-fullscreen.sync="isFullscreen" />

      <div
        ref="editor-wrapper"
        class="w-full flex-1 px-8 py-6 overflow-auto"
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
          >
            <div class="text-gray-500 font-bold">
              {{ `Page ${ index + 1 } - ${ page.title }` }}
            </div>
            <div class="bg-white mt-2">
              <div
                class="bg-white"
                :id="`stage-${page.id}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppIcon from '@/components/Icons';
import TemplateController from './TemplateController';
import TemplateBuilderImages from './TemplateBuilderImages';
import TemplateBuilderObjects from './TemplateBuilderObjects';
import TemplateBuilderList from './TemplateBuilderList';
import CanvasBuilder from './CanvasBuilder';

export default {

  components: {
    AppIcon,
    TemplateBuilderList,
    TemplateBuilderImages,
    TemplateBuilderObjects,
    TemplateController
  },

  props: {
    shop: {
      type: Boolean,
      default: false
    }
  },

  mounted () {
    const CanvasBuilderConfig = {
      hasTransform: true,
      hasSnap: true
    };

    this.pages.forEach(page => {
      // new canvas
      this.canvas[page.id] = new CanvasBuilder(CanvasBuilderConfig);

      // listen on resize container
      this.ro[page.id] = new ResizeObserver(() => {
        this.canvas[page.id].resizeStage(this.$refs['editor-container']);
      }).observe(this.$refs['editor-wrapper']);

      // create new stage
      this.canvas[page.id].createStage({ container: `stage-${page.id}` });

      page.layers.forEach(layer => {
        // create new layer
        this.canvas[page.id].createLayer(layer.id);

        layer.children.forEach(config => {
          this.canvas[page.id].createObject({ layerId: layer.id, config });
        });
      });
    });
  },

  data () {
    return {
      canvas: {},
      activeTab: 'TemplateBuilderList',
      isFullscreen: false,
      ro: {},
      image: null,
      pages: [
        {
          id: this.$randomId(),
          title: 'Add page title',
          layers: [{
            id: 'layer',
            name: 'layer',
            children: []
          }]
        }
      ],
      options: [
        { icon: 'templateIcon', isActive: true, name: 'Template', component: 'TemplateBuilderList' },
        { icon: 'images', isActive: false, name: 'Images', component: 'TemplateBuilderImages' },
        { icon: 'upload', isActive: false, name: 'Upload' },
        { icon: 'pacman', isActive: false, name: 'Objects', component: 'TemplateBuilderObjects' },
        { icon: 'textIcon', isActive: false, name: 'Text' },
        { icon: 'background', isActive: false, name: 'Background' },
        { icon: 'folder', isActive: false, name: 'Folder' },
        { icon: 'cart', isActive: false, name: 'Shop' }
      ],
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

        if (i.isActive) {
          this.activeTab = i.component;
        }
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

    onItemSelect (config) {
      this.pages[0].layers[0].children.push(config);
      this.canvas[this.pages[0].id].createObject({ layerId: this.pages[0].layers[0].id, config });
    }
  },

  destroyed () {
    // destroy resize oberserver
    delete this.ro;
  }
};
</script>

<style lang="scss" scoped>

.fade-transition {
  transition: opacity 0.2s ease;
}

.fade-enter, .fade-leave {
  opacity: 0;
}

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
