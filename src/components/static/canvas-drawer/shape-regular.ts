import Konva from 'konva';
import { KonvaEventObject } from 'konva/types/Node';
import { twoDArrayConvertor } from 'src/pipes/array';
import { StageFactory } from './stage';
import { ShapeFactory } from './shape-interface';

export class RegularLayerFactory extends ShapeFactory {

  isMouseOverStartPoint: boolean;
  shape: Konva.Rect;

  /**
   *  * Get Stage and Name of Layer to Make Shape
   * @param {StageFactory} stage
   * @param {String} name
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   */
  constructor(
      stage: StageFactory,
      name: string,
      x?: number,
      y?: number,
      width?: number,
      height?: number,
  ) {
    super(stage, name);
    this.shape = new Konva.Rect({
      strokeWidth: 4,
      strokeScaleEnabled: false,
      stroke: 'black',
      lineCap: 'round',
      lineJoin: 'round',
      fill: 'rgba(0,0,0,0.4)',
      opacity: 0.6,
      x,
      y,
      width,
      height,
    });
    this.layer.add(this.shape);
  }

  /** Before Redraw Shape You Should Clear and Reset Layer And Shape */
  destroy() {
    this.shape.setAttr('points', []);
    this.corners = [];

    this.layer.setAttrs({
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
    });
    this.shape.setAttrs({
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
    });

    this.layer.draggable(false);
    this.layer.removeChildren();
  }

  /**
   * Get Points Of Shape
   * @return {Number[]}
   */
  getPoints() {
    return {
      x: this.shape.x(),
      y: this.shape.y(),
      width: this.shape.width(),
      height: this.shape.height(),
    };
  }

  /**
   * Draw Shape on Click Handler
   * @param {Object} e
   */
  draw(e: KonvaEventObject<MouseEvent>) {
    const f = e.target.getStage().getPointerPosition();
    this.shape.setAttrs({ x: f.x, y: f.y, width: 250, height: 250 });
    this.layer.draw();
    this.stage.save();
    return;
  }

  /** Adding Transformation config */
  transform() {
    this.deactiveLayer();
    this.activeLayer();
    this.transformer.nodes([this.shape]);
    this.layer.zIndex(this.stage.getMaxZIndex());
    this.layer.add(this.transformer);
    this.layer.draggable(true);
    this.transformer.rotateEnabled(false);
    this.layer.draw();
  }

  /** Edit Shape by Points */
  edit() {
    this.deactiveLayer();
    this.activeLayer();

    const config = this.getPoints();
    const shapeCorners = [
      [ config.x, config.y ],
      [ config.x + config.width, config.y ],
      [ config.x, config.y + config.height ],
      [ config.x + config.width, config.y + config.height ],
    ];
  }

  /** Change Color Of Selected Layer */
  activeLayer() {
    this.shape.fill('rgba(176,214,164,0.5)');
    this.shape.stroke('#333');
    this.shape.opacity(1);
    this.layer.draw();
  }

  /** Deactive Layer after Drawing And Editing Shape */
  deactiveLayer() {
    const transformedPos = this.shape.getAbsolutePosition();
    const transformedScale = this.shape.getAbsoluteScale();

    this.destroy();
    this.shape.setAttrs({
      x: transformedPos.x,
      y: transformedPos.y,
      width: (transformedScale.x === 1) ? this.getPoints().width : this.getPoints().width * transformedScale.x,
      height: (transformedScale.y === 1) ? this.getPoints().height : this.getPoints().height * transformedScale.y,
    });
    this.shape.fill('rgba(0,0,0,0.4)');
    this.shape.stroke('black');
    this.shape.opacity(0.6);

    this.layer.zIndex(1);
    this.layer.add(this.shape);
    this.layer.draw();
  }

  /** Handle Corner Drags */
  dragmove() {}

  /**
   * Handle Pointers on Drawing: make Scale bigger on mouse over the first point
   * @param {KonvaEventObject} e
   */
  mouseOver(e: KonvaEventObject<MouseEvent>) {}

  /**
   * Handle Pointers on Drawing: reset Scale After mouse out
   * @param {KonvaEventObject} e
   */
  mouseOut(e: KonvaEventObject<MouseEvent>) {}

}
