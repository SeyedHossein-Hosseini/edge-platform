import CardMedia from '@mui/material/CardMedia';
// import helpUserVideo from '../assets/video.mp4'
import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next'
import 'moment/locale/fa.js';
// import helpVideo from "../../../assets/helpUser.mp4"

export interface VideoHelpFormProps {
  activeStep?: any,
}

const HelpUser: React.FC<VideoHelpFormProps> = (props: VideoHelpFormProps) => {

  const { t } = useTranslation();
  const videoWatched = () => {
    props.activeStep((prevStep: number) => prevStep + 1);
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CardMedia
          component="video"
          sx={{ width: '100%', maxWidth: '600px', m: 'auto' }}
          controls
          src="file:///C:/Users/Hossein/Downloads/Telegram%20Desktop/video%20sample.mp4"
        />

        <Button onClick={videoWatched} color="primary" variant="contained" type="submit" size="large">
          {t('VideoHelper.videoWatched')}
        </Button>

      </Grid>
    </Grid>
  );
}

export default HelpUser;


