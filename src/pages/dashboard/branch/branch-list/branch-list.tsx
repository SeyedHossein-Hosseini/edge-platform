import { Grid } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BranchCard } from 'src/components/static/branch-card/branch-card';
import { mapsDummyData } from 'src/components/widgets/map/maps-dummy.seed';
import { useStyle } from './branch-list.style';

const BranchList = () => {
  const classes = useStyle();
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      {mapsDummyData.map((branchData, index) => (
        <Grid item xs={12} md={6} lg={4} key={index}>
          <BranchCard branchData={branchData} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BranchList;
