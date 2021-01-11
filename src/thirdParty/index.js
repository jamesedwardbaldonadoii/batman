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

Vue.use(VueKonva);
