import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import {
  Typography,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@material-ui/core';
import { useStyle } from 'src/pages/dashboard/floorplan/floorplan.style';
import Vivus from 'vivus';

import { CameraWidget } from './widgets/camera';
import { BagWidget } from './widgets/bag-sensor';
import { FireWidget } from './widgets/fire-sensor';
import { PersonWidget } from './widgets/person-sensor';

interface Widget {
  id: number;
  title: string;
  Widget: any;
  position: { x: number; y: number };
}

const Floorplan = () => {
  const classes = useStyle();

  const [ widgets, setWidgets ] = useState<Widget[]>([]);
  const [ selectedWidget, setSelectedWidget ] = useState<Widget>();
  const [ addedWidget, setAddedWidget ] = useState<Widget[]>([]);

  const mapBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    new Vivus('my-svg', { duration: 100, start: 'autostart' });

    const position = { x: 0, y: 0 };
    setWidgets([
      { id: 1, title: 'Camera', Widget: CameraWidget, position },
      { id: 2, title: 'Fire Sensor', Widget: FireWidget, position },
      { id: 3, title: 'Person Sensor', Widget: PersonWidget, position },
      { id: 4, title: 'Bag Sensor', Widget: BagWidget, position },
    ]);
  }, []);

  useEffect(() => {
    if (!mapBox || !selectedWidget) return;

    const clickEvent = (ev: MouseEvent) => {
      const width = mapBox.current.clientWidth;
      const height = mapBox.current.clientHeight;
      setAddedWidget((pre) => [
        ...pre,
        {
          ...selectedWidget,
          position: {
            x: (ev.offsetX * 100) / width,
            y: (ev.offsetY * 100) / height,
          },
        },
      ]);
    };
    mapBox.current.addEventListener('click', clickEvent);

    return () => {
      mapBox.current.removeEventListener('click', clickEvent);
    };
  }, [ mapBox, selectedWidget ]);

  const RenderWidget: React.FC<{ widget: Widget }> = ({
    widget: { Widget, position },
  }) => {
    return (
      <Box
        style={{
          position: 'absolute',
          fontSize: 'calc(1vw + 50%)',
          left: `calc(${position.x}% - 0.25em)`,
          top: `calc(${position.y}% - 0.25em)`,
        }}>
        <Widget/>
      </Box>
    );
  };

  return (
    <Grid container spacing={2} alignItems='stretch'>
      <Grid item xs={12} lg={12}>
        <Typography variant='h1'>Overview</Typography>
      </Grid>
      <Grid item xs={12} lg={2}>
        <Box className={classes.widgets}>
          {widgets.map((widget, index) => (
            <List key={index}>
              <ListItem
                component={Button}
                onClick={() => setSelectedWidget(widget)}
                className={selectedWidget?.id === widget.id ? 'active' : ''}>
                <ListItemText>{widget.title}</ListItemText>
              </ListItem>
            </List>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} lg={4}>
        <div
          className={clsx(classes.floorplanViewer, {
            [classes.cursor]: !!selectedWidget,
          })}
          ref={mapBox}>
          {!!addedWidget.length &&
            addedWidget.map((widget, index) => (
              <RenderWidget key={index} widget={widget} />
            ))}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            id='my-svg'
            viewBox='0 0 804.855 857.418'>
            <g id='Floorplan' transform='translate(-389.746 -19.096)'>
              <path
                id='Path_5149'
                data-name='Path 5149'
                d='M1431.466,2582.652H1800v27.155l34.914,41.7h81.466v144.5H1431.466V2582.652l-57.22-58.19V2287.824h243.427V2320.8h95.043'
                transform='translate(-982 -1920)'
                fill='none'
                stroke='#43425d'
                strokeWidth='5'
              />
              <path
                id='Path_5148'
                data-name='Path 5148'
                d='M1617.673,2320.8h95.043v-84.375H1851.4V1941.6H2142.35v385.8H2176.1v160.119H2142.35v261.952H1915.257'
                transform='translate(-982 -1920)'
                fill='none'
                stroke='#43425d'
                strokeWidth='5'
              />
              <path
                id='Path_5129'
                data-name='Path 5129'
                d='M2142.277,2236.3H1955.992V2337.39h36.2V2236.3'
                transform='translate(-982 -1920)'
                fill='none'
                stroke='#43425d'
                strokeWidth='5'
              />
              <path
                id='Path_5130'
                data-name='Path 5130'
                d='M1876.092,2446.866v48.116H1891.1l15.892-19.865v-80.341h-30.9v9.065'
                transform='translate(-982 -1920)'
                fill='none'
                stroke='#43425d'
                strokeWidth='5'
              />
              <path
                id='Path_5131'
                data-name='Path 5131'
                d='M1504.625,2287.308v59.041'
                transform='translate(-982 -1920)'
                fill='none'
                stroke='#43425d'
                strokeWidth='5'
              />
              <path
                id='Path_5132'
                data-name='Path 5132'
                d='M1617.143,2287.308v77.125h-46.677v29.521'
                transform='translate(-982 -1920)'
                fill='none'
                stroke='#43425d'
                strokeWidth='5'
              />
              <path
                id='Path_5133'
                data-name='Path 5133'
                d='M1586.85,2287.308v77.125h-16.383v29.521h43.74'
                transform='translate(-951.707 -1920)'
                fill='none'
                stroke='#43425d'
                strokeWidth='5'
              />
              <path
                id='Path_5134'
                data-name='Path 5134'
                d='M1712.712,2290.494v104.481h-25.076'
                transform='translate(-982 -1920)'
                fill='none'
                stroke='#43425d'
                strokeWidth='5'
              />
              <path
                id='Path_5135'
                data-name='Path 5135'
                d='M1712.712,2290.494v104.481h43.36V2365.2'
                transform='translate(-982 -1920)'
                fill='none'
                stroke='#43425d'
                strokeWidth='5'
              />
              <path
                id='Path_5136'
                data-name='Path 5136'
                d='M1712.712,2290.494v74.7h127.467l7.314-9.142'
                transform='translate(-982 -1920)'
                fill='none'
                stroke='#43425d'
                strokeWidth='5'
              />
              <path
                id='Path_5137'
                data-name='Path 5137'
                d='M1891.916,2247.555V2235.7h-21.1v86.2h21.1v-13.261'
                transform='translate(-982 -1919.3)'
                fill='none'
                stroke='#43425d'
                strokeWidth='5'
              />
              <path
                id='Path_5138'
                data-name='Path 5138'
                d='M1866.6,2328.126l4.219-6.229v-86.2h-19.691'
                transform='translate(-982 -1919.3)'
                fill='none'
                stroke='#43425d'
                strokeWidth='5'
              />
              <path
                id='Path_5139'
                data-name='Path 5139'
                d='M2176.1,2487.286H1951.975'
                transform='translate(-982 -1920)'
                fill='none'
                stroke='#43425d'
                strokeWidth='5'
              />
              <path
                id='Path_5140'
                data-name='Path 5140'
                d='M2176.1,2487.286H2061.84V2389.18H1956.574v50.256h60.443'
                transform='translate(-982 -1920)'
                fill='none'
                stroke='#43425d'
                strokeWidth='5'
              />
              <path
                id='Path_5141'
                data-name='Path 5141'
                d='M2077.8,2389.18H2061.84v98.105H2176.1V2389.18h-68.76'
                transform='translate(-982 -1920)'
                fill='none'
                stroke='#43425d'
                strokeWidth='5'
              />
              <path
                id='Path_5144'
                data-name='Path 5144'
                d='M830.433,546.041H627.949V590.21H830.433Z'
                fill='none'
                stroke='#43425d'
                strokeLinecap='square'
                strokeWidth='5'
                strokeDasharray='8 7'
              />
              <path
                id='Path_5146'
                data-name='Path 5146'
                d='M547.812,311.642h-20.33v15.639h20.33v-18.14'
                transform='translate(83)'
                fill='none'
                stroke='#43425d'
                strokeWidth='5'
              />
              <path
                id='Path_5147'
                data-name='Path 5147'
                d='M547.812,311.642h-20.33v15.639h20.33v-18.14'
                fill='none'
                stroke='#43425d'
                strokeWidth='5'
              />
            </g>
          </svg>
        </div>
      </Grid>
    </Grid>
  );
};

export default Floorplan;
