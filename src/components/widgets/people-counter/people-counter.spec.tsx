import React from 'react';
import { PeopleCounter } from './people-counter';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

describe('Component: PeopleCounter', () => {
  // Check Component Render Correctly or not
  it('Render PeopleCounter Without Crashing', () => {
    shallow(<PeopleCounter />);
  });

  // Check Content For Specific Content
  it('Render First Depth Division in View', () => {
    const wrapper = shallow(<PeopleCounter />);
    expect(wrapper.find('div')).toHaveLength(1);
  });

  // Check Content For Specific Content
  it('Render Typography Content in View', () => {
    const wrapper = mount(<PeopleCounter />);
    expect(wrapper.find('p')).toHaveLength(2);
  });
});
