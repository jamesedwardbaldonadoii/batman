import Konva from 'konva';

const GUIDELINE_OFFSET = 5; // constant guidline offset

/**
 * @param {Node} node element
 * @description get snapping edges, call this element on drag
 * @returns {Object} { vertical, horizontal }
 */
const getObjectSnappingEdges = (node) => {
  const box = node.getClientRect();
  const absPos = node.absolutePosition();

  const vertical = [
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
  ];

  const horizontal = [
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
  ];

  return {
    vertical,
    horizontal
  };
};

/**
 * @param {Object} lineGuideStops {horizontal, vertical}
 * @param {Object} itemBounds {horizontal, vertical}
 * @description get snapping edges, call this element on drag
 * @returns {Array} guides=[]
 */
const getGuides = (lineGuideStops, itemBounds) => {
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
};

/**
 * @param {Node} node
 * @description get snapping line guide
 * @returns {Object} { vertical, horizontal }
 */
const getLineGuideStops = (skipShape) => {
  const stage = skipShape.getStage();

  // we can snap to stage borders and the center of the stage
  var vertical = [0, stage.width() / 2, stage.width()];
  var horizontal = [0, stage.height() / 2, stage.height()];

  // and we snap over edges and center of each object on the canvas
  stage.children.forEach((layer) => {
    layer.children.forEach(object => {
      if (object === skipShape || object.name() === 'transformer') {
        return;
      }

      var box = object.getClientRect();
      // and we can snap to all edges of shapes
      vertical.push([box.x, box.x + box.width, box.x + box.width / 2]);
      horizontal.push([box.y, box.y + box.height, box.y + box.height / 2]);
    });
  });

  return {
    vertical: vertical.flat(),
    horizontal: horizontal.flat()
  };
};

/**
 * @param {Node} layer
 * @param {Array} guides
 * @description draw guides
 */
const drawGuides = (layer, guides) => {
  let line;
  let axis;

  const config = {
    stroke: 'rgb(0, 161, 255)',
    strokeWidth: 1,
    name: 'guid-line',
    dash: [4, 6]
  };

  guides.forEach((lg) => {
    if (lg.orientation === 'H') {
      config.points = [-6000, 0, 6000, 0];

      axis = {
        x: 0,
        y: lg.lineGuide
      };
    } else if (lg.orientation === 'V') {
      config.points = [0, -6000, 0, 6000];

      axis = {
        x: lg.lineGuide,
        y: 0
      };
    }

    line = new Konva.Line(config);

    layer.add(line);
    line.absolutePosition(axis);
    layer.batchDraw();
  });
};

/**
 * @param {Event} event
 * @description generate snap guidelines
 */
const generateGuideLines = (event) => {
  const layer = event.target.getLayer();

  // clear all previous lines on the screen
  layer.find('.guid-line').destroy();

  // find possible snapping lines
  const lineGuideStops = getLineGuideStops(event.target);
  // find snapping points of current object
  const itemBounds = getObjectSnappingEdges(event.target);

  // now find where can we snap current object
  const guides = getGuides(lineGuideStops, itemBounds);

  // do nothing of no snapping
  if (!guides.length) {
    return;
  }

  drawGuides(layer, guides);

  const absPos = event.target.absolutePosition();

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

  event.target.absolutePosition(absPos);
};

export {
  generateGuideLines,
  getObjectSnappingEdges,
  getLineGuideStops,
  drawGuides,
  getGuides
};
