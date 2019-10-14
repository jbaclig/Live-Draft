export function nominatePlayer(state, playerId) {
  let auction = state.auction;
  auction.currentPlayer = playerId;
  return Object.assign({}, state, {auction: auction});
}

export function startAuction(state, bid) {
  let auction = state.auction;
  let nominatingTeamId = auction.nominationOrder[auction.nominatingTeamPos];
  let nominatingTeam = state.teams[nominatingTeamId];
  let rosterSize = state.settings.rosterSize;
  let teamMaxBid = nominatingTeam.budget - (rosterSize - nominatingTeam.players.length + 1);
  console.log('bid:', bid, 'teamMaxBid:', teamMaxBid);
  if(bid <= teamMaxBid && bid > 0) {
    auction.currentBid = bid;
    auction.winningTeamId = nominatingTeamId;
    auction.isActive = true;
    return Object.assign({}, state, {auction: auction});
  }
  else if(bid > teamMaxBid) {
    window.alert('bid is greater than team\'s max');
    return state;
  }
  else if(bid < 1) {
    window.alert('bid must be greater than 0');
    return state;
  }
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
  let auction = state.auction;

  let winningTeamId = auction.winningTeamId;
  let winningBid = auction.currentBid;
  let teams = state.teams;
  let winningTeam = teams[0];
  
  let playerId = auction.currentPlayer;
  let players = state.players;
  let player = players[playerId];

  let nextNominatingTeamPos = auction.nominatingTeamPos === auction.nominationOrder.length ? 
    0 : auction.nominatingTeamPos + 1;

  winningTeam.budget = winningTeam.budget - winningBid;
  winningTeam.players.push(playerId); 
  teams[winningTeamId] = winningTeam;

  player.ownerId = winningTeamId;
  player.price = winningBid;
  players[playerId] = player;

  auction.currentPlayer = null;
  auction.currentBid = 0;
  auction.winningTeamId = null;
  auction.nominatingTeamPos = nextNominatingTeamPos;
  auction.isActive = false;

  return Object.assign({}, state, {
    auction: auction,
    players: players,
    teams: teams
  })
}