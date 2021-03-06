
import React from 'react';

export function AttributesViewer(props) {
  return <div>
    <div>
      <b>CUID:</b> {props.item.cuid}
    </div>
    <div style={{width:"250px"}}>
      <pre>{JSON.stringify(props.item, null, 2)}</pre>
    </div>

    {/*<div><b>Attributes:</b></div>
    {Object.keys(props.item).map(attribute => {
      return <div style={{paddingLeft: "10px"}} key={Math.random()}><b>{attribute.name}:</b> {attribute.value}</div>;
    })}*/}
  </div>
}

export default AttributesViewer;
