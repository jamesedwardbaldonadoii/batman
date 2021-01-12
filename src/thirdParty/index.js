/**
 * import and init third party
 * components/validators and other dependencies
 */
import Vue from 'vue';
import vuescroll from 'vuescroll';
import VueKonva from 'vue-konva';

Vue.use(vuescroll, {
  ops: {
    bar: {
      showDelay: 300,
      onlyShowBarOnScroll: true,
      keepShow: false,
      background: '#333',
      opacity: 0.5,
      hoverStyle: true,
      minSize: 0,
      size: '7px'
    }
  }
});

Vue.use(VueKonva, {
  options: {
    config: {
      transformer: {
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
      }
    }
  }
});
