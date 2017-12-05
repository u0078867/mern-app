import React, { PropTypes, Component } from "react";
import fetch from 'isomorphic-fetch';
import callApi, {uploadFile, uploadFileMinIO} from 'CLIENT_UTIL/apiCaller';
import {
  FormGroup,
  FormControl,
  InputGroup,
  Button,
  ProgressBar,
  Alert,
} from 'react-bootstrap';



class FileField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filesInfo: [],
      uploads: [],
      showMessage: false,
      message: null,
    };
  }

  componentWillMount = () => {
    this.setValueFromProps(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setValueFromProps(nextProps);
  }

  setValueFromProps = (props) => {
    const { formData: value } = props;
    var values = [];
    if (value) {
      values = Array.isArray(value) ? value : [value];
    }
    Promise.all(extractFileInfo(values))
    .then(filesInfo => {
      this.setState({
        values,
        filesInfo,
      });
    })
  }

  onClear = event => {
    const { onChange } = this.props;
    this.setState({
      filesInfo: [],
      uploads: [],
      values: [],
    }, () => onChange([]));
  }

  onChange = event => {
    const { multiple, onChange } = this.props;
    let files = event.target.files;
    this.setState({
      filesInfo: [],
      uploads: [].map.call(files, file => {
        return {
          file: file.name,
          progress: 0,
        }
      })
    }, () => {

      processFiles(files, this.onProgress)
      .then(filesInfo => {
        const state = {
          values: JSON.parse(JSON.stringify(filesInfo)),
          filesInfo,
          showMessage: false,
        };
        this.setState(state, () => {
          onChange(state.values);
        });
      })
      .catch(err => {
        this.setState({
          showMessage: true,
          message: (
            <Alert
              bsStyle="danger"
              onDismiss={() => this.setState({showMessage: false})}
            >
              <p><strong>Error</strong> while uploading file:</p>
              <pre>{JSON.stringify(err, null, 2)}</pre>
            </Alert>
          )
        })
      })

    })

  };

  onProgress = (pct, fileName) => {
    let uploads = [].concat(this.state.uploads);
    uploads.find(u => u.file == fileName).progress = pct;
    this.setState({ uploads });
  }

  render() {
    const { multiple, id, readonly, disabled, autofocus, value } = this.props;
    const { filesInfo, progress, currentUpload, showMessage, message } = this.state;
    return (
      <div>
        <legend>{this.props.schema.title}</legend>
        <FormControl
          ref={ref => (this.inputRef = ref)}
          id={id}
          type="file"
          disabled={readonly || disabled}
          onChange={this.onChange}
          defaultValue=""
          autoFocus={autofocus}
          multiple={multiple}
          style={{color: 'transparent'}}
        /><br/>
        {this.state.uploads.map(u => {
          let progress = parseFloat(u.progress.toFixed(2));
          return (<ProgressBar key={u.file} now={progress} label={`${progress}% (${u.file})`} />)
        })}
        {showMessage ? message : null}
        <FilesInfo filesInfo={filesInfo} />
        <Button onClick={this.onClear}>Clear all files</Button><br/>
      </div>
    );
  }
}

/*function processFile(file) {
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
}*/

function processFile(file, progressCb) {
  const { name, size, type } = file;
  return new Promise((resolve, reject) => {
    uploadFileMinIO(file, progressCb)
    .then(res => {
      resolve({
        //newName: res.newFileName,
        storage_uri: name,
        name,
        size,
        type,
      });
    });
  });
}

function processFiles(files, progressCb) {
  return Promise.all([].map.call(files, file => processFile(file, progressCb)));
  //return Promise.all(files.map(file => processFile(file, progressCb)));
}

function FilesInfo(props) {
  const { filesInfo } = props;
  if (filesInfo.length === 0) {
    return null;
  }
  return (
    <ul style={{listStylePosition: 'inside'}}>
      {filesInfo.map((fileInfo, key) => {
        let { name, storage_uri, size, type, url } = fileInfo;
        if (!type) type = 'unknown type';
        return (
          <li key={key}>
            <strong>{name}</strong> ({type}, {size} bytes)<br/>
            Storage URI: {storage_uri}<br/>
            <a href={url} download={name}>Download link</a>
          </li>
        );
      })}
    </ul>
  );
}


function extractFileInfo(files) {
  return JSON.parse(JSON.stringify(files))
    .filter(file => typeof file !== "undefined")
    /*.map(file => {
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
      return o;
    })*/
    .filter(o => typeof o.name !== "undefined")
    .map(o => {
      return Promise.resolve()
      .then(() => {
        if (o.name) {
          return callApi(`minio/presigned-get-url?name=${o.name}`)
          .then(res => {
            o.url = res.url;
            return o;
          })
          .catch(err => {
            o.url = null;
            return o;
          })
        }
      })
    })
}

FileField.defaultProps = {
  autofocus: false,
  multiple: true,
};

FileField.propTypes = {
  multiple: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  autofocus: PropTypes.bool,
};

export default FileField;
