
import React, { Component, PropTypes } from 'react';
import InPortConsumer from '../../../../components/SocketPorts/InPortConsumer';
import OutPortFeeder from '../../../../components/SocketPorts/OutPortFeeder';

// Import Style
import styles from './WorkFlowClient.css';


class WorkFlowClient extends Component {

    constructor(props) {
      super(props);
      this.state = {
        enabled: false,
      }
      this.sender = new OutPortFeeder({dataOutPort: 'wf-test'});
      /*setInterval(() => {
        this.sender.send(Math.random());
      }, 2000);*/
    }

    handleReceiveMessage = (data) => {
      if (this.state.enabled) {
        this.props.onEnterTask(data);
      }
    }

    render() {
        return <div>
            <div className={styles['pos-left']}>
              <div className={styles['inputs']}>
                <table><tbody>
                  <tr>
                    <td>Listening on port:</td>
                    <td>wf-task</td>
                  </tr>
                  <tr>
                    <td>Writing to port:</td>
                    <td>wf-test</td>
                  </tr>
                  <tr>
                    <td>Enabled:</td>
                    <td><input type="checkbox" checked={this.state.enabled} onChange={this.setEnabled} /></td>
                  </tr>
                </tbody></table>
              </div>
            </div>
            <InPortConsumer dataInPort="wf-task" receiveCallback={this.handleReceiveMessage} />
        </div>
    }

    setEnabled = (event) => {
      let enabled = event.target.checked;
      this.setState({enabled: enabled});
    }

}


export default WorkFlowClient;
