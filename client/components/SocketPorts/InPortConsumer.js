import React from 'react';
import pubsub from 'pubsub-js'

let data = null;

let dataInPort = "port";
let receiveCallback = (data) => {};

/*

-- NOTE:
This is the "smart" charting component, taking care of retrieving the data and
providing the "dumb" chart with it through its props.

*/

class InPortConsumer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: data,
        };
        this.token = null;
        this.recursiveCloneChildren = this.recursiveCloneChildren.bind(this);
        this._isMounted = false;
    }


    render() {
        return <div>{this.recursiveCloneChildren(this.props.children)}</div>
    }

    recursiveCloneChildren(children) {
        return React.Children.map(children, child => {
            var childProps = {};
            if (React.isValidElement(child)) {
                if (this.props.propagateDataToChildren) {
                    if (this.state.data != null) {
                        childProps = {data: this.state.data};
                    }
                }
            } else {
                return child;
            }
            childProps.children = this.recursiveCloneChildren(child.props.children);
            return React.cloneElement(child, childProps);
        })
    }

    componentDidMount() {
        this.setUpNewDataInConnection(this.props.dataInPort);
        this._isMounted = true;
    }

    componentWillUnmount() {
        if (this.token != null) { // close current connection if existing
            pubsub.unsubscribe(this.token);
            this.token = null;
        }
        this._isMounted = false;
    }

    componentWillUpdate(nextProps) { // cannot use componentWillUpdate(), since setUpNewDataInConnection() can change state
        let newPort = nextProps.dataInPort;
        if (newPort != this.props.dataInPort) {
            this.setUpNewDataInConnection(newPort);
        }
    }

    setUpNewDataInConnection(port) {
        if (this.token != null) { // close current connection if existing
            pubsub.unsubscribe(this.token);
            this.token = null;
        }
        if (port != "") {
            this.token = pubsub.subscribe(port, (msg, data) => { // arrow func to preserve 'this'
                if (this._isMounted) {
                    this.setState({data: data});
                    this.props.receiveCallback(data);
                }
            });
        }
    }

}

InPortConsumer.defaultProps = {
    dataInPort: dataInPort,
    receiveCallback: receiveCallback,
    propagateDataToChildren: true,
}


export default InPortConsumer;
