import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { BoardTable } from './board-table';

Enzyme.configure({ adapter: new Adapter() });

describe('Test Board Table', () => {
  it('Render Board Table ', () => {
    shallow(<BoardTable />);
  });
});
