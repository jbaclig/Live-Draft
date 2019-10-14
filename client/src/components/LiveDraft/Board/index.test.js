import React from 'react';
import { shallow } from 'enzyme';
import Board from './';
import Player from '../Player';
import Auction from './Auction';

describe('Board tests', () => {
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

  it('renders without crashing', () => {
    shallow(<Board players={players} nominationOrder={[0]} nominatingTeamPos={0} />);
  });

});