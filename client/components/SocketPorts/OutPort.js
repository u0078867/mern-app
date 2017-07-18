import React from 'react';
import pubsub from 'pubsub-js'

let port = "";
let sendCallback = (data) => {};

class OutPort extends React.Component {

    constructor(props) {
        super(props);
        this.token = null;
    }

    render() {
        return <div><b><i>--Out-port--</i></b>
            <div><b>Port: </b>{this.props.port}</div>
        </div>
    }

    componentDidMount() {
        //console.log("componentDidMount");
        this.setUpNewDataOutConnection(this.props.port);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.port != nextProps.port) {
          this.setUpNewDataOutConnection(nextProps.port);
        }
    }

    setUpNewDataOutConnection(port) {
        //console.log("setUpNewDataOutConnection")
        if (this.token != null) {
            pubsub.unsubscribe(this.token);
        }
        this.token = pubsub.subscribe(port, (msg, data) => {
            /*console.log('blaaaa')
            console.log(data);*/
            this.props.sendCallback(port, data);
        });
    }

}

OutPort.defaultProps = {
    port: port,
    sendCallback: sendCallback,
}


export default OutPort;
