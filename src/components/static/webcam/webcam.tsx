import { Box, Fab, Typography } from '@material-ui/core';
import { CameraAlt } from '@material-ui/icons';
import clsx from 'clsx';
import * as faceapi from 'face-api.js';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ResizeObserver from 'resize-observer-polyfill';
import { CardWidget } from 'src/components/share/card-widget';
import { SpriteIcon } from 'src/components/share/sprite-icon';
import { WebcamProps } from './webcam.props';
import { useStyle } from './webcam.style';

const Webcam: React.FC<WebcamProps> = ({
  title,
  setTitle,
  isFaceDetectionEnabled = true,
}) => {
  const classes = useStyle();
  const { t } = useTranslation();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const faceDrawerRef = useRef(null);

  const [ context, setContext ] = useState(null);
  const [ stream, setStream ] = useState(null);
  const [ isCameraSupport, setIsCameraSupport ] = useState(true);
  const [ isCameraAllowed, setIsCameraAllowed ] = useState(false);
  const [ capturedImage, setCapturedImage ] = useState([]);
  const [ videoWrapperSize, setVideoWrapperSize ] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setTitle(title === '' || title === undefined ? 'camera.cameraTitle' : title);
    setIsCameraSupport(
        !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    );
  }, []);

  useEffect(() => {
    if (isCameraSupport) {
      if (isFaceDetectionEnabled) {
        Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        ]).then(() => {
          playWebcamStream();
        });
      } else {
        playWebcamStream();
      }
    }
  }, [isCameraSupport]);

  useEffect(() => {
    if (videoRef.current === undefined || videoRef.current === null) return;
    if (stream === undefined || stream === null) return;
    videoRef.current.srcObject = stream;
    videoRef.current.play();

    return () => {
      stopStream();
      setIsCameraAllowed(false);
    };
  }, [ stream, videoRef ]);

  useEffect(() => {
    if (!isFaceDetectionEnabled) return;
    if (faceDrawerRef.current === undefined || faceDrawerRef.current === null) {
      return;
    }
    if (stream === undefined || stream === null) return;

    videoRef.current.addEventListener('playing', () => {
      faceapi.matchDimensions(faceDrawerRef.current, {
        width: faceDrawerRef.current.width,
        height: faceDrawerRef.current.height,
      });
      const faceDrawerInterval = setInterval(async () => {
        const detections = await faceapi.detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
        );
        const resizedDetections = faceapi.resizeResults(detections, {
          width: faceDrawerRef.current.width,
          height: faceDrawerRef.current.height,
        });
        faceDrawerRef.current
            .getContext('2d')
            .clearRect(
                0,
                0,
                faceDrawerRef.current.width,
                faceDrawerRef.current.height
            );
        faceapi.draw.drawDetections(faceDrawerRef.current, resizedDetections);
      }, 200);

      return () => {
        clearInterval(faceDrawerInterval);
      };
    });
  }, [ stream, faceDrawerRef ]);

  /** Detect Size Change For Video Player  **/
  const videoResizeCalculator = new ResizeObserver(function(entries: ResizeObserverEntry[]) {
    setVideoWrapperSize({
      width: entries[0].contentRect.width,
      height: entries[0].contentRect.height,
    });
  });

  /** Play Webcam Inside Browser **/
  const playWebcamStream = () => {
    navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: true,
        })
        .then(
            (stream: MediaStream) => {
              setIsCameraAllowed(true);
              setStream(stream);
              videoResizeCalculator.observe(videoRef.current);
              setContext(canvasRef.current.getContext('2d'));
            },
            (error) => {
              console.error(error);
              setIsCameraAllowed(false);
            }
        );
  };

  /** Frame Capture From Camera **/
  const webcamCapture = () => {
    if (context === undefined || context === null) return;
    context.drawImage(
        videoRef.current,
        0,
        0,
        videoWrapperSize.width,
        videoWrapperSize.height
    );
    setCapturedImage([
      ...capturedImage,
      canvasRef.current.toDataURL('image/png'),
    ]);
  };

  /** Stop Playing Stream **/
  const stopStream = () => {
    if (stream === undefined || stream === null) return;
    stream.getTracks().forEach(function(track: MediaStreamTrack) {
      track.stop();
    });
  };

  return (
    <Box
      className={clsx(classes.box, {
        [classes.NotifyBox]: !isCameraSupport || !isCameraAllowed,
      })}
    >
      {!isCameraSupport && (
        <>
          <SpriteIcon type="color" iconName="webcam" width={128} height={128} />
          <Typography component="p" className={classes.notify}>{t('camera.noWebcam')}</Typography>
        </>
      )}
      {isCameraSupport && !isCameraAllowed && (
        <>
          <SpriteIcon type="color" iconName="webcam" width={128} height={128} />
          <Typography component="p" className={classes.notify}>{t('camera.permission')}</Typography>
        </>
      )}
      {isCameraSupport && isCameraAllowed && (
        <>
          <div className={classes.VideoWrapper}>
            <video width="100%" autoPlay ref={videoRef} />
            <canvas
              className={classes.faceDrawer}
              width={videoWrapperSize.width}
              height={videoWrapperSize.height}
              ref={faceDrawerRef}
            />
            <canvas
              className={classes.canvas}
              width={videoWrapperSize.width}
              height={videoWrapperSize.height}
              ref={canvasRef}
            />
            <Fab
              className={classes.capture}
              color="primary"
              aria-label="edit"
              onClick={webcamCapture}
            >
              <CameraAlt />
            </Fab>
          </div>
          <ul className={classes.images}>
            {capturedImage.length > 0 &&
              capturedImage.map((image, index) => (
                <li className={classes.imagesItem} key={index}>
                  <img src={image} alt={'Capture ' + index} />
                </li>
              ))}
          </ul>
        </>
      )}
    </Box>
  );
};

const Wrapper = CardWidget<WebcamProps>(Webcam);
export { Wrapper as Webcam };
