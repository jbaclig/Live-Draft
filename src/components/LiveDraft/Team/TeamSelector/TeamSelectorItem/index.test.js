import React from 'react';
import { shallow } from 'enzyme';
import TeamSelectorItem from './';

describe('TeamSelectorItem tests', () => {
  it('renders without crashing', () => {
    shallow(<TeamSelectorItem />);
  });

  let team = {
    name: 'Team 1',
    owner: 'Owner 1',
    budget: 200,
    players: []
  };
  let index = 0;

  it('renders with the "selected" class if team is selected', () => {
    let wrapper = shallow(
      <TeamSelectorItem
        key={index}
        index={index}
        team={team}
        isSelected={true}
      />
    );
    expect(wrapper.find('.selected')).toHaveLength(1);
  });

  it('renders with the team name', () => {
    let wrapper = shallow(
      <TeamSelectorItem
        key={index}
        index={index}
        team={team}
        isSelected={true}
      />
    );
    expect(wrapper.text()).toEqual(team.name);
  });
});