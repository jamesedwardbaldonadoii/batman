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
    <div class="w-52 flex-none bg-gray-500">
      items
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
            :style="pageStyle"
          >
            <div class="text-gray-500 font-bold">
              {{ `Page ${ index + 1 } - ${ page.title }` }}
            </div>
            <div class="bg-white mt-2">
              <v-stage
                :ref="`stage-${page.id}`"
                :config="configKonva"
                @mousedown="handleStageMouseDown"
                @touchstart="handleStageMouseDown"
              >
                <v-layer :ref="page.layer.id">
                  <v-transformer
                    :config="configTransformer"
                    ref="transformer"
                  />
                </v-layer>
              </v-stage>
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
import Konva from 'konva';

import {
  generateGuideLines,
  clearGuideLines,
  config
} from './utils';

export default {

  components: {
    AppIcon,
    TemplateController
  },

  props: {
    shop: {
      type: Boolean,
      default: false
    }
  },

  mounted () {
    this.ro = new ResizeObserver(this.onResize).observe(this.$refs['editor-wrapper']);
    this.onResize();

    this.pages.forEach(i => {
      const layer = this.$refs[i.layer.id][0].getNode();

      i.layer.children.forEach(l => {
        if (l.component === 'Image') {
          Konva.Image.fromURL(l.url, (imgNode) => {
            imgNode.setAttrs(l);

            // attach events
            imgNode.on('transformend', this.handleTransformEnd);
            imgNode.on('dragmove', this.handleOndragmove);
            imgNode.on('dragend', this.handleOnDragend);

            layer.add(imgNode);
            layer.batchDraw();
          });
        } else {
          const object = new Konva[l.component](l);

          // attach events
          object.on('transformend', this.handleTransformEnd);
          object.on('dragmove', this.handleOndragmove);
          object.on('dragend', this.handleOnDragend);

          layer.add(object);
          layer.batchDraw();
        }
      });
    });
  },

  data () {
    return {
      isFullscreen: false,
      ro: null,
      image: null,
      pages: [
        {
          id: this.$randomId(),
          title: 'Add page title',
          layer: {
            id: 'layer',
            name: 'layer',
            children: [
              {
                id: this.$randomId(),
                component: 'Circle',
                name: 'circle',
                // actual config
                rotation: 0,
                x: 241.0558985105058,
                y: 83.99879798662761,
                scaleX: 1,
                scaleY: 1,
                radius: 70,
                fill: 'green',
                draggable: true
              },
              {
                id: this.$randomId(),
                name: 'rect1',
                component: 'Rect',

                // actual config
                rotation: 0,
                x: 10,
                y: 10,
                width: 100,
                height: 100,
                scaleX: 1,
                scaleY: 1,
                fill: 'red',
                draggable: true
              },
              {
                id: this.$randomId(),
                name: 'img1',
                component: 'Image',
                url: 'https://konvajs.org/assets/yoda.jpg',

                // actual config
                x: 241.0558985105058,
                y: 83.99879798662761,
                width: 150,
                height: 200,
                scaleX: 1,
                scaleY: 1,
                draggable: true
              }
            ]
          }
        }
      ],
      configTransformer: config.transformer,
      configKonva: {
        width: 213,
        height: 236
      },
      options: [
        { icon: 'templateIcon', isActive: true, name: 'Template' },
        { icon: 'images', isActive: false, name: 'Images' },
        { icon: 'upload', isActive: false, name: 'Upload' },
        { icon: 'pacman', isActive: false, name: 'Objects' },
        { icon: 'textIcon', isActive: false, name: 'Text' },
        { icon: 'background', isActive: false, name: 'Background' },
        { icon: 'folder', isActive: false, name: 'Folder' },
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

    /**
     * @requires $refs['editor-container'] the elemen wrapper
     * @description set the active tab state
     */
    onResize () {
      if (!this.$refs['editor-container']) {
        return;
      }

      const editorContainerPosition = this.$refs['editor-container'].getBoundingClientRect();
      const { width, height } = editorContainerPosition;

      this.pageStyle.height = `${width * 9 / 16}px`;
      this.configKonva.width = width;
      this.configKonva.height = height;
    },
    /**
     * @description handle drag end
     */
    handleOnDragend (event) {
      const layer = event.target.getLayer();

      // clear guidelines
      clearGuideLines(layer);
    },

    /**
     * @param {Event} event
     * @description handle drag move
     */
    handleOndragmove (event) {
      // generate snap guide lines
      generateGuideLines(event);
    },

    /**
     * @param {Event} event
     * @description shape is transformed, let us save new attrs back to the node
     */
    handleTransformEnd (event) {
      // find element in our state
      const obj = this.pages[0].layer.children.find((r) => r.name === this.selectedShapeName);

      if (!obj) {
        return;
      }
      // update the state
      obj.x = event.target.x();
      obj.y = event.target.y();
      obj.rotation = event.target.rotation();
      obj.scaleX = event.target.scaleX();
      obj.scaleY = event.target.scaleY();
    },

    handleStageMouseDown (e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = '';
        this.updateTransformer();
        return;
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === 'Transformer';
      if (clickedOnTransformer) {
        return;
      }

      // find clicked obj by its name
      const name = e.target.name();

      const obj = this.pages[0].layer.children.find((r) => r.name === name);

      if (obj) {
        this.selectedShapeName = name;
      } else {
        this.selectedShapeName = '';
      }

      this.updateTransformer();
    },

    updateTransformer () {
      // do nothing if no objects
      if (!this.$refs.transformer) {
        return;
      }

      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer[0].getNode();

      const stage = transformerNode.getStage();

      const selectedNode = stage.findOne(`.${this.selectedShapeName}`);
      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return;
      }

      if (selectedNode) {
        // attach to another node
        transformerNode.nodes([selectedNode]);
      } else {
        // remove transformer
        transformerNode.nodes([]);
      }

      transformerNode.getLayer().batchDraw();
    }
  },

  destroyed () {
    // destroy resize oberserver
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
