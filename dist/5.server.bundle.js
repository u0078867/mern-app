exports.ids = [5];
exports.modules = {

/***/ 103:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(5);
	
	var _SubmList = __webpack_require__(121);
	
	var _SubmList2 = _interopRequireDefault(_SubmList);
	
	var _SubmActions = __webpack_require__(47);
	
	var _SubmReducer = __webpack_require__(52);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	// Import Components
	
	
	// Import Actions
	
	
	// Import Selectors
	
	
	var SubmListPage = function (_Component) {
	  _inherits(SubmListPage, _Component);
	
	  function SubmListPage() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, SubmListPage);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SubmListPage.__proto__ || Object.getPrototypeOf(SubmListPage)).call.apply(_ref, [this].concat(args))), _this), _this.handleDeleteSubm = function (cuid) {
	      if (confirm('Do you want to delete this submission')) {
	        // eslint-disable-line
	        _this.props.dispatch((0, _SubmActions.deleteSubmRequest)(cuid));
	      }
	    }, _this.handleAcceptSubm = function (subm) {
	      if (confirm('Do you want to accept this submission')) {
	        // eslint-disable-line
	        console.log(subm);
	        _this.props.dispatch((0, _SubmActions.acceptSubmRequest)(subm));
	      }
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(SubmListPage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.dispatch((0, _SubmActions.fetchSubms)());
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {}, void 0, _jsx(_SubmList2.default, {
	        handleDeleteSubm: this.handleDeleteSubm,
	        handleAcceptSubm: this.handleAcceptSubm,
	        subms: this.props.subms
	      }));
	    }
	  }]);
	
	  return SubmListPage;
	}(_react.Component);
	
	// Actions required to provide data for this component to render in sever side.
	
	
	SubmListPage.need = [function () {
	  return (0, _SubmActions.fetchSubms)();
	}];
	
	// Retrieve data from store as props
	function mapStateToProps(state) {
	  return {
	    subms: (0, _SubmReducer.getSubms)(state)
	  };
	}
	
	SubmListPage.contextTypes = {
	  router: _react2.default.PropTypes.object
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(SubmListPage);

/***/ },

/***/ 121:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Components
	
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _SubmListItem = __webpack_require__(122);
	
	var _SubmListItem2 = _interopRequireDefault(_SubmListItem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function SubmList(props) {
	  return _jsx('div', {
	    className: 'listView'
	  }, void 0, props.subms.map(function (subm) {
	    return _jsx(_SubmListItem2.default, {
	      subm: subm,
	      onDelete: function onDelete() {
	        return props.handleDeleteSubm(subm.cuid);
	      },
	      onAccept: function onAccept() {
	        return props.handleAcceptSubm(subm);
	      }
	    }, subm.cuid);
	  }));
	}
	
	exports.default = SubmList;

/***/ },

/***/ 122:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Style
	
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(6);
	
	var _reactIntl = __webpack_require__(4);
	
	var _SubmListItem = {
	  "single-subm": "_2_O18KEYxI-i063lEn563R",
	  "subm-title": "HW436S3H26g_0RYD9dn1L",
	  "author-name": "_1ajuyNl7kHefugfh9YcESv",
	  "subm-desc": "_3yRSg5w_R_lj4lufKU1b4O",
	  "subm-action": "_2SQtYrh8ETuKO22fkyqsxB",
	  "divider": "_1LeBOCesERBRp46bqH3nyX",
	  "subm-detail": "erlMbBsuA3sqL-tThSup6"
	};
	
	var _SubmListItem2 = _interopRequireDefault(_SubmListItem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'deleteSubm'
	});
	
	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'acceptSubm'
	});
	
	function SubmListItem(props) {
	  return _jsx('div', {
	    className: _SubmListItem2.default['single-subm']
	  }, void 0, _jsx('h3', {
	    className: _SubmListItem2.default['subm-title']
	  }, void 0, _jsx(_reactRouter.Link, {
	    to: '/subms/' + props.subm.slug + '-' + props.subm.cuid
	  }, void 0, props.subm.form.title + ' (created: ' + props.subm.date_added + ')')), _jsx('p', {
	    className: _SubmListItem2.default['subm-action']
	  }, void 0, _jsx('a', {
	    href: '#',
	    onClick: props.onDelete
	  }, void 0, _ref)), _jsx('p', {
	    className: _SubmListItem2.default['subm-action']
	  }, void 0, _jsx('a', {
	    href: '#',
	    onClick: props.onAccept
	  }, void 0, _ref2)), _jsx('hr', {
	    className: _SubmListItem2.default.divider
	  }));
	}
	
	exports.default = SubmListItem;

/***/ }

};;