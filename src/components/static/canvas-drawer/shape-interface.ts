import Konva from 'konva';
import { ShapeConfig } from 'konva/types/Shape';
import { LayerConfig } from 'konva/types/Layer';
import { KonvaEventObject } from 'konva/types/Node';

import { StageFactory } from './stage';

export abstract class ShapeFactory {

  stage: StageFactory;
  layer: Konva.Layer;
  options: LayerConfig;
  corners: Konva.Circle[];
  shape: Konva.Line | Konva.Rect | Konva.RegularPolygon;
  isMouseOverStartPoint: boolean;
  isClosedShape: boolean;
  transformer: Konva.Transformer;

  /**
   * Get Stage and Name of Layer to Make Shape
   * @param {StageFactory} stage
   * @param {String} name
   */
  constructor(stage: StageFactory, name: string) {
    this.stage = stage;
    this.transformer = new Konva.Transformer({
      ignoreStroke: true,
      padding: 5,
    });
    this.options = {
      name,
      strokeColor: '#fff',
    };
    this.layer = new Konva.Layer(this.options);
    this.isClosedShape = true;
    this.corners = [];
  }

  /** Before Redraw Shape You Should Clear and Reset Layer And Shape */
  abstract destroy(): void;

  /** Get Points Of Shape **/
  abstract getPoints(): number[] | Object;

  /**
   * Draw Shape on Click Handler
   * @param {Object} e
   */
  abstract draw(e: KonvaEventObject<MouseEvent>): void;

  /** Adding Transformation config */
  abstract transform(): void;

  /** Edit Shape by Points */
  abstract edit(): void;

  /** Change Color Of Selected Layer */
  abstract activeLayer(): void;

  /** Deactive Layer after Drawing And Editing Shape */
  abstract deactiveLayer(): void;

  /** Handle Corner Drags */
  abstract dragmove(): void;

  /** Delete Layer And Shapes Completly */
  clear() {
    this.shape.destroy();
    this.layer.destroy();
  }

  /**
   * Draw Shape's Corners for Editing
   * @param {Number} x
   * @param {Number} y
   * @param {Object} config
   * @return {Object}
   */
  drawCornerPoints = (x: number, y: number, config?: ShapeConfig) => {
    return new Konva.Circle({
      x,
      y,
      radius: 4,
      fill: 'black',
      strokeWidth: 0,
      draggable: false,
      ...(config && { ...config }),
    });
  };

  /** Set Getter fot Get Layer **/
  public get get(): Konva.Layer {
    return this.layer;
  }

}
