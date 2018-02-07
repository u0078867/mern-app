import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import {
  Button,
} from 'react-bootstrap';


class ViewerWithEditLink extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: null,
    };
  }

  redirectToForm = (url) => {
    this.context.router.push(url);
  }

  onClick = () => {
    this.redirectToForm(this.state.url);
  }

  onFormFound = (form, formData) => {
    let dataQuery = btoa(JSON.stringify(formData));
    let url = `/forms/${form.slug}-${form.cuid}?d=${dataQuery}`;
    this.setState({
      url,
    })
  }

  render() {
    let { item, forms, ...props } = this.props;
    let Viewer = this.props.viewerComp;
    let viewer = (
      <Viewer
        item={item}
        forms={forms}
        onFormFound={this.onFormFound}
        showEditLink={true}
        onEdit={this.onClick}
      />
    )
    //<Link to={this.state.url} target="_self">Edit</Link>
    return (
      <div>
        {viewer}
      </div>
    )
  }

}

ViewerWithEditLink.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default ViewerWithEditLink;
