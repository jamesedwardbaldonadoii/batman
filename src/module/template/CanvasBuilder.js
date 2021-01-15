import Konva from 'konva';
import CanvasBuilderEventHandler from './CanvasBuilderEventHandler';

class CanvasBuilder extends CanvasBuilderEventHandler {
  constructor ({ hasTransform, hasSnap } = {}) {
    super();

    this.config = {
      stage: {
        width: 1280,
        height: 720
      },

      transformer: {
        name: 'transformer',
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
    };

    this.layer = {};
    this.selectedShapeName = '';
    this.hasSnap = hasSnap;

    if (hasTransform) {
      this.transformer = new Konva.Transformer(this.config.transformer);
    }
  }

  /**
   * @param {String} container get element id
   * @description create stage canvas
   */
  createStage ({ container }) {
    this.stage = new Konva.Stage({ container, ...this.config.stage });

    this.stage.on('dragover', this.handleDragover);
    this.stage.on('drop', this.handleDrop);
    this.stage.on('keydown', this.handleOnKeypress);

    if (this.transformer) {
      this.stage.on('mousedown touchstart', (event) => {
        this.handleMousedown(event, (name) => {
          this.selectedShapeName = name || '';
          this.updateTransformer();
        });
      });
    }
  }

  updateTransformer () {
    // do nothing if no objects
    if (!this.transformer) {
      return;
    }

    // here we need to manually attach or detach Transformer node
    const selectedNode = this.stage.findOne(`.${this.selectedShapeName}`);

    // // do nothing if selected node is already attached
    if (selectedNode === this.transformer.node()) {
      return;
    }

    if (selectedNode) {
      // attach to another node
      this.transformer.nodes([selectedNode]);
    } else {
      // remove transformer
      this.transformer.nodes([]);
    }

    this.transformer.moveToTop();
    this.transformer.getLayer().batchDraw();
  }

  /**
   * @param {String} layerId get layer id
   * @description create new layer add add it to stage
   */
  createLayer (layerId) {
    this.layer[layerId] = new Konva.Layer();

    if (this.transformer) {
      // add transformer
      this.layer[layerId].add(this.transformer);
    }

    this.stage.add(this.layer[layerId]);
    this.stage.draw();
  }

  /**
   * @param {HTMLElement} parentRef get element to ref
   * @description responsive stage base on the parent container
   */
  resizeStage (parentRef) {
    if (!parentRef) {
      return;
    }
    // now we need to fit stage into parent
    const containerWidth = parentRef.getBoundingClientRect().width;

    // to do this we need to scale the stage
    const scale = containerWidth / this.config.stage.width;

    this.stage.width(this.config.stage.width * scale);
    this.stage.height(this.config.stage.height * scale);
    this.stage.scale({ x: scale, y: scale });
    this.stage.draw();
  }

  /**
   * @param {Object} data get element to ref
   * @description { layerId, config } responsive stage base on the parent container
   */
  createObject ({ layerId, config }) {
    const layer = this.layer[layerId];

    if (config.component === 'Image') {
      Konva.Image.fromURL(config.url, (imgNode) => {
        let scale = 1;

        if (!config.scaleX || config.scaleY) {
          if (imgNode.height() > this.stage.height()) {
            // scale image base on the stage - 10 for spacing as default
            scale = this.stage.height() / imgNode.height();

            config.scaleX = scale;
            config.scaleY = scale;
          }
        }

        if (!config.x) {
          config.x = this.stage.width() - (this.stage.width() / 2) - ((imgNode.width() - (imgNode.width() * scale)) / 2);
        }

        if (!config.y) {
          config.y = this.stage.height() - (this.stage.height() / 2) - ((imgNode.height() - (imgNode.height() * scale)) / 2);
        }

        imgNode.setAttrs(config);

        if (this.hasSnap) {
          // attach needed events
          this.attachEvents(imgNode);
        }

        layer.add(imgNode);
        layer.batchDraw();

        return imgNode;
      });
    } else {
      const node = new Konva[config.component](config);

      if (this.hasSnap) {
        // attach needed events
        this.attachEvents(node);
      }

      layer.add(node);
      layer.batchDraw();

      return node;
    }
  }

  /**
   * @param {Node} layer
   * @description clear all previous lines on the screen
   */
  clearGuideLines (layer) {
    layer.find('.guid-line').destroy();
    layer.batchDraw();
  }
}

export default CanvasBuilder;
