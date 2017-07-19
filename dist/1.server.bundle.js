exports.ids = [1];
exports.modules = {

/***/ 104:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.API_URL = undefined;
	exports.default = callApi;
	
	var _isomorphicFetch = __webpack_require__(46);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _config = __webpack_require__(3);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var API_URL = exports.API_URL = typeof window === 'undefined' || "production" === 'test' ? process.env.BASE_URL || 'http://localhost:' + (process.env.PORT || _config2.default.port) + '/search-api' : '/search-api';
	
	function callApi(endpoint, query) {
	  return (0, _isomorphicFetch2.default)(API_URL + '/' + endpoint + '?q=' + query, {
	    headers: { 'content-type': 'application/json' },
	    method: 'get'
	    //body: JSON.stringify(body),
	  }).then(function (response) {
	    return response.json().then(function (json) {
	      return { json: json, response: response };
	    });
	  }).then(function (_ref) {
	    var json = _ref.json,
	        response = _ref.response;
	
	    if (!response.ok) {
	      return Promise.reject(json);
	    }
	
	    return json;
	  }).then(function (response) {
	    return response;
	  }, function (error) {
	    return error;
	  });
	}

/***/ },

/***/ 106:
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
	
	var _reactSelect = __webpack_require__(105);
	
	var _reactSelect2 = _interopRequireDefault(_reactSelect);
	
	var _apiSearchCaller = __webpack_require__(104);
	
	var _apiSearchCaller2 = _interopRequireDefault(_apiSearchCaller);
	
	var _apiCaller = __webpack_require__(10);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	var _pubsubJs = __webpack_require__(11);
	
	var _pubsubJs2 = _interopRequireDefault(_pubsubJs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DeviceSearchOption = function (_Component) {
	  _inherits(DeviceSearchOption, _Component);
	
	  function DeviceSearchOption() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, DeviceSearchOption);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DeviceSearchOption.__proto__ || Object.getPrototypeOf(DeviceSearchOption)).call.apply(_ref, [this].concat(args))), _this), _this.handleMouseDown = function (event) {
	      event.preventDefault();
	      event.stopPropagation();
	      _this.props.onSelect(_this.props.option, event);
	    }, _this.handleMouseEnter = function (event) {
	      _this.props.onFocus(_this.props.option, event);
	    }, _this.handleMouseMove = function (event) {
	      if (_this.props.isFocused) return;
	      _this.props.onFocus(_this.props.option, event);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(DeviceSearchOption, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: this.props.className,
	        onMouseDown: this.handleMouseDown,
	        onMouseEnter: this.handleMouseEnter,
	        onMouseMove: this.handleMouseMove
	      }, void 0, _jsx('div', {}, void 0, this.props.option.name + ' ', _jsx('i', {}, void 0, '(', this.props.option.type, ')')));
	    }
	  }]);
	
	  return DeviceSearchOption;
	}(_react.Component);
	
	var DeviceSearchValue = function (_Component2) {
	  _inherits(DeviceSearchValue, _Component2);
	
	  function DeviceSearchValue() {
	    _classCallCheck(this, DeviceSearchValue);
	
	    return _possibleConstructorReturn(this, (DeviceSearchValue.__proto__ || Object.getPrototypeOf(DeviceSearchValue)).apply(this, arguments));
	  }
	
	  _createClass(DeviceSearchValue, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: 'Select-value'
	      }, void 0, _jsx('span', {
	        className: 'Select-value-label'
	      }, void 0, this.props.value.name + ' ', _jsx('b', {}, void 0, '(', this.props.value.cuid, ')')));
	    }
	  }]);
	
	  return DeviceSearchValue;
	}(_react.Component);
	
	var DeviceSearch = function (_Component3) {
	  _inherits(DeviceSearch, _Component3);
	
	  function DeviceSearch(props) {
	    _classCallCheck(this, DeviceSearch);
	
	    var _this3 = _possibleConstructorReturn(this, (DeviceSearch.__proto__ || Object.getPrototypeOf(DeviceSearch)).call(this, props));
	
	    _initialiseProps.call(_this3);
	
	    _this3.state = {};
	    return _this3;
	  }
	
	  _createClass(DeviceSearch, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { ref: 'container' },
	        _jsx(_reactSelect2.default.AsyncCreatable, {
	          value: this.state.value,
	          onChange: this.onChange,
	          valueKey: 'cuid',
	          loadOptions: this.getDevices,
	          optionComponent: DeviceSearchOption,
	          valueComponent: DeviceSearchValue,
	          filterOption: function filterOption(option, filter) {
	            return true;
	          }
	        })
	      );
	    }
	  }]);
	
	  return DeviceSearch;
	}(_react.Component);
	
	var _initialiseProps = function _initialiseProps() {
	  var _this4 = this;
	
	  this.componentDidMount = function () {
	
	    setTimeout(function () {
	      try {
	        var msg = JSON.parse(JSON.stringify(_this4.props.options.events.timeout));
	        msg.targets.formData.payload = "random string";
	        _pubsubJs2.default.publishSync('jss-internals', msg);
	      } catch (e) {}
	    }, 2000);
	
	    _this4.setValueFromProps(_this4.props);
	  };
	
	  this.componentWillReceiveProps = function (nextProps) {
	    _this4.setValueFromProps(nextProps);
	  };
	
	  this.setValueFromProps = function (props) {
	    var cuid = props.value;
	    (0, _apiCaller2.default)('devices/' + cuid).then(function (res) {
	      var value = res.device;
	      if (!value) {
	        value = { cuid: cuid };
	      }
	      if (_this4.refs.container) _this4.setState({ value: value });
	    });
	  };
	
	  this.getDevices = function (input) {
	    if (!input) {
	      return Promise.resolve({ options: [] });
	    }
	    return (0, _apiSearchCaller2.default)('devices', input).then(function (res) {
	      return { options: res.devices };
	    });
	  };
	
	  this.onChange = function (value) {
	    ;
	    _this4.props.onChange(value.cuid);
	  };
	};
	
	exports.default = DeviceSearch;

/***/ },

/***/ 107:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactJsonschemaForm = __webpack_require__(114);
	
	var _reactJsonschemaForm2 = _interopRequireDefault(_reactJsonschemaForm);
	
	var _server = __webpack_require__(15);
	
	var _ResearcherSearch = __webpack_require__(110);
	
	var _ResearcherSearch2 = _interopRequireDefault(_ResearcherSearch);
	
	var _SubjectSearch = __webpack_require__(112);
	
	var _SubjectSearch2 = _interopRequireDefault(_SubjectSearch);
	
	var _DeviceSearch = __webpack_require__(106);
	
	var _DeviceSearch2 = _interopRequireDefault(_DeviceSearch);
	
	var _SWToolSearch = __webpack_require__(111);
	
	var _SWToolSearch2 = _interopRequireDefault(_SWToolSearch);
	
	var _RawFileWidget = __webpack_require__(109);
	
	var _RawFileWidget2 = _interopRequireDefault(_RawFileWidget);
	
	var _OutputSearch = __webpack_require__(108);
	
	var _OutputSearch2 = _interopRequireDefault(_OutputSearch);
	
	var _pubsubJs = __webpack_require__(11);
	
	var _pubsubJs2 = _interopRequireDefault(_pubsubJs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var customFields = {};
	var customWidgets = {
	  "researcher": _ResearcherSearch2.default,
	  "subject": _SubjectSearch2.default,
	  "device": _DeviceSearch2.default,
	  "software": _SWToolSearch2.default,
	  "file": _RawFileWidget2.default,
	  "output": _OutputSearch2.default
	};
	
	var JSSForm = function (_Component) {
	  _inherits(JSSForm, _Component);
	
	  function JSSForm(props) {
	    _classCallCheck(this, JSSForm);
	
	    var _this = _possibleConstructorReturn(this, (JSSForm.__proto__ || Object.getPrototypeOf(JSSForm)).call(this, props));
	
	    _this.componentDidMount = function () {
	      _this._update(_this.state);
	      _this._listenToInternalEvents(_this.props.listenToInternalEvents);
	    };
	
	    _this._listenToInternalEvents = function (listen) {
	      if (listen) {
	        _pubsubJs2.default.subscribe('jss-internals', function (msg, data) {
	          if ('formData' in data.targets) {
	            var formData = Object.assign({}, _this.state.formData);
	            var jsonPath = data.targets.formData.path;
	            formData[jsonPath] = data.targets.formData.payload;
	            _this.setState({
	              formData: formData
	            });
	          }
	        });
	      }
	    };
	
	    _this._update = function (formProps) {
	      var schema = formProps.schema,
	          uiSchema = formProps.uiSchema,
	          formData = formProps.formData;
	
	      var valid = true;
	      try {
	        var test = (0, _server.renderToString)(_jsx(_reactJsonschemaForm2.default, {
	          fields: customFields,
	          widgets: customWidgets,
	          schema: schema,
	          uiSchema: uiSchema,
	          formData: formData
	        }));
	        if (/unsupported/i.test(test)) throw new Error(test);
	      } catch (err) {
	        console.log(err);
	        valid = false;
	      }
	      _this.props.onFormPropsChange({ valid: valid });
	      if (valid) {
	        _this.setState({
	          valid: true,
	          schema: schema,
	          uiSchema: uiSchema,
	          formData: formData
	        });
	      } else {
	        _this.setState({
	          valid: false
	        });
	      }
	    };
	
	    _this.state = {
	      valid: false,
	      schema: props.schema,
	      uiSchema: props.uiSchema,
	      formData: props.formData
	    };
	    return _this;
	  }
	
	  _createClass(JSSForm, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.schema != this.props.schema || nextProps.uiSchema != this.props.uiSchema || nextProps.formData != this.props.formData) {
	        this._update(nextProps);
	      }
	      this._listenToInternalEvents(nextProps.listenToInternalEvents);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var form = null;
	
	      var _props = this.props,
	          schema = _props.schema,
	          uiSchema = _props.uiSchema,
	          formData = _props.formData,
	          props = _objectWithoutProperties(_props, ['schema', 'uiSchema', 'formData']);
	
	      if (this.state.valid) {
	        var form = _react2.default.createElement(_reactJsonschemaForm2.default, _extends({
	          fields: customFields,
	          widgets: customWidgets,
	          schema: this.state.schema,
	          uiSchema: this.state.uiSchema,
	          formData: this.state.formData,
	          ref: 'form'
	        }, props));
	      }
	      return _jsx('div', {}, void 0, _jsx('p', {}, void 0, 'Form definition: ', this.state.valid ? "valid" : "invalid"), form);
	    }
	  }]);
	
	  return JSSForm;
	}(_react.Component);
	
	JSSForm.defaultProps = {
	  valid: false,
	  schema: undefined,
	  uiSchema: undefined,
	  formData: undefined,
	  listenToInternalEvents: false,
	  onFormPropsChange: function onFormPropsChange() {}
	};
	exports.default = JSSForm;

/***/ },

/***/ 108:
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
	
	var _reactSelect = __webpack_require__(105);
	
	var _reactSelect2 = _interopRequireDefault(_reactSelect);
	
	var _apiSearchCaller = __webpack_require__(104);
	
	var _apiSearchCaller2 = _interopRequireDefault(_apiSearchCaller);
	
	var _apiCaller = __webpack_require__(10);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ref2 = _jsx('b', {}, void 0, 'CUID:');
	
	var _ref3 = _jsx('b', {}, void 0, 'Name:');
	
	var _ref4 = _jsx('b', {}, void 0, 'Uri:');
	
	var _ref5 = _jsx('b', {}, void 0, 'Activity:');
	
	var _ref6 = _jsx('b', {}, void 0, 'Involved: ');
	
	var _ref7 = _jsx('b', {}, void 0, 'Involved previously: ');
	
	var OutputSearchOption = function (_Component) {
	  _inherits(OutputSearchOption, _Component);
	
	  function OutputSearchOption() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, OutputSearchOption);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OutputSearchOption.__proto__ || Object.getPrototypeOf(OutputSearchOption)).call.apply(_ref, [this].concat(args))), _this), _this.handleMouseDown = function (event) {
	      event.preventDefault();
	      event.stopPropagation();
	      _this.props.onSelect(_this.props.option, event);
	    }, _this.handleMouseEnter = function (event) {
	      _this.props.onFocus(_this.props.option, event);
	    }, _this.handleMouseMove = function (event) {
	      if (_this.props.isFocused) return;
	      _this.props.onFocus(_this.props.option, event);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(OutputSearchOption, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      if (!this.props.option.activity) return _jsx('div', {
	        className: this.props.className,
	        onMouseDown: this.handleMouseDown,
	        onMouseEnter: this.handleMouseEnter,
	        onMouseMove: this.handleMouseMove
	      });
	      return _jsx('div', {
	        className: this.props.className,
	        onMouseDown: this.handleMouseDown,
	        onMouseEnter: this.handleMouseEnter,
	        onMouseMove: this.handleMouseMove
	      }, void 0, _jsx('div', {}, void 0, _ref2, ' ', this.props.option.cuid), _jsx('div', {}, void 0, _ref3, ' ', this.props.option.name), _jsx('div', {}, void 0, _ref4, ' ', this.props.option.uri), _jsx('div', {}, void 0, _ref5, ' ', this.props.option.activity.description), this.props.option.activity.subjects.map(function (subject) {
	        var sbj = subject.id;
	        return _jsx('div', {}, subject.id, _ref6, sbj.name, ' ', sbj.surname, ' (born: ', sbj.birthdate, ')');
	      }), function () {
	        if (!_this2.props.option.activity.prev) return null;
	        var sbj = _this2.props.option.activity.prev.subjects.id;
	        return _jsx('div', {}, void 0, _ref7, sbj.name, ' ', sbj.surname, ' (born: ', sbj.birthdate, ')');
	      }());
	    }
	  }]);
	
	  return OutputSearchOption;
	}(_react.Component);
	
	var OutputSearchValue = function (_Component2) {
	  _inherits(OutputSearchValue, _Component2);
	
	  function OutputSearchValue() {
	    _classCallCheck(this, OutputSearchValue);
	
	    return _possibleConstructorReturn(this, (OutputSearchValue.__proto__ || Object.getPrototypeOf(OutputSearchValue)).apply(this, arguments));
	  }
	
	  _createClass(OutputSearchValue, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: 'Select-value'
	      }, void 0, _jsx('span', {
	        className: 'Select-value-label'
	      }, void 0, _jsx('b', {}, void 0, this.props.value.cuid)));
	    }
	  }]);
	
	  return OutputSearchValue;
	}(_react.Component);
	
	var OutputSearch = function (_Component3) {
	  _inherits(OutputSearch, _Component3);
	
	  function OutputSearch(props) {
	    _classCallCheck(this, OutputSearch);
	
	    var _this4 = _possibleConstructorReturn(this, (OutputSearch.__proto__ || Object.getPrototypeOf(OutputSearch)).call(this, props));
	
	    _initialiseProps.call(_this4);
	
	    _this4.state = {};
	    return _this4;
	  }
	
	  _createClass(OutputSearch, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { ref: 'container' },
	        _jsx(_reactSelect2.default.AsyncCreatable, {
	          value: this.state.value,
	          onChange: this.onChange,
	          valueKey: 'cuid',
	          loadOptions: this.getOutputs,
	          optionComponent: OutputSearchOption,
	          valueComponent: OutputSearchValue,
	          filterOption: function filterOption(option, filter) {
	            return true;
	          }
	        })
	      );
	    }
	  }]);
	
	  return OutputSearch;
	}(_react.Component);
	
	var _initialiseProps = function _initialiseProps() {
	  var _this5 = this;
	
	  this.componentWillMount = function () {
	    _this5.setValueFromProps(_this5.props);
	  };
	
	  this.componentWillReceiveProps = function (nextProps) {
	    _this5.setValueFromProps(nextProps);
	  };
	
	  this.setValueFromProps = function (props) {
	    var cuid = props.value;
	    (0, _apiCaller2.default)('outputs/' + cuid).then(function (res) {
	      var value = res.output;
	      if (!value) {
	        value = { cuid: cuid };
	      }
	      if (_this5.refs.container) _this5.setState({ value: value });
	    });
	  };
	
	  this.getOutputs = function (input) {
	    if (!input || input.length < 3) {
	      return Promise.resolve({ options: [] });
	    }
	    return (0, _apiSearchCaller2.default)('outputs', input).then(function (res) {
	      if (!res.outputs) res.outputs = [];
	      return { options: res.outputs };
	    });
	  };
	
	  this.onChange = function (value) {
	    ;
	    _this5.props.onChange(value.cuid);
	  };
	};
	
	exports.default = OutputSearch;

/***/ },

/***/ 109:
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
	
	var _isomorphicFetch = __webpack_require__(46);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _apiCaller = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	//import PropTypes from "prop-types";
	
	//import { dataURItoBlob, shouldRender, setState } from "../../utils";
	
	
	var RawFileWidget = function (_Component) {
	  _inherits(RawFileWidget, _Component);
	
	  /*defaultProps = {
	    multiple: false,
	  };*/
	
	  function RawFileWidget(props) {
	    _classCallCheck(this, RawFileWidget);
	
	    var _this = _possibleConstructorReturn(this, (RawFileWidget.__proto__ || Object.getPrototypeOf(RawFileWidget)).call(this, props));
	
	    _initialiseProps.call(_this);
	
	    return _this;
	  }
	
	  /*shouldComponentUpdate(nextProps, nextState) {
	    return shouldRender(this, nextProps, nextState);
	  }*/
	
	  _createClass(RawFileWidget, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      //const { multiple, id, readonly, disabled, autofocus } = this.props;
	      var _props = this.props,
	          multiple = _props.multiple,
	          id = _props.id,
	          readonly = _props.readonly,
	          disabled = _props.disabled,
	          autofocus = _props.autofocus,
	          value = _props.value;
	      var filesInfo = this.state.filesInfo;
	
	      return _jsx('div', {}, void 0, _jsx('p', {}, void 0, _react2.default.createElement('input', {
	        ref: function ref(_ref) {
	          return _this2.inputRef = _ref;
	        },
	        id: id,
	        type: 'file',
	        disabled: readonly || disabled,
	        onChange: this.onChange,
	        defaultValue: '',
	        autoFocus: autofocus,
	        multiple: multiple,
	        style: { color: 'transparent' }
	      })), _jsx(FilesInfo, {
	        filesInfo: filesInfo
	      }));
	    }
	  }]);
	
	  return RawFileWidget;
	}(_react.Component);
	
	/*function addNameToDataURL(dataURL, name) {
	  return dataURL.replace(";base64", `;name=${name};base64`);
	}*/
	
	/*function processFile(file) {
	  const { name, size, type } = file;
	  return new Promise((resolve, reject) => {
	    const reader = new window.FileReader();
	    reader.onload = event => {
	      resolve({
	        dataURL: addNameToDataURL(event.target.result, name),
	        name,
	        size,
	        type,
	      });
	    };
	    reader.readAsDataURL(file);
	  });
	}*/
	
	var _initialiseProps = function _initialiseProps() {
	  var _this3 = this;
	
	  this.componentWillMount = function () {
	    _this3.setValueFromProps(_this3.props);
	  };
	
	  this.componentWillReceiveProps = function (nextProps) {
	    _this3.setValueFromProps(nextProps);
	  };
	
	  this.setValueFromProps = function (props) {
	    var value = props.value;
	
	    var values = Array.isArray(value) ? value : [value];
	    _this3.setState({
	      values: values,
	      filesInfo: extractFileInfo(values)
	    });
	  };
	
	  this.onChange = function (event) {
	    var _props2 = _this3.props,
	        multiple = _props2.multiple,
	        onChange = _props2.onChange;
	
	    processFiles(event.target.files).then(function (filesInfo) {
	      //console.log(filesInfo);
	      var state = {
	        values: filesInfo.map(function (fileInfo) {
	          return JSON.stringify(fileInfo);
	        }),
	        filesInfo: filesInfo
	      };
	      _this3.setState(state, function () {
	        if (multiple) {
	          onChange(state.values);
	        } else {
	          onChange(state.values[0]);
	        }
	      });
	    });
	  };
	};
	
	function processFile(file) {
	  var name = file.name,
	      size = file.size,
	      type = file.type;
	
	  return new Promise(function (resolve, reject) {
	    (0, _apiCaller.uploadFile)(file).then(function (res) {
	      console.log('response:');
	      console.log(res);
	      resolve({
	        newName: res.newFileName,
	        name: name,
	        size: size,
	        type: type
	      });
	    });
	  });
	}
	
	function processFiles(files) {
	  return Promise.all([].map.call(files, processFile));
	}
	
	function FilesInfo(props) {
	  var filesInfo = props.filesInfo;
	
	  if (filesInfo.length === 0) {
	    return null;
	  }
	  return _jsx('ul', {
	    className: 'file-info'
	  }, void 0, filesInfo.map(function (fileInfo, key) {
	    var name = fileInfo.name,
	        newName = fileInfo.newName,
	        size = fileInfo.size,
	        type = fileInfo.type;
	
	    if (!type) type = 'unknown type';
	    return _jsx('li', {}, key, _jsx('strong', {}, void 0, name), ' (', type, ', ', size, ' bytes) -> ', newName);
	  }));
	}
	
	/*function extractFileInfo(dataURLs) {
	  return dataURLs
	    .filter(dataURL => typeof dataURL !== "undefined")
	    .map(dataURL => {
	      const { blob, name } = dataURItoBlob(dataURL);
	      return {
	        name: name,
	        size: blob.size,
	        type: blob.type,
	      };
	    });
	}*/
	
	function extractFileInfo(files) {
	  return files.filter(function (file) {
	    return typeof file !== "undefined";
	  }).map(function (file) {
	    //const { blob, name } = dataURItoBlob(value);
	    try {
	      var _JSON$parse = JSON.parse(file),
	          name = _JSON$parse.name,
	          newName = _JSON$parse.newName,
	          size = _JSON$parse.size,
	          type = _JSON$parse.type;
	    } catch (e) {
	      var name = newName = size = type = undefined;
	    }
	    var o = {
	      name: name,
	      newName: newName,
	      size: size,
	      type: type
	    };
	    //console.log(o);
	    return o;
	  });
	}
	
	/*RawFileWidget.defaultProps = {
	  autofocus: false,
	  multiple: false,
	};*/
	
	exports.default = RawFileWidget;

/***/ },

/***/ 110:
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
	
	var _reactSelect = __webpack_require__(105);
	
	var _reactSelect2 = _interopRequireDefault(_reactSelect);
	
	var _apiSearchCaller = __webpack_require__(104);
	
	var _apiSearchCaller2 = _interopRequireDefault(_apiSearchCaller);
	
	var _apiCaller = __webpack_require__(10);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ResearcherSearchOption = function (_Component) {
	  _inherits(ResearcherSearchOption, _Component);
	
	  function ResearcherSearchOption() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, ResearcherSearchOption);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ResearcherSearchOption.__proto__ || Object.getPrototypeOf(ResearcherSearchOption)).call.apply(_ref, [this].concat(args))), _this), _this.handleMouseDown = function (event) {
	      event.preventDefault();
	      event.stopPropagation();
	      _this.props.onSelect(_this.props.option, event);
	    }, _this.handleMouseEnter = function (event) {
	      _this.props.onFocus(_this.props.option, event);
	    }, _this.handleMouseMove = function (event) {
	      if (_this.props.isFocused) return;
	      _this.props.onFocus(_this.props.option, event);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(ResearcherSearchOption, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: this.props.className,
	        onMouseDown: this.handleMouseDown,
	        onMouseEnter: this.handleMouseEnter,
	        onMouseMove: this.handleMouseMove
	      }, void 0, _jsx('div', {}, void 0, this.props.option.name + ' ' + this.props.option.surname + ' ', _jsx('i', {}, void 0, '(', this.props.option.birthdate, ')')));
	    }
	  }]);
	
	  return ResearcherSearchOption;
	}(_react.Component);
	
	var ResearcherSearchValue = function (_Component2) {
	  _inherits(ResearcherSearchValue, _Component2);
	
	  function ResearcherSearchValue() {
	    _classCallCheck(this, ResearcherSearchValue);
	
	    return _possibleConstructorReturn(this, (ResearcherSearchValue.__proto__ || Object.getPrototypeOf(ResearcherSearchValue)).apply(this, arguments));
	  }
	
	  _createClass(ResearcherSearchValue, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: 'Select-value'
	      }, void 0, _jsx('span', {
	        className: 'Select-value-label'
	      }, void 0, this.props.value.name + ' ' + this.props.value.surname + ' ', _jsx('b', {}, void 0, '(', this.props.value.cuid, ')')));
	    }
	  }]);
	
	  return ResearcherSearchValue;
	}(_react.Component);
	
	var ResearcherSearch = function (_Component3) {
	  _inherits(ResearcherSearch, _Component3);
	
	  function ResearcherSearch(props) {
	    _classCallCheck(this, ResearcherSearch);
	
	    var _this3 = _possibleConstructorReturn(this, (ResearcherSearch.__proto__ || Object.getPrototypeOf(ResearcherSearch)).call(this, props));
	
	    _initialiseProps.call(_this3);
	
	    _this3.state = {};
	    return _this3;
	  }
	
	  _createClass(ResearcherSearch, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { ref: 'container' },
	        _jsx(_reactSelect2.default.AsyncCreatable, {
	          value: this.state.value,
	          onChange: this.onChange,
	          valueKey: 'cuid',
	          loadOptions: this.getResearchers,
	          optionComponent: ResearcherSearchOption,
	          valueComponent: ResearcherSearchValue,
	          filterOption: function filterOption(option, filter) {
	            return true;
	          }
	        })
	      );
	    }
	  }]);
	
	  return ResearcherSearch;
	}(_react.Component);
	
	var _initialiseProps = function _initialiseProps() {
	  var _this4 = this;
	
	  this.componentWillMount = function () {
	    _this4.setValueFromProps(_this4.props);
	  };
	
	  this.componentWillReceiveProps = function (nextProps) {
	    _this4.setValueFromProps(nextProps);
	  };
	
	  this.setValueFromProps = function (props) {
	    var cuid = props.value;
	    (0, _apiCaller2.default)('researchers/' + cuid).then(function (res) {
	      var value = res.researcher;
	      if (!value) {
	        value = { cuid: cuid };
	      }
	      if (_this4.refs.container) _this4.setState({ value: value });
	    });
	  };
	
	  this.getResearchers = function (input) {
	    if (!input) {
	      return Promise.resolve({ options: [] });
	    }
	    return (0, _apiSearchCaller2.default)('researchers', input).then(function (res) {
	      return { options: res.researchers };
	    });
	  };
	
	  this.onChange = function (value) {
	    ;
	    _this4.props.onChange(value.cuid);
	  };
	};
	
	exports.default = ResearcherSearch;

/***/ },

/***/ 111:
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
	
	var _reactSelect = __webpack_require__(105);
	
	var _reactSelect2 = _interopRequireDefault(_reactSelect);
	
	var _apiSearchCaller = __webpack_require__(104);
	
	var _apiSearchCaller2 = _interopRequireDefault(_apiSearchCaller);
	
	var _apiCaller = __webpack_require__(10);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ref2 = _jsx('br', {});
	
	var SWToolSearchOption = function (_Component) {
	  _inherits(SWToolSearchOption, _Component);
	
	  function SWToolSearchOption() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, SWToolSearchOption);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SWToolSearchOption.__proto__ || Object.getPrototypeOf(SWToolSearchOption)).call.apply(_ref, [this].concat(args))), _this), _this.handleMouseDown = function (event) {
	      event.preventDefault();
	      event.stopPropagation();
	      _this.props.onSelect(_this.props.option, event);
	    }, _this.handleMouseEnter = function (event) {
	      _this.props.onFocus(_this.props.option, event);
	    }, _this.handleMouseMove = function (event) {
	      if (_this.props.isFocused) return;
	      _this.props.onFocus(_this.props.option, event);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(SWToolSearchOption, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: this.props.className,
	        onMouseDown: this.handleMouseDown,
	        onMouseEnter: this.handleMouseEnter,
	        onMouseMove: this.handleMouseMove
	      }, void 0, _jsx('div', {}, void 0, this.props.option.company + ' ' + this.props.option.name + ' ' + this.props.option.version + ' ', _ref2, _jsx('i', {}, void 0, '(', this.props.option.download_uri, ')')));
	    }
	  }]);
	
	  return SWToolSearchOption;
	}(_react.Component);
	
	var SWToolSearchValue = function (_Component2) {
	  _inherits(SWToolSearchValue, _Component2);
	
	  function SWToolSearchValue() {
	    _classCallCheck(this, SWToolSearchValue);
	
	    return _possibleConstructorReturn(this, (SWToolSearchValue.__proto__ || Object.getPrototypeOf(SWToolSearchValue)).apply(this, arguments));
	  }
	
	  _createClass(SWToolSearchValue, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: 'Select-value'
	      }, void 0, _jsx('span', {
	        className: 'Select-value-label'
	      }, void 0, this.props.value.company + ' ' + this.props.value.name + ' ' + this.props.value.version + ' ', _jsx('b', {}, void 0, '(', this.props.value.cuid, ')')));
	    }
	  }]);
	
	  return SWToolSearchValue;
	}(_react.Component);
	
	var SWToolSearch = function (_Component3) {
	  _inherits(SWToolSearch, _Component3);
	
	  function SWToolSearch(props) {
	    _classCallCheck(this, SWToolSearch);
	
	    var _this3 = _possibleConstructorReturn(this, (SWToolSearch.__proto__ || Object.getPrototypeOf(SWToolSearch)).call(this, props));
	
	    _initialiseProps.call(_this3);
	
	    _this3.state = {};
	    return _this3;
	  }
	
	  _createClass(SWToolSearch, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { ref: 'container' },
	        _jsx(_reactSelect2.default.AsyncCreatable, {
	          value: this.state.value,
	          onChange: this.onChange,
	          valueKey: 'cuid',
	          loadOptions: this.getSWTools,
	          optionComponent: SWToolSearchOption,
	          valueComponent: SWToolSearchValue,
	          filterOption: function filterOption(option, filter) {
	            return true;
	          }
	        })
	      );
	    }
	  }]);
	
	  return SWToolSearch;
	}(_react.Component);
	
	var _initialiseProps = function _initialiseProps() {
	  var _this4 = this;
	
	  this.componentWillMount = function () {
	    _this4.setValueFromProps(_this4.props);
	  };
	
	  this.componentWillReceiveProps = function (nextProps) {
	    _this4.setValueFromProps(nextProps);
	  };
	
	  this.setValueFromProps = function (props) {
	    var cuid = props.value;
	    (0, _apiCaller2.default)('sw-tools/' + cuid).then(function (res) {
	      var value = res.SWTool;
	      if (!value) {
	        value = { cuid: cuid };
	      }
	      if (_this4.refs.container) _this4.setState({ value: value });
	    });
	  };
	
	  this.getSWTools = function (input) {
	    if (!input) {
	      return Promise.resolve({ options: [] });
	    }
	    return (0, _apiSearchCaller2.default)('sw-tools', input).then(function (res) {
	      return { options: res.SWTools };
	    });
	  };
	
	  this.onChange = function (value) {
	    ;
	    _this4.props.onChange(value.cuid);
	  };
	};
	
	exports.default = SWToolSearch;

/***/ },

/***/ 112:
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
	
	var _reactSelect = __webpack_require__(105);
	
	var _reactSelect2 = _interopRequireDefault(_reactSelect);
	
	var _apiSearchCaller = __webpack_require__(104);
	
	var _apiSearchCaller2 = _interopRequireDefault(_apiSearchCaller);
	
	var _apiCaller = __webpack_require__(10);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SubjectSearchOption = function (_Component) {
	  _inherits(SubjectSearchOption, _Component);
	
	  function SubjectSearchOption() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, SubjectSearchOption);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SubjectSearchOption.__proto__ || Object.getPrototypeOf(SubjectSearchOption)).call.apply(_ref, [this].concat(args))), _this), _this.handleMouseDown = function (event) {
	      event.preventDefault();
	      event.stopPropagation();
	      _this.props.onSelect(_this.props.option, event);
	    }, _this.handleMouseEnter = function (event) {
	      _this.props.onFocus(_this.props.option, event);
	    }, _this.handleMouseMove = function (event) {
	      if (_this.props.isFocused) return;
	      _this.props.onFocus(_this.props.option, event);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(SubjectSearchOption, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: this.props.className,
	        onMouseDown: this.handleMouseDown,
	        onMouseEnter: this.handleMouseEnter,
	        onMouseMove: this.handleMouseMove
	      }, void 0, _jsx('div', {}, void 0, this.props.option.name + ' ' + this.props.option.surname + ' ', _jsx('i', {}, void 0, '(', this.props.option.birthdate, ')')));
	    }
	  }]);
	
	  return SubjectSearchOption;
	}(_react.Component);
	
	var SubjectSearchValue = function (_Component2) {
	  _inherits(SubjectSearchValue, _Component2);
	
	  function SubjectSearchValue() {
	    _classCallCheck(this, SubjectSearchValue);
	
	    return _possibleConstructorReturn(this, (SubjectSearchValue.__proto__ || Object.getPrototypeOf(SubjectSearchValue)).apply(this, arguments));
	  }
	
	  _createClass(SubjectSearchValue, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: 'Select-value'
	      }, void 0, _jsx('span', {
	        className: 'Select-value-label'
	      }, void 0, this.props.value.name + ' ' + this.props.value.surname + ' ', _jsx('b', {}, void 0, '(', this.props.value.cuid, ')')));
	    }
	  }]);
	
	  return SubjectSearchValue;
	}(_react.Component);
	
	var SubjectSearch = function (_Component3) {
	  _inherits(SubjectSearch, _Component3);
	
	  function SubjectSearch(props) {
	    _classCallCheck(this, SubjectSearch);
	
	    var _this3 = _possibleConstructorReturn(this, (SubjectSearch.__proto__ || Object.getPrototypeOf(SubjectSearch)).call(this, props));
	
	    _initialiseProps.call(_this3);
	
	    _this3.state = {};
	    return _this3;
	  }
	
	  _createClass(SubjectSearch, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { ref: 'container' },
	        _jsx(_reactSelect2.default.AsyncCreatable, {
	          value: this.state.value,
	          onChange: this.onChange,
	          valueKey: 'cuid',
	          loadOptions: this.getSubjects,
	          optionComponent: SubjectSearchOption,
	          valueComponent: SubjectSearchValue,
	          filterOption: function filterOption(option, filter) {
	            return true;
	          }
	        })
	      );
	    }
	  }]);
	
	  return SubjectSearch;
	}(_react.Component);
	
	var _initialiseProps = function _initialiseProps() {
	  var _this4 = this;
	
	  this.componentWillMount = function () {
	    _this4.setValueFromProps(_this4.props);
	  };
	
	  this.componentWillReceiveProps = function (nextProps) {
	    _this4.setValueFromProps(nextProps);
	  };
	
	  this.setValueFromProps = function (props) {
	    var cuid = props.value;
	    (0, _apiCaller2.default)('subjects/' + cuid).then(function (res) {
	      var value = res.subject;
	      if (!value) {
	        value = { cuid: cuid };
	      }
	      if (_this4.refs.container) _this4.setState({ value: value });
	    });
	  };
	
	  this.getSubjects = function (input) {
	    if (!input) {
	      return Promise.resolve({ options: [] });
	    }
	    return (0, _apiSearchCaller2.default)('subjects', input).then(function (res) {
	      return { options: res.subjects };
	    });
	  };
	
	  this.onChange = function (value) {
	    ;
	    _this4.props.onChange(value.cuid);
	  };
	};
	
	exports.default = SubjectSearch;

/***/ },

/***/ 113:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.FormEditWidget = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(4);
	
	var _JSSForm = __webpack_require__(107);
	
	var _JSSForm2 = _interopRequireDefault(_JSSForm);
	
	var _FormEditWidget = {
	  "input-form": "_1hQBT9QdJlqQkPUz55fNJ0",
	  "input-form-content": "_3ZIbKsbrPGzmo6w9urTDC_",
	  "input-form-title": "_2FZExmfhMecg0D6EW1_U-B",
	  "input-form-field": "UH7-nOFc8ZWMenw5lRyJH",
	  "form-submit-button": "_12TOKHEQtbFm61Ys52v-qV",
	  "form-submit-button-disabled": "_2vn8scRXB7uca5cjbvbRo4",
	  "appear": "bTKCaoR9QrRy6nJk-knEs"
	};
	
	var _FormEditWidget2 = _interopRequireDefault(_FormEditWidget);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	
	var log = function log(type) {
	  return console.log.bind(console, type);
	};
	
	var _ref4 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'editForm'
	});
	
	var _ref5 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'save'
	});
	
	var _ref6 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'formPreview'
	});
	
	var FormEditWidget = exports.FormEditWidget = function (_Component) {
	  _inherits(FormEditWidget, _Component);
	
	  function FormEditWidget(props) {
	    _classCallCheck(this, FormEditWidget);
	
	    var _this = _possibleConstructorReturn(this, (FormEditWidget.__proto__ || Object.getPrototypeOf(FormEditWidget)).call(this, props));
	
	    _this.componentWillMount = function () {
	      _this.setState(_this._parse(_this.state));
	    };
	
	    _this.saveForm = function () {
	      if (_this.state.valid) {
	        var form = Object.assign({}, _this.props.initialForm, {
	          title: _this.state.title,
	          json_schema: _this.state._JSONSchema,
	          ui_schema: _this.state._UISchema,
	          init_data: _this.state._initData
	        });
	        //console.log(form);
	        _this.props.saveForm(form);
	      }
	    };
	
	    _this.setTitle = function (event) {
	      var title = event.target.value;
	      _this.setState({ title: title });
	    };
	
	    _this.setJSONSchema = function (event) {
	      var schema = event.target.value;
	      var _formProps = _this._parse(_extends({}, _this.state, { JSONSchema: schema }));
	      _this.setState(_extends({}, _formProps, { JSONSchema: schema }));
	    };
	
	    _this.setUISchema = function (event) {
	      var schema = event.target.value;
	      var _formProps = _this._parse(_extends({}, _this.state, { UISchema: schema }));
	      _this.setState(_extends({}, _formProps, { UISchema: schema }));
	    };
	
	    _this.setInitData = function (event) {
	      var data = event.target.value;
	      var _formProps = _this._parse(_extends({}, _this.state, { initData: data }));
	      _this.setState(_extends({}, _formProps, { initData: data }));
	    };
	
	    _this.onChange = function (_ref) {
	      var formData = _ref.formData;
	
	      var data = JSON.stringify(formData, null, 2);
	      var _formProps = _this._parse(_extends({}, _this.state, { initData: data }));
	      _this.setState(_extends({}, _formProps, { initData: data }));
	    };
	
	    _this.onSubmit = function (_ref2) {
	      var formData = _ref2.formData;
	
	      console.log(formData);
	    };
	
	    _this.onFormPropsChange = function (_ref3) {
	      var valid = _ref3.valid;
	
	      //console.log(valid);
	      _this.setState({ valid: valid });
	    };
	
	    _this._parse = function (formProps) {
	      var JSONSchema = formProps.JSONSchema,
	          UISchema = formProps.UISchema,
	          initData = formProps.initData;
	
	      try {
	        // parse JSON schema
	        var _JSONSchema = JSON.parse(JSONSchema);
	        // parse UI schema
	        var _UISchema = JSON.parse(UISchema);
	        // parse init data
	        var _initData = JSON.parse(initData);
	      } catch (e) {
	        //console.log(e);
	        var _JSONSchema = undefined;
	        var _UISchema = undefined;
	        var _initData = undefined;
	      }
	      return {
	        _JSONSchema: _JSONSchema,
	        _UISchema: _UISchema,
	        _initData: _initData
	      };
	    };
	
	    _this.state = {
	      title: props.initialForm.title,
	      JSONSchema: JSON.stringify(props.initialForm.json_schema, null, 2),
	      UISchema: JSON.stringify(props.initialForm.ui_schema, null, 2),
	      initData: JSON.stringify(props.initialForm.init_data, null, 2),
	      valid: false
	    };
	    return _this;
	  }
	
	  _createClass(FormEditWidget, [{
	    key: 'render',
	    value: function render() {
	      var cls = _FormEditWidget2.default['input-form'] + ' ' + (this.props.showEditForm ? _FormEditWidget2.default.appear : '');
	      return _jsx('div', {
	        className: cls
	      }, void 0, _jsx('div', {
	        className: _FormEditWidget2.default['input-form-content']
	      }, void 0, _jsx('h2', {
	        className: _FormEditWidget2.default['input-form-title']
	      }, void 0, _ref4), _react2.default.createElement('input', { placeholder: this.props.intl.messages.formTitle, className: _FormEditWidget2.default['input-form-field'], onChange: this.setTitle, value: this.state.title, ref: 'title' }), _react2.default.createElement('textarea', { placeholder: this.props.intl.messages.formJSONSchema, className: _FormEditWidget2.default['input-form-field'], ref: 'JSONSchema', value: this.state.JSONSchema, onChange: this.setJSONSchema }), _react2.default.createElement('textarea', { placeholder: this.props.intl.messages.formUISchema, className: _FormEditWidget2.default['input-form-field'], ref: 'UISchema', value: this.state.UISchema, onChange: this.setUISchema }), _react2.default.createElement('textarea', { placeholder: this.props.intl.messages.formInitData, className: _FormEditWidget2.default['input-form-field'], ref: 'InitData', value: this.state.initData, onChange: this.setInitData }), _jsx('a', {
	        className: this.state.valid ? _FormEditWidget2.default['form-submit-button'] : _FormEditWidget2.default['form-submit-button-disabled'],
	        href: '#',
	        onClick: this.saveForm
	      }, void 0, _ref5)), _jsx('div', {}, void 0, _jsx('h2', {
	        className: _FormEditWidget2.default['input-form-title']
	      }, void 0, _ref6), _react2.default.createElement(_JSSForm2.default, { className: _FormEditWidget2.default['input-form-field'], ref: 'ciao',
	        schema: this.state._JSONSchema,
	        uiSchema: this.state._UISchema,
	        formData: this.state._initData,
	        onSubmit: this.onSubmit,
	        onChange: this.onChange,
	        onFormPropsChange: this.onFormPropsChange
	      })));
	    }
	  }]);
	
	  return FormEditWidget;
	}(_react.Component);
	
	FormEditWidget.defaultProps = {
	  initialForm: {
	    title: '',
	    json_schema: {},
	    ui_schema: {},
	    init_data: {}
	  }
	};
	exports.default = (0, _reactIntl.injectIntl)(FormEditWidget);

/***/ },

/***/ 116:
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
	
	var _FormListItem = __webpack_require__(117);
	
	var _FormListItem2 = _interopRequireDefault(_FormListItem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Components
	
	
	var FormList = function (_Component) {
	  _inherits(FormList, _Component);
	
	  function FormList() {
	    _classCallCheck(this, FormList);
	
	    return _possibleConstructorReturn(this, (FormList.__proto__ || Object.getPrototypeOf(FormList)).apply(this, arguments));
	  }
	
	  _createClass(FormList, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      return _jsx('div', {
	        className: 'listView'
	      }, void 0, this.props.forms.map(function (form) {
	        return _jsx(_FormListItem2.default, {
	          form: form,
	          onDelete: function onDelete() {
	            return _this2.props.handleDeleteForm(form.cuid);
	          },
	          onUpdate: _this2.props.handleUpdateForm
	        }, form.cuid);
	      }));
	    }
	  }]);
	
	  return FormList;
	}(_react.Component);
	
	exports.default = FormList;

/***/ },

/***/ 117:
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
	
	var _reactRouter = __webpack_require__(6);
	
	var _reactIntl = __webpack_require__(4);
	
	var _FormEditWidget = __webpack_require__(113);
	
	var _FormEditWidget2 = _interopRequireDefault(_FormEditWidget);
	
	var _FormListItem = {
	  "single-form": "_4IVkjbuHRDz7oZrva7hLo",
	  "form-title": "_3VnmjLrSTAgu0tbdMZoacN",
	  "author-name": "_1cNPfGQNRCha6l5dInqnVS",
	  "form-desc": "_aUxib4kQGpIdxhqFQZaU",
	  "form-action": "_1hJnnZBUAO8LftNEbzN2wZ",
	  "divider": "_2eStSMGYswW2w7EmRibls0",
	  "form-detail": "_1flNws2Fw_nAFFJfQxE8zX"
	};
	
	var _FormListItem2 = _interopRequireDefault(_FormListItem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	
	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'deleteForm'
	});
	
	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'editForm'
	});
	
	var FormListItem = function (_Component) {
	  _inherits(FormListItem, _Component);
	
	  function FormListItem(props) {
	    _classCallCheck(this, FormListItem);
	
	    var _this = _possibleConstructorReturn(this, (FormListItem.__proto__ || Object.getPrototypeOf(FormListItem)).call(this, props));
	
	    _this.showEdit = function () {
	      _this.setState({ isEditShown: !_this.state.isEditShown });
	    };
	
	    _this.state = {
	      isEditShown: false
	    };
	    return _this;
	  }
	
	  _createClass(FormListItem, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: _FormListItem2.default['single-form']
	      }, void 0, _jsx('h3', {
	        className: _FormListItem2.default['form-title']
	      }, void 0, _jsx(_reactRouter.Link, {
	        to: '/forms/' + this.props.form.slug + '-' + this.props.form.cuid
	      }, void 0, this.props.form.title)), _jsx('p', {
	        className: _FormListItem2.default['form-action']
	      }, void 0, _jsx('a', {
	        href: '#',
	        onClick: this.props.onDelete
	      }, void 0, _ref)), _jsx('p', {
	        className: _FormListItem2.default['form-action']
	      }, void 0, _jsx('a', {
	        href: '#',
	        onClick: this.showEdit
	      }, void 0, _ref2)), _jsx(_FormEditWidget2.default, {
	        saveForm: this.props.onUpdate,
	        showEditForm: this.state.isEditShown,
	        initialForm: this.props.form
	      }), _jsx('hr', {
	        className: _FormListItem2.default.divider
	      }));
	    }
	  }]);
	
	  return FormListItem;
	}(_react.Component);
	
	exports.default = FormListItem;

/***/ },

/***/ 99:
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
	
	var _FormList = __webpack_require__(116);
	
	var _FormList2 = _interopRequireDefault(_FormList);
	
	var _FormEditWidget = __webpack_require__(113);
	
	var _FormEditWidget2 = _interopRequireDefault(_FormEditWidget);
	
	var _FormActions = __webpack_require__(48);
	
	var _FormReducer = __webpack_require__(49);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	// Import Components
	
	
	// Import Actions
	
	
	// Import Selectors
	
	
	var FormListPage = function (_Component) {
	  _inherits(FormListPage, _Component);
	
	  function FormListPage() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, FormListPage);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormListPage.__proto__ || Object.getPrototypeOf(FormListPage)).call.apply(_ref, [this].concat(args))), _this), _this.handleDeleteForm = function (cuid) {
	      if (confirm('Do you want to delete this form')) {
	        // eslint-disable-line
	        _this.props.dispatch((0, _FormActions.deleteFormRequest)(cuid));
	      }
	    }, _this.handleUpdateForm = function (form) {
	      if (confirm('Do you want to update this form')) {
	        // eslint-disable-line
	        _this.props.dispatch((0, _FormActions.updateFormRequest)(form));
	      }
	    }, _this.handleAddForm = function (form) {
	      _this.props.dispatch((0, _FormActions.toggleAddForm)());
	      console.log('handleAddForm');
	      console.log(form);
	      _this.props.dispatch((0, _FormActions.addFormRequest)(form));
	    }, _this.handleToggleAddForm = function () {
	      _this.props.dispatch((0, _FormActions.toggleAddForm)());
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(FormListPage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.dispatch((0, _FormActions.fetchForms)());
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {}, void 0, _jsx('a', {
	        href: '#',
	        onClick: this.handleToggleAddForm
	      }, void 0, 'Add form'), _jsx(_FormEditWidget2.default, {
	        saveForm: this.handleAddForm,
	        showEditForm: this.props.showAddForm
	      }), _jsx(_FormList2.default, {
	        handleDeleteForm: this.handleDeleteForm,
	        handleUpdateForm: this.handleUpdateForm,
	        forms: this.props.forms
	      }));
	    }
	  }]);
	
	  return FormListPage;
	}(_react.Component);
	
	// Actions required to provide data for this component to render in sever side.
	
	
	FormListPage.need = [function () {
	  return (0, _FormActions.fetchForms)();
	}];
	
	// Retrieve data from store as props
	function mapStateToProps(state) {
	  return {
	    showAddForm: (0, _FormReducer.getShowAddForm)(state),
	    forms: (0, _FormReducer.getForms)(state)
	  };
	}
	
	FormListPage.contextTypes = {
	  router: _react2.default.PropTypes.object
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(FormListPage);

/***/ }

};;