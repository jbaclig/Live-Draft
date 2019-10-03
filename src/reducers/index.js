import * as types from '../constants/actionTypes';
import * as functions from './reducerFunctions';

const initialState = {
  settings: {
    rosterSize: 13
  },
  auction: {
    currentPlayer: null,
    currentBid: 0,
    winningTeamId: null,
    nominationOrder: [3, 1, 0, 2],
    nominatingTeamPos: 0,
    isActive: false
  },
  players: {
    101: {
      name: 'James Harden',
      team: 'HOU', 
      position: 'PG',
      ownerId: null,
    },
    102: {
      name: 'LeBron James',
      team: 'LAL', 
      position: 'SF, PF',
      ownerId: null,
    },
    103: {
      name: 'Giannis Antetokounmpo',
      team: 'MIL', 
      position: 'PG, SG, SF, PF, C',
      ownerId: null, 
    },
    104: {
      name: 'Stephen Curry',
      team: 'GSW', 
      position: 'PG',
      ownerId: null,
    },
    105: {
      name: 'Anthony Davis',
      team: 'LAL', 
      position: 'PF, C',
      ownerId: null,
    },
  },
  teams: [
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
    {
      name: 'Team 3',
      owner: 'Owner 3',
      budget: 200,
      players: []
    },
    {
      name: 'Team 4',
      owner: 'Owner 4',
      budget: 200,
      players: []
    },
  ]
}

function rootReducer(state = initialState, action) {
  if(action.type === types.NOMINATE_PLAYER) 
    return functions.nominatePlayer(state, action.playerId);
  if(action.type === types.START_AUCTION)
    return functions.startAuction(state, action.bid);
  else if(action.type === types.BID) 
    return functions.bid(state, action.value, action.teamId);
  else if(action.type === types.END_AUCTION)
    return functions.endAuction(state);
  
  return state;
}

export default rootReducer;