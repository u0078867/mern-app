import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import {
  Navbar,
  Nav,
  NavItem,
  FormGroup,
  FormControl,
  Checkbox,
  ControlLabel,
  Button,
  Alert,
} from 'react-bootstrap';

import ViewerWithEditLink from '../../ViewerWithEditLink';

// Import Style
//import styles from './Summary.css';

// Import Components
import { getCollectionViewersMap } from 'DATA_VIEWERS';


import callApi from 'CLIENT_UTIL/apiCaller';



// Get custom viewers
const viewers = getCollectionViewersMap();


class TextSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      collectionName: undefined,
      items: [],
      searchQuery: '',
      showRawData: false,
    };
  }

  componentDidMount() {
    callApi('database/collections').then(res => {
      let collections = res.collections;
      this.setState({
        collections,
        collectionName: collections[0].name,
      });
    });
  }

  onChangeCollection = (event) => {
    let collectionName = event.target.value;
    this.setCollection(collectionName);
  }

  setCollection = (collectionName) => {
    this.setState({
      collectionName
    }, () => {
      this.getAllItems(collectionName)
    })
  }

  getAllItems = (collectionName) => {
    callApi(collectionName)
    .then(res => {
      let items = res.items;
      this.setState({ items });
    })
  }

  onShowRawData = (event) => {
    let checked = event.target.checked;
    this.setState({
      showRawData: checked
    })
  }



  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <FormGroup>
                <ControlLabel>Collection:</ControlLabel>
                {' '}
                <FormControl componentClass="select" value={this.state.collectionName} onChange={this.onChangeCollection} >
                  {this.state.collections.map(collection => {
                    return <option key={collection.name} value={collection.name}>{collection.title}</option>
                  })}
                </FormControl>
              </FormGroup>
              {' '}
              <FormGroup>
                <Checkbox onClick={this.onShowRawData}>Show raw data</Checkbox>
              </FormGroup>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
        <ul style={{listStylePosition: 'inside'}}>
          {this.state.items.map(item => {
            if (!this.state.showRawData && this.state.collectionName in viewers) {
              let Viewer = viewers[this.state.collectionName];
              return (
                <ViewerWithEditLink
                  key={item.cuid}
                  viewerComp={Viewer}
                  item={item}
                  forms={this.props.forms}
                />
              )
            }
            return (
              <pre key={item.cuid}>{JSON.stringify(item, null, 2)}</pre>
            )
          })}
        </ul>
      </div>
    );
  }
}



export default TextSearch;
