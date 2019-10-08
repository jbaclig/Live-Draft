import React from 'react';
import TeamSelectorItem from './TeamSelectorItem';

class TeamSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeam: null,
      selectedTeamIndex: null
    };

    this.setSelectedTeam = this.setSelectedTeam.bind(this);
  }

  setSelectedTeam(team, index) {
    this.setState({
      selectedTeam: team,
      selectedTeamIndex: index
    });
  }

  render() {
    return <div className="team-selector">
      {this.props.teams ? this.props.teams.map((team, index) => 
        <TeamSelectorItem 
          key={index} 
          index={index}
          team={team}
          setSelectedTeam={this.setSelectedTeam}
          isSelected={this.state.selectedTeamIndex === index ? true : false}
        />
      ) : null}
      {this.state.selectedTeam ? 
        <button 
          className="confirmBtn"
          onClick={() => this.props.setTeam(this.state.selectedTeam, this.state.selectedTeamIndex)}
        >
          Confirm
        </button> :
        <p className="team-selector__msg">Click a team to select</p>
      }
    </div>
  }
}  

export default TeamSelector;