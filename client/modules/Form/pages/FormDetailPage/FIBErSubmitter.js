import React, { Component, PropTypes } from 'react';
//import { Redirect } from 'react-router';
import { connect } from 'react-redux';
//import Helmet from 'react-helmet';
//import { FormattedMessage } from 'react-intl';
//import JSSForm from '../../../../components/JSSForm/JSSForm';
//import OutPortFeeder from '../../../../components/SocketPorts/OutPortFeeder';
//import { Button } from 'react-bootstrap';

//import callApi from '../../../../util/apiCaller';

// Import Style
//import styles from '../../components/FormListItem/FormListItem.css';

// Import Actions
//import { fetchForm, submitForm } from '../../FormActions';
import { addSubmRequest, fetchSubm, updateSubmRequest, acceptSubmRequest } from '../../../Subm/SubmActions';

// Import Selectors
//import { getForm, getCache } from '../../FormReducer';


class FIBErSubmitter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      validateForm: true,
      validateSubm: true,
      fileLink: null,
      showFileLink: false,
      isFormRefreshing: false,
    };
  }


  componentWillReceiveProps (nextProps) {
    if (nextProps.subm != this.props.subm) {

      var setFileLink = (res) => {
        var data = res.data;
        var json = JSON.stringify(data, null, 2);
        var blob = new Blob([json], {type: "application/json"});
        var url  = URL.createObjectURL(blob);
        this.setState({fileLink: url, showFileLink: true})
      }
      var postSubmit = () => {
        //this.context.router.push(this.props.redirectUrl);
        //this.sender.send('exited');
        console.log('done')
        this.setState({isFormRefreshing: true});
      }
      /*switch (this.state.submitType) {
        case 'submit_later':
          this.props.dispatch(addSubmRequest(subm))
          .then(() => postSubmit())
          .catch(err => console.log(err))
          break;
        case 'submit_now':
        case 'submit_now_no_validate':
          this.props.dispatch(addSubmRequest(subm)) // if there are erros in later actions, at least I have it in submissions
          .then(res => this.props.dispatch(updateSubmRequest(res.subm)))
          .then(res => this.props.dispatch(acceptSubmRequest(res.subm)))
          .then(res => setFileLink(res))
          .then(() => postSubmit())
          .catch(err => console.log(err))
          break;
      }*/
      console.log(this.state.submitType);
      console.log("subm")
      console.log(nextProps.subm);
      console.log(this.props.policy)

      let subm = nextProps.subm;

      switch (this.props.policy) {

        case '1-1':

          this.props.dispatch(addSubmRequest(subm))
          .then(res => this.props.dispatch(updateSubmRequest(res.subm)))
          .then(res => this.props.dispatch(acceptSubmRequest(res.subm)))
          .then(res => setFileLink(res))
          .then(() => postSubmit())
          .catch(err => console.log(err))
          break;

        case 'split-samples':

          /*let ids = subm.data.ids;
          if (ids) {
            let promises = ids.map(id => {
              let subm_ = JSON.parse(JSON.stringify(subm));
              subm_.ids = undefined;
              subm_.id = id;
              return Promise.resolve()
              this.props.dispatch(addSubmRequest(subm_))
              .then(res => this.props.dispatch(updateSubmRequest(res.subm)))
              .then(res => this.props.dispatch(acceptSubmRequest(res.subm)))
            })
            Promise.all(promises)
          }*/

          subm.validate_before_insert = false;

          this.props.dispatch(addSubmRequest(subm))
          .then(res => this.props.dispatch(updateSubmRequest(res.subm)))
          .then(res => {
            let ids = res.subm.data.ids;
            if (ids) {
              let promises = ids.map(id => {
                let subm_ = JSON.parse(JSON.stringify(res.subm));
                delete subm_.data.ids;
                subm_.data.id = id;
                console.log(subm_);
                return this.props.dispatch(acceptSubmRequest(subm_));
              })
              return Promise.all(promises);
            } else {
              return Promise.resolve();
            }
          })
          .then(() => postSubmit())
          .catch(err => console.log(err))


          break;

      }

    }
  }


  onClick = (event) => {
    let o = {
      submitType: event.target.id,
      validateForm: event.target.id == "submit_now" ? true : false,
      validateSubm: event.target.id == "submit_now_no_validate" ? false : true,
    }
    this.setState(o);
    this.props.onClick(o);
  }


  onRedirectDashboard = () => {
    this.context.router.push('/dashboard');
  }


  render() {

    return (
      <div>
        <button type="submit" className="btn btn-info" id="submit_now" onClick={this.onClick}>Validate and submit</button>
        {/*<button type="submit" className="btn btn-warning" id="submit_now_no_validate" onClick={this.onClick}>Send to database (don't validate schema)</button>*/}
        {/*<button title="Content will be added to submissions. Required fields check will be relaxed." type="submit" className="btn btn-info" id="submit_later" onClick={this.onClick}>Save to submissions and review later</button>*/}
        <button type="button" className="btn btn-info" id="redirect_dashboard" onClick={this.onRedirectDashboard}>Back to dashboard</button>
        {this.state.showFileLink ? <a href={this.state.fileLink} className="btn btn-link" download="submission.json">Download submitted data</a> : null}
        {/*this.state.showFileLink ? <Button bsStyle="link" href={this.state.fileLink}>File</Button> : null*/}
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
FIBErSubmitter.need = [
  //params => {return fetchForm(params.cuid)},
  //(params, state) => {return getUser(state)},
];

// Retrieve data from store as props
/*function mapStateToProps(state, props) {
  return {

  };
}*/

FIBErSubmitter.propTypes = {

};

FIBErSubmitter.contextTypes = {
  router: React.PropTypes.object.isRequired
}

//export default connect(mapStateToProps)(FormDetailPage);
export default FIBErSubmitter;
