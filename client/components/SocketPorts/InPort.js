import React from 'react';
import pubsub from 'pubsub-js'

let port = "";
let data = {};
let buffered = true;
let maxBufferSize = 1000;
let digestInterval = 10; // ms
let send = true;
let showContent = false;


class InPort extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bufferLength: 0,
        };
        this.digestSinglePackage = this.digestSinglePackage.bind(this);
        this.handleNewPackage = this.handleNewPackage.bind(this);
        this.buffer = [];
        this.digestLoop = null;
        this._isMounted = false;
    }

    render() {
        //return null

        let bufferedInfo = undefined;
        if (this.props.buffered) {
            bufferedInfo = <div>
                <div><b>Buffer size:</b> {this.props.maxBufferSize}</div>
                <div><b>Current buffered frames:</b> {this.state.bufferLength}</div>
                <div><b>Single package digest interval (ms):</b> {this.props.digestInterval}</div>
            </div>;
        }
        let content = undefined;
        if (this.props.showContent) {
            content = <div>
                <div><b>Content:</b> {JSON.stringify(this.props.data.data)}</div>
            </div>;
        }
        return <div><b><i>--In-port--</i></b>
            <div><b>Port</b> {this.props.port}</div>
            <div><b>Buffered:</b> {this.props.buffered ? "true" : "false"}</div>
            {bufferedInfo}
            {content}
        </div>

    }

    componentDidMount() {
        if (this.props.buffered) { // activate timed digesting
            this.digestLoop = setInterval(this.digestSinglePackage, this.props.digestInterval);
        }
        this._isMounted = true;
    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentWillUnmount() {
        if (this.props.buffered) { // activate timed digesting
            clearInterval(this.digestLoop);
        }
        this._isMounted = false;
    }

    componentWillReceiveProps(nextProps) {
        if (Object.keys(nextProps.data).length == 0) return; // check must involve default value for no data: {}
        if (this.props.data != nextProps.data)
            this.handleNewPackage(nextProps.data, nextProps.port, nextProps.buffered, nextProps.maxBufferSize, nextProps.send);
        if (nextProps.buffered != this.props.buffered) {
            if (nextProps.buffered) { // activate timed digesting
                this.digestLoop = setInterval(this.digestSinglePackage, nextProps.digestInterval);
            } else { // de-activate timed digesting
                clearInterval(this.digestLoop);
                this.buffer = [];
            }
        }
        if (nextProps.digestInterval != this.props.digestInterval) {
            if (nextProps.buffered && this.props.buffered) {
                clearInterval(this.digestLoop);
                this.digestLoop = setInterval(this.digestSinglePackage, nextProps.digestInterval);
            }
        }
    }

    handleNewPackage(pckg, port, buffered, maxBufferSize, send) {
        //console.log("NEWWW")
        //console.log("In-buffer size: " + this.buffer.length);
        if (buffered) { // add package to buffer
            for (let i = 0; i < pckg.data.length; i++) {
                this.buffer.push(pckg.data[i]);
                if (this.buffer.length > maxBufferSize) { // buffer is full; drop some data
                    this.buffer.shift();
                    //console.log("In-buffer full; old in-packages were dropped");
                }
                this.setState({bufferLength: this.buffer.length});
            }
            //console.log("All new in-packages added to in-buffer");
        } else { // or send it immediately
            if (port != "") {
                if (send) {
                    pubsub.publishSync(port, pckg.data);
                    //console.log("All new in-packages published immediately");
                }
            } else {
                //console.log("Input port name is empty");
            }
        }
    }

    digestSinglePackage() {
        if (this.props.port != "") {
            if (this.buffer.length == 0) return;
            let d = this.buffer.shift();
            this.setState({bufferLength: this.buffer.length});
            if (this.props.send) {
                pubsub.publishSync(this.props.port, [d]);
                //console.log("Single in-package published");
            }
            //console.log("In-buffer size: " + this.buffer.length);
        } else {
            //console.log("Input port name is empty");
        }
    }

}

InPort.defaultProps = {
    port: port,
    data: data,
    buffered: buffered,
    maxBufferSize: maxBufferSize,
    digestInterval: digestInterval,
    send: send,
    showContent: showContent,
}


export default InPort;
