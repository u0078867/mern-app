import React from 'react';
import pubsub from 'pubsub-js'

let data = {};
let dataOutPort = "command";



class OutPortFeeder extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return <div></div>;
    }

    componentDidMount() {
        if (!this.props.data) {
            this.handleNewPackageOut(this.props.dataOutPort, this.props.data);
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.dataOutPort == this.props.dataOutPort) {
            this.handleNewPackageOut(nextProps.dataOutPort, nextProps.data);
        }
    }

    handleNewPackageOut = (port, data) => {
        if (port != "") {
            pubsub.publishSync(port, data);
            console.log("Out-package published");
        } else {
            console.log("Output port name is empty");
        }
    }

    send(data) {
        this.handleNewPackageOut(this.props.dataOutPort, data);
    }

}

OutPortFeeder.defaultProps = {
    data: data,
    dataOutPort: dataOutPort,
}


export default OutPortFeeder;
