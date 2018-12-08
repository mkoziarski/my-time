import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LogView from '../components/LogView';
import * as logActions from '../actions/log';
import * as categoryActions from '../actions/categories';

function mapStateToProps(state) {
  return {
    log: state.log,
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign({}, logActions, categoryActions),
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogView);
