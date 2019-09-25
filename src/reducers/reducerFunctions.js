export function nominatePlayer(state, playerId) {
  return Object.assign({}, state, {
    auction: {
      currentPlayer: playerId,
      currentBid: 0,
      winningTeamId: null
    }
  });
}

export function bid(state, value, teamId) {
  let team = state.teams[teamId];
  let rosterSize = state.settings.rosterSize;
  let teamMaxBid = team.budget - (rosterSize - team.players.length + 1);

  if(value <= teamMaxBid) {
    let auction = state.auction;
    if(value > auction.currentBid) {
      auction.currentBid = value;
      auction.winningTeamId = teamId;
      return Object.assign({}, state, {
        auction: auction
      });
    }
  }
  return state;
}

export function endAuction(state) {
  let winningTeamId = state.auction.winningTeamId;
  let winningBid = state.auction.currentBid;
  let teams = state.teams;
  let winningTeam = teams[0];
  
  let playerId = state.auction.currentPlayer;
  let players = state.players;
  let player = players[playerId];

  winningTeam.budget = winningTeam.budget - winningBid;
  winningTeam.players.push(playerId); 
  teams[winningTeamId] = winningTeam;

  player.ownerId = winningTeamId;
  players[playerId] = player;

  return Object.assign({}, state, {
    auction: {
      currentPlayer: null,
      currentBid: 0,
      winningTeamId: null
    },
    players: players,
    teams: teams
  })
}