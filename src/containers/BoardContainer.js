import { connect } from 'react-redux';
import * as actions from '../actions';
import Board from '../components/LiveDraft/Board';

const mapStateToProps = state => {
  return {
    currentPlayer: state.auction.currentPlayer,
    bid: state.auction.currentBid,
    winningTeamId: state.auction.winningTeamId,
    players: state.players,
    teams: state.teams,
    auctionIsActive: state.auction.isActive,
    nominationOrder: state.auction.nominationOrder,
    nominatingTeamPos: state.auction.nominatingTeamPos
  }
};

const mapDispatchToProps = dispatch => {
  return {
    nominate: playerId => {
      dispatch(actions.nominatePlayer(playerId))
    },
    startAuction: bid => {
      dispatch(actions.startAuction(bid))
    },
    endAuction: () => {
      dispatch(actions.endAuction())
    }
  }
};

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

export default BoardContainer;