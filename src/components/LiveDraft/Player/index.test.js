import React from 'react';
import { shallow } from 'enzyme';
import Player from './';

describe('Player tests', () => {
  let player = {
    name: 'LeBron James',
    team: 'LAL', 
    position: 'SF, PF',
    ownerId: null,
  };

  it('renders without crashing', () => {
    shallow(<Player player={player} />);
  });

  it('renders player name', () => {
    let wrapper = shallow(<Player player={player} />);
    expect(wrapper.find('.player-name')).toHaveLength(1);
    expect(wrapper.find('.player-name').text()).toEqual('LeBron James');
  });

  it('renders player team', () => {
    let wrapper = shallow(<Player player={player} />);
    expect(wrapper.find('.player-team')).toHaveLength(1);
    expect(wrapper.find('.player-team').text()).toEqual('LAL');
  });

  it('renders player position', () => {
    let wrapper = shallow(<Player player={player} />);
    expect(wrapper.find('.player-position')).toHaveLength(1);
    expect(wrapper.find('.player-position').text()).toEqual('SF, PF');
  });
});