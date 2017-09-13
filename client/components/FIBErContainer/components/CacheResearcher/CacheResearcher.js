
import React, { Component, PropTypes } from 'react';
import pubsub from 'pubsub-js';

// Import Style
import styles from './CacheResearcher.css';


class CacheResearcher extends Component {

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
      pubsub.subscribe("int-cache-researcher", (msg, data) => {
        this.handleReceiveMessage({
          researcher: data,
        });
      })

    }

    render() {
        return <div>
            <div className={styles['pos-left']}>
              <div className={styles['inputs']}>
                <table><tbody>
                  <tr>
                    <td>Listening on internal topic:</td>
                    <td>int-cache-researcher</td>
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


export default CacheResearcher;
