

import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import styles from './Services.css';


class Services extends React.Component {
  render() {
    return <div>
      <Tabs defaultActiveKey={1} id= "services" animation={false} className={styles['tab']}>
      {
        React.Children.toArray(this.props.children).map((child, i) => {
          return <Tab
              key={i}
              eventKey={i+1}
              title={this.props.data[i].label}
              unmountOnExit={false}
              className={styles['tab-content']}
              >
            {child}
          </Tab>
        })
      }
      </Tabs>
    </div>
  }
}

export default Services;
