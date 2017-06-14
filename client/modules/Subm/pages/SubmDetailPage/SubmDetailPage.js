import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import JSSForm from '../../../Form/components/JSSForm/JSSForm';

// Import Style
import styles from '../../components/SubmListItem/SubmListItem.css';

// Import Actions
import { fetchSubm, acceptSubm, updateSubmRequest } from '../../SubmActions';

// Import Selectors
import { getSubm } from '../../SubmReducer';


class SubmDetailPage extends Component {

  static defaultProps = {
    subm: {
      form: {
      }
    }
  }

  constructor(props) {
    super(props);
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
    this.props.dispatch(updateSubmRequest(subm));
  }

  render() {
    /*if (!this.props.subm.form)
      return null;*/
    return (
      <div>
        <Helmet title={this.props.subm.form.title} />
        <div className={`${styles['single-subm']} ${styles['subm-detail']}`}>
          <h3 className={styles['subm-title']}>{this.props.subm.form.title}</h3>
        </div>
        <JSSForm
          schema={this.props.subm.form.json_schema}
          uiSchema={this.props.subm.form.ui_schema}
          formData={this.props.subm.data}
          onSubmit={this.onSubmit}
        >
          <button type="submit">Save</button>
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

export default connect(mapStateToProps)(SubmDetailPage);
