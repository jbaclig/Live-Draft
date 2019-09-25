import React from 'react';
import Player from '../Player';
import Auction from './Auction';

const Board = ({ currentPlayer, bid, winningTeamId, players, teams, setType, nominate }) =>
  <section className="board">
    <h1>Draft Board</h1>
    {currentPlayer ? 
      <Auction
        player={players[currentPlayer]}
        bid={bid}
        winningTeamId={winningTeamId}
        teams={teams} /> :
      <article>
        <h2>Available Players</h2>
        {players ? 
          Object.keys(players).map(key =>
            <Player 
              key={key}
              player={players[key]}
              nominate={nominate}
            />
          ) :
          <p>No Available Players</p>
        }
      </article>
    }
    <button 
      id="backBtn"
      onClick={() => setType(null)}
    >
      Back
    </button>
  </section>

export default Board;