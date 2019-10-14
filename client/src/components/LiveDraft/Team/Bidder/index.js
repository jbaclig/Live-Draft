import React from 'react';

class Bidder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bid: 0
    }

    this.handleValueClick = this.handleValueClick.bind(this);
    this.handleValueClick = this.handleValueClick.bind(this);
    this.handleBidInputChange = this.handleBidInputChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleValueClick(e) {
    e.preventDefault();
    let bidStr = this.state.bid === 0 ? '' : this.state.bid.toString();
    this.setState({bid: parseInt(bidStr + e.target.value)});
  }

  handleDeleteClick(e) {
    e.preventDefault();
    this.setState({bid: Math.floor(this.state.bid / 10)});
  }

  handleBidInputChange(e) {
    this.setState({bid: parseInt(e.target.value ? e.target.value : 0)});
  }

  handleSubmitClick(e) {
    e.preventDefault();
    this.props.placeBid(parseInt(e.target.value), this.props.teamIndex);
    this.setState({bid: 0});
  }

  render() {
    let minBid = this.props.currentBid + 1;
    let maxBid = 
      this.props.team.budget - (this.props.rosterSize - this.props.team.players.length + 1);
    return <div className="bidder-container">
      <h1 className="team-name">{this.props.team.name}</h1>
      {this.props.team.players.length === this.props.rosterSize ?
        <div className="team-full">
          <h2>You have completed your roster.</h2>
        </div> :
        <div className="bidder">
          {this.props.currentPlayer ? 
            <div className="bidder-active">
              {this.state.bid === 0 ?
                <button 
                  className={`bid-btn min-bid-btn ${this.props.currentBid >= maxBid ? 'disabled' : ''}`}
                  value={minBid}
                  onClick={(e) => this.handleSubmitClick(e)} 
                  disabled={this.props.currentBid >= maxBid ? true : false}
                >
                  Bid ${minBid}
                </button> :
                <button
                  className={`bid-btn custom-bid-btn ${this.state.bid <= minBid || this.state.bid > maxBid ? 'disabled' : ''}`}
                  value={this.state.bid}
                  onClick={(e) => this.handleSubmitClick(e)}
                  disabled={this.state.bid <= minBid || this.state.bid > maxBid ? true : false}
                >
                  Place Bid
                </button> 
              }
              <label htmlFor="bid-input">Bid</label>
              <input 
                className="bid-input" 
                onChange={(e) => this.handleBidInputChange(e)}
                name="bid-input" value={this.state.bid} 
                type="number"
              />
              <div className="btn-pad">
                <button 
                  className="btn-val btn-1"
                  value="1"
                  onClick={(e) => this.handleValueClick(e)}
                >1</button>
                <button 
                  className="btn-val btn-2"
                  value="2"
                  onClick={(e) => this.handleValueClick(e)}
                >2</button>
                <button 
                  className="btn-val btn-3"
                  value="3"
                  onClick={(e) => this.handleValueClick(e)}
                >3</button>
                <button 
                  className="btn-val btn-4"
                  value="4"
                  onClick={(e) => this.handleValueClick(e)}
                >4</button>
                <button 
                  className="btn-val btn-5"
                  value="5"
                  onClick={(e) => this.handleValueClick(e)}
                >5</button>
                <button 
                  className="btn-val btn-6"
                  value="6"
                  onClick={(e) => this.handleValueClick(e)}
                >6</button>
                <button 
                  className="btn-val btn-7"
                  value="7"
                  onClick={(e) => this.handleValueClick(e)}
                >7</button>
                <button 
                  className="btn-val btn-8"
                  value="8"
                  onClick={(e) => this.handleValueClick(e)}
                >8</button>
                <button 
                  className="btn-val btn-9"
                  value="9"
                  onClick={(e) => this.handleValueClick(e)}
                >9</button>
                <button 
                  className="btn-val btn-0"
                  value="0"
                  onClick={(e) => this.handleValueClick(e)}
                >0</button>
                <button className="btn-del" onClick={(e) => this.handleDeleteClick(e)}>&lt;</button>
              </div>
            </div> :
            <div className="bidder-inactive">
              <h2 className="waiting-msg">Waiting for next auction to start</h2>
            </div>
          }
        </div>
      }
    </div>;
  }
} 

export default Bidder;