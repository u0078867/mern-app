import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
  Button,
  Tooltip,
  Popover,
  OverlayTrigger,
} from 'react-bootstrap';

// Import Style
import styles from './DashboardPage.css';
import stackedWindowsImg from './wf-win-stacked.png';
console.log(stackedWindowsImg)

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
    let overlay = (
      <Popover id="img-workflow">
        <img src={stackedWindowsImg} className={styles['img']} />
      </Popover>
    )
    return (
      <div>
        <h3><b>Perform the following steps:</b></h3>
        <ol style={{listStylePosition: 'inside'}} className={styles['op-list']}>
          <li>Go to <b>Profile</b> panel and load a profile JSON file.</li>
          <li>Go to <b>Session recorder / re-player</b> and type an unambiguous session ID.</li>
          <li>Go to <b>Work-flow engine</b> panel and load a BPMN file.</li>
          <li>In the same panel, load a work-flow variables JSON file.</li>
          <li>It is suggested to stack windows as shown <OverlayTrigger overlay={overlay}><a style={{cursor: "pointer"}}>here</a></OverlayTrigger>, before running the workflow</li>
        </ol>
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
