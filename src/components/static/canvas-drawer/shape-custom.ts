import Konva from 'konva';
import { KonvaEventObject } from 'konva/types/Node';

import { twoDArrayConvertor } from 'src/pipes/array';

import { StageFactory } from './stage';

import { ShapeFactory } from './shape-interface';

export class LayerFactory extends ShapeFactory {

  isMouseOverStartPoint: boolean;
  shape: Konva.Line;

  /**
   *  * Get Stage and Name of Layer to Make Shape
   * @param {StageFactory} stage
   * @param {String} name
   * @param {Boolean} isClosed
   * @param {Number[]} points
   */
  constructor(
      stage: StageFactory,
      name: string,
      isClosed: boolean,
      points: number[]
  ) {
    super(stage, name);
    this.isClosedShape = isClosed || !!points.length;
    this.shape = new Konva.Line({
      points,
      strokeWidth: 4,
      strokeScaleEnabled: false,
      stroke: 'black',
      lineCap: 'round',
      lineJoin: 'round',
      fill: 'rgba(0,0,0,0.4)',
      opacity: 0.6,
      ...((points.length || isClosed) && { closed: true }),
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
    return this.shape.points();
  }

  /**
   * Draw Shape on Click Handler
   * @param {Object} e
   */
  draw(e: KonvaEventObject<MouseEvent>) {
    if (
      !this.isClosedShape &&
      (this.isMouseOverStartPoint ||
        (e.evt.button === 2 && this.corners.length > 2))
    ) {
      this.shape.closed(true);
      this.layer.draw();
      this.stage.save();
      return;
    }

    const f = e.target.getStage().getPointerPosition();
    const y = f.y - 4 / 2;
    const x = f.x - 4 / 2;

    const corner = this.drawCornerPoints(x, y);
    if (!this.isClosedShape && this.corners.length === 0) {
      corner.hitStrokeWidth(16);
      corner.on('mouseover', this.mouseOver.bind(this));
      corner.on('mouseout', this.mouseOut.bind(this));
    }
    this.corners.push(corner);

    const currentPoints = this.shape.points();
    this.shape.points(currentPoints.concat([ x, y ]));

    this.layer.add(this.shape).add(...this.corners);
    this.layer.draw();
  }

  /** Adding Transformation config */
  transform() {
    this.deactiveLayer();
    this.activeLayer();
    this.transformer.nodes([this.shape]);
    this.layer.zIndex(this.stage.getMaxZIndex());
    this.layer.add(this.transformer);
    this.layer.draggable(true);
    this.layer.draw();
  }

  /** Edit Shape by Points */
  edit() {
    this.deactiveLayer();
    this.activeLayer();

    const points = this.getPoints();
    const f = twoDArrayConvertor([...points]);
    f.forEach((p: number[]) => {
      const corner = this.drawCornerPoints(p[0], p[1]);
      corner.draggable(true);
      corner.fill('#333');
      corner.radius(6);
      corner.on('dragmove', this.dragmove.bind(this));
      corner.on('dragstart', () => this.layer.getStage().container().style.cursor = 'grabbing' );
      corner.on('dragend', () => this.layer.getStage().container().style.cursor = 'grab' );
      corner.on('mousemove', (e: KonvaEventObject<MouseEvent>) => {
        e.cancelBubble = true;
        this.layer.getStage().container().style.cursor = 'grab';
      });
      this.corners.push(corner);
    });

    this.shape.points([...points]);

    this.layer.zIndex(this.stage.getMaxZIndex());
    this.layer.draggable(true);

    this.layer.add(this.shape, ...this.corners);
    this.layer.draw();
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
    const currentPoints = twoDArrayConvertor(this.getPoints());
    if (currentPoints.length < 3) {
      this.stage.clearArea();
      return;
    }

    let newPointPos: number[] = [];
    currentPoints.forEach((point) => {
      const newPos = this.shape
          .getAbsoluteTransform()
          .point({ x: point[0], y: point[1] });
      newPointPos = newPointPos.concat(newPos.x, newPos.y);
    });

    this.corners = [];

    this.destroy();
    this.shape.closed(true);
    this.shape.points(newPointPos);
    this.shape.fill('rgba(0,0,0,0.4)');
    this.shape.stroke('black');
    this.shape.opacity(0.6);

    this.layer.zIndex(1);
    this.layer.add(this.shape);
    this.layer.draw();
  }

  /** Handle Corner Drags */
  dragmove() {
    const newPoints = [...this.corners].reduce(
        (init, corner) => init.concat(corner.x(), corner.y()),
        []
    );

    this.shape.points(newPoints);
    this.layer.draw();
  }

  /**
   * Handle Pointers on Drawing: make Scale bigger on mouse over the first point
   * @param {KonvaEventObject} e
   */
  mouseOver(e: KonvaEventObject<MouseEvent>) {
    if (this.corners.length < 3) return;
    e.target.scale({ x: 2, y: 2 });
    this.isMouseOverStartPoint = true;
    this.layer.draw();
  }

  /**
   * Handle Pointers on Drawing: reset Scale After mouse out
   * @param {KonvaEventObject} e
   */
  mouseOut(e: KonvaEventObject<MouseEvent>) {
    e.target.scale({ x: 1, y: 1 });
    this.isMouseOverStartPoint = false;
    this.layer.draw();
  }

}
