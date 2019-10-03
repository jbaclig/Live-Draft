import reducer from './';
import * as types from '../constants/actionTypes';

describe('reducer', () => {
  it('should handle NOMINATE_PLAYER', () => {
    expect(reducer({
      auction: {
        currentPlayer: null,
        currentBid: 0,
        winningTeamId: null,
        nominationOrder: [3, 1, 0, 2],
        nominatingTeamPos: 0,
        isActive: false
      }
    }, {
      type: types.NOMINATE_PLAYER,
      playerId: 104
    })).toEqual({
      auction: {
        currentPlayer: 104,
        currentBid: 0,
        winningTeamId: null,
        nominationOrder: [3, 1, 0, 2],
        nominatingTeamPos: 0,
        isActive: false
      }
    })
  });

  it('should start an auction with the selected player', () => {
    expect(reducer({
      settings: {
        rosterSize: 13
      },
      auction: {
        currentPlayer: 104,
        currentBid: 0,
        winningTeamId: null,
        nominationOrder: [3, 1, 0, 2],
        nominatingTeamPos: 0,
        isActive: false
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
    }, {
      type: types.START_AUCTION,
      bid: 15
    })).toEqual({
      settings: {
        rosterSize: 13
      },
      auction: {
        currentPlayer: 104,
        currentBid: 15,
        winningTeamId: 3,
        nominationOrder: [3, 1, 0, 2],
        nominatingTeamPos: 0,
        isActive: true
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
    });
  });

  it('should accept bid if greater than current', () => {
    expect(reducer({
      settings: {
        rosterSize: 12,
      },
      auction: {
        currentPlayer: 102,
        currentBid: 10,
        winningTeamId: 1
      },
      teams: [
        {
          name: 'Team 1',
          owner: 'Owner 1',
          budget: 200,
          players: []
        }
      ]
    }, {
      type: types.BID,
      value: 12,
      teamId: 0
    })).toEqual({
      settings: {
        rosterSize: 12,
      },
      auction: {
        currentPlayer: 102,
        currentBid: 12,
        winningTeamId: 0
      },
      teams: [
        {
          name: 'Team 1',
          owner: 'Owner 1',
          budget: 200,
          players: []
        }
      ]
    });
  });

  it('should reject bid if less than current', () => {
    expect(reducer({
      settings: {
        rosterSize: 12,
      },
      auction: {
        currentPlayer: 102,
        currentBid: 10,
        winningTeamId: 1
      },
      teams: [
        {
          name: 'Team 1',
          owner: 'Owner 1',
          budget: 200,
          players: []
        }
      ]
    }, {
      type: types.BID,
      value: 1,
      teamId: 0
    })).toEqual({
      settings: {
        rosterSize: 12,
      },
      auction: {
        currentPlayer: 102,
        currentBid: 10,
        winningTeamId: 1
      },
      teams: [
        {
          name: 'Team 1',
          owner: 'Owner 1',
          budget: 200,
          players: []
        }
      ]
    });
  });

  it('should reject bid if less than team\'s max bid', () => {
    expect(reducer({
      settings: {
        rosterSize: 12,
      },
      auction: {
        currentPlayer: 102,
        currentBid: 9,
        winningTeamId: 1
      },
      teams: [
        {
          name: 'Team 1',
          owner: 'Owner 1',
          budget: 15,
          players: [1, 2, 3, 4, 5, 6, 7]
        }
      ]
    }, {
      type: types.BID,
      value: 14,
      teamId: 0
    })).toEqual({
      settings: {
        rosterSize: 12,
      },
      auction: {
        currentPlayer: 102,
        currentBid: 9,
        winningTeamId: 1
      },
      teams: [
        {
          name: 'Team 1',
          owner: 'Owner 1',
          budget: 15,
          players: [1, 2, 3, 4, 5, 6, 7]
        }
      ]
    });
  });

  it('should assign player to winning team and reset auction when auction ends', () => {
    expect(reducer({
      auction: {
        currentPlayer: 102,
        currentBid: 47,
        winningTeamId: 0,
        nominationOrder: [3, 1, 0, 2],
        nominatingTeamPos: 0,
        isActive: true
      },
      players: {
        102: {
          name: 'LeBronJames',
          team: 'LAL',
          position: 'SF, PF',
          ownerId: null
        }
      },
      teams: [
        {
          name: 'Team 1',
          owner: 'Owner 1',
          budget: 200,
          players: []
        }
      ]
    }, {
      type: types.END_AUCTION
    })).toEqual({
      auction: {
        currentPlayer: null,
        currentBid: 0,
        winningTeamId: null,
        nominationOrder: [3, 1, 0, 2],
        nominatingTeamPos: 1,
        isActive: false
      },
      players: {
        102: {
          name: 'LeBronJames',
          team: 'LAL',
          position: 'SF, PF',
          ownerId: 0
        }
      },
      teams: [
        {
          name: 'Team 1',
          owner: 'Owner 1',
          budget: 153,
          players: [102]
        }
      ]
    })
  });
});