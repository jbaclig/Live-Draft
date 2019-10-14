import * as actions from '../constants/actionTypes';

export const nominatePlayer = playerId => ({
  type: actions.NOMINATE_PLAYER,
  playerId
});

export const startAuction = bid => ({
  type: actions.START_AUCTION,
  bid
});

export const bid = (value, teamId) => ({
  type: actions.BID,
  value,
  teamId
});

export const endAuction = () => ({
  type: actions.END_AUCTION
});

export const addPlayerToTeam = (playerId, teamId) => ({
  type: actions.ADD_PLAYER_TO_TEAM,
  playerId,
  teamId
});