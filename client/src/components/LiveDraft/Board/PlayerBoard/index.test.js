import React from 'react';
import { shallow } from 'enzyme';
import PlayerBoard from './';
import Player from '../../Player';

describe('PlayerBoard tests', () => {
  it('renders without crashing', () => {
    shallow(<PlayerBoard />);
  });

  let players = {
    101: {
      name: 'James Harden',
      team: 'Houston Rockets', 
      position: 'PG',
      ownerId: null,
    },
    102: {
      name: 'LeBron James',
      team: 'Los Angeles Lakers', 
      position: 'SF, PF',
      ownerId: null,
    },
  };

  it('renders all players', () => {
    let wrapper = shallow(<PlayerBoard auctionIsActive={true} players={players} />);
    expect(wrapper.find(Player)).toHaveLength(2);
  });

  it('renders only players that have not been drafted', () => {
    let playersCopy = players;
    playersCopy[102].ownerId = 1;
    let wrapper = shallow(<PlayerBoard auctionIsActive={true} players={playersCopy} />);
    expect(wrapper.find(Player)).toHaveLength(1);
  });

  it('renders an active board', () => {
    let wrapper = shallow(<PlayerBoard auctionIsActive={true} players={players} />);
    expect(wrapper.find('.inactive')).toHaveLength(0);
    expect(wrapper.find('.active')).toHaveLength(1);
  });

  it('renders an inactive board', () => {
    let wrapper = shallow(<PlayerBoard auctionIsActive={false} players={players} />);
    expect(wrapper.find('.active')).toHaveLength(0);
    expect(wrapper.find('.inactive')).toHaveLength(1);
  });
});