import React from 'react';

import { Box } from '@material-ui/core';
import Slider, { Settings } from 'react-slick';

import { useStyle } from './carousel.style';

interface IProps {
  settings?: Settings;
}

const Carousel: React.FC<IProps> = ({ children, settings: userSettings }) => {
  const classes = useStyle();

  const setting: Settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box className={classes.slider}>
      <Slider {...(userSettings || setting)}>{children}</Slider>
    </Box>
  );
};

export { Carousel };
