import { connect } from 'react-redux';
import * as actions from '../actions';
import Team from '../components/LiveDraft/Team';

const mapStateToProps = state => {
  return {
    teams: state.teams
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

const TeamContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Team);

export default TeamContainer;