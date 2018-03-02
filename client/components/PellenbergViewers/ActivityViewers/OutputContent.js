
import React, { PropTypes, Component } from 'react';

import {
  Panel
} from 'react-bootstrap';

import callApi from 'CLIENT_UTIL/apiCaller';

import { formatBytes } from 'CLIENT_UTIL/fileUtils';



class OutputContent extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let d = this.props.item;
    return (
      <div>
        <div><b>CUID:</b> {d.cuid}</div>
        <div>
          {(d.files_data && d.files_data.length) ?
            <div>
              <b>Files:</b>
              <FilesDataContent data={d.files_data} />
            </div>
          : null}
          {(d.metadata && d.metadata.length) ?
            <div>
              <b>Meta-data:</b>
              <MetadataContent data={d.metadata} />
            </div>
          : null}
          {(d.data && d.data.length) ?
            <div>
              <b>Data:</b>
              <DataContent data={d.data} />
            </div>
          : null}
        </div>
      </div>
    )
  }
}


class FilesDataContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fileURLs: {},
    }
  }

  generateFileURL = (storageURI) => {
    if (this.state.fileURLs[storageURI]) return;
    callApi(`minio/presigned-get-url?name=${storageURI}`)
    .then(res => {
      let URLs = Object.assign({}, this.state.fileURLs, { [storageURI]: res.url });
      console.log(URLs)
      this.setState({ fileURLs: URLs });
    })
    .catch(err => {
      let URLs = Object.assign({}, this.state.fileURLs, { [storageURI]: 'error' });
      this.setState({ fileURLs: URLs });
    })
  }

  render() {
    let d = this.props.data;
    return (
      <ul style={{"listStyleType": "disc", "listStylePosition": "inside"}}>
        {d.map(f => {
          return (
            <li key={f.storage_uri +  Math.random()}>
              <a href={this.state.fileURLs[f.storage_uri]} download={`${f.name}`} onMouseOver={() => this.generateFileURL(f.storage_uri)}>{f.name}</a>{f.type ? <i> ({f.type})</i> : null}, {formatBytes(f.size)};
            </li>
          )
        })}
      </ul>
    )
  }

}

class MetadataContent extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let d = this.props.data;
    return (
      <ul style={{"listStyleType": "disc", "listStylePosition": "inside"}}>
        {d.map(m => {
          return (
            <li key={m.name + Math.random()}>
              <b>{m.name}:</b> {m.value} {m.uom};
            </li>
          )
        })}
      </ul>
    )
  }

}

class DataContent extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let d = this.props.data;
    return (
      <ul style={{"listStyleType": "disc", "listStylePosition": "inside"}}>
        {d.map(da => {
          return (
            <li key={da.name +  Math.random()}>
              <b>{da.name}:</b> {da.value} {da.uom};
            </li>
          )
        })}
      </ul>
    )
  }

}


export default OutputContent;
