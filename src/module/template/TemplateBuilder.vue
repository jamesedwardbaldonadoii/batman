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
      items
    </div>
    <div
      ref="editor-wrapper"
      class="w-full max-w-full flex-1 bg-gray-100 px-8 py-6 overflow-auto"
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
              @mousedown="handleStageMouseDown"
              @touchstart="handleStageMouseDown"
            >
              <v-layer ref="layer">
                <v-rect
                  v-for="item in rectangles"
                  :key="item.id"
                  :config="item"
                  @transformend="handleTransformEnd"
                  @dragmove="onDragMoved"
                  @dragend="onDragEnd"
                />
                <v-transformer
                  :config="configTransformer"
                  ref="transformer"
                />
                <v-image
                  :config="{
                    image: image,
                    draggable: true
                  }"
                />
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
import Konva from 'konva';

const GUIDELINE_OFFSET = 5;

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
    this.ro = new ResizeObserver(this.onResize).observe(this.$refs['editor-wrapper']);
    this.onResize();
  },

  created () {
    const image = new window.Image();
    image.src = 'https://konvajs.org/assets/yoda.jpg';
    image.onload = () => {
      // set image only when it is loaded
      this.image = image;
    };
  },

  data () {
    return {
      ro: null,
      image: null,
      pages: [
        {
          id: this.generateRandomId(),
          title: 'Add page title'
        }
      ],
      configTransformer: {
        anchorStroke: 'gray',
        anchorFill: '#f2f2f2',
        anchorSize: 12,
        borderStroke: 'gray',
        borderDash: [3, 3],
        rotationSnaps: [0, 90, 180, 270],
        anchorCornerRadius: 3,
        padding: 2,
        centeredScaling: false,
        enabledAnchors: ['top-left', 'top-center', 'top-right', 'middle-right', 'middle-left', 'bottom-left', 'bottom-center', 'bottom-right']
      },
      configKonva: {
        width: 100,
        height: 200
      },
      configCircle: {
        rotation: 0,
        x: 241.0558985105058,
        y: 83.99879798662761,
        scaleX: 1,
        scaleY: 1,
        radius: 70,
        fill: 'red',
        name: 'circle',
        draggable: true
      },
      rectangles: [
        {
          rotation: 0,
          x: 10,
          y: 10,
          width: 100,
          height: 100,
          scaleX: 1,
          scaleY: 1,
          fill: 'red',
          name: 'rect1',
          draggable: true
        },
        {
          rotation: 0,
          x: 150,
          y: 150,
          width: 100,
          height: 100,
          scaleX: 1,
          scaleY: 1,
          fill: 'green',
          name: 'rect2',
          draggable: true
        }
      ],
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
     * @description generate random id
     */
    generateRandomId () {
      const min = 1;
      const max = 100000;
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    onDragEnd (e) {
      const layer = this.$refs.layer[0].getNode();

      // clear all previous lines on the screen
      layer.find('.guid-line').destroy();
      layer.batchDraw();
    },

    onDragMoved (e) {
      const layer = this.$refs.layer[0].getNode();

      // clear all previous lines on the screen
      layer.find('.guid-line').destroy();

      // find possible snapping lines
      const lineGuideStops = this.getLineGuideStops(e.target);
      // find snapping points of current object
      const itemBounds = this.getObjectSnappingEdges(e.target);

      // now find where can we snap current object
      const guides = this.getGuides(lineGuideStops, itemBounds);

      // do nothing of no snapping
      if (!guides.length) {
        return;
      }

      this.drawGuides(guides);

      const absPos = e.target.absolutePosition();
      // now force object position
      guides.forEach((lg) => {
        switch (lg.snap) {
          case 'start': {
            switch (lg.orientation) {
              case 'V': {
                absPos.x = lg.lineGuide + lg.offset;
                break;
              }
              case 'H': {
                absPos.y = lg.lineGuide + lg.offset;
                break;
              }
            }
            break;
          }
          case 'center': {
            switch (lg.orientation) {
              case 'V': {
                absPos.x = lg.lineGuide + lg.offset;
                break;
              }
              case 'H': {
                absPos.y = lg.lineGuide + lg.offset;
                break;
              }
            }
            break;
          }
          case 'end': {
            switch (lg.orientation) {
              case 'V': {
                absPos.x = lg.lineGuide + lg.offset;
                break;
              }
              case 'H': {
                absPos.y = lg.lineGuide + lg.offset;
                break;
              }
            }
            break;
          }
        }
      });
      e.target.absolutePosition(absPos);
    },

    handleTransformEnd (e) {
      // shape is transformed, let us save new attrs back to the node
      // find element in our state
      const rect = this.rectangles.find(
        (r) => r.name === this.selectedShapeName
      );

      if (!rect) {
        return;
      }
      // update the state
      rect.x = e.target.x();
      rect.y = e.target.y();
      rect.rotation = e.target.rotation();
      rect.scaleX = e.target.scaleX();
      rect.scaleY = e.target.scaleY();
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

      // find clicked rect by its name
      const name = e.target.name();
      const rect = this.rectangles.find((r) => r.name === name);
      if (rect) {
        this.selectedShapeName = name;
      } else {
        this.selectedShapeName = '';
      }
      this.updateTransformer();
    },

    updateTransformer () {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer[0].getNode();
      const stage = transformerNode.getStage();
      const { selectedShapeName } = this;

      const selectedNode = stage.findOne('.' + selectedShapeName);
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
    },

    getLineGuideStops (skipShape) {
      const stage = skipShape.getStage();
      // we can snap to stage borders and the center of the stage
      var vertical = [0, stage.width() / 2, stage.width()];
      var horizontal = [0, stage.height() / 2, stage.height()];

      // and we snap over edges and center of each object on the canvas
      stage.find('.object').forEach((guideItem) => {
        if (guideItem === skipShape) {
          return;
        }
        var box = guideItem.getClientRect();
        // and we can snap to all edges of shapes
        vertical.push([box.x, box.x + box.width, box.x + box.width / 2]);
        horizontal.push([box.y, box.y + box.height, box.y + box.height / 2]);
      });
      return {
        vertical: vertical.flat(),
        horizontal: horizontal.flat()
      };
    },

    getObjectSnappingEdges (node) {
      var box = node.getClientRect();
      var absPos = node.absolutePosition();

      return {
        vertical: [
          {
            guide: Math.round(box.x),
            offset: Math.round(absPos.x - box.x),
            snap: 'start'
          },
          {
            guide: Math.round(box.x + box.width / 2),
            offset: Math.round(absPos.x - box.x - box.width / 2),
            snap: 'center'
          },
          {
            guide: Math.round(box.x + box.width),
            offset: Math.round(absPos.x - box.x - box.width),
            snap: 'end'
          }
        ],
        horizontal: [
          {
            guide: Math.round(box.y),
            offset: Math.round(absPos.y - box.y),
            snap: 'start'
          },
          {
            guide: Math.round(box.y + box.height / 2),
            offset: Math.round(absPos.y - box.y - box.height / 2),
            snap: 'center'
          },
          {
            guide: Math.round(box.y + box.height),
            offset: Math.round(absPos.y - box.y - box.height),
            snap: 'end'
          }
        ]
      };
    },

    getGuides (lineGuideStops, itemBounds) {
      var resultV = [];
      var resultH = [];

      lineGuideStops.vertical.forEach((lineGuide) => {
        itemBounds.vertical.forEach((itemBound) => {
          var diff = Math.abs(lineGuide - itemBound.guide);
          // if the distance between guild line and object snap point is close we can consider this for snapping
          if (diff < GUIDELINE_OFFSET) {
            resultV.push({
              lineGuide: lineGuide,
              diff: diff,
              snap: itemBound.snap,
              offset: itemBound.offset
            });
          }
        });
      });

      lineGuideStops.horizontal.forEach((lineGuide) => {
        itemBounds.horizontal.forEach((itemBound) => {
          var diff = Math.abs(lineGuide - itemBound.guide);
          if (diff < GUIDELINE_OFFSET) {
            resultH.push({
              lineGuide: lineGuide,
              diff: diff,
              snap: itemBound.snap,
              offset: itemBound.offset
            });
          }
        });
      });

      var guides = [];

      // find closest snap
      var minV = resultV.sort((a, b) => a.diff - b.diff)[0];
      var minH = resultH.sort((a, b) => a.diff - b.diff)[0];
      if (minV) {
        guides.push({
          lineGuide: minV.lineGuide,
          offset: minV.offset,
          orientation: 'V',
          snap: minV.snap
        });
      }
      if (minH) {
        guides.push({
          lineGuide: minH.lineGuide,
          offset: minH.offset,
          orientation: 'H',
          snap: minH.snap
        });
      }
      return guides;
    },

    drawGuides (guides) {
      const layer = this.$refs.layer[0].getNode();
      let line;

      guides.forEach((lg) => {
        if (lg.orientation === 'H') {
          line = new Konva.Line({
            points: [-6000, 0, 6000, 0],
            stroke: 'rgb(0, 161, 255)',
            strokeWidth: 1,
            name: 'guid-line',
            dash: [4, 6]
          });
          layer.add(line);
          line.absolutePosition({
            x: 0,
            y: lg.lineGuide
          });
          layer.batchDraw();
        } else if (lg.orientation === 'V') {
          line = new Konva.Line({
            points: [0, -6000, 0, 6000],
            stroke: 'rgb(0, 161, 255)',
            strokeWidth: 1,
            name: 'guid-line',
            dash: [4, 6]
          });
          layer.add(line);
          line.absolutePosition({
            x: lg.lineGuide,
            y: 0
          });
          layer.batchDraw();
        }
      });
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
