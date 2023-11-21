import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import QrScanner from 'qr-scanner';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CardWidget } from 'src/components/share/card-widget';
import { SpriteIcon } from 'src/components/share/sprite-icon';
import { QrCodeScannerProps } from './qr-code-scanner.props';
import { useStyle } from './qr-code-scanner.style';


const QrCodeScanner: React.FC<QrCodeScannerProps> = ({ title, setTitle }) => {
  const classes = useStyle();
  const { t } = useTranslation();

  const videoRef = useRef(null);
  const [ qrCodeResult, setQrCodeResult ] = useState('');
  const [ isQrDetected, setIsQrDetected ] = useState(false);
  const [ isCameraSupport, setIsCameraSupport ] = useState(false);
  const [ isCameraAllowed, setIsCameraAllowed ] = useState(false);

  useEffect(() => {
    setTitle(title === '' || title === undefined ? 'qrcode.qrScannerTitle' : title);
    setIsCameraSupport(!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia));
    QrScanner.WORKER_PATH = '/qr-scanner-worker.min.js';

    return () => {
      setIsCameraAllowed(false);
      setIsCameraSupport(false);
      setQrCodeResult('');
    };
  }, []);

  useEffect(() => {
    if (videoRef.current === undefined || videoRef.current === null) return;
    let qrScanner = new QrScanner(videoRef.current,
        (result: string) => {
          setIsQrDetected(true);
          setQrCodeResult(result);
        },
        (error: string) => setIsQrDetected(false),
    );
    qrScanner.start().then((res) => {
      setIsCameraAllowed(true);
    }, (error) => {
      setIsCameraAllowed(false);
    });

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
      qrScanner = null;
    };
  }, [videoRef]);

  return (
    <Box className={clsx(classes.box, { [classes.NotifyBox]: (!isCameraSupport || !isCameraAllowed) })} >
      {!isCameraSupport && (
        <div className={classes.overlayNotify}>
          <SpriteIcon type="color" iconName="webcam" width={128} height={128} />
          <Typography component="p" className={classes.notify}>{t('qrcode.noWebcam')}</Typography>
        </div>
      )}
      {isCameraSupport && !isCameraAllowed && (
        <div className={classes.overlayNotify}>
          <SpriteIcon type="color" iconName="webcam" width={128} height={128} />
          <Typography component="p" className={classes.notify}>{t('qrcode.permission')}</Typography>
        </div>
      )}
      <div className={classes.VideoWrapper}>
        <video width="100%" autoPlay ref={videoRef} />
        <span className={clsx(classes.borderCorner, { [classes.borderCornerSuccess]: isQrDetected })} />
      </div>
      {qrCodeResult !== '' && <Typography component="p" className={classes.qrResult}>{qrCodeResult}</Typography>}
    </Box>
  );
};

const Wrapper = CardWidget<QrCodeScannerProps>(QrCodeScanner);
export { Wrapper as QrCodeScanner };
