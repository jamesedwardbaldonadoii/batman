
import { generateGuideLines } from './utils';

class EventsHandler {
  /**
   * @param {HTMLElement} [node]
   * @description handle drag move
   */
  attachEvents (node) {
    // attach events
    node.on('transformend', this.handleTransformEnd);
    node.on('dragmove', this.handleOndragmove);
    node.on('dragend', this.handleOnDragend);
    node.on('dragstart', this.handleOnDragstart);
    node.on('keydown', this.handleOnKeypress);
  }

  /**
   * @description handle keypress
   */
  handleOnKeypress (event) {
    console.log(event.which, 'test');
  }

  /**
   * @description handle mousedown & touchstart
   */
  handleMousedown (event, callback) {
    // clicked on stage - clear selection
    if (event.target === event.target.getStage()) {
      this.selectedShapeName = '';

      return callback(null);
    }

    // clicked on transformer - do nothing
    const clickedOnTransformer = event.target.getParent().className === 'Transformer';

    if (clickedOnTransformer) {
      return;
    }

    // find clicked obj by its name
    const name = event.target.name();

    event.target.getLayer().children.forEach(item => {
      if (item.name() === name) {
        return callback(name);
      }
    });
  }

  /**
   * @description handle drag move
   */
  handleOndragmove (event) {
    // generate snap guide lines
    generateGuideLines(event);
  }

  /**
   * @description handle drag start
   */
  handleOnDragstart (event) {
    const layer = event.target.getLayer();

    // move selected drag object to top
    event.target.moveToTop();
    layer.draw();
  }

  /**
   * @description handle drag end, destroy guidelines
   */
  handleOnDragend (event) {
    const layer = event.target.getLayer();

    // destroy guidelines
    layer.find('.guid-line').destroy();
    layer.batchDraw();
  }

  /**
   * @description handle drag move
   */
  handleDragover (event) {
    event.preventDefault();
  }

  /**
   * @description shape is transformed, let us save new attrs back to the node
   */
  handleTransformEnd (event) {
    // find element in our state
    let obj;

    event.target.getLayer().children.forEach(item => {
      if (item.name() === name) {
        obj = item;
      }
    });

    if (!obj) {
      return;
    }

    // update the state
    obj.x = event.target.x();
    obj.y = event.target.y();
    obj.rotation = event.target.rotation();
    obj.scaleX = event.target.scaleX();
    obj.scaleY = event.target.scaleY();
  }

  /**
   * @description handle drag move
   */
  handleDrop (event) {
    event.preventDefault();
    // now we need to find pointer position
    // we can't use stage.getPointerPosition() here, because that event
    // is not registered by Konva.Stage
    // we can register it manually:
    // this.$refs.stage.setPointersPositions(event);

    // Konva.Image.fromURL(itemURL, function (image) {
    //   layer.add(image);

    //   image.position(this.$refs.stage.getPointerPosition());
    //   image.draggable(true);

    //   layer.draw();
    // });
  }
}

export default EventsHandler;
