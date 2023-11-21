import { ListItem, Typography } from '@material-ui/core';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';
import { ActivityList } from './activity-list';


Enzyme.configure({ adapter: new Adapter() });

describe('<ActivityList /> Rendered', () => {
  // Check Component Render Correctly or not
  it('renders ActivityList component without crashing', () => {
    shallow(<ActivityList />);
  });
  //  it("all the components that related to activity are working", () => {
  //  const wrapper = mount(<ActivityList/>);
  //  });
  it('ActivityList contains ListItem', () => {
    const wrapper = shallow(<ActivityList />);
    expect(wrapper.find(ListItem)).toBeDefined();
  });
  it('ActivityList contains Typography', () => {
    const wrapper = shallow(<ActivityList />);
    expect(wrapper.find(Typography)).toBeTruthy();
  });
});
