import { Box, TextField } from '@material-ui/core';
import { ArrowBackIos, Close } from '@material-ui/icons';
import clsx from 'clsx';
import L from 'leaflet';
import 'leaflet.markercluster';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { CardWidget } from 'src/components/share/card-widget';
import { CardWidgetProps } from 'src/components/share/card-widget/card-widget.props';
import { MapBranchesList } from 'src/components/static/map-branches-list/map-branches-list';
import { useStyle } from './map.style';
import './map.style.scss';
import { mapsDummyData } from './maps-dummy.seed';
import closeBtn from '/public/close.png';
import svg from '/public/mono-sprite.svg';
import mapPin from '/public/pin.png';

export interface MapProps extends CardWidgetProps { }

const Map: React.FC<{ height: number }> = ({ height }) => {
  const [datas] = React.useState(mapsDummyData);
  const classes = useStyle();
  const { t } = useTranslation();
  let map: L.Map;

  useEffect(() => {
    // add our map to the dom
    map = L.map('map', {
      center: [ 50.08573496210015, 8.586783488654886 ],
      scrollWheelZoom: false,
      zoom: 6,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // adding only Ctrl + wheel zooming
    const myMap = document.querySelector('#map');
    const mapWrapper = document.querySelector('.map-wrapper');
    const branchesList = document.querySelector('.makeStyles-branches-59');

    // map overlay function handler
    const mapOverlayOptions = (event: WheelEvent) => {
      event.stopPropagation();
      if (event.ctrlKey == true) {
        event.preventDefault();
        map.scrollWheelZoom.enable();
        mapWrapper.classList.remove('show-overlay');
      } else {
        map.scrollWheelZoom.disable();
        mapWrapper.classList.add('show-overlay');
        setTimeout(() => {
          mapWrapper.classList.remove('show-overlay');
        }, 2000);
      }
    };

    // map overlay logics
    mapWrapper.addEventListener('wheel', mapOverlayOptions);
    myMap.addEventListener('wheel', mapOverlayOptions);
    mapWrapper.addEventListener('touchstart', () => {
      if (mapWrapper.classList.contains('show-overlay')) {
        mapWrapper.classList.remove('show-overlay');
      }
    });

    // map branches on mouse over deleting the overlay class
    branchesList &&
      branchesList.addEventListener('mouseover', () => {
        mapWrapper.classList.remove('show-overlay');
        mapWrapper.addEventListener('wheel', () => {
          if (mapWrapper.classList.contains('show-overlay')) {
            mapWrapper.classList.remove('show-overlay');
          }
        });
      });

    map.on('zoomend', () => {
      const currentZoom = map.getZoom();
    });

    // marker cluster custom icons
    const createClusterCustomIcon = (cluster: any) => {
      const markers = cluster.getAllChildMarkers();
      let markerColor = 'rgb(255,216,77)';
      if (markers.length > 5 && markers.length < 10) {
        markerColor = 'rgb(255,175,77)';
      } else if (markers.length >= 10 && markers.length < 15) {
        markerColor = 'rgb(255,104,77)';
      } else if (markers.length >= 15) {
        markerColor = 'rgb(255,52,52)';
      }
      const html = `<div class="circle circle-green" style="background-color: ${markerColor};"><span>${markers.length}</span></div>`;
      return L.divIcon({
        html: html,
        className: 'mycluster',
        iconSize: L.point(32, 32),
      });
    };

    // marker custom icons
    const customIcon = L.icon({
      iconUrl: `${mapPin}`,
      iconSize: [ 32, 32 ], // size of the icon
      shadowSize: [ 0, 0 ], // size of the shadow
      iconAnchor: [ 8, 32 ], // point of the icon which will correspond to marker's location
      shadowAnchor: [ 0, 0 ], // the same for the shadow
      popupAnchor: [ -3, -30 ], // point from which the popup should open relative to the iconAnchor
    });

    // marker cluster group options
    const markers = (L as any).markerClusterGroup({
      iconCreateFunction: createClusterCustomIcon,
      showCoverageOnHover: false,
      animate: true,
    });

    // map relocated in popup open
    map.on('popupopen', function(e: any) {
      // find the pixel location on the map where the popup anchor is
      const px = map.project(e.target._popup._latlng, map.getZoom());
      // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
      px.y -= e.target._popup._container.clientHeight / 2;
      // pan to new center
      map.panTo(map.unproject(px, map.getZoom()), { animate: true });
    });

    // markers popUp
    datas.map((data) =>
      markers.addLayer(
          L.marker(data.coordinates, { icon: customIcon }).bindPopup(
              `
            <span class="close-wrapper">
              <i><img src="${closeBtn}"/></i>
            </span>
            <h2>${data.branchName}</h2>
            <div class="numbers">
            <p>
              <span><svg class="icon"><use xlink:href="${svg}#icon_cctv" width=20 height=20></use></svg></span> 
              ${data.cameraNo} <span> cameras</span>
            </p>
            <p class="service">
              <span><svg class="icon"><use xlink:href="${svg}#icon_crown" width=20 height=20></use></svg></span> 
              ${data.serviceNo} <span> services</span>
            </p>
            </div>
            <p>
              <span><svg class="icon"><use xlink:href="${svg}#icon_phone-call" width=20 height=20></use></svg></span> 
              ${data.tel}
            </p>
            <p class="location">
            <span><svg class="icon"><use xlink:href="${svg}#icon_location-pin" width=20 height=20></use></svg></span> 
            ${data.address}
            </p>
            <a class="all-branches-btn" href="#">Branch Page</a>
          `,
              {
                className: 'custom-popup',
              }
          )
      )
    );
    map.addLayer(markers);

    selectedBranch;

    // loading the map in proper way
    setTimeout(() => {
      map.invalidateSize(true);
    }, 100);
  }, []);

  /* =================================================================
                        input handler
  ==================================================================*/
  const [ searchTerm, setSearchTerm ] = React.useState('');
  const inputHandler = (e: any) => {
    setSearchTerm(e.target.value);
  };

  /* ====================================================================
                    branch selection handler
  =====================================================================*/
  const selectedBranch = React.useCallback((e) => {
    // setTimeout(() => {
    //   map.panTo(e.coordinates, map.setZoom(14), { animation: true }).popUp;
    // }, 2000);
    map.setView(e.coordinates, 14, { animate: true, duration: 2 });
    const newCoords: any = [...e.coordinates];
    if (e.coordinates[0] === newCoords[0]) {
      const coo = newCoords[0] + 0.002;
      newCoords[0] = coo;
    }
    const popUp = L.popup({ className: 'custom-popup' })
        .setLatLng(newCoords)
        .setContent(
            `
      <span class="close-wrapper">
        <i><img src="${closeBtn}"/></i>
      </span>
      <h2>${e.branchName}</h2>
      <div class="numbers">
      <p>
        <span><svg class="icon"><use xlink:href="${svg}#icon_cctv" width=20 height=20></use></svg></span> 
        ${e.cameraNo} <span> cameras</span>
      </p>
      <p class="service">
        <span><svg class="icon"><use xlink:href="${svg}#icon_crown" width=20 height=20></use></svg></span> 
        ${e.serviceNo} <span> services</span>
      </p>
      </div>
      <p>
        <span><svg class="icon"><use xlink:href="${svg}#icon_phone-call" width=20 height=20></use></svg></span> 
        ${e.tel}
      </p>
      <p class="location">
      <span><svg class="icon"><use xlink:href="${svg}#icon_location-pin" width=20 height=20></use></svg></span> 
      ${e.address}
      </p>
      <a class="all-branches-btn" href="#">${t('map.branchPage')}</a>
    `
        )
        .openOn(map);
  }, []);
  const [ showBranches, setShowBranches ] = React.useState(false);

  return (
    <div className={clsx(classes.min_content, 'map-wrapper')}>
      <Box id="map" className={classes.mapContainer} style={{ height }} />
      <Box
        className={
          showBranches ?
            classes.branches :
            `${classes.branches} ${classes.hideBranchesList}`
        }
      >
        <Box className={classes.branchesInnerBox}>
          <Close
            id="closeBtn"
            className={classes.closeBtn}
            onClick={() => setShowBranches(false)}
          />

          <TextField
            id="outlined-basic"
            variant="outlined"
            onChange={inputHandler}
            type="text"
            className={classes.mapInput}
            placeholder={t('map.searchPlaceholder')}
          />
          <PerfectScrollbar>
            <Box className={classes.searchList}>
              <MapBranchesList
                datas={datas}
                selectedBranch={selectedBranch}
                showBranches={showBranches}
                setShowBranches={setShowBranches}
                searchTerm={searchTerm}
              />
            </Box>
          </PerfectScrollbar>
        </Box>
        <Box
          className={
            showBranches ?
              `${classes.moveArrow} ${classes.arrow}` :
              classes.arrow
          }
          onClick={() => setShowBranches(!showBranches)}
        >
          <ArrowBackIos />{' '}
        </Box>
      </Box>
      <div className="map-overlay" />
    </div>
  );
};

const MapWidget: React.FC<MapProps> = ({
  height,
  title,
  setTitle,
  setFullHeight,
}) => {
  const { t } = useTranslation();
  const [ mapHeight, setMapHeight ] = useState(500);

  useEffect(() => {
    setTitle(!title ? 'map.widgetTitle' : title);
    setFullHeight(true);
  }, []);

  useEffect(() => {
    if (height) {
      setMapHeight(height - 30);
    } else {
      setMapHeight(500);
    }
  }, [height]);

  return <Map height={mapHeight} />;
};

const Wrapper = CardWidget<MapProps>(MapWidget, {
  centerContent: true,
  breakPoints: {
    lg: {
      x: 0,
      y: 10,
      w: 24,
      h: 20,
      minW: 24,
      minH: 20,
    },
    md: {
      x: 0,
      y: 0,
      w: 6,
      h: 5,
      minW: 6,
      minH: 5,
    },
    sm: {
      x: 0,
      y: 0,
      w: 3,
      h: 5,
      minW: 2,
      minH: 5,
    },
    xs: {
      x: 0,
      y: 0,
      w: 12,
      h: 5,
      minW: 1,
      minH: 5,
    },
    xxs: {
      x: 0,
      y: 0,
      w: 12,
      h: 5,
      minW: 1,
      minH: 5,
    },
  },
});

export { Wrapper as MapWidget };
