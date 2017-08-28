import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import JSSForm from '../../../../components/JSSForm/JSSForm';

// Import Style
import styles from '../../components/SubmListItem/SubmListItem.css';

// Import Actions
import { fetchSubm, acceptSubmRequest, updateSubmRequest } from '../../SubmActions';

// Import Selectors
import { getSubm, getCache } from '../../SubmReducer';


class SubmDetailPage extends Component {

  static defaultProps = {
    subm: {
      form: {
      }
    }
  }

  constructor(props) {
    super(props);
    console.log(this.props.subm.data)
    this.state = {
      formData: this.props.subm.data,
      validateForm: true,
    };
  }

  componentDidMount() {
    /*console.log('componentDidMount');
    if (!this.props.subm.form)
      this.props.dispatch(fetchSubm(this.props.subm.cuid));
    */
  }

  onSubmit = ({formData}) => {
    let subm = Object.assign({}, this.props.subm, {
      'form': this.props.subm.form._id,
      'data': formData,
    });
    console.log(subm)
    var postAction = () => {
      this.context.router.push('/subms');
    }
    switch (this.state.action) {
      case 'save':
        this.props.dispatch(updateSubmRequest(subm))
        .then(() => postAction());
        break;
      case 'submit':
        this.props.dispatch(updateSubmRequest(subm))
        .then(res => this.props.dispatch(acceptSubmRequest(res.subm)))
        .then(() => postAction());
        break;
    }
  }

  onChange = ({formData}) => {
    this.setState({
      formData
    })
  }

  onClick = (event) => {
    this.setState({
      action: event.target.id,
      validateForm: event.target.id == "submit" ? true : false,
    })
  }

  render() {
    let formContext = {
      cache: this.props.cache,
    };
    return (
      <div>
        <Helmet title={this.props.subm.form.title} />
        <div className={`${styles['single-subm']} ${styles['subm-detail']}`}>
          <h3 className={styles['subm-title']}>{this.props.subm.form.title}</h3>
        </div>
        <JSSForm
          schema={this.props.subm.form.json_schema}
          uiSchema={this.props.subm.form.ui_schema}
          formData={this.state.formData}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          listenToInternalEvents={true}
          formContext={formContext}
          noHtml5Validate={!this.state.validateForm}
          noValidate={!this.state.validateForm}
        >
          <button type="submit" className="btn btn-info" id="save" onClick={this.onClick}>Save</button>
          <button type="submit" className="btn btn-info" id="submit" onClick={this.onClick}>Submit</button>
        </JSSForm>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
SubmDetailPage.need = [params => {
  return fetchSubm(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    subm: getSubm(state, props.params.cuid),
    cache: getCache(state),
  };
}

SubmDetailPage.propTypes = {
  subm: PropTypes.shape({
    //name: PropTypes.string.isRequired,
    //title: PropTypes.string.isRequired,
    //content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

SubmDetailPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(SubmDetailPage);
