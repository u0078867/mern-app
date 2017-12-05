import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import {
  Navbar,
  Nav,
  NavItem,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Alert,
} from 'react-bootstrap';

// Import Style
import styles from './DataView.css';

// Import Components


// Import Actions


// Import Selectors



import callApi from 'CLIENT_UTIL/apiCaller';
import callSearchApi from 'CLIENT_UTIL/apiSearchCaller';


class DataView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      collection: undefined,
      items: [],
      searchQuery: '',
    };
  }

  componentDidMount() {
    callApi('database/collections').then(res => {
      let collections = res.collections.map(c => c.name);
      this.setState({
        collections,
        collection: collections[0],
      });
    });
  }

  onChangeCollection = (event) => {
    let collection = event.target.value;
    this.setCollection(collection);
  }

  setCollection = (collection) => {
    this.setState({
      collection
    }, () => {
      this.filterItems(collection, this.state.searchQuery)
    })
  }

  onFilterItems = (event) => {
    var query = event.target.value;
    this.setState({
      searchQuery: query,
    }, () => {
      this.filterItems(this.state.collection, query);
    })
  }

  filterItems = (collection, query) => {
    callSearchApi(collection, query)
    .then(res => {
      let filteredItems = res.items;
      this.setState({ items: filteredItems });
    })
  }



  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <FormGroup>
                <ControlLabel>Search:</ControlLabel>
                {' '}
                <FormControl type="text" placeholder="Search" onChange={this.onFilterItems} />
              </FormGroup>
              {' '}
              <FormGroup>
                <ControlLabel>in collection:</ControlLabel>
                {' '}
                <FormControl componentClass="select" value={this.state.collection} onChange={this.onChangeCollection} >
                  {this.state.collections.map(collection => {
                    return <option key={collection} value={collection}>{collection}</option>
                  })}
                </FormControl>
              </FormGroup>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
        <ul style={{listStylePosition: 'inside'}}>
          {this.state.items.map(item => (
            <pre key={item.cuid}>{JSON.stringify(item, null, 2)}</pre>
          ))}
        </ul>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
DataView.need = [];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {

  };
}


DataView.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(DataView);
