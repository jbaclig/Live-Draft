import React from 'react';
import { shallow } from 'enzyme';
import Bidder from './';

describe('Bidder unit tests', () => {
  let team = {
    name: 'Team 1',
    owner: 'Owner 1',
    budget: 200,
    players: []
  }

  it('should render without crashing', () => {
    shallow(<Bidder team={team} currentBid={10} rosterSize={10} />);
  });

  it('should render the team name', () => {
    let wrapper = shallow(<Bidder team={team} currentBid={10} rosterSize={10} />);
    expect(wrapper.find('.team-name').text()).toEqual('Team 1');
  });

  it('should render .bidder-inactive when auction has not started', () => {
    let wrapper = shallow(<Bidder team={team} currentBid={10} rosterSize={10} />);
    expect(wrapper.find('.bidder-inactive')).toHaveLength(1);
  });

  it('should render .bidder-active when auction has started', () => {
    let wrapper = shallow(
      <Bidder team={team} currentBid={10} rosterSize={10} currentPlayer={101} />
    );
    expect(wrapper.find('.bidder-active')).toHaveLength(1);
  });

  it('should update bid when a number is clicked', () => {
    let wrapper = shallow(
      <Bidder team={team} currentBid={10} rosterSize={10} currentPlayer={101} />
    );
    wrapper.find('.btn-1').simulate('click', { 
      preventDefault: () => {},
      target: { value: '1' } });
    expect(wrapper.state().bid).toEqual(1);
    wrapper.find('.btn-2').simulate('click', { 
      preventDefault: () => {},
      target: { value: '2' } });
    expect(wrapper.state().bid).toEqual(12);
  });

  it('should delete the last entered bid number when delete button is clicked', () => {
    let wrapper = shallow(
      <Bidder team={team} currentBid={10} rosterSize={10} currentPlayer={101} />
    );
    wrapper.find('.btn-1').simulate('click', { 
      preventDefault: () => {},
      target: { value: '1' } });
    wrapper.find('.btn-2').simulate('click', { 
      preventDefault: () => {},
      target: { value: '2' } });
    wrapper.find('.btn-del').simulate('click', { preventDefault: () => {} });
    expect(wrapper.state().bid).toEqual(1);
  });

  it('should render enabled minimum bid button if bid = 0', () => {
    let wrapper = shallow(
      <Bidder team={team} currentBid={10} rosterSize={10} currentPlayer={101} />
    );
    expect(wrapper.find('.min-bid-btn')).toHaveLength(1);
    expect(wrapper.find('.min-bid-btn.disabled')).toHaveLength(0);
  });

  it('should render disabled minimum bid button if current bid >= team max bid', () => {
    let wrapper = shallow(
      <Bidder team={team} currentBid={200} rosterSize={10} currentPlayer={101}/>
    );
    expect(wrapper.find('.min-bid-btn.disabled')).toHaveLength(1);
  });

  it('should render enabled custom bid button if bid is greater than min. bid', () => {
    let wrapper = shallow(
      <Bidder team={team} currentBid={10} rosterSize={10} currentPlayer={101} />
    );
    wrapper.setState({bid: 15});
    expect(wrapper.find('.custom-bid-btn')).toHaveLength(1);
    expect(wrapper.find('.custom-bid-btn.disabled')).toHaveLength(0);
  });

  it('should render disabled custom bid button if bid is less than min. bid and greater than 0', () => {
    let wrapper = shallow(
      <Bidder team={team} currentBid={10} rosterSize={10} currentPlayer={101} />
    );
    wrapper.setState({bid: 5});
    expect(wrapper.find('.custom-bid-btn.disabled')).toHaveLength(1);
  });

  it('should render disabled custom bid button if bid is less than min. bid and less than max bid', () => {
    let wrapper = shallow(
      <Bidder team={team} currentBid={10} rosterSize={10} currentPlayer={101} />
    );
    wrapper.setState({bid: 200});
    expect(wrapper.find('.custom-bid-btn.disabled')).toHaveLength(1);
  });

  it('should render .team-full when team roster is full', () => {
    team.players = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let wrapper = shallow(
      <Bidder team={team} currentBid={10} rosterSize={10} currentPlayer={101} />
    );
    expect(wrapper.find('.team-full')).toHaveLength(1)
  });
});