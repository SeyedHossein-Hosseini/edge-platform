import Konva from 'konva';
import { Image } from 'konva/types/shapes/Image';
import { KonvaEventObject } from 'konva/types/Node';
import { stringGenerator } from 'src/helpers/strings/strings';
import { ShapeFactory } from './shape-interface';
import { LayerFactory } from './shape-custom';
import { RegularLayerFactory } from './shape-regular';

export class StageFactory {

  private stage: Konva.Stage;
  private selectedLayer: ShapeFactory;
  private layerList: ShapeFactory[] = [];
  private closedShapeConfig: boolean;

  // public activeLayer: string = undefined;
  private currentMode: 'draw' | 'edit';
  private currentType: 'polygon' | 'rectangle';
  private setModeParent: (mode: string) => void;

  /**
   *
   * @param {Object} stageWrapperRef
   * @param {Number} height
   * @param {Number} width
   * @param {*} setMode
   * @param {Boolean} closedShape
   */
  constructor(
      stageWrapperRef: HTMLDivElement,
      height: number,
      width: number,
      setMode: (mode: string) => void,
      closedShape: boolean
  ) {
    this.stage = new Konva.Stage({
      container: stageWrapperRef,
      height,
      width,
    });
    this.stage.on('click', this.clickHandler.bind(this));
    this.stage.on('contentContextmenu', (e) => {
      e.evt.preventDefault();
    });
    this.setModeParent = setMode;
    this.closedShapeConfig = closedShape;
  }

  /**
   * Control Stage Click Handler For Selecting Layers or Drawing New Layer
   * @param {Object} e
   */
  private clickHandler(e: KonvaEventObject<MouseEvent>) {
    if (this.selectedLayer) {
      if (this.currentMode === 'draw') {
        /** Stage Has New Layer For Drawing */
        this.selectedLayer.draw(e);
      } else if (e.target === this.stage) {
        /** Cliking On Stage to Deactive Active Layer */
        // this.save();
      } else if (
        e.target !== this.stage &&
        e.target.getLayer().name() !== this.selectedLayer.get.name()
      ) {
        /** CLicking On Other Layer to Activate */
        this.deActiveteLayer(this.selectedLayer);
        this.selectedLayer = this.layerList.filter((layer) => layer.get.name() === e.target.getLayer().name())[0];
        this.activateLayer(this.selectedLayer);
        this.setModeParent('edit');
      }
    }
  }

  /**
   * Add Layer to Stage and Layers list
   * @param {Object} layer
   */
  public addLayer(layer: ShapeFactory) {
    this.layerList.push(layer);
    this.stage.clear();
    this.stage.add(layer.get);
    this.stage.draw();
  }

  /**
   * Active Selected Layer to Edit
   * @param {ShapeFactory} layer
   */
  public activateLayer(layer: ShapeFactory) {
    layer.activeLayer();
    this.selectedLayer = layer;
    this.transformShape();
  }

  /**
   * Deactive Layer
   * @param {ShapeFactory} layer
   */
  public deActiveteLayer(layer: ShapeFactory) {
    layer.deactiveLayer();
    this.selectedLayer = undefined;
  }

  /** Add Transformation to Selected Shape */
  public transformShape() {
    this.selectedLayer.transform();
  }

  /** Active Corners to Edit Selected Shape */
  public editShape() {
    this.selectedLayer.edit();
  }

  /** Active Last Polygon to Edit */
  public editArea() {
    this.currentMode = 'edit';
    // this.layerList.forEach((layer) => layer.activeSelectableMode());
    this.selectedLayer = this.layerList[this.layerList.length - 1];
    this.selectedLayer.activeLayer();
    this.transformShape();
    this.setModeParent('edit');

    this.stage.on('mousemove', (e: KonvaEventObject<MouseEvent>) => {
      if (e.target !== this.stage) {
        if (e.target.getLayer().name() !== this.selectedLayer.get.name()) {
          this.stage.container().style.cursor = 'pointer';
        } else {
          this.stage.container().style.cursor = 'move';
        }
      } else {
        this.stage.container().style.cursor = 'default';
      }
    });
  }

  /** Create New Custom Shape */
  public createArea() {
    if (this.selectedLayer) {
      this.deActiveteLayer(this.selectedLayer);
    }
    const layer = new LayerFactory(
        this,
        stringGenerator(5),
        this.closedShapeConfig,
        []
    );
    this.addLayer(layer);
    this.selectedLayer = layer;
    this.setModeParent('draw');
    this.currentMode = 'draw';
    this.currentType = 'polygon';
  }

  /** Create New Regular Area **/
  public createRegularArea() {
    if (this.selectedLayer) {
      this.deActiveteLayer(this.selectedLayer);
    }
    const layer = new RegularLayerFactory(
        this,
        stringGenerator(5),
    );
    this.addLayer(layer);
    this.selectedLayer = layer;
    this.setModeParent('draw');
    this.currentMode = 'draw';
    this.currentType = 'rectangle';
  }

  /** Save Layer After Editing Or Drawing */
  public save() {
    this.deActiveteLayer(this.selectedLayer);
    this.setModeParent(undefined);
    this.currentMode = undefined;
    this.currentType = undefined;
    this.stage.off('mousemove');
  }

  /** Clear Layer */
  public clearArea() {
    const index = this.layerList.findIndex((layer) => {
      return layer.get.name() === this.selectedLayer.get.name();
    });

    this.selectedLayer.clear();
    this.layerList.splice(index, 1);
    this.selectedLayer = undefined;

    this.setModeParent(undefined);
    this.currentMode = undefined;
    this.stage.off('mousemove');
  }

  /**
   * Set Background Image For Stage
   * @param {Object} image
   */
  public setBackgroundImage(image: Image) {
    const frameLayer = new Konva.Layer({ name: 'frameImage' });
    frameLayer.listening(false);
    frameLayer.add(image);
    this.stage.add(frameLayer);
    frameLayer.zIndex(0);
  }

  /**
   * Get The Children Count to Detect ZIndex
   * @return {number}
   */
  public getMaxZIndex() {
    return this.layerList.length;
  }

}
