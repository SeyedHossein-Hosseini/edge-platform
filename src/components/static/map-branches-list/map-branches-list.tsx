import React from 'react';
import { ListItem, ListItemText, Box, IconButton } from '@material-ui/core';
import { LocationOn } from '@material-ui/icons';
import { MapInterface } from 'src/interfaces/map.interface';
import { useStyle } from './map-branches-list.style';

export interface MapBranchesListProps {
  datas: MapInterface[];
  selectedBranch: (e: {}) => void;
  showBranches: boolean;
  setShowBranches: (e: boolean) => void;
  searchTerm: string;
}

const MapBranchesList: React.FC<MapBranchesListProps> = ({
  datas,
  selectedBranch,
  showBranches,
  setShowBranches,
  searchTerm,
}) => {
  const results = !searchTerm ?
    datas :
    datas.filter((data) =>
      data.branchName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  // handler for closing the list on click
  const selectedBranchesHandler = (data: any) => {
    selectedBranch(data);
    setShowBranches(!showBranches);
  };

  const classes = useStyle();

  return (
    <>
      {results.map((data, i) => (
        <ListItem key={'key_' + i} className={classes.listItem}>
          <ListItemText className={classes.listItemText}>
            <Box component="span" className={classes.box}>
              {i + 1}.{' '}
            </Box>
            {data.branchName}
          </ListItemText>
          <IconButton
            className="pin-button"
            size="small"
            onClick={() => selectedBranchesHandler(data)}
          >
            <LocationOn />
          </IconButton>
        </ListItem>
      ))}
    </>
  );
};

export { MapBranchesList };
