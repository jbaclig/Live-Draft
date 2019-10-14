import React from 'react';
import Player from '../../Player';

const PlayerBoard = ({ auctionIsActive, players, nominate }) => 
  <article className={auctionIsActive ? 'active' : 'inactive'}>
    <h2>Available Players</h2>
    {players ? 
      Object.keys(players).map(key =>
        players[key].ownerId === null ? 
          <Player 
            key={key}
            index={key}
            player={players[key]}
            nominate={nominate}
          /> :
          null
      ) :
      <p>No Available Players</p>
    }
  </article>

export default PlayerBoard;