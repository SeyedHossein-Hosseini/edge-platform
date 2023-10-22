import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IllustrationViewerProps } from './illustration-viewer.props';
import { useStyle } from './illustration-viewer.style';


const IllustrationViewer: React.FC<IllustrationViewerProps> = ({
  isLoading = false,
  illustration,
  title,
  content,
  hasGradient = true,
}) => {
  const classes = useStyle();
  const { t } = useTranslation();

  return (
    <Box className={clsx([ classes.noLog, { [classes.noBg]: !hasGradient }])}>
      {illustration && <img className={classes.noLogImage} src={'/illustrations/' + illustration} alt='No Data To Show!' />}
      {isLoading &&
        <div className={classes.loadingWrapper}>
          <span className={classes.loadingNode} />
          <span className={classes.loadingNode} />
        </div>
      }
      {title && <Typography className={classes.noLogTexts} component='p' variant='h2'>{t(title)}</Typography>}
      {content && <Typography className={classes.noLogTexts} component='p' variant='h5'>{t(content)}</Typography>}
    </Box>
  );
};

export { IllustrationViewer };
