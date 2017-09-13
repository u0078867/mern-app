
import React from 'react';

export function SubjectViewer(props) {
  return <div>
    <div><b>CUID:</b> {props.cuid}</div>
    <div><b>Attributes:</b></div>
    {props.attributes && props.attributes.map(attribute => {
      return <div style={{paddingLeft: "10px"}} key={Math.random()}><b>{attribute.name}:</b> {attribute.value}</div>;
    })}
  </div>
}

export default SubjectViewer;
