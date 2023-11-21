import { Box, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { LocationOn } from '@material-ui/icons';
import React, { useState } from 'react';
import { MapInterface } from 'src/interfaces/map.interface';
import { useStyle } from './map-search-options.style';

export interface MapOptionsProps {
  search?: MapInterface[];
  inputValueIsZero: boolean;
  selectedBranch: (e: {}) => void;
  showBranches: boolean;
  setShowBranches: (e: boolean) => void;
}

const MapSearchOptions: React.FC<MapOptionsProps> = ({
  search,
  inputValueIsZero,
  selectedBranch,
  showBranches,
  setShowBranches,
}) => {
  const [ hoveredItem, setHoveredItem ] = useState(null);

  // handler for closing the list on click
  const selectedBranchesHandler = (item: MapInterface[]) => {
    selectedBranch(item);
    setShowBranches(!showBranches);
  };
  // show icon handlers
  const showIconHandler = (item: any) => {
    const newData = { ...item };
    newData.isIconShowing = true;
    setHoveredItem(newData);
  };
  const dontShowIconHandler = (item: any) => {
    const newData = { ...item };
    newData.isIconShowing = false;
    setHoveredItem(newData);
  };
  const classes = useStyle();

  const searchOptions = () => {
    if (search?.length > 0 && inputValueIsZero) {
      return search.map((item: any, i) => (
        <ListItem key={item.id} className={classes.listItem}>
          <ListItemText
            onMouseEnter={() => showIconHandler(item)}
            onMouseLeave={() => dontShowIconHandler(item)}
            className={classes.listItemText}
          >
            <Box component="span" className={classes.box}>
              {i + 1}.{' '}
            </Box>
            {item.branchName}
          </ListItemText>
          <ListItemIcon
            className={
              hoveredItem?.isIconShowing && hoveredItem.id === item.id ?
                classes.listIcon :
                `${classes.dontShowListIcon} ${classes.listIcon}`
            }
            onClick={() => selectedBranchesHandler(item)}
            onMouseEnter={() => showIconHandler(item)}
            onMouseLeave={() => dontShowIconHandler(item)}
          >
            <LocationOn fontSize={'small'} />
          </ListItemIcon>
        </ListItem>
      ));
    } else if (search?.length === 0 && inputValueIsZero) {
      return <p>there is nothing to show</p>;
    }
  };

  return <>{searchOptions()}</>;
};

export { MapSearchOptions };
