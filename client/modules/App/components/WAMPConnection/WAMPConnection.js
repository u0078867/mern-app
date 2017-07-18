
import React, { Component, PropTypes } from 'react';

import InPort from '../../../../components/SocketPorts/InPort';
import OutPort from '../../../../components/SocketPorts/OutPort';
import WAMPSocket from '../../../../components/SocketPorts/WAMPSocket';

// Import Style
import styles from './WAMPConnection.css';


class WAMPConnection extends Component {

    constructor(props) {
      super(props);
      this.state = {
        urlStream: "ws://127.0.0.1:8002/ws",
        realmStream: "realm1",
        enabled: false,
      };
    }

    render() {
      return <div>
        <div className={styles['pos-left']}>
          <div className={styles['inputs']}>
            <table><tbody>
              <tr>
                <td>Url:</td>
                <td><input type="text" value={this.state.urlStream} onChange={this.setUrlStream} /></td>
              </tr>
              <tr>
                <td>Realm:</td>
                <td><input type="text" value={this.state.realmStream} onChange={this.setRealmStream} /></td>
              </tr>
              <tr>
                <td>Enabled:</td>
                <td><input type="checkbox" checked={this.state.enabled} onChange={this.setEnabled} /></td>
              </tr>
            </tbody></table>
          </div>
        </div>
        <div className={styles['pos-right']}>
          <div className={styles['summary']}>
            <WAMPSocket
              enabled={this.state.enabled}
              url={this.state.urlStream}
              realm={this.state.realmStream}
              statusInPort="ws-status"
              onData={this.onData}
              data={this.state.socketData}
            >

                <InPort port="ws-status" data={this.state['ws-status']} buffered={false} showContent={true} />

                <InPort port="wf-task-enter" data={this.state['wf-task-enter']} buffered={false} showContent={true} />

                <OutPort port="wf-task-exit" sendCallback={this.sendCallback} />

            </WAMPSocket>
          </div>
        </div>
      </div>
    }

    setUrlStream = (event) => {
      let newUrl = event.target.value;
      this.setState({urlStream: newUrl});
    }

    setRealmStream = (event) => {
      let newRealm = event.target.value;
      this.setState({realmStream: newRealm});
    }

    setEnabled = (event) => {
      let enabled = event.target.checked;
      this.setState({enabled: enabled});
    }

    onData = (port, data) => {
      this.setState({
        [port]: data,
      });
    }

    sendCallback = (port, data) => {
      this.setState({
        socketData: {
          port,
          data
        }
      })
    }

}


export default WAMPConnection;
