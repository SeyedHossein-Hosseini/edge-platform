import { Backdrop, Box, CircularProgress, Fab, Typography } from '@material-ui/core';
import {
  BorderColor, Delete, Edit, FormatShapesOutlined, MoreHorizOutlined, PhotoSizeSelectSmall, Save, Timeline,
  Transform, Visibility,
} from '@material-ui/icons';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import clsx from 'clsx';
import Konva from 'konva';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import sizeMe from 'react-sizeme';
import { stringGenerator } from 'src/helpers/strings/strings';
import { CanvasShapesInterface } from 'src/interfaces/canvas-shapes.interface';
import { PointsProps, SingleFrameProps } from 'src/interfaces/canvas.interface';
import { twoDArrayConvertor } from 'src/pipes/array';
import {
  getRestrictedAreaPolygonsPoints,
  getRestrictedAreaSingleFrame,
  saveRestrictedAreaPolygonPoints,
} from 'src/services/api/service-config.api';
import { useStyle } from './canvas-drawer.style';
import { LayerFactory } from './shape-custom';
import { RegularLayerFactory } from './shape-regular';
import { StageFactory } from './stage';

export interface CanvasDrawerProps {
  rtspLink: string;
  size?: { width: number };
}

let stage: StageFactory;

const frameImageObj = new Image();
let image = new Konva.Image();

const CanvasDrawer: React.FC<CanvasDrawerProps> = React.memo(({ rtspLink, size }) => {
  const classes = useStyle();
  const { t } = useTranslation();

  const { width } = size;
  const [ height, setHeight ] = useState(0);

  const stageRef = useRef<HTMLDivElement>();
  const [ points, setPoints ] = useState<Array<CanvasShapesInterface>>([]);
  const [ initCanvas, setInitCanvas ] = useState(false);

  const [ cameraFrame, setCameraFrame ] = useState<string>();
  const [ frameHeight, setFrameHeight ] = useState<number>();
  const [ isImageLoad, setIsImageLoad ] = useState(false);

  const [ error, setError ] = useState<string>();
  const [ fetchFrameLoading, setFetchFrameLoading ] = useState(false);
  const [ fetchPointsLoading, setFetchPointsLoading ] = useState(false);

  const [ actionOpen, setActionOpen ] = React.useState(false);
  const [ drawActionOpen, setDrawActionOpen ] = React.useState(false);

  const [ stageMode, setStageMode ] = useState<string>();

  const handleOpen = (fn: Dispatch<SetStateAction<boolean>>) => () => {
    fn(true);
  };

  const handleClose = (fn: Dispatch<SetStateAction<boolean>>) => () => {
    fn(false);
  };

  const savePoints = () => {
    setFetchPointsLoading(true);
    if (stage['layerList'].length >= 1) {
      if ( stage['layerList'][0]['shape']['attrs']['points'].length > 0 ) {
        const FirstShape = twoDArrayConvertor(stage['layerList'][0]['shape']['attrs']['points']);
        const convertedPoints: [ number, number ][] = FirstShape.map(( point: number[] ) => {
          return [ (point[0] * 100) / width, (point[1] * 100) / frameHeight ];
        });
        saveRestrictedAreaPolygonPoints(rtspLink, convertedPoints).subscribe({
          next: ( res: any ) => {
            setFetchPointsLoading(false);
          },
          error: ( err: Error ) => {
            setFetchPointsLoading(false);
          },
        });
      }
      setFetchPointsLoading(false);
    } else {
      setFetchPointsLoading(false);
    }
  };

  const createRegularArea = () => {
    stage.createRegularArea();
  };

  const clearArea = () => {
    stage.clearArea();
  };

  const createArea = () => {
    stage.createArea();
  };

  const editArea = () => {
    stage.editArea();
  };

  const saveDraw = () => {
    stage.save();
  };

  const transformShape = () => {
    stage.transformShape();
  };

  const editShape = () => {
    stage.editShape();
  };

  const drawActions = [
    {
      icon: <Delete />,
      name: t('canvas.remove'),
      handler: clearArea,
    },
    {
      icon: <Transform />,
      name: t('canvas.transform'),
      handler: transformShape,
    },
    {
      icon: <Timeline />,
      name: t('canvas.points'),
      handler: editShape,
    },
  ];

  const actions = [
    { icon: <Save />, name: t('canvas.save'), handler: savePoints },
    {
      icon: <FormatShapesOutlined />,
      name: t('canvas.create'),
      handler: createArea,
    },
    {
      icon: <Edit />,
      name: t('canvas.edit'),
      handler: editArea,
    },
    {
      icon: <PhotoSizeSelectSmall />,
      name: t('canvas.rectangle'),
      handler: createRegularArea,
    },
  ];

  const handleStageMode = (mode: string | undefined) => {
    setStageMode(mode);
  };

  useEffect(() => {
    if (!width) return;
    setHeight((width * 1080) / 1920);
    setInitCanvas(false);
  }, [width]);

  // Get CameraFrame
  useEffect(() => {
    if (!rtspLink) return;
    setFetchFrameLoading(true);
    getRestrictedAreaSingleFrame(rtspLink).subscribe({
      next: (response: SingleFrameProps) => {
        if (response['isOK']) {
          setCameraFrame((prevFrame: string) => response.image);
        } else {
          setError(t('noFrameError'));
        }
      },
      error: (err: any) => setError(err.response.data.detail),
      complete: () => setFetchFrameLoading(false),
    });
  }, [rtspLink]);

  // Set CameraFrame Onload
  useEffect(() => {
    if (!cameraFrame) return;
    frameImageObj.onload = function() {
      setIsImageLoad(true);
    };
    frameImageObj.src = cameraFrame;
  }, [cameraFrame]);

  // Set FrameHeight
  useEffect(() => {
    if (!isImageLoad || !width) return;
    const frameHeight = (width / frameImageObj.width) * frameImageObj.height;
    setFrameHeight(frameHeight);
  }, [ isImageLoad, width ]);

  // Set Stage With Frame Height
  useEffect(() => {
    if (!frameHeight || !stageRef.current) return;
    stage = new StageFactory(
        stageRef.current,
        frameHeight,
        width,
        handleStageMode,
        false // TODO : CONTROLING CLOSED SHAPE
    );

    image = new Konva.Image({
      x: 0,
      y: 0,
      width: width,
      height: frameHeight,
      image: frameImageObj,
    });
  }, [ stageRef.current, frameHeight ]);

  // Get Points
  useEffect(() => {
    if (!frameHeight) return;
    setFetchPointsLoading(true);
    // ToDo: Check Object Return From BackEnd
    getRestrictedAreaPolygonsPoints(rtspLink).subscribe({
      next: ({ points }: PointsProps) => points.length > 0 && setPoints([{ type: 'polygon', points }]),
      error: (err: any) => setError(err.response.data.detail),
      complete: () => setFetchPointsLoading(false),
    });
  }, [ frameHeight, cameraFrame ]);

  // Add line To ShapeLayer
  useEffect(() => {
    if (!stage || !points.length) return;
    if (initCanvas) return;
    points.forEach((shape: CanvasShapesInterface) => {
      if (shape['type'] === 'polygon') {
        const shapePoints = shape['points'];
        const shapesLayer = new LayerFactory(
            stage,
            stringGenerator(5),
            false,
            shapePoints.map((point: number[]) => {
              return [ (point[0] / 100) * width, (point[1] / 100) * frameHeight ];
            }).reduce((a, b) => a.concat(b), [])
        );
        stage.addLayer(shapesLayer);
      } else {
        const shapesLayer = new RegularLayerFactory(
            stage,
            stringGenerator(5),
            shape['rect']['x'],
            shape['rect']['y'],
            shape['rect']['width'],
            shape['rect']['height'],
        );
        stage.addLayer(shapesLayer);
      }
    });
    setInitCanvas(true);
  }, [ points, stage ]);

  // Add FrameImage to FrameLayer
  useEffect(() => {
    if (
      !stage ||
      !setIsImageLoad ||
      fetchFrameLoading ||
      fetchPointsLoading
    ) {
      return;
    }
    stage.setBackgroundImage(image);
  }, [ stage, setIsImageLoad, fetchFrameLoading, fetchPointsLoading ]);

  return (
    <>
      <Box className={classes.wrapper}>
        <Backdrop
          open={drawActionOpen || actionOpen}
          className={classes.backdrop}
        />
        <div ref={stageRef} />
        {fetchFrameLoading || fetchPointsLoading ? (
          <Box className={classes.loading} width={width} height={height}>
            <CircularProgress size={20} />
            <Typography variant="h5" component="p">{t('canvas.wait')}</Typography>
          </Box>
        ) : (
          cameraFrame && (
            <>
              {(stageMode === 'draw' || stageMode === 'edit') && (
                <Fab
                  color="primary"
                  className={clsx(classes.speedDial, classes.drawSpeedDial)}
                  onClick={saveDraw}
                >
                  <Visibility />
                </Fab>
              )}

              {stageMode === 'edit' && (
                <SpeedDial
                  ariaLabel="Draw Tools"
                  open={drawActionOpen}
                  icon={<BorderColor />}
                  onOpen={handleOpen(setDrawActionOpen)}
                  onClose={handleClose(setDrawActionOpen)}
                  className={clsx(classes.speedDial)}
                >
                  {drawActions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      onClick={() => {
                        handleClose(setDrawActionOpen)();
                        action.handler && action.handler();
                      }}
                    />
                  ))}
                </SpeedDial>
              )}

              {!stageMode && (
                <SpeedDial
                  ariaLabel="Actions"
                  open={actionOpen}
                  className={classes.speedDial}
                  icon={<MoreHorizOutlined />}
                  onOpen={handleOpen(setActionOpen)}
                  onClose={handleClose(setActionOpen)}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      onClick={() => {
                        handleClose(setActionOpen)();
                        action.handler();
                      }}
                    />
                  ))}
                </SpeedDial>
              )}
            </>
          )
        )}
      </Box>
      {error && (
        <Box mt={3}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}
    </>
  );
},
(prevProps, nextProps) => {
  return prevProps.size === nextProps.size;
}
);

const d = sizeMe({ monitorWidth: true })(CanvasDrawer);

export { d as CanvasDrawer };
