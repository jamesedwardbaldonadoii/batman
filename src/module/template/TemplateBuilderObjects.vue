<template>
  <div class="px-2 py-3 h-full flex flex-col">
    <div class="px-2">
      Objects
    </div>
    <vue-scroll class="flex-1">
      <div
        id="stage-templatebuilder"
        class="cursor-pointer"
      />
    </vue-scroll>
  </div>
</template>

<script>
import CanvasBuilder from './CanvasBuilder';

export default {
  components: {

  },

  props: {

  },

  mounted () {
    this.canvas = new CanvasBuilder();

    // create new stage
    this.canvas.createStage({ container: 'stage-templatebuilder' });
    this.canvas.createLayer('layer-templatebuilder');
    this.objects.forEach(config => {
      const node = this.canvas.createObject({ layerId: 'layer-templatebuilder', config });
      node.on('mousedown', (ev) => { this.onSelectItem(config); });
    });
  },

  data () {
    return {
      canvas: null,
      objects: [
        {
          name: 'rect2',
          component: 'Rect',

          // actual config
          rotation: 0,
          x: 10,
          y: 10,
          width: 100,
          height: 100,
          scaleX: 1,
          scaleY: 1,
          fill: 'white',
          draggable: false
        },
        {
          component: 'Circle',
          name: 'circle1',
          // actual config
          rotation: 0,
          x: 180,
          y: 60,
          scaleX: 1,
          scaleY: 1,
          radius: 50,
          fill: 'white',
          draggable: false
        }
      ]
    };
  },

  methods: {
    onSelectItem (config) {
      this.$listeners.click({
        ...config,
        id: this.$randomId(),
        name: `${config.component.toLowerCase()}-${this.$randomId()}`,
        x: 0,
        y: 0,
        draggable: true
      });
    },

    handleOnDragstart (e) {
      console.log(e);
    }
  }
};
</script>
