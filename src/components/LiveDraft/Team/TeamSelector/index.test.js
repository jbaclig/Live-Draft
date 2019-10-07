import React from 'react';
import { shallow, mount } from 'enzyme';
import TeamSelector from './';
import TeamSelectorItem from './TeamSelectorItem';

describe('TeamSelector unit tests', () => {
  it('renders without crashing', () => {
    shallow(<TeamSelector />);
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

  it('renders the correct number of teams to select', () => {
    let wrapper = shallow(<TeamSelector teams={teams} />);
    expect(wrapper.find(TeamSelectorItem)).toHaveLength(2);
  });

  it('renders select message when no team has been selected', () => {
    let wrapper = shallow(<TeamSelector teams={teams} />);
    expect(wrapper.find('.team-selector__msg')).toHaveLength(1);
  });

  it('renders confirm button when a team has been selected', () => {
    let wrapper = shallow(<TeamSelector teams={teams} />);
    wrapper.setState({selectedTeam: {
      name: 'Team 2',
      owner: 'Owner 2',
      budget: 200,
      players: []
    }});
    expect(wrapper.find('.confirmBtn')).toHaveLength(1);
  });
});

describe('TeamSelector integration tests', () => {
  it('updates selectedTeam and selectedTeamIndex and displays confirm button when team is clicked', () => {
    let wrapper = mount(<TeamSelector teams={[{
      name: 'Team 1',
      owner: 'Owner 1',
      budget: 200,
      players: []
    }]} />);
    wrapper.find(TeamSelectorItem).simulate('click');
    expect(wrapper.state('selectedTeam')).toEqual({
      name: 'Team 1',
      owner: 'Owner 1',
      budget: 200,
      players: []
    });
    expect(wrapper.state('selectedTeamIndex')).toEqual(0);
    expect(wrapper.find('.confirmBtn')).toHaveLength(1);
  });
});