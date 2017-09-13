import React, { Component, PropTypes } from 'react';
import Webcam from 'react-webcam';


class CamCapture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null,
      live: false,
    };
  }

  componentDidMount = () => {
    //console.log("componentDidMount:")
    this.setValueFromProps(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    //console.log("componentWillReceiveProps:")
    this.setValueFromProps(nextProps);
  }

  setValueFromProps = (props) => {
    //console.log("setValueFromProps:")
    //console.log(props.value)
    let imageSrc = props.value;
    if (imageSrc != null) {
      this.setState({
        live: false,
        imageSrc
      });
    } else {
      this.setState({
        live: true,
        imageSrc,
      });
    }
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  changeState = () => {
    //console.log(this.state.live)
    if (this.state.live) {
      const imageSrc = this.webcam.getScreenshot();
      console.log(`Image string length (base64-encoded): ${imageSrc.length}`);
      /*this.setState({
        live: false,
        imageSrc,
      }, () => this.props.onChange(this.state.imageSrc));*/
      this.props.onChange(imageSrc)
    } else {
      /*this.setState({
        live: true,
        imageSrc: null,
      }, () => this.props.onChange(null))*/
      this.props.onChange(null)
    }

  };

  render() {
    let {live, imageSrc} = this.state;
    if (live) {
      var widget =
        <Webcam
          audio={false}
          height={"100%"}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={"100%"}
        />;
      var buttonLabel = "Save screenshot";
    } else {
      var widget = imageSrc ? <img src={imageSrc} /> : null;
      var buttonLabel = "Go live";
    }
    return (
      <div>
        <button onClick={this.changeState}>{buttonLabel}</button>
        {widget}
      </div>
    );
  }

}

CamCapture.propTypes = {
};

export default CamCapture;
