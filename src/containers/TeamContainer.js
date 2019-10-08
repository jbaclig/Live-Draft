import { connect } from 'react-redux';
import * as actions from '../actions';
import Team from '../components/LiveDraft/Team';

const mapStateToProps = state => {
  return {
    teams: state.teams,
    currentBid: state.auction.currentBid,
    rosterSize: state.settings.rosterSize
  }
};

const mapDispatchToProps = dispatch => {
  return {
    placeBid: (bid, teamId) => {
      dispatch(actions.bid(bid, teamId));
    }
  }
};

const TeamContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Team);

export default TeamContainer;