import { BID, NOMINATE_PLAYER, END_AUCTION, ADD_PLAYER_TO_TEAM } from '../constants/actionTypes';

export const nominatePlayer = playerId => ({
  type: NOMINATE_PLAYER,
  playerId
});

export const bid = (value, teamId) => ({
  type: BID,
  value,
  teamId
});

export const endAuction = () => ({
  type: END_AUCTION
});

export const addPlayerToTeam = (playerId, teamId) => ({
  type: ADD_PLAYER_TO_TEAM,
  playerId,
  teamId
});