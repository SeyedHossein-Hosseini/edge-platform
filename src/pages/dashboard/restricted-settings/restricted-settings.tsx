import { Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CanvasDrawer } from 'src/components/static/canvas-drawer';
import { GetCameraFrame } from 'src/components/static/get-camera-frame';


const RestrictedSettings = () => {
  const { t } = useTranslation();
  const [ rtspLink, setRtspLink ] = useState<string>('');

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <Typography variant="h1">{t('restricted.configTitle')}</Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
        <GetCameraFrame onSetCameraLink={(link) => setRtspLink(link)} />
        {rtspLink && <CanvasDrawer key={rtspLink} rtspLink={rtspLink} />}
      </Grid>
    </Grid>
  );
};

export default RestrictedSettings;
