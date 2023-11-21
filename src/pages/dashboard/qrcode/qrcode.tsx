import { Grid } from '@material-ui/core';
import React from 'react';
import { QrCodeScanner } from 'src/components/static/qr-code-scanner/qr-code-scanner';
import { Webcam } from 'src/components/static/webcam';

const Qrcode = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <QrCodeScanner />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Webcam isFaceDetectionEnabled={false} />
      </Grid>
    </Grid>
  );
};

export default Qrcode;
