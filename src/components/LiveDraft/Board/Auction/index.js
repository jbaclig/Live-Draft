import React from 'react';

const Auction = ({ player, bid, winningTeamId, teams }) =>
  <article>
    <h2>{player.name}</h2>
    <p><strong>Bid:</strong> {bid}</p>
    <p>{winningTeamId ? teams[winningTeamId].name : ''}</p>
  </article>

export default Auction;