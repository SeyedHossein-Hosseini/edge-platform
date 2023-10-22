import React from 'react';
import { useParams } from 'react-router-dom';

const BranchPage = () => {
  const { id } = useParams<{ id: string }>();

  return <h1>Branch {id} page</h1>;
};

export default BranchPage;
