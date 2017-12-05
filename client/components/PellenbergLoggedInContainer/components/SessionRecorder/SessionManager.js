

import React from 'react';
import {
  Panel,
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

import SessionRecorder from './components/SessionRecorder';
import SessionReplayer from './components/SessionReplayer';

// Import Style
import styles from './SessionManager.css';



class SessionManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles['content']}>
        <Grid>
          <Row>
            <Col md={6}>
              <Panel header="Recording">
                <SessionRecorder {...this.props} />
              </Panel>
            </Col>
            <Col md={6}>
              <Panel header="Re-playing">
                <SessionReplayer {...this.props} />
              </Panel>
            </Col>
          </Row>
        </Grid>

      </div>
    )
  }

}

export default SessionManager;
