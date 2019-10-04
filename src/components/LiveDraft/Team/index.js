import React from 'react';
import TeamSelector from './TeamSelector';
import Bidder from './Bidder';

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamId: null
    }

    this.setTeamId = this.setTeamId.bind(this);
  }

  setTeamId(id) {
    this.setState({teamId: id});
  }

  render() {
    return <section className="team">
      {this.state.teamId ?
        <Bidder team={this.props.teams[this.state.teamId]} /> :
        <TeamSelector teams={this.props.teams} setTeamId={this.setTeamId} />
      }

      <button
        id="backBtn"
        onClick={() => setType(null)}
      >
        Back
      </button>
    </section>;
  }
}

export default Team;