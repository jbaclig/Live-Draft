import reducer from './';
import * as types from '../constants/actionTypes';

describe('reducer', () => {
  it('should handle NOMINATE_PLAYER', () => {
    expect(reducer({
      auction: {
        currentPlayer: null,
        currentBid: 0,
        winningTeamId: null
      }
    }, {
      type: types.NOMINATE_PLAYER,
      playerId: 104
    })).toEqual({
      auction: {
        currentPlayer: 104,
        currentBid: 0,
        winningTeamId: null
      }
    })
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
        winningTeamId: 0
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
        winningTeamId: null
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