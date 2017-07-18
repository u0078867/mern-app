import React from 'react';
import update from 'react-addons-update';
import autobahn from 'autobahn';


let enabled = false;
let url = "";
let realm = "";
let topic = "";
let statusInPort = "status";
let data = {};

class WAMPSocket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.connection = null;
        this.session = null;
    }

    render() {
        return <div>
            <div><b>Url:</b> {this.props.url}</div>
            <div><b>Realm:</b> {this.props.realm}</div>
            {this.props.children}
        </div>
    }

    componentDidMount() {
        if (this.props.enabled) {
            this.setUpNewConnection(this.props.url, this.props.realm);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        let newUrl = nextProps.url;
        let newRealm = nextProps.realm;
        if (nextProps.enabled && !this.props.enabled) {
            this.setUpNewConnection(newUrl, newRealm);
        }
        if (!nextProps.enabled && this.props.enabled) {
            this.tearDownConnection();
        }
        if (newUrl != this.props.url || newRealm != this.props.realm) {
            if (nextProps.enabled) {
                this.setUpNewConnection(newUrl, newRealm);
            }
        }
        if (nextProps.data != this.props.data) {
          let port = nextProps.data.port;
          let data = nextProps.data.data;
          this.handleSend(port, data);
        }
    }

    tearDownConnection = () => {
        if (this.connection != null) { // close current connection if existing
            //if (this.connection.isOpen) {
                this.connection.close();
            //}
            this.connection = null;
            this.session = null;
        }
    }

    setUpNewConnection = (url, realm) => {
        this.tearDownConnection();
        if (url != "" && realm != "") {
            this.connection = new autobahn.Connection({
                url: url,
                realm: realm,
            });
            this.connection.onopen = (session, details) => {

                this.session = session;

                React.Children.map(this.props.children, (child) => {
                    if (React.isValidElement(child)) {
                        //console.log("valid element")
                        let childType = child.type.name;
                        if (childType == "InPort") {
                            let topic = child.props.port;
                            session.subscribe(topic, (args) => {
                                this.props.onData(topic, args[0]);
                                //console.log(`In-package forwarded to target in-port ${topic}`);
                            }).then((sub) => {
                                console.log(`WAMP socket subscribed to topic ${topic}`);
                                if (topic == this.props.statusInPort) {
                                    this.props.onData(topic, {data: 'WAMP connected'});
                                }
                            }, (err) => {
                                console.log(`WAMP socket not subscribed to topic ${topic}: ${err}`);
                            });
                        }
                    }
                });
            }

            this.connection.onclose = (reason, details) => {
                console.log("WAMP socket disconnected");
                this.props.onData(this.props.statusInPort, {data: 'WAMP diconnected'});
            }

            this.connection.open();
        }
    }

    handleSend = (port, data) => {
        if (this.connection != null && this.session != null) {
          this.session.publish(port, [data]);
        }
    }

}

WAMPSocket.defaultProps = {
    enabled: enabled,
    url: url,
    realm: realm,
    statusInPort: statusInPort,
}


export default WAMPSocket;
