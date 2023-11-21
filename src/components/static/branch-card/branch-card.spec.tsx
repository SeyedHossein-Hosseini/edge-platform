import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { BranchProps } from '../../../interfaces/branch.interface';
import { BranchCard } from './branch-card';

Enzyme.configure({ adapter: new Adapter() });

const testData: BranchProps = {
  address: 'test address',
  branchName: 'test branch Name',
  cameraNo: 10,
  coordinates: [ 1, 1 ],
  fax: '+1 111 111 11',
  id: 1,
  serviceNo: 5,
  services: [ 'FB', 'FD', 'PC' ],
  superVisors: [{ avatar: 'https://test.test', name: 'test' }],
  tel: '+1 111 111 11',
  isIconShowing: true,
};

describe('<BranchCard />', () => {
  it('rebder branch card', () => {
    shallow(<BranchCard branchData={testData} />);
  });
});
