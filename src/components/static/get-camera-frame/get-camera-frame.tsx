import React, { useState } from 'react';
import { Paper, Button, Grid, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import { useStyle } from './get-camera-frame.style';
import { useEffect } from 'react';
import { getRestrictedCamerasList } from 'src/services/api/service-config.api';
import { useTranslation } from 'react-i18next';
import { exportIpAddress } from 'src/helpers/strings/strings';

interface Props {
  onSetCameraLink: (text: string) => void;
}

const GetCameraFrame: React.FC<Props> = ({ onSetCameraLink }) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const [ rtspLink, setRtspLink ] = useState('');
  const [ cameraList, setCameraList ] = useState([]);


  useEffect(() => {
    getRestrictedCamerasList().subscribe( {
      next: (res: any) => {
        setCameraList( res );
      },
    });
  }, []);


  const SubmitRtspLink = () => {
    onSetCameraLink(rtspLink);
  };

  return (
    <Paper elevation={0} className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="selected_event">{ t('getFrame.choose') }</InputLabel>
            <Select
              fullWidth
              labelId="selected_event"
              multiple={false}
              value={rtspLink}
              label={ t('getFrame.choose') }
              onChange={(event: any, newValue: string | null) => setRtspLink(event.target.value) }
            >
              {cameraList.map((camera: any, index: number) => (
                <MenuItem value={camera['id']} key={index}>{ `${camera['id']} (${exportIpAddress( camera['uri'] )})` }</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            className={classes.button}
            onClick={SubmitRtspLink}
          >
            { t('getFrame.submitBtn') }
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export { GetCameraFrame };
