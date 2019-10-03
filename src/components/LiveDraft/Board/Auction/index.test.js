import React from 'react';
import { shallow } from 'enzyme';
import Auction from './';

describe('Auction tests', () => {
  it('renders without crashing', () => {
    shallow(<Auction teams={teams} nominatingTeamId={0} />);
  });

  let player = {
    102: {
      name: 'LeBron James',
      team: 'Los Angeles Lakers', 
      position: 'SF, PF',
      ownerId: null,
    },
  };

  let teams = [{
    name: 'Team 1',
    owner: 'Owner 1',
    budget: 200,
    players: []
  }];

  it('renders no player when a player has not been selected', () => {
    let wrapper = shallow(<Auction teams={teams} nominatingTeamId={0} />);
    expect(wrapper.text()).toContain('Select a Player');
  });

  it('renders selected player before starting auction', () => {
    let wrapper = shallow(
      <Auction 
        isActive={false} 
        player={player} 
        teams={teams}
        nominatingTeamId={0}
      />
    );
    expect(wrapper.find('#bidInput')).toHaveLength(1);
    expect(wrapper.find('#startBtn')).toHaveLength(1);
  });

  it('renders correctly after auction has started', () => {
    let wrapper = shallow(
      <Auction 
        isActive={true} 
        player={player} 
        teams={teams}
        nominatingTeamId={0}
        winningTeamId={0}
        bid={10}
      />
    );
    expect(wrapper.find('#bidInput')).toHaveLength(0);
    expect(wrapper.find('#endBtn')).toHaveLength(1);
  });
});