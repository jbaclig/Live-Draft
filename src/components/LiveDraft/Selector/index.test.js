import React from 'react';
import { shallow } from 'enzyme';
import Selector from './';

describe('Selector tests', () => {
  it('renders without crashing', () => {
    shallow(<Selector />);
  });

  it('renders a button to select draft board', () => {
    let wrapper = shallow(<Selector />);
    expect(wrapper.exists('#draftBoardBtn')).toEqual(true);
  });

  it('renders a button to select team', () => {
    let wrapper = shallow(<Selector />);
    expect(wrapper.exists('#teamBtn')).toEqual(true);
  });
});