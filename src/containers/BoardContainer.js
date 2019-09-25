import { connect } from 'react-redux';
import { nominatePlayer } from '../actions';
import Board from '../components/LiveDraft/Board';

const mapStateToProps = state => {
  return {
    currentPlayer: state.auction.currentPlayer,
    bid: state.auction.bid,
    winningTeamId: state.auction.winningTeamId,
    players: state.players,
    teams: state.teams
  }
};

const mapDispatchToProps = dispatch => {
  return {
    nominate: playerId => {
      dispatch(nominatePlayer(playerId))
    }
  }
};

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

export default BoardContainer;