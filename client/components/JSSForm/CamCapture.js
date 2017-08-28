import React, { Component, PropTypes } from 'react';
import Webcam from 'react-webcam';


class CamCapture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null,
    };
  }

  componentDidMount = () => {
    this.setValueFromProps(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setValueFromProps(nextProps);
  }

  setValueFromProps = (props) => {
    let imageSrc = props.value;
    this.setState({ imageSrc });
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    console.log(imageSrc.length);
    this.props.onChange(imageSrc);
  };

  render() {
    return (
      <div>
        <button onClick={this.capture}>Capture photo</button>
        <Webcam
          audio={false}
          height={"100%"}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={"100%"}
        />
        Captured image:
        <br/>{this.state.imageSrc ? <img src={this.state.imageSrc} /> : null}
      </div>
    );
  }

}

CamCapture.propTypes = {
};

export default CamCapture;
