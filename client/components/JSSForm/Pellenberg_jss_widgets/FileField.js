import React, { PropTypes, Component } from "react";
import fetch from 'isomorphic-fetch';
import callApi from 'CLIENT_UTIL/apiCaller';
import { MinIOUploader } from 'CLIENT_UTIL/minioHelper';
import { formatBytes } from 'CLIENT_UTIL/fileUtils';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  Button,
  ProgressBar,
  Alert,
  Glyphicon,
  Panel,
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import pubsub from 'pubsub-js';



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

  removeAllFiles = event => {
    pubsub.publish('uploaded_file', 'remove');
  }

  removeFile = (fileInfo) => {
    let filesInfo = this.state.filesInfo;
    let values = this.state.values;
    let idx = filesInfo.findIndex(e => e.storage_uri == fileInfo.storage_uri);
    const { onChange } = this.props;
    filesInfo.splice(idx, 1);
    values.splice(idx, 1);
    filesInfo = [].concat(filesInfo);
    values = [].concat(values);
    this.setState({
      filesInfo,
      values,
      showMessage: false,
    }, () => {
      onChange(values);
    });
  }

  onChange = event => {
    const { multiple, onChange } = this.props;
    let files = event.target.files;
    this.setState({
      uploads: [].map.call(files, file => {
        return {
          file
        };
      })
    })
  };

  createFile = (file, uploaded) => {
    let fileInfo = createFileInfo(file, uploaded);
    this.addFile(fileInfo);
    this.removeUpload(file.name);
  }

  addFile = (fileInfo) => {
    const { onChange } = this.props;
    let filesInfo = this.state.filesInfo;
    filesInfo = [].concat(filesInfo, fileInfo);
    let values = JSON.parse(JSON.stringify(filesInfo));
    this.setState({
      values,
      filesInfo,
      showMessage: false,
    }, () => {
      onChange(values);
    });
  }

  removeUpload = (fileName) => {
    let uploads = [].concat(this.state.uploads);
    let idx = uploads.findIndex(u => u.file.name == fileName);
    uploads.splice(idx, 1);
    this.setState({ uploads });
  }

  render() {
    const { multiple, id, readonly, disabled, autofocus, value } = this.props;
    const { filesInfo, progress, currentUpload, showMessage, message } = this.state;
    return (
      <div>
        <legend>{this.props.schema.title}</legend>
        <ControlLabel>Add files</ControlLabel>
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
        />
        <br/>
        {this.state.uploads.map(u => {
          return (
            <Upload
              key={u.file.name}
              file={u.file}
              onSuccess={this.createFile}
              onAbort={this.removeUpload}
            />
          )
        })}
        {showMessage ? message : null}
        <FilesInfo
          filesInfo={filesInfo}
          removeFile={this.removeFile}
        />
        <Button onClick={this.removeAllFiles}>Remove all files</Button><br/>
      </div>
    );
  }
}

class Upload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      showMessage: false,
      message: null,
    };
  }

  componentDidMount() {
    this.initUploader();
    this.upload();
  }

  onProgress = (pct, fileName) => {
    this.setState({
      progress: pct
    })
  }

  initUploader = () => {
    let { file } = this.props;
    this.uploader = new MinIOUploader(file, {useAlias: true, progressCb: this.onProgress});
  }

  upload = () => {
    this.uploader.upload()
    .then(res => {
      let { file } = this.props;
      this.props.onSuccess(file, res);
    })
    .catch(err => {
      let message = (
        <Alert
          bsStyle="danger"
          onDismiss={() => this.setState({showMessage: false})}
        >
          <p><strong>Error</strong> while uploading file:</p>
          <pre>{JSON.stringify(err, null, 2)}</pre>
        </Alert>
      );
      this.setState({
        message,
        showMessage: true,
      });
    })
  }

  abort = () => {
    let { file } = this.props;
    this.uploader.abort();
    this.props.onAbort(file.name);
  }

  render() {
    let { file } = this.props;
    let { progress, showMessage } = this.state;
    let progressShort = parseFloat(progress.toFixed(2));
    return (
      <div>
        <Grid>
          <Row>
            <Col md={8}>
              <ProgressBar style={{height:"30px"}} key={file.name} now={progressShort} label={`${progressShort}% (${file.name})`} />
            </Col>
            <Col md={1}>
              <Button bsStyle="link" onClick={this.abort}><Glyphicon glyph="remove" /></Button>
            </Col>
          </Row>
        </Grid>
        {showMessage ? message : null}
      </div>
    )
  }

}

function createFileInfo(file, uploaded) {
  const { name, size, type } = file;
  let fileInfo = {
    //storage_uri: `${uploaded.bucket}/${uploaded.name}`,
    storage_uri: `${uploaded.name}`,
    name,
    size,
    type,
  }
  return fileInfo;
}

function FilesInfo(props) {
  const { filesInfo } = props;
  if (filesInfo.length === 0) {
    return null;
  }
  return (
    <div>
      {filesInfo.map((fileInfo, key) => {
        let { name, storage_uri, size, type, url } = fileInfo;
        if (!type) type = 'unknown type';
        return (
          <FileInfo
            key={storage_uri}
            name={name}
            storageURI={storage_uri}
            size={size}
            type={type}
            url={url}
            onRemove={() => props.removeFile(fileInfo)}
          />
        );
      })}
    </div>
  );
}

class FileInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMessage: false,
      message: null,
    };
  }

  componentDidMount() {
    var token = pubsub.subscribe('uploaded_file', (msg, data) => {
      switch (data) {
        case 'remove':
          this.remove();
          break;
      }
    });
  }

  remove = () => {
    let { name } = this.props;
    callApi(`minio/remove-object?name=${name}`)
    .then(() => {
      console.log('removed')
      this.props.onRemove();
    })
    .catch(err => {
      let message = (
        <Alert
          bsStyle="danger"
          onDismiss={() => this.setState({showMessage: false})}
        >
          <p><strong>Error</strong> while removing file:</p>
          <pre>{JSON.stringify(err, null, 2)}</pre>
        </Alert>
      );
      this.setState({
        message,
        showMessage: true,
      });
    })
  }

  render() {
    let { name, storageURI, size, type, url } = this.props;
    console.log(this.props)
    let { showMessage, message } = this.state;
    let deleter = (
      <Button bsStyle="link" onClick={this.remove}><Glyphicon glyph="remove" /></Button>
    )
    return (
      <div>
        <Panel header={deleter}>
          <strong>{name}</strong> ({type}, {formatBytes(size)})<br/>
          Storage URI: {storageURI}<br/>
          <a href={url} download={name}>Download link</a>
        </Panel>
        {showMessage ? message : null}
      </div>
    )
  }

}


function extractFileInfo(files) {
  return JSON.parse(JSON.stringify(files))
    .filter(file => typeof file !== "undefined")
    .filter(o => typeof o.name !== "undefined")
    .map(o => {
      return Promise.resolve()
      .then(() => {
        if (o.name) {
          let alias = o.storage_uri;
          return callApi(`minio/presigned-get-url?name=${alias}`)
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
