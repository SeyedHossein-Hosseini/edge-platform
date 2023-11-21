import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';
import { SingleBarChart } from '../single-bar-chart/single-bar-chart';


Enzyme.configure({ adapter: new Adapter() });

describe('test SingleBarChart', () => {
  it('Render SingleBarChart', () => {
    shallow(
        <SingleBarChart
          categories={['test1']}
          series={{ name: 'test1', data: [ 1, 2, 3 ] }}
        />
    );
  });
});
