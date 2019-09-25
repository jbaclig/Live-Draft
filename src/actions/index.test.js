import * as actions from './';
import * as types from '../constants/actionTypes';

describe('actions', () => {
  it('should create action to nominate a player', () => {
    const playerId = 102;
    const expectedAction = {
      type: types.NOMINATE_PLAYER,
      playerId
    };
    expect(actions.nominatePlayer(playerId)).toEqual(expectedAction);
  });

  it('should create action to place a bid', () => {
    const value = 42;
    const teamId = 4;
    const expectedAction = {
      type: types.BID,
      value,
      teamId
    };
    expect(actions.bid(value, teamId)).toEqual(expectedAction);
  });

  it('should create action to end an auction', () => {
    const expectedAction = {
      type: types.END_AUCTION
    };
    expect(actions.endAuction()).toEqual(expectedAction);
  });

  it('should create action to add a player to a team', () => {
    const playerId = 101;
    const teamId = 4;
    const expectedAction = {
      type: types.ADD_PLAYER_TO_TEAM,
      playerId,
      teamId
    };
    expect(actions.addPlayerToTeam(playerId, teamId)).toEqual(expectedAction);
  });
});
