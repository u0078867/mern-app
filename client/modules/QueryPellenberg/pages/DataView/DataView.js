import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import {
  Tab,
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap';

import ViewerWithEditLink from './ViewerWithEditLink';

// Import Style

// Import Components
import TextSearch from './components/TextSearch/TextSearch';
import Summary from './components/Summary/Summary';
import ActivitiesBySession from './components/ActivitiesBySession/ActivitiesBySession';

// Import Actions
import { fetchForms } from '../../../Form/FormActions';

// Import Selectors
import { getForms } from '../../../Form/FormReducer';


class DataView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      queryComp: TextSearch,
    };
  }

  onTabChange = (key) => {
    let queryComp;
    switch (key) {
      case 'text-search':
        queryComp = TextSearch;
        break;
      case 'summary':
        queryComp = Summary;
        break;
      case 'search-activity-by-session':
        queryComp = ActivitiesBySession;
        break;
      default:
        queryComp = null;
    }
    this.setState({
      queryComp,
    })
  }


  render() {
    let { queryComp: QueryPage } = this.state;
    let page = QueryPage ? (
      <QueryPage
        forms={this.props.forms}
      />
    ) : null;
    return (
      <div>
        <Tab.Container id="modules" defaultActiveKey="text-search" onSelect={this.onTabChange}>
          <Nav bsStyle="pills">
            <NavItem eventKey="summary">Summary</NavItem>
            <NavItem eventKey="text-search">Text search</NavItem>
            <NavItem eventKey="search-activity-by-session">Search activities by session</NavItem>
          </Nav>
        </Tab.Container>
        <br/>
        {page}
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
DataView.need = [() => { return fetchForms(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    forms: getForms(state),
  };
}


DataView.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(DataView);
