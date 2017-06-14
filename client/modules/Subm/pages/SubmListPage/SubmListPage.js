import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Style

// Import Components
import SubmList from '../../components/SubmList';

// Import Actions
import { addSubmRequest, fetchSubms, deleteSubmRequest, acceptSubmRequest } from '../../SubmActions';

// Import Selectors
import { getSubms } from '../../SubmReducer';

class SubmListPage extends Component {
  
  componentDidMount() {
    this.props.dispatch(fetchSubms());
  }

  handleDeleteSubm = cuid => {
    if (confirm('Do you want to delete this submission')) { // eslint-disable-line
      this.props.dispatch(deleteSubmRequest(cuid));
    }
  };

  handleAcceptSubm = subm => {
    if (confirm('Do you want to accept this submission')) { // eslint-disable-line
      this.props.dispatch(acceptSubmRequest(subm));
    }
  };

  render() {
    return (
      <div>
        <SubmList
          handleDeleteSubm={this.handleDeleteSubm}
          handleAcceptSubm={this.handleAcceptSubm}
          subms={this.props.subms}
        />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
SubmListPage.need = [() => { return fetchSubms(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    subms: getSubms(state),
  };
}

SubmListPage.propTypes = {
  /*subms: PropTypes.arrayOf(PropTypes.shape({
    //name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    //content: PropTypes.string.isRequired,
  })).isRequired,*/
  dispatch: PropTypes.func.isRequired,
};

SubmListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(SubmListPage);
