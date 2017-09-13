
import React, { Component, PropTypes } from 'react';



// Import Style
import styles from './KULBadgeToUser.css';


class KULBadgeToUser extends Component {

    constructor(props) {
      super(props);
      this.state = {
        enabled: true,
      }
      this.typed = "";
    }

    handleReceiveMessage = (data) => {
      if (this.state.enabled) {
        this.props.onUserFound(data);
      }
    }

    componentDidMount() {

      // register keypress handler
      var keypressHandler = (e) => {
        //console.log(e)
        if (e.keyCode == 13) {
            //console.log("string terminated");
            // extract user id from string
            var tokens = this.typed.split(";");
            //console.log(tokens)
            if (tokens.length != 4) {
              //console.log('wrong badge data format');
              return
            }
            //console.log('correct badge data format');
            this.handleReceiveMessage(tokens);
            // reset what typed
            this.typed = "";
        } else {
          this.typed = this.typed.concat(e.key);
          if (this.typed.length > 100) {
            this.typed = "";
          }
          //console.log(this.typed);
        }
      };
      window.addEventListener("keypress", keypressHandler, false);

    }

    render() {
        return <div>
            <div className={styles['pos-left']}>
              <div className={styles['summary']}>
                Description:<br/><br/>
                <ul>
                  <li>It will wait for an user to badge with KULeuven badge;</li>
                  <li>From the string provided "name;surname;unumber;applicationid", it will tokenize it;</li>
                </ul>
              </div>
              <div className={styles['inputs']}>
                <table><tbody>
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


export default KULBadgeToUser;
