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

  redirectTo = info => {
    callApi('forms').then(res => {
      var form = res.forms.find(form => form.key == info.formKey);
      if (form) {
        this.context.router.push(`/forms/${form.slug}-${form.cuid}${info.query}`);
      } else {
        alert(`No form with key "${info.formKey}"`);
      }
    })
  }

  onInsertNewSample = () => {
    this.redirectTo({
      formKey: 'insert-sample',
      query: '',  // or could be: ?red=/dashboard
    });
  }

  onUpdateSample = () => {
    this.redirectTo({
      formKey: 'update-sample',
      query: '',
    });
  }

  onStartExperiment = () => {
    this.redirectTo({
      formKey: 'run-experiment',
      query: '',
    });
  }

  onPrepareSample = () => {
    this.redirectTo({
      formKey: 'prepare-sample',
      query: '',
    });
  }

  render() {
    return (
      /*<div>
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
      </div>*/
      <div className={styles['buttons']}>
        <Button bsStyle="primary" bsSize="large" block onClick={this.onInsertNewSample}>Insert sample</Button>
        <Button bsStyle="primary" bsSize="large" block onClick={this.onUpdateSample}>Update sample</Button>
        <Button bsStyle="primary" bsSize="large" block onClick={this.onStartExperiment}>Start experiment</Button>
        <Button bsStyle="primary" bsSize="large" block disabled>View my experiments</Button>
        <Button bsStyle="primary" bsSize="large" block onClick={this.onPrepareSample}>Prepare sample</Button>
        <Button bsStyle="primary" bsSize="large" block disabled>View my samples</Button>
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
