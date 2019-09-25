import React from 'react';

const Player = ({ player, nominate }) =>
  <div 
    className="player"
    onClick={() => nominate(player.id)}
  >
    <p>
      <span className="player-name">{player.name}</span> | <span className="player-team">{player.team}</span> | <span className="player-position">{player.position}</span>
    </p>
  </div>;

export default Player;