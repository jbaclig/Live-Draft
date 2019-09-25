import React from 'react';
import { shallow } from 'enzyme';
import Board from './';
import Player from '../Player';
import Auction from './Auction';

describe('Board tests', () => {
  it('renders without crashing', () => {
    shallow(<Board />);
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

  it('renders list of players', () => {
    let wrapper = shallow(<Board players={players} />);
    expect(wrapper.find(Player)).toHaveLength(2);
  });

  let currentPlayer = 102;

  it('renders current auction', () => {
    let wrapper = shallow(
      <Board 
        players={players} 
        currentPlayer={currentPlayer} 
      />
    );
    expect(wrapper.find(Auction)).toHaveLength(1);
  });
});