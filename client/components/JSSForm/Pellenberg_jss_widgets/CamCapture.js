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
    this.setValueFromProps(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setValueFromProps(nextProps);
  }

  setValueFromProps = (props) => {

  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  changeState = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.state.live) {
      const imageSrc = this.webcam.getScreenshot();
      console.log(`Image string length (base64-encoded): ${imageSrc.length}`);
      this.setState({
        live: false,
        imageSrc,
      }, () => this.props.onChange(this.state.imageSrc));
    } else {
      this.setState({
        live: true,
        imageSrc: null,
      }, () => this.props.onChange(undefined))
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
