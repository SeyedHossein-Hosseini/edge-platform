import { Badge, Button, Card, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppState } from 'src/redux/store';
import { EntranceCardProps } from './entrance-card.props';
import { useStyle } from './entrance-card.style';

const EntranceCard: React.FC<EntranceCardProps> = ({
  avatarURL,
  name,
  position,
  organization,
  profileID,
  isOnline,
  isHorizontal,
  counter,
}) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const { locale } = useSelector((state: AppState) => state.AppSetting);

  return (
    <Card className={clsx(classes.userWrapper, { [classes.userIsActive]: isOnline, [classes.userIsHorizontal]: isHorizontal })}>
      <Badge
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        color='secondary'
        className={classes.userBadge}
        badgeContent={counter}
      >
        <figure className={classes.userAvatar}>
          <img src={avatarURL} alt={name + ' | ' + position} />
        </figure>
      </Badge>
      <div className={classes.userContent}>
        <Typography className={classes.userName} component="p">{name}</Typography>
        <span className={classes.userSubtitle}>{position} | {organization}</span>
        <NavLink className={classes.userProfile} to={`/${locale}/user/${profileID}`} >
          <Button variant="outlined" size="small" color="primary">{t('personnel.profileBtn')}</Button>
        </NavLink>
      </div>
    </Card>
  );
};

export { EntranceCard };
