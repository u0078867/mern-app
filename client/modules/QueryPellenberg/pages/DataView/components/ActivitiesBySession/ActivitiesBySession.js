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
//import styles from './ActivitiesBySession.css';

// Import Components
import { getCollectionViewersMap } from 'DATA_VIEWERS';


/*import callApi from 'CLIENT_UTIL/apiCaller';
import callSearchApi from 'CLIENT_UTIL/apiSearchCaller';*/
import callGraphQL from 'CLIENT_UTIL/graphqlCaller';



// Get custom viewers
const viewers = getCollectionViewersMap();

// Get activities viewer
let Viewer = viewers['activities'];

let queryText = `
  query MyQuery($session: String) {
  	activitiesBySession(session: $session) {
    	...activityFull
    }
  }

  fragment activityFull on Activity {
    cuid
    registered_by {
      cuid
      name
      surname
    }
    date_added
    name
    type
    session
    datetime_ended
    researchers {
      data {
        cuid
        name
        surname
      }
    }
    subjects {
      data {
        cuid
        registered_by {
          cuid
          name
          surname
        }
        hospital_id
      }
      task
      anatomical_areas
      anatomical_side
    }
    devices {
      data {
        cuid
        registered_by {
          cuid
          name
          surname
        }
        name
        functions
        producer
        uri
        attributes {
          ... on NumericAttribute {
            name
            numeric_value: value
            uom
          }
          ... on StringAttribute {
            name
            string_value: value
          }
          ... on BooleanAttribute {
            name
            boolean_value: value
          }
          ... on NoValueAttribute {
          name
          uom
        }
        }
      }
      roles
    }
    software {
      data {
        cuid
        registered_by {
          cuid
          name
          surname
        }
        name
        version
        producer
        uri
      }
      roles
    }
    projects {
      data {
        cuid
        registered_by {
          cuid
          name
          surname
        }
        name
      }
    }
    publications {
      data {
        cuid
        registered_by {
          cuid
          name
          surname
        }
        title
      }
    }
    data {
      data {
        cuid
        name
      }
      roles
    }
    outputs {
      cuid
      name
      files_data {
        name
        storage_uri
        size
        type
      }
      metadata {
        ... on NumericAttribute {
          name
          numeric_value: value
          uom
        }
        ... on StringAttribute {
          name
          string_value: value
        }
        ... on BooleanAttribute {
          name
          boolean_value: value
        }
        ... on NoValueAttribute {
          name
          uom
        }
      }
      data {
        ... on NumericAttribute {
          name
          numeric_value: value
          uom
        }
        ... on StringAttribute {
          name
          string_value: value
        }
        ... on BooleanAttribute {
          name
          boolean_value: value
        }
        ... on NoValueAttribute {
          name
          uom
        }
      }
    }
  }
`;


class ActivitiesBySession extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      session: '',
      showRawData: false,
    };
  }

  componentDidMount() {
  }

  onSessionChange = (event) => {
    var session = event.target.value;
    this.setState({ session });
  }

  onSearch = () => {
    let { session } = this.state;
    let variables = {
      session,
    }
    callGraphQL(queryText, variables)
    .then(res => {
      console.log(res)
      let items = res.activitiesBySession;
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
                <ControlLabel>Session:</ControlLabel>
                {' '}
                <FormControl type="text" placeholder="Search" onChange={this.onSessionChange} />
              </FormGroup>
              {' '}
              <Button bsStyle="primary" onClick={this.onSearch}>Search</Button>
              {' '}
              <FormGroup>
                <Checkbox checked={this.state.showRawData} onClick={this.onShowRawData}>Show raw data</Checkbox>
              </FormGroup>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
        <ul style={{listStylePosition: 'inside'}}>
          {this.state.items.map(item => {
            if (!this.state.showRawData) {
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



export default ActivitiesBySession;
