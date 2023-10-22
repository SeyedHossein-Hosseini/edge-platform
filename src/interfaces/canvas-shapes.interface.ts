import { RectShapeInterface } from 'src/interfaces/rect-shape.interface';

export interface CanvasShapesInterface {
  type: 'rectangle' | 'polygon';
  points?: [number, number][];
  rect?: RectShapeInterface
}
