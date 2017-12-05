
import React, { Component, PropTypes } from 'react';
import pubsub from 'pubsub-js';

// Import Style
import styles from './Cache.css';


class Cache extends Component {

    constructor(props) {
      super(props);
      this.state = {
        enabled: true,
      }
      this.typed = "";
    }

    handleReceiveMessage = (data) => {
      if (this.state.enabled) {
        this.props.onNewValue(data);
      }
    }

    componentDidMount() {

      // listen to used values
      pubsub.subscribe("cache", (msg, data) => {
        this.handleReceiveMessage(data);
      })

    }

    render() {
        return <div>
            <div className={styles['pos-left']}>
              <div className={styles['inputs']}>
                <table><tbody>
                  <tr>
                    <td>Description:</td>
                    <td>
                      <div>
                        <p>Service that caches some information entered in the following form widgets:</p>
                        <ul style={{listStylePosition: 'inside'}}>
                          <li>researcher</li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Enabled:</td>
                    <td><input type="checkbox" checked={this.state.enabled} onChange={this.setEnabled} /></td>
                  </tr>
                </tbody></table>
              </div>
            </div>
        </div>
    }

    setEnabled = (event) => {
      let enabled = event.target.checked;
      this.setState({enabled: enabled});
    }

}


export default Cache;
