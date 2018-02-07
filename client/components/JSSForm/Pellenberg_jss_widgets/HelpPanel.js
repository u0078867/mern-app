var React = require('react');
var classNames = require('classnames');

var Button = require('react-bootstrap/lib/Button');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Panel = require('react-bootstrap/lib/Panel');



var PanelHeaderToggle = React.createClass({
  propTypes: {
    toggleExpand: React.PropTypes.func.isRequired,
    header: React.PropTypes.node.isRequired,
    expanded: React.PropTypes.bool.isRequired,
    headerElement: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      headerElement: 'h3'
    }
  },

  toggleExpand(e) {
    e.preventDefault();
    this.props.toggleExpand();
  },

  renderButton() {
    var buttonStyles = {
      'collapsed': !this.props.expanded
    };
    var icon = this.props.expanded ? 'chevron-down' : 'chevron-right';
    return (
      <Button
        className={classNames(buttonStyles)}
        bsStyle="link"
        onClick={this.toggleExpand}>
        <Glyphicon glyph={icon} /> {' '}
        {this.props.header}
      </Button>
    );
  },

  render() {
    var HTag = this.props.headerElement;
    return (
      <div>
        <HTag className="panel-title">
          {this.renderButton()}
        </HTag>
      </div>
    );
  }
});

var CollapsablePanel = React.createClass({
  propTypes: {
    header: React.PropTypes.node.isRequired,
    children: React.PropTypes.node.isRequired,
    expanded: React.PropTypes.bool,
    toggleExpand: React.PropTypes.func,
    headerElement: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      headerElement: 'h3'
    }
  },

  getInitialState() {
    return {
      expanded: false
    };
  },

  toggleExpand() {
    var isExpanded = !this.isExpanded();
    this.setState({expanded:isExpanded});
    if(this.props.toggleExpand) {
      this.props.toggleExpand();
    }
  },

  isExpanded() {
    return this.props.expanded != null
      ? this.props.expanded
      : this.state.expanded;
  },

  render() {
    var isExpanded = this.isExpanded();
    var {headerElement, toggleExpand, ...props} = this.props;
    var header = (
        <PanelHeaderToggle
          header={this.props.header}
          headerElement={this.props.headerElement}
          expanded={isExpanded}
          toggleExpand={this.toggleExpand} />);
    return (
      <Panel {...props} header={header} collapsible expanded={isExpanded}>
        {this.props.children}
      </Panel>
    );
  }
});

var HelpPanel = React.createClass({
  propTypes: {
    header: React.PropTypes.node.isRequired,
    children: React.PropTypes.node.isRequired,
    expanded: React.PropTypes.bool,
    toggleExpand: React.PropTypes.func,
    headerElement: React.PropTypes.string
  },
  render(){
    return (
      <CollapsablePanel
        className="help-panel"
        header={this.props.header}
        headerElement={this.props.headerElement}
        expanded={this.props.expanded}
        toggleExpand={this.props.toggleExpand}>
        <div className="answer">
          {this.props.children}
        </div>
      </CollapsablePanel>
    );
  }
});

module.exports = HelpPanel;
