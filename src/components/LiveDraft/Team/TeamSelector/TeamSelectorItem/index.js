import React from 'react';

const TeamSelectorItem = ({ team, index, isSelected, setSelectedTeam }) =>
  team ?
    <div 
      className={`team-slector__item ${isSelected ? 'selected': ''}`}
      onClick={() => setSelectedTeam(team, index)}
    >
      <p className="team-name">{team.name}</p>
    </div> :
    <p>No team received from parent</p>

export default TeamSelectorItem;