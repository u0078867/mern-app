import React, { PropTypes, Component } from "react";
import fetch from 'isomorphic-fetch';
import {uploadFile} from '../../util/apiCaller';
//import PropTypes from "prop-types";

//import { dataURItoBlob, shouldRender, setState } from "../../utils";


class RawFileWidget extends Component {
  /*defaultProps = {
    multiple: false,
  };*/

  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    this.setValueFromProps(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setValueFromProps(nextProps);
  }

  setValueFromProps = (props) => {
    const { value } = props;
    const values = Array.isArray(value) ? value : [value];
    this.setState({
      values,
      filesInfo: extractFileInfo(values)
    });
  }

  /*shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }*/

  onChange = event => {
    const { multiple, onChange } = this.props;
    processFiles(event.target.files).then(filesInfo => {
      //console.log(filesInfo);
      const state = {
        values: filesInfo.map(fileInfo => JSON.stringify(fileInfo)),
        filesInfo,
      };
      this.setState(state, () => {
        if (multiple) {
          onChange(state.values);
        } else {
          onChange(state.values[0]);
        }
      });
    });
  };

  render() {
    //const { multiple, id, readonly, disabled, autofocus } = this.props;
    const { multiple, id, readonly, disabled, autofocus, value } = this.props;
    const { filesInfo } = this.state;
    return (
      <div>
        <p>
          <input
            ref={ref => (this.inputRef = ref)}
            id={id}
            type="file"
            disabled={readonly || disabled}
            onChange={this.onChange}
            defaultValue=""
            autoFocus={autofocus}
            multiple={multiple}
            style={{color: 'transparent'}}
          />
        </p>
        <FilesInfo filesInfo={filesInfo} />
      </div>
    );
  }
}

/*function addNameToDataURL(dataURL, name) {
  return dataURL.replace(";base64", `;name=${name};base64`);
}*/

/*function processFile(file) {
  const { name, size, type } = file;
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.onload = event => {
      resolve({
        dataURL: addNameToDataURL(event.target.result, name),
        name,
        size,
        type,
      });
    };
    reader.readAsDataURL(file);
  });
}*/

function processFile(file) {
  const { name, size, type } = file;
  return new Promise((resolve, reject) => {
    uploadFile(file)
    .then(res => {
      console.log('response:');
      console.log(res);
      resolve({
        newName: res.newFileName,
        name,
        size,
        type,
      });
    });
  });
}

function processFiles(files) {
  return Promise.all([].map.call(files, processFile));
}

function FilesInfo(props) {
  const { filesInfo } = props;
  if (filesInfo.length === 0) {
    return null;
  }
  return (
    <ul className="file-info">
      {filesInfo.map((fileInfo, key) => {
        let { name, newName, size, type } = fileInfo;
        if (!type) type = 'unknown type';
        return (
          <li key={key}>
            <strong>{name}</strong> ({type}, {size} bytes) -> {newName}
          </li>
        );
      })}
    </ul>
  );
}

/*function extractFileInfo(dataURLs) {
  return dataURLs
    .filter(dataURL => typeof dataURL !== "undefined")
    .map(dataURL => {
      const { blob, name } = dataURItoBlob(dataURL);
      return {
        name: name,
        size: blob.size,
        type: blob.type,
      };
    });
}*/

function extractFileInfo(files) {
  return files
    .filter(file => typeof file !== "undefined")
    .map(file => {
      //const { blob, name } = dataURItoBlob(value);
      try {
        var { name, newName, size, type } = JSON.parse(file);
      } catch(e) {
        var name = newName = size = type = undefined;
      }
      let o = {
        name,
        newName,
        size,
        type,
      };
      //console.log(o);
      return o;
    });
}

/*RawFileWidget.defaultProps = {
  autofocus: false,
  multiple: false,
};*/

RawFileWidget.propTypes = {
  multiple: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  autofocus: PropTypes.bool,
};

export default RawFileWidget;
