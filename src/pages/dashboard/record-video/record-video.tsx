import { useState, useRef, useEffect } from "react";
import { CardMedia } from '@mui/material';
import { Typography, Box, Button, Tooltip, IconButton } from "@material-ui/core";
import face from '../../../assets/FaceRange_.png'
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import { useStyle } from "./record-video.style"
import React from "react";
import { useTranslation } from 'react-i18next'
import 'moment/locale/fa.js'


const mimeType = 'video/webm; codecs="opus,vp8"';

const VideoRecorder = (props: any) => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef<any>(null);
  const liveVideoFeed = useRef<any>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState<any>(null);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [videoChunks, setVideoChunks] = useState([]);


  const { t } = useTranslation()
  const classes = useStyle();

  useEffect(() => {
    getCameraPermission()
  }, [])

  const getCameraPermission = async () => {
    console.log("Permission");
    setRecordedVideo(null);
    //get video and audio permissions and then stream the result media stream to the videoSrc variable
    if ("MediaRecorder" in window) {
      try {
        const videoConstraints = {
          audio: false,
          video: true,
        };

        const videoStream = await navigator.mediaDevices.getUserMedia(
          videoConstraints
        );

        setPermission(true);


        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
        ]);

        setStream(combinedStream);

        //set videostream to live feed player
        liveVideoFeed.current.srcObject = videoStream;
      } catch (err) {
        console.log(`Can not access to your camera`);
        // getCameraPermission();
        return;
      }
    } else {
      console.log(`The MediaRecorder API is not supported in your browser.`);
      return;
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");

    const media = new MediaRecorder(stream, { mimeType });

    mediaRecorder.current = media;

    mediaRecorder.current.start();

    let localVideoChunks: any = [];

    mediaRecorder.current.ondataavailable = (event: any) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localVideoChunks.push(event.data);
    };

    setVideoChunks(localVideoChunks);
  };

  const blobToBase64 = (blob: Blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const stopRecording = () => {
    setPermission(false);
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = async () => {
      const videoBlob = new Blob(videoChunks, { type: mimeType });
      const videoUrl: any = URL.createObjectURL(videoBlob);
      const base65 = await blobToBase64(videoBlob);
      console.log(base65);

      setRecordedVideo(videoUrl);

      setVideoChunks([]);
    };
  };

  const goNextPage = () => {
    props.activeStep((prevStep: number) => prevStep + 1);
  }


  return (
    <>
      <CardMedia>
        <div className="video-player">
          {!recordedVideo ? (
            <Box sx={{}}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={face} style={{ position: "absolute", opacity: '0.7', height: "400px" }} />
              </div>
              <CardMedia
                component='video'
                className="live-player"
                ref={liveVideoFeed}
                src={face}
                // image={face}
                autoPlay
                sx={{ height: "400px", width: "100%" }} />

            </Box>
            // <video ref={liveVideoFeed} autoPlay className="live-player"></video>
          ) : null}
          {recordedVideo ? (
            <Box className="recorded-player" sx={{ }}>
              {/* when video is recorded */}
              <CardMedia
                component='video'
                image={recordedVideo}
                src={recordedVideo}
                width='300px'
                autoPlay
                controls
                sx={{ height: "400px", width: "100%" }}
              />
              <Button onClick={goNextPage} variant="contained">{t('VideoRecorder.confirmVideo')}</Button>
            </Box>
          ) : null}
        </div>
      </CardMedia>

      <section>
        <div className="video-controls">
          {!permission ? (
            <Box className={classes.videoButtonsBox}>
              <Tooltip title={t('VideoRecorder.getCamera')} placement="top">
                <Button onClick={getCameraPermission} variant="outlined">
                  <VideocamRoundedIcon sx={{ color: 'red', fontSize: '30px' }} />
                </Button>
              </Tooltip>
            </Box>
          ) : null}
          {permission && recordingStatus === "inactive" ? (
            <Box className={classes.videoButtonsBox}>
              <Tooltip title={t('VideoRecorder.recordVideo')} placement="top">
                <Button onClick={startRecording} variant="outlined">
                  <RadioButtonCheckedRoundedIcon sx={{ color: 'red', fontSize: '30px' }} />
                </Button>
              </Tooltip>
            </Box>

          ) : null}
          {recordingStatus === "recording" ? (
            <Box className={classes.videoButtonsBox}>
              <Tooltip title={t('VideoRecorder.stopVideo')} placement="top">
                <Button onClick={stopRecording} variant="outlined">
                  <StopCircleRoundedIcon sx={{ color: 'red', fontSize: '30px' }} />
                </Button>
              </Tooltip>
            </Box>
          ) : null}
        </div>
      </section >

    </>
  );
};

export default VideoRecorder;