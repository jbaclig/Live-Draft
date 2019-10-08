import React from 'react';
import TeamSelector from './TeamSelector';
import Bidder from './Bidder';

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: null,
      teamIndex: null
    }

    this.setTeam = this.setTeam.bind(this);
  }

  setTeam(team, teamIndex) {
    this.setState({team: team, teamIndex: teamIndex});
  }

  render() {
    return <section className="team">
      {this.state.team ?
        <Bidder 
          team={this.state.team} 
          teamIndex={this.state.teamIndex}
          currentBid={this.props.currentBid} 
          placeBid={this.props.placeBid}
          rosterSize={this.props.rosterSize}
        /> :
        <TeamSelector teams={this.props.teams} setTeam={this.setTeam} />
      }

      <button
        id="backBtn"
        onClick={() => this.props.setType(null)}
      >
        Back
      </button>
    </section>;
  }
}

export default Team;