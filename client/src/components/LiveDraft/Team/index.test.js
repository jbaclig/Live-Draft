import React from 'react';
import { shallow, mount } from 'enzyme';
import Team from './';
import TeamSelector from './TeamSelector';
import TeamSelectorItem from './TeamSelector/TeamSelectorItem';
import Bidder from './Bidder';

describe('Team unit tests', () => {
  it('should render without crashing', () => {
    shallow(<Team currentBid={10} />);
  });

  it('should render TeamSelector when a team has not be selected', () => {
    let wrapper = shallow(<Team currentBid={10} />);
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
    let wrapper = shallow(<Team currentBid={10} teams={teams} />);
    wrapper.setState({team: {
      name: 'Team 1',
      owner: 'Owner 1',
      budget: 200,
      players: []
    }});
    expect(wrapper.find(Bidder)).toHaveLength(1);
  })
});

describe('Team integration tests', () => {
  it('should render Bidder when Confirm button is clicked', () => {
    let wrapper = mount(<Team currentBid={10} teams={[
      {
        name: 'Team 1',
        owner: 'Owner 1',
        budget: 200,
        players: []
      },
    ]} />);
    wrapper.find(TeamSelectorItem).simulate('click');
    wrapper.find('.confirmBtn').simulate('click');
    expect(wrapper.find(Bidder)).toHaveLength(1);
  });

  it('should set the team and team index when Confirm button is clicked', () => {
    let wrapper = mount(<Team currentBid={10} teams={[
      {
        name: 'Team 1',
        owner: 'Owner 1',
        budget: 200,
        players: []
      },
    ]} />);
    wrapper.find(TeamSelectorItem).simulate('click');
    wrapper.find('.confirmBtn').simulate('click');
    expect(wrapper.state().team).toEqual({
      name: 'Team 1',
      owner: 'Owner 1',
      budget: 200,
      players: []
    });
    expect(wrapper.state().teamIndex).toEqual(0);
  })
});