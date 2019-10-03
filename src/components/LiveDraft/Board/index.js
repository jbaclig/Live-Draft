import React from 'react';
import PlayerBoard from './PlayerBoard';
import Auction from './Auction';

const Board = ({ 
  currentPlayer, bid, winningTeamId, players, teams, setType, auctionIsActive, 
  nominationOrder, nominatingTeamPos, nominate, startAuction, endAuction
}) =>
  <section className="board">
    <h1>Draft Board</h1>
    <Auction
      player={players[currentPlayer]}
      bid={bid}
      winningTeamId={winningTeamId}
      teams={teams}
      isActive={auctionIsActive}
      nominatingTeamId={nominationOrder[nominatingTeamPos]}
      startAuction={startAuction}
      endAuction={endAuction}
    />
    <PlayerBoard 
      auctionIsActive={auctionIsActive} 
      players={players} 
      nominate={nominate} 
    />
    <button id="backBtn" onClick={() => setType(null)}>Back</button>
  </section>

export default Board;