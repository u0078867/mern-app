import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';

// Import Style
import styles from './DashboardPage.css';

// Import Components


// Import Actions
import { fetchForms } from '../../../Form/FormActions';

// Import Selectors
//import { getUser } from '../../../App/AppReducer';


import callApi from 'CLIENT_UTIL/apiCaller';


class DashboardPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchForms());
  }

  redirectTo = key => {
    callApi('forms').then(res => {
      var form = res.forms.find(form => form.key == key);
      if (form) {
        this.context.router.push(`/forms/${form.slug}-${form.cuid}?red=/dashboard`);
      } else {
        alert(`No form with key "${key}"`);
      }
    })
  }

  onInsertNewSample = () => {
    this.redirectTo('insert-sample');
  }

  onUpdateSample = () => {
    this.redirectTo('update-sample');
  }

  onStartExperiment = () => {
    this.redirectTo('run-experiment');
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={4}><Button bsStyle="primary" bsSize="large" onClick={this.onInsertNewSample}>Insert sample</Button></Col>
            <Col md={4}><Button bsStyle="primary" bsSize="large" onClick={this.onUpdateSample}>Update sample</Button></Col>
            <Col md={4}></Col>
          </Row>
          <Row bsClass={styles['row-spacing']}>
            <Col md={4}></Col>
            <Col md={4}><Button bsStyle="primary" bsSize="large" onClick={this.onStartExperiment}>Start experiment</Button></Col>
            <Col md={4}></Col>
          </Row>
        </Grid>
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
