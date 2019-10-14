import React from 'react';

class Auction extends React.Component { 
  //props: nominatingTeamId, player, bid, winningTeamId, teams, isActive, 
  //       startAuction, endAuction
  constructor(props) {
    super(props);

    this.state = {
      bidInput: '1'
    }

    this.handleBidChange = this.handleBidChange.bind(this);
  }
  
  handleBidChange(event) {
    this.setState({bidInput: event.target.value});
  }

  render() {
    return <article>
      {this.props.player ?
        this.props.isActive ? 
          <div className="auction-info">
            <h2>{this.props.player.name}</h2>
            <p>{this.props.player.team} | {this.props.player.position}</p>
            <p><strong>Current Bid:</strong> {this.props.bid}</p>
            <p><strong>Winning Team:</strong> {this.props.teams[this.props.winningTeamId].name}</p>
            <button id="endBtn" onClick={() => this.props.endAuction()}>
              End Auction
            </button>
          </div> :
          <div className="auction-info">
            <h2>{this.props.player.name}</h2>
            <p>{this.props.player.team} | {this.props.player.position}</p>
            <label htmlFor="bid"><strong>Bid:</strong></label>
            <input 
              type="text" 
              name="bid" 
              id="bidInput" 
              value={this.state.bidInput}
              onChange={this.handleBidChange}
            />
            <p><strong>Nominating Team:</strong> {this.props.teams[this.props.nominatingTeamId].name}</p>
            <button id="startBtn" onClick={() => this.props.startAuction(this.state.bidInput)}>
              Start Auction
            </button>
          </div> :
        <h2>{this.props.teams[this.props.nominatingTeamId].name} - Select a Player</h2>
      }
    </article>;
  }
}

export default Auction;