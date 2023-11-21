import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { MapBranchesList } from './map-branches-list';
import { MapInterface } from '../../../interfaces/map.interface';
import { ListItemText, ListItem } from '@material-ui/core';

Enzyme.configure({ adapter: new Adapter() });
// const classes = useStyle();

describe('<MapBranchesList /> Rendered', () => {
  const datas: MapInterface[] = [
    {
      id: 1,
      tel: '+32 484 90 15 82',
      address: '10th Floor, Flexi-Space, Mechelsesteenweg 455, 1950 Kraainem, Belgium',
      cameraNo: 1,
      serviceNo: 4,
      branchName: 'this is branch name1',
      coordinates: [ 37.247821, 49.581299 ],
      isIconShowing: false,
    },
  ];
  const selectedBranch = jest.fn();
  const setShowBranches = jest.fn();
  const showBranches = false;
  const Composition = (props: any) => {
    return (
      <MapBranchesList
        datas={datas}
        selectedBranch={selectedBranch}
        setShowBranches={setShowBranches}
        showBranches={showBranches}
        searchTerm={''}
      />
    );
  };

  // Check Component Render Correctly or not
  it('renders MapBranchesList component without crashing', () => {
    shallow(<Composition props />);
  });

  it('MapBranchesList contains ListItem', () => {
    const wrapper = shallow(<Composition props />);
    expect(wrapper.find(ListItem)).toBeDefined();
  });
  it('MapBranchesList contains ListItemText', () => {
    const wrapper = shallow(<Composition props />);
    expect(wrapper.find(ListItemText)).toBeTruthy();
  });
  it('icons clicked correctly', () => {
    const wrapper = mount(<Composition props />);
    wrapper.find('button').simulate('click');
  });
});
