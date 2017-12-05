import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';

// Import Style
import styles from './DashboardPage.css';

// Import Components


// Import Actions


// Import Selectors



import callApi from 'CLIENT_UTIL/apiCaller';


class DashboardPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        You can insert metadata in the following ways:
        <ul style={{listStylePosition: 'inside'}}>
          <li>by using the WorkFlow engine above with your own workflow files;</li>
          <li>by manually selecting what form to fill in;</li>
        </ul>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
DashboardPage.need = [];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {

  };
}


DashboardPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(DashboardPage);
