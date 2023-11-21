import { Box, ListItem, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CardWidget } from 'src/components/share/card-widget';
import { CardWidgetProps } from 'src/components/share/card-widget/card-widget.props';
import { DatePipe } from 'src/pipes/date/date.pipe';
import { activityDummySeed } from './activity-dummy.seed';
import { useStyle } from './activity-list.style';


interface ActivityListProps extends CardWidgetProps { }

const ActivityList: React.FC<ActivityListProps> = ({
  title,
  setTitle,
  setFullHeight,
}) => {
  const [ usersData, setUsersData ] = useState(activityDummySeed);
  const datePipe = new DatePipe();
  const classes = useStyle();

  // Time formatter
  const timeFormatter = (timeStamp: number, value: string) => {
    // convert timestamp to iso string
    const timeToString = new Date(timeStamp).toISOString().toString();
    if (value === 'time') {
      const fromNow = datePipe.timeAgo(timeToString);
      return fromNow;
    } else if (value === 'date') {
      const date = datePipe.dateConvertor(timeToString, 'D MMM');
      return date;
    }
  };

  // render our data
  const renderData = () => {
    // sort the data by date
    const sortedData = usersData.sort((a, b) =>
      a.date.toString().localeCompare(b.date.toString())
    );
    return sortedData.map((user, i) => (
      <Box key={`id_id ${i}`} className={classes.container}>
        <ListItem button className={classes.listItemClass}>
          <Box className={classes.logBox}>
            <Box className={classes.useBranchBox}>
              <Box component="span" className={classes.branchName}>
                {user.branch}
              </Box>
              <Box component="span">{user.user}</Box>
            </Box>
            <Typography component="p" className={classes.activityTitle}>
              <strong>{user.description}</strong>
            </Typography>
          </Box>
          <Box className={classes.activityTimeBox}>
            <Box component="span">{timeFormatter(user.date, 'time')}</Box>
            <Box component="span">{timeFormatter(user.date, 'date')}</Box>
          </Box>
        </ListItem>
      </Box>
    ));
  };

  useEffect(() => {
    setTitle(!title ? 'Latest Activities' : title);
    setFullHeight(true);
  }, []);

  return <Box width="100%">{renderData()}</Box>;
};

const Wrapper = CardWidget<ActivityListProps>(ActivityList, {
  breakPoints: {
    lg: {
      x: 6,
      y: 0,
      w: 18,
      h: 10,
      minW: 12,
      minH: 10,
    },
    md: {
      x: 6,
      y: 0,
      w: 12,
      h: 10,
      minW: 1,
      minH: 5,
    },
    sm: {
      x: 6,
      y: 0,
      w: 4,
      h: 10,
      minW: 4,
      minH: 5,
    },
    xs: {
      x: 6,
      y: 0,
      w: 12,
      h: 10,
      minW: 1,
      minH: 5,
    },
    xxs: {
      x: 6,
      y: 0,
      w: 12,
      h: 10,
      minW: 1,
      minH: 5,
    },
  },
});

export { Wrapper as ActivityList };
