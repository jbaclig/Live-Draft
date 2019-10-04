import React from 'react';
import { shallow } from 'enzyme';
import Team from './';
import TeamSelector from './TeamSelector';
import Bidder from './Bidder';

describe('Team tests', () => {
  it('should render without crashing', () => {
    shallow(<Team />);
  });

  it('should render TeamSelector when a team has not be selected', () => {
    let wrapper = shallow(<Team />);
    expect(wrapper.find(TeamSelector)).toHaveLength(1);
  });

  let teams = [
    {
      name: 'Team 1',
      owner: 'Owner 1',
      budget: 200,
      players: []
    },
    {
      name: 'Team 2',
      owner: 'Owner 2',
      budget: 200,
      players: []
    },
  ];

  it('should render Bidder when a team has been selected', () => {
    let wrapper = shallow(<Team teams={teams} />);
    wrapper.setState({teamId: 1});
    expect(wrapper.find(Bidder)).toHaveLength(1);
  })
});