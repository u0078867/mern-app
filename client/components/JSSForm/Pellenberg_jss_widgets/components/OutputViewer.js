
import React, { PropTypes, Component } from 'react';

import {
  Panel
} from 'react-bootstrap';

import OutputContent from 'DATA_VIEWERS/OutputContent';



export function OutputViewer(props) {
  let item = props.item;
  let forms = props.forms;
  return <div>
    <Panel header={`${item.name}`}>
      <OutputContent item={item} forms={forms}/>
    </Panel>

  </div>
}

export default OutputViewer;
