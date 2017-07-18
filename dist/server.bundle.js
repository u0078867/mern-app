/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 118);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-intl");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.API_URL = undefined;
	exports.default = callApi;
	exports.uploadFile = uploadFile;
	
	var _isomorphicFetch = __webpack_require__(28);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _config = __webpack_require__(7);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var API_URL = exports.API_URL = typeof window === 'undefined' || process.env.NODE_ENV === 'test' ? process.env.BASE_URL || 'http://localhost:' + (process.env.PORT || _config2.default.port) + '/api' : '/api';
	
	function callApi(endpoint) {
	  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';
	  var body = arguments[2];
	
	  return (0, _isomorphicFetch2.default)(API_URL + '/' + endpoint, {
	    headers: { 'content-type': 'application/json' },
	    method: method,
	    body: JSON.stringify(body)
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
	
	function uploadFile(file) {
	  var data = new FormData();
	  data.append('file', file);
	  return (0, _isomorphicFetch2.default)(API_URL + '/upload/file', {
	    method: 'POST',
	    body: data
	  }).then(function (response) {
	    return response.json().then(function (json) {
	      return { json: json, response: response };
	    });
	  }).then(function (_ref2) {
	    var json = _ref2.json,
	        response = _ref2.response;
	
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
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = {
	  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter',
	  //mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/test',
	  port: process.env.PORT || 8000,
	  workDir: process.env.WORK_DIR || './upload'
	};
	
	exports.default = config;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("pubsub-js");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("react-helmet");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.API_URL = undefined;
	exports.default = callApi;
	
	var _isomorphicFetch = __webpack_require__(28);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _config = __webpack_require__(7);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var API_URL = exports.API_URL = typeof window === 'undefined' || process.env.NODE_ENV === 'test' ? process.env.BASE_URL || 'http://localhost:' + (process.env.PORT || _config2.default.port) + '/search-api' : '/search-api';
	
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
/* 11 */
/***/ function(module, exports) {

	module.exports = require("cuid");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("react-select");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UPDATE_SUBM = exports.ACCEPT_SUBM = exports.DELETE_SUBM = exports.ADD_SUBMS = exports.ADD_SUBM = undefined;
	exports.addSubm = addSubm;
	exports.addSubmRequest = addSubmRequest;
	exports.addSubms = addSubms;
	exports.fetchSubms = fetchSubms;
	exports.fetchSubm = fetchSubm;
	exports.deleteSubm = deleteSubm;
	exports.deleteSubmRequest = deleteSubmRequest;
	exports.acceptSubmRequest = acceptSubmRequest;
	exports.updateSubmRequest = updateSubmRequest;
	exports.updateSubm = updateSubm;
	
	var _apiCaller = __webpack_require__(4);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Export Constants
	var ADD_SUBM = exports.ADD_SUBM = 'ADD_SUBM';
	var ADD_SUBMS = exports.ADD_SUBMS = 'ADD_SUBMS';
	var DELETE_SUBM = exports.DELETE_SUBM = 'DELETE_SUBM';
	var ACCEPT_SUBM = exports.ACCEPT_SUBM = 'ACCEPT_SUBM';
	var UPDATE_SUBM = exports.UPDATE_SUBM = 'UPDATE_SUBM';
	
	// Export Actions
	function addSubm(subm) {
	  return {
	    type: ADD_SUBM,
	    subm: subm
	  };
	}
	
	function addSubmRequest(subm) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('subms', 'post', { subm: subm }).then(function (res) {
	      return dispatch(addSubm(res.subm));
	    });
	  };
	}
	
	function addSubms(subms) {
	  return {
	    type: ADD_SUBMS,
	    subms: subms
	  };
	}
	
	function fetchSubms() {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('subms').then(function (res) {
	      dispatch(addSubms(res.subms));
	    });
	  };
	}
	
	function fetchSubm(cuid) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('subms/' + cuid).then(function (res) {
	      return dispatch(addSubm(res.subm));
	    });
	  };
	}
	
	function deleteSubm(cuid) {
	  return {
	    type: DELETE_SUBM,
	    cuid: cuid
	  };
	}
	
	function deleteSubmRequest(cuid) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('subms/' + cuid, 'delete').then(function () {
	      return dispatch(deleteSubm(cuid));
	    });
	  };
	}
	
	function acceptSubmRequest(subm) {
	  return function (dispatch) {
	    var data = {
	      target_collection: 'to-implement',
	      document: subm.data
	    };
	    return (0, _apiCaller2.default)('upload/data', 'post', data).then(function () {
	      return dispatch(deleteSubmRequest(subm.cuid));
	    }
	    /*.then(() => {
	      type: ACCEPT_SUBM,
	      subm
	    });*/
	    );
	  };
	}
	
	function updateSubmRequest(subm) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('subms/' + subm.cuid, 'put', { subm: subm }).then(function (res) {
	      return dispatch(updateSubm(res.subm));
	    });
	  };
	}
	
	function updateSubm(subm) {
	  return {
	    type: UPDATE_SUBM,
	    subm: subm
	  };
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(3);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	if ('Subject' in _mongoose2.default.connection.models) delete _mongoose2.default.connection.models['Subject'];
	
	var subjectSchema = new Schema({
	  name: { type: 'String', required: true, index: true },
	  surname: { type: 'String', required: true, index: true },
	  birthdate: { type: 'String', required: true, index: true },
	  slug: { type: 'String', required: true },
	  cuid: { type: 'String', required: true },
	  dateAdded: { type: 'Date', default: Date.now, required: true }
	});
	
	subjectSchema.index({ "$**": "text" });
	
	exports.default = _mongoose2.default.model('Subject', subjectSchema);

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("limax");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("sanitize-html");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactJsonschemaForm = __webpack_require__(136);
	
	var _reactJsonschemaForm2 = _interopRequireDefault(_reactJsonschemaForm);
	
	var _server = __webpack_require__(30);
	
	var _ResearcherSearch = __webpack_require__(78);
	
	var _ResearcherSearch2 = _interopRequireDefault(_ResearcherSearch);
	
	var _SubjectSearch = __webpack_require__(80);
	
	var _SubjectSearch2 = _interopRequireDefault(_SubjectSearch);
	
	var _DeviceSearch = __webpack_require__(75);
	
	var _DeviceSearch2 = _interopRequireDefault(_DeviceSearch);
	
	var _SWToolSearch = __webpack_require__(79);
	
	var _SWToolSearch2 = _interopRequireDefault(_SWToolSearch);
	
	var _RawFileWidget = __webpack_require__(77);
	
	var _RawFileWidget2 = _interopRequireDefault(_RawFileWidget);
	
	var _OutputSearch = __webpack_require__(76);
	
	var _OutputSearch2 = _interopRequireDefault(_OutputSearch);
	
	var _pubsubJs = __webpack_require__(8);
	
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
/* 18 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toggleAddPost = toggleAddPost;
	// Export Constants
	var TOGGLE_ADD_POST = exports.TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
	
	// Export Actions
	function toggleAddPost() {
	  return {
	    type: TOGGLE_ADD_POST
	  };
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UPDATE_FORM = exports.SUBMIT_FORM = exports.TOGGLE_ADD_FORM = exports.DELETE_FORM = exports.ADD_FORMS = exports.ADD_FORM = undefined;
	exports.addForm = addForm;
	exports.addFormRequest = addFormRequest;
	exports.addForms = addForms;
	exports.fetchForms = fetchForms;
	exports.fetchForm = fetchForm;
	exports.deleteForm = deleteForm;
	exports.deleteFormRequest = deleteFormRequest;
	exports.toggleAddForm = toggleAddForm;
	exports.submitForm = submitForm;
	exports.updateFormRequest = updateFormRequest;
	exports.updateForm = updateForm;
	
	var _apiCaller = __webpack_require__(4);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Export Constants
	var ADD_FORM = exports.ADD_FORM = 'ADD_FORM';
	var ADD_FORMS = exports.ADD_FORMS = 'ADD_FORMS';
	var DELETE_FORM = exports.DELETE_FORM = 'DELETE_FORM';
	var TOGGLE_ADD_FORM = exports.TOGGLE_ADD_FORM = 'TOGGLE_ADD_FORM';
	var SUBMIT_FORM = exports.SUBMIT_FORM = 'SUBMIT_FORM';
	var UPDATE_FORM = exports.UPDATE_FORM = 'UPDATE_FORM';
	
	// Export Actions
	function addForm(form) {
	  return {
	    type: ADD_FORM,
	    form: form
	  };
	}
	
	function addFormRequest(form) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('forms', 'post', { form: form }).then(function (res) {
	      return dispatch(addForm(res.form));
	    });
	  };
	}
	
	function addForms(forms) {
	  return {
	    type: ADD_FORMS,
	    forms: forms
	  };
	}
	
	function fetchForms() {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('forms').then(function (res) {
	      dispatch(addForms(res.forms));
	    });
	  };
	}
	
	function fetchForm(cuid) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('forms/' + cuid).then(function (res) {
	      return dispatch(addForm(res.form));
	    });
	  };
	}
	
	function deleteForm(cuid) {
	  return {
	    type: DELETE_FORM,
	    cuid: cuid
	  };
	}
	
	function deleteFormRequest(cuid) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('forms/' + cuid, 'delete').then(function () {
	      return dispatch(deleteForm(cuid));
	    });
	  };
	}
	
	function toggleAddForm() {
	  return {
	    type: TOGGLE_ADD_FORM
	  };
	}
	
	function submitForm(data) {
	  console.log('submiting');
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('form/upload/data', 'post', data
	    /*.then(res => {
	      type: SUBMIT_FORM,
	      data: res.data
	    });*/
	    );
	  };
	}
	
	function updateFormRequest(form) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('forms/' + form.cuid, 'put', { form: form }).then(function (res) {
	      return dispatch(updateForm(res.form));
	    });
	  };
	}
	
	function updateForm(form) {
	  return {
	    type: UPDATE_FORM,
	    form: form
	  };
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getShowAddForm = exports.getForm = exports.getForms = undefined;
	
	var _FormActions = __webpack_require__(19);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	// Initial State
	var initialState = { data: [], showAddForm: false, submitted: [] };
	
	var FormReducer = function FormReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _FormActions.ADD_FORM:
	      return Object.assign({}, state, {
	        data: [action.form].concat(_toConsumableArray(state.data))
	      });
	
	    case _FormActions.ADD_FORMS:
	      return Object.assign({}, state, {
	        data: action.forms
	      });
	
	    case _FormActions.DELETE_FORM:
	      return Object.assign({}, state, {
	        data: state.data.filter(function (form) {
	          return form.cuid !== action.cuid;
	        })
	      });
	
	    case _FormActions.TOGGLE_ADD_FORM:
	      return Object.assign({}, state, {
	        showAddForm: !state.showAddForm
	      });
	
	    case _FormActions.SUBMIT_FORM:
	      return Object.assign({}, state, {
	        submitted: [action.data].concat(_toConsumableArray(state.submitted))
	      });
	
	    case _FormActions.UPDATE_FORM:
	      return Object.assign({}, state, {
	        data: state.data.map(function (form) {
	          return form.cuid === action.form.cuid ? action.form : form;
	        })
	      });
	
	    default:
	      return state;
	  }
	};
	
	/* Selectors */
	
	// Get all forms
	var getForms = exports.getForms = function getForms(state) {
	  return state.forms.data;
	};
	
	// Get form by cuid
	var getForm = exports.getForm = function getForm(state, cuid) {
	  return state.forms.data.filter(function (form) {
	    return form.cuid === cuid;
	  })[0];
	};
	
	// Get showAddPost
	var getShowAddForm = exports.getShowAddForm = function getShowAddForm(state) {
	  return (/*state.app.showAddPost*/state.forms.showAddForm
	  );
	};
	
	// Export Reducer
	exports.default = FormReducer;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DELETE_POST = exports.ADD_POSTS = exports.ADD_POST = undefined;
	exports.addPost = addPost;
	exports.addPostRequest = addPostRequest;
	exports.addPosts = addPosts;
	exports.fetchPosts = fetchPosts;
	exports.fetchPost = fetchPost;
	exports.deletePost = deletePost;
	exports.deletePostRequest = deletePostRequest;
	
	var _apiCaller = __webpack_require__(4);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Export Constants
	var ADD_POST = exports.ADD_POST = 'ADD_POST';
	var ADD_POSTS = exports.ADD_POSTS = 'ADD_POSTS';
	var DELETE_POST = exports.DELETE_POST = 'DELETE_POST';
	
	// Export Actions
	function addPost(post) {
	  return {
	    type: ADD_POST,
	    post: post
	  };
	}
	
	function addPostRequest(post) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('posts', 'post', {
	      post: {
	        name: post.name,
	        title: post.title,
	        content: post.content
	      }
	    }).then(function (res) {
	      return dispatch(addPost(res.post));
	    });
	  };
	}
	
	function addPosts(posts) {
	  return {
	    type: ADD_POSTS,
	    posts: posts
	  };
	}
	
	function fetchPosts() {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('posts').then(function (res) {
	      dispatch(addPosts(res.posts));
	    });
	  };
	}
	
	function fetchPost(cuid) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('posts/' + cuid).then(function (res) {
	      return dispatch(addPost(res.post));
	    });
	  };
	}
	
	function deletePost(cuid) {
	  return {
	    type: DELETE_POST,
	    cuid: cuid
	  };
	}
	
	function deletePostRequest(cuid) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('posts/' + cuid, 'delete').then(function () {
	      return dispatch(deletePost(cuid));
	    });
	  };
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getPost = exports.getPosts = undefined;
	
	var _PostActions = __webpack_require__(21);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	// Initial State
	var initialState = { data: [] };
	
	var PostReducer = function PostReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _PostActions.ADD_POST:
	      return {
	        data: [action.post].concat(_toConsumableArray(state.data))
	      };
	
	    case _PostActions.ADD_POSTS:
	      return {
	        data: action.posts
	      };
	
	    case _PostActions.DELETE_POST:
	      return {
	        data: state.data.filter(function (post) {
	          return post.cuid !== action.cuid;
	        })
	      };
	
	    default:
	      return state;
	  }
	};
	
	/* Selectors */
	
	// Get all posts
	var getPosts = exports.getPosts = function getPosts(state) {
	  return state.posts.data;
	};
	
	// Get post by cuid
	var getPost = exports.getPost = function getPost(state, cuid) {
	  return state.posts.data.filter(function (post) {
	    return post.cuid === cuid;
	  })[0];
	};
	
	// Export Reducer
	exports.default = PostReducer;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getSubm = exports.getSubms = undefined;
	
	var _SubmActions = __webpack_require__(13);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	// Initial State
	var initialState = { data: [] };
	
	var SubmReducer = function SubmReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _SubmActions.ADD_SUBM:
	      return Object.assign({}, state, {
	        data: [action.subm].concat(_toConsumableArray(state.data))
	      });
	
	    case _SubmActions.ADD_SUBMS:
	      return Object.assign({}, state, {
	        data: action.subms
	      });
	
	    case _SubmActions.DELETE_SUBM:
	      return Object.assign({}, state, {
	        data: state.data.filter(function (subm) {
	          return subm.cuid !== action.cuid;
	        })
	      });
	
	    case _SubmActions.ACCEPT_SUBM:
	      return Object.assign({}, state, {
	        //submitted: [action.data, ...state.submitted],
	      });
	
	    case _SubmActions.UPDATE_SUBM:
	      return Object.assign({}, state, {
	        data: state.data.map(function (subm) {
	          return subm.cuid === action.subm.cuid ? action.subm : subm;
	        })
	      });
	
	    default:
	      return state;
	  }
	};
	
	/* Selectors */
	
	// Get all submissiones
	var getSubms = exports.getSubms = function getSubms(state) {
	  return state.subms.data;
	};
	
	// Get subm by cuid
	var getSubm = exports.getSubm = function getSubm(state, cuid) {
	  return state.subms.data.filter(function (subm) {
	    return subm.cuid === cuid;
	  })[0];
	};
	
	// Export Reducer
	exports.default = SubmReducer;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(3);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	var ObjectId = Schema.ObjectId;
	
	if ('Activity' in _mongoose2.default.connection.models) delete _mongoose2.default.connection.models['Activity'];
	
	var activitySchema = new Schema({
	  description: { type: 'String', required: true, index: true },
	  researchers: [{
	    id: { type: ObjectId, required: true, index: true, ref: 'Researcher' },
	    _id: false
	  }],
	  subjects: [{
	    id: { type: ObjectId, required: true, index: true, ref: 'Subject' },
	    _id: false
	  }],
	  devices: [{
	    id: { type: ObjectId, required: true, index: true, ref: 'Device' },
	    _id: false
	  }],
	  software: [{
	    id: { type: ObjectId, required: true, index: true, ref: 'SWTool' },
	    _id: false
	  }],
	  other_resources: [{
	    id: { type: ObjectId, required: true, index: true },
	    _id: false
	  }],
	  outputs: [{
	    _id: { type: ObjectId, required: true, index: true },
	    cuid: { type: 'String', required: true, index: true },
	    name: { type: 'String', required: true, index: true },
	    uri: { type: 'String', required: false, index: true }
	  }],
	  slug: { type: 'String', required: true },
	  cuid: { type: 'String', required: true },
	  date_added: { type: 'Date', default: Date.now, required: true }
	});
	
	activitySchema.index({ "$**": "text" });
	
	exports.default = _mongoose2.default.model('Activity', activitySchema);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(3);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	if ('Device' in _mongoose2.default.connection.models) delete _mongoose2.default.connection.models['Device'];
	
	var deviceSchema = new Schema({
	  name: { type: 'String', required: true, index: true },
	  type: { type: 'String', required: true, index: true },
	  slug: { type: 'String', required: true },
	  cuid: { type: 'String', required: true },
	  date_added: { type: 'Date', default: Date.now, required: true }
	});
	
	deviceSchema.index({ "$**": "text" });
	
	exports.default = _mongoose2.default.model('Device', deviceSchema);

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(3);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	if ('Researcher' in _mongoose2.default.connection.models) delete _mongoose2.default.connection.models['Researcher'];
	
	var researcherSchema = new Schema({
	  name: { type: 'String', required: true, index: true },
	  surname: { type: 'String', required: true, index: true },
	  birthdate: { type: 'String', required: true, index: true },
	  slug: { type: 'String', required: true },
	  cuid: { type: 'String', required: true },
	  date_added: { type: 'Date', default: Date.now, required: true }
	});
	
	researcherSchema.index({ "$**": "text" });
	
	exports.default = _mongoose2.default.model('Researcher', researcherSchema);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(3);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	if ('SWTool' in _mongoose2.default.connection.models) delete _mongoose2.default.connection.models['SWTool'];
	
	var SWToolSchema = new Schema({
	  name: { type: 'String', required: true, index: true },
	  version: { type: 'String', required: true, index: true },
	  company: { type: 'String', required: false, index: true },
	  download_uri: { type: 'String', required: true, index: true },
	  slug: { type: 'String', required: true },
	  cuid: { type: 'String', required: true },
	  date_added: { type: 'Date', default: Date.now, required: true }
	});
	
	SWToolSchema.index({ "$**": "text" });
	
	exports.default = _mongoose2.default.model('SWTool', SWToolSchema);

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.localizationData = exports.enabledLanguages = undefined;
	
	var _reactIntl = __webpack_require__(2);
	
	var _intl = __webpack_require__(125);
	
	var _intl2 = _interopRequireDefault(_intl);
	
	var _intlLocalesSupported = __webpack_require__(126);
	
	var _intlLocalesSupported2 = _interopRequireDefault(_intlLocalesSupported);
	
	__webpack_require__(127);
	
	var _en = __webpack_require__(134);
	
	var _en2 = _interopRequireDefault(_en);
	
	var _en3 = __webpack_require__(73);
	
	var _en4 = _interopRequireDefault(_en3);
	
	__webpack_require__(128);
	
	var _fr = __webpack_require__(135);
	
	var _fr2 = _interopRequireDefault(_fr);
	
	var _fr3 = __webpack_require__(74);
	
	var _fr4 = _interopRequireDefault(_fr3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// list of available languages
	var enabledLanguages = exports.enabledLanguages = ['en'];
	
	// this object will have language-specific data added to it which will be placed in the state when that language is active
	// if localization data get to big, stop importing in all languages and switch to using API requests to load upon switching languages
	var localizationData = exports.localizationData = {};
	
	// here you bring in 'intl' browser polyfill and language-specific polyfills
	// (needed as safari doesn't have native intl: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
	// as well as react-intl's language-specific data
	// be sure to use static imports for language or else every language will be included in your build (adds ~800 kb)
	
	
	// need Intl polyfill, Intl not supported in Safari
	
	
	if (global.Intl) {
	  // Determine if the built-in `Intl` has the locale data we need.
	  if (!(0, _intlLocalesSupported2.default)(enabledLanguages)) {
	    // `Intl` exists, but it doesn't have the data we need, so load the
	    // polyfill and patch the constructors we need with the polyfill's.
	    global.Intl.NumberFormat = _intl2.default.NumberFormat;
	    global.Intl.DateTimeFormat = _intl2.default.DateTimeFormat;
	  }
	} else {
	  // No `Intl`, so use and load the polyfill.
	  global.Intl = _intl2.default;
	}
	
	// use this to allow nested messages, taken from docs:
	// https://github.com/yahoo/react-intl/wiki/Upgrade-Guide#flatten-messages-object
	function flattenMessages() {
	  var nestedMessages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	
	  return Object.keys(nestedMessages).reduce(function (messages, key) {
	    var value = nestedMessages[key];
	    var prefixedKey = prefix ? prefix + '.' + key : key;
	
	    if (typeof value === 'string') {
	      messages[prefixedKey] = value; // eslint-disable-line no-param-reassign
	    } else {
	      Object.assign(messages, flattenMessages(value, prefixedKey));
	    }
	
	    return messages;
	  }, {});
	}
	
	// bring in intl polyfill, react-intl, and app-specific language data
	
	(0, _reactIntl.addLocaleData)(_en2.default);
	localizationData.en = _en4.default;
	localizationData.en.messages = flattenMessages(localizationData.en.messages);
	
	(0, _reactIntl.addLocaleData)(_fr2.default);
	localizationData.fr = _fr4.default;
	localizationData.fr.messages = flattenMessages(localizationData.fr.messages);

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getShowAddPost = undefined;
	
	var _AppActions = __webpack_require__(18);
	
	// Initial State
	var initialState = {
	  showAddPost: false
	}; // Import Actions
	
	
	var AppReducer = function AppReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _AppActions.TOGGLE_ADD_POST:
	      return {
	        showAddPost: !state.showAddPost
	      };
	
	    default:
	      return state;
	  }
	};
	
	/* Selectors */
	
	// Get showAddPost
	var getShowAddPost = exports.getShowAddPost = function getShowAddPost(state) {
	  return state.app.showAddPost;
	};
	
	// Export Reducer
	exports.default = AppReducer;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reduxDevtools = __webpack_require__(137);
	
	var _reduxDevtoolsLogMonitor = __webpack_require__(139);
	
	var _reduxDevtoolsLogMonitor2 = _interopRequireDefault(_reduxDevtoolsLogMonitor);
	
	var _reduxDevtoolsDockMonitor = __webpack_require__(138);
	
	var _reduxDevtoolsDockMonitor2 = _interopRequireDefault(_reduxDevtoolsDockMonitor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _reduxDevtools.createDevTools)(_jsx(_reduxDevtoolsDockMonitor2.default, {
	  defaultIsVisible: false,
	  toggleVisibilityKey: 'ctrl-h',
	  changePositionKey: 'ctrl-w'
	}, void 0, _jsx(_reduxDevtoolsLogMonitor2.default, {})));

/***/ },
/* 35 */
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
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(2);
	
	var _JSSForm = __webpack_require__(17);
	
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(6);
	
	var _reactRedux = __webpack_require__(5);
	
	var _reactHelmet = __webpack_require__(9);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _reactIntl = __webpack_require__(2);
	
	var _JSSForm = __webpack_require__(17);
	
	var _JSSForm2 = _interopRequireDefault(_JSSForm);
	
	var _OutPortFeeder = __webpack_require__(84);
	
	var _OutPortFeeder2 = _interopRequireDefault(_OutPortFeeder);
	
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
	
	var _FormActions = __webpack_require__(19);
	
	var _SubmActions = __webpack_require__(13);
	
	var _FormReducer = __webpack_require__(20);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	
	// Import Actions
	
	
	// Import Selectors
	
	
	var FormDetailPage = function (_Component) {
	  _inherits(FormDetailPage, _Component);
	
	  function FormDetailPage(props) {
	    _classCallCheck(this, FormDetailPage);
	
	    var _this = _possibleConstructorReturn(this, (FormDetailPage.__proto__ || Object.getPrototypeOf(FormDetailPage)).call(this, props));
	
	    _this.onSubmit = function (_ref) {
	      var formData = _ref.formData;
	
	      console.log('submitting...');
	      console.log(_this.state.submitType);
	      var subm = {
	        form: _this.props.form._id,
	        data: formData
	      };
	      switch (_this.state.submitType) {
	        case 'submit_later':
	          _this.props.dispatch((0, _SubmActions.addSubmRequest)(subm)).then(_this.context.router.push('/'));
	          break;
	        case 'submit_now':
	          _this.props.dispatch((0, _SubmActions.addSubmRequest)(subm)).then(function (res) {
	            return _this.props.dispatch((0, _SubmActions.updateSubmRequest)(res.subm));
	          }).then(function (res) {
	            return _this.props.dispatch((0, _SubmActions.acceptSubmRequest)(res.subm));
	          }).then(_this.context.router.push('/'));
	          break;
	      }
	    };
	
	    _this.onChange = function (_ref2) {
	      var formData = _ref2.formData;
	
	      _this.setState({
	        formData: formData
	      });
	    };
	
	    _this.onClick = function (event) {
	      _this.sender.send('exited');
	      _this.setState({ submitType: event.target.id });
	    };
	
	    _this.state = {
	      formData: _this.props.form.init_data
	    };
	    _this.sender = new _OutPortFeeder2.default({ dataOutPort: 'wf-task-exit' });
	    return _this;
	  }
	
	  _createClass(FormDetailPage, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {}, void 0, _jsx(_reactHelmet2.default, {
	        title: this.props.form.title
	      }), _jsx('div', {
	        className: _FormListItem2.default['single-form'] + ' ' + _FormListItem2.default['form-detail']
	      }, void 0, _jsx('h3', {
	        className: _FormListItem2.default['form-title']
	      }, void 0, this.props.form.title)), _jsx(_JSSForm2.default, {
	        schema: this.props.form.json_schema,
	        uiSchema: this.props.form.ui_schema,
	        formData: this.state.formData,
	        onSubmit: this.onSubmit,
	        onChange: this.onChange,
	        listenToInternalEvents: true
	      }, void 0, _jsx('button', {
	        type: 'submit',
	        className: 'btn btn-info',
	        id: 'submit_now',
	        onClick: this.onClick
	      }, void 0, 'Submit (accept now)'), _jsx('button', {
	        type: 'submit',
	        className: 'btn btn-info',
	        id: 'submit_later',
	        onClick: this.onClick
	      }, void 0, 'Submit (accept later)')));
	    }
	  }]);
	
	  return FormDetailPage;
	}(_react.Component);
	
	// Actions required to provide data for this component to render in sever side.
	
	
	FormDetailPage.need = [function (params) {
	  return (0, _FormActions.fetchForm)(params.cuid);
	}];
	
	// Retrieve data from store as props
	function mapStateToProps(state, props) {
	  return {
	    form: (0, _FormReducer.getForm)(state, props.params.cuid)
	  };
	}
	
	FormDetailPage.contextTypes = {
	  router: _react2.default.PropTypes.object.isRequired
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(FormDetailPage);

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(5);
	
	var _FormList = __webpack_require__(92);
	
	var _FormList2 = _interopRequireDefault(_FormList);
	
	var _FormEditWidget = __webpack_require__(35);
	
	var _FormEditWidget2 = _interopRequireDefault(_FormEditWidget);
	
	var _FormActions = __webpack_require__(19);
	
	var _FormReducer = __webpack_require__(20);
	
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

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SWITCH_LANGUAGE = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.switchLanguage = switchLanguage;
	
	var _setup = __webpack_require__(32);
	
	// Export Constants
	var SWITCH_LANGUAGE = exports.SWITCH_LANGUAGE = 'SWITCH_LANGUAGE';
	
	function switchLanguage(newLang) {
	  return _extends({
	    type: SWITCH_LANGUAGE
	  }, _setup.localizationData[newLang]);
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Style
	
	
	// Import Actions
	
	
	// Import Selectors
	
	
	exports.PostDetailPage = PostDetailPage;
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(5);
	
	var _reactHelmet = __webpack_require__(9);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _reactIntl = __webpack_require__(2);
	
	var _PostListItem = {
	  "single-post": "_2wFZUrnLLPIM2UvuNgnV1r",
	  "post-title": "_1BU3HyU1b5fh1tsPA9MtRq",
	  "author-name": "_2pYEGhQRMs0Mh9CsoJsCrq",
	  "post-desc": "_2hG8tPFCGI0k7BZ5cz9nnH",
	  "post-action": "_37qYFcYfJHxrTH_bV6-TQo",
	  "divider": "_3H_6OlXO_Hx_93avyoPoZ2",
	  "post-detail": "_16xorg78DM6DwmPTBglw02"
	};
	
	var _PostListItem2 = _interopRequireDefault(_PostListItem);
	
	var _PostActions = __webpack_require__(21);
	
	var _PostReducer = __webpack_require__(22);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'by'
	});
	
	function PostDetailPage(props) {
	  return _jsx('div', {}, void 0, _jsx(_reactHelmet2.default, {
	    title: props.post.title
	  }), _jsx('div', {
	    className: _PostListItem2.default['single-post'] + ' ' + _PostListItem2.default['post-detail']
	  }, void 0, _jsx('h3', {
	    className: _PostListItem2.default['post-title']
	  }, void 0, props.post.title), _jsx('p', {
	    className: _PostListItem2.default['author-name']
	  }, void 0, _ref, ' ', props.post.name), _jsx('p', {
	    className: _PostListItem2.default['post-desc']
	  }, void 0, props.post.content)));
	}
	
	// Actions required to provide data for this component to render in sever side.
	PostDetailPage.need = [function (params) {
	  return (0, _PostActions.fetchPost)(params.cuid);
	}];
	
	// Retrieve data from store as props
	function mapStateToProps(state, props) {
	  return {
	    post: (0, _PostReducer.getPost)(state, props.params.cuid)
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(PostDetailPage);

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(5);
	
	var _PostList = __webpack_require__(96);
	
	var _PostList2 = _interopRequireDefault(_PostList);
	
	var _PostCreateWidget = __webpack_require__(95);
	
	var _PostCreateWidget2 = _interopRequireDefault(_PostCreateWidget);
	
	var _PostActions = __webpack_require__(21);
	
	var _AppActions = __webpack_require__(18);
	
	var _AppReducer = __webpack_require__(33);
	
	var _PostReducer = __webpack_require__(22);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Components
	
	
	// Import Actions
	
	
	// Import Selectors
	
	
	var PostListPage = function (_Component) {
	  _inherits(PostListPage, _Component);
	
	  function PostListPage() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, PostListPage);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PostListPage.__proto__ || Object.getPrototypeOf(PostListPage)).call.apply(_ref, [this].concat(args))), _this), _this.handleDeletePost = function (post) {
	      if (confirm('Do you want to delete this post')) {
	        // eslint-disable-line
	        _this.props.dispatch((0, _PostActions.deletePostRequest)(post));
	      }
	    }, _this.handleAddPost = function (name, title, content) {
	      _this.props.dispatch((0, _AppActions.toggleAddPost)());
	      _this.props.dispatch((0, _PostActions.addPostRequest)({ name: name, title: title, content: content }));
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(PostListPage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.dispatch((0, _PostActions.fetchPosts)());
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {}, void 0, _jsx(_PostCreateWidget2.default, {
	        addPost: this.handleAddPost,
	        showAddPost: this.props.showAddPost
	      }), _jsx(_PostList2.default, {
	        handleDeletePost: this.handleDeletePost,
	        posts: this.props.posts
	      }));
	    }
	  }]);
	
	  return PostListPage;
	}(_react.Component);
	
	// Actions required to provide data for this component to render in sever side.
	
	
	PostListPage.need = [function () {
	  return (0, _PostActions.fetchPosts)();
	}];
	
	// Retrieve data from store as props
	function mapStateToProps(state) {
	  return {
	    showAddPost: (0, _AppReducer.getShowAddPost)(state),
	    posts: (0, _PostReducer.getPosts)(state)
	  };
	}
	
	PostListPage.contextTypes = {
	  router: _react2.default.PropTypes.object
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(PostListPage);

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(5);
	
	var _reactHelmet = __webpack_require__(9);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _reactIntl = __webpack_require__(2);
	
	var _JSSForm = __webpack_require__(17);
	
	var _JSSForm2 = _interopRequireDefault(_JSSForm);
	
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
	
	var _SubmActions = __webpack_require__(13);
	
	var _SubmReducer = __webpack_require__(23);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	
	// Import Actions
	
	
	// Import Selectors
	
	
	var SubmDetailPage = function (_Component) {
	  _inherits(SubmDetailPage, _Component);
	
	  function SubmDetailPage(props) {
	    _classCallCheck(this, SubmDetailPage);
	
	    var _this = _possibleConstructorReturn(this, (SubmDetailPage.__proto__ || Object.getPrototypeOf(SubmDetailPage)).call(this, props));
	
	    _this.onSubmit = function (_ref) {
	      var formData = _ref.formData;
	
	      switch (_this.state.action) {
	        case 'save':
	          var subm = Object.assign({}, _this.props.subm, {
	            'form': _this.props.subm.form._id,
	            'data': formData
	          });
	          console.log(subm);
	          _this.props.dispatch((0, _SubmActions.updateSubmRequest)(subm)).then(_this.context.router.push('/subms'));
	          break;
	      }
	    };
	
	    _this.onChange = function (_ref2) {
	      var formData = _ref2.formData;
	
	      console.log(formData);
	      _this.setState({
	        formData: formData
	      });
	    };
	
	    _this.onClick = function (event) {
	      _this.setState({ action: event.target.id });
	    };
	
	    console.log(_this.props.subm.data);
	    _this.state = {
	      formData: _this.props.subm.data
	    };
	    return _this;
	  }
	
	  _createClass(SubmDetailPage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      /*console.log('componentDidMount');
	      if (!this.props.subm.form)
	        this.props.dispatch(fetchSubm(this.props.subm.cuid));
	      */
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {}, void 0, _jsx(_reactHelmet2.default, {
	        title: this.props.subm.form.title
	      }), _jsx('div', {
	        className: _SubmListItem2.default['single-subm'] + ' ' + _SubmListItem2.default['subm-detail']
	      }, void 0, _jsx('h3', {
	        className: _SubmListItem2.default['subm-title']
	      }, void 0, this.props.subm.form.title)), _jsx(_JSSForm2.default, {
	        schema: this.props.subm.form.json_schema,
	        uiSchema: this.props.subm.form.ui_schema,
	        formData: this.state.formData,
	        onSubmit: this.onSubmit,
	        onChange: this.onChange,
	        listenToInternalEvents: true
	      }, void 0, _jsx('button', {
	        type: 'submit',
	        className: 'btn btn-info',
	        id: 'save',
	        onClick: this.onClick
	      }, void 0, 'Save')));
	    }
	  }]);
	
	  return SubmDetailPage;
	}(_react.Component);
	
	// Actions required to provide data for this component to render in sever side.
	
	
	SubmDetailPage.defaultProps = {
	  subm: {
	    form: {}
	  }
	};
	SubmDetailPage.need = [function (params) {
	  return (0, _SubmActions.fetchSubm)(params.cuid);
	}];
	
	// Retrieve data from store as props
	function mapStateToProps(state, props) {
	  return {
	    subm: (0, _SubmReducer.getSubm)(state, props.params.cuid)
	  };
	}
	
	SubmDetailPage.contextTypes = {
	  router: _react2.default.PropTypes.object.isRequired
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(SubmDetailPage);

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(5);
	
	var _SubmList = __webpack_require__(98);
	
	var _SubmList2 = _interopRequireDefault(_SubmList);
	
	var _SubmActions = __webpack_require__(13);
	
	var _SubmReducer = __webpack_require__(23);
	
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(3);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	if ('Form' in _mongoose2.default.connection.models) delete _mongoose2.default.connection.models['Form'];
	
	var formSchema = new Schema({
	  title: { type: 'String', required: true },
	  json_schema: { type: 'Mixed', required: true },
	  ui_schema: { type: 'Mixed', required: true },
	  init_data: { type: 'Mixed', required: true },
	  slug: { type: 'String', required: true },
	  cuid: { type: 'String', required: true },
	  date_added: { type: 'Date', default: Date.now, required: true }
	}, { minimize: false });
	
	exports.default = _mongoose2.default.model('Form', formSchema);

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.IntlWrapper = IntlWrapper;
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(2);
	
	var _reactRedux = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function IntlWrapper(props) {
	  return _react2.default.createElement(
	    _reactIntl.IntlProvider,
	    props.intl,
	    props.children
	  );
	}
	
	// Retrieve data from store as props
	function mapStateToProps(store) {
	  return {
	    intl: store.intl
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(IntlWrapper);

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }(); /* eslint-disable global-require */
	
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(6);
	
	var _App = __webpack_require__(86);
	
	var _App2 = _interopRequireDefault(_App);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// require.ensure polyfill for node
	if (false) {
	  require.ensure = function requireModule(deps, callback) {
	    callback(require);
	  };
	}
	
	/* Workaround for async react routes to work with react-hot-reloader till
	  https://github.com/reactjs/react-router/issues/2182 and
	  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
	 */
	if (process.env.NODE_ENV !== 'production') {
	  // Require async routes only in development for react-hot-reloader to work.
	  __webpack_require__(40);
	  __webpack_require__(39);
	  __webpack_require__(37);
	  __webpack_require__(36);
	  __webpack_require__(42);
	  __webpack_require__(41);
	}
	
	// react-router setup with code-splitting
	// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
	exports.default = _jsx(_reactRouter.Route, {
	  path: '/posts',
	  component: _App2.default
	}, void 0, _jsx(_reactRouter.IndexRoute, {
	  getComponent: function getComponent(nextState, cb) {
	    Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	      cb(null, __webpack_require__(40).default);
	    }).bind(null, __webpack_require__));
	  }
	}), _jsx(_reactRouter.Route, {
	  path: '/posts/:slug-:cuid',
	  getComponent: function getComponent(nextState, cb) {
	    Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	      cb(null, __webpack_require__(39).default);
	    }).bind(null, __webpack_require__));
	  }
	}), _jsx(_reactRouter.Route, {
	  path: '/',
	  getComponent: function getComponent(nextState, cb) {
	    Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	      cb(null, __webpack_require__(37).default);
	    }).bind(null, __webpack_require__));
	  }
	}), _jsx(_reactRouter.Route, {
	  path: '/forms/:slug-:cuid',
	  getComponent: function getComponent(nextState, cb) {
	    Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	      cb(null, __webpack_require__(36).default);
	    }).bind(null, __webpack_require__));
	  }
	}), _jsx(_reactRouter.Route, {
	  path: '/subms',
	  getComponent: function getComponent(nextState, cb) {
	    Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	      cb(null, __webpack_require__(42).default);
	    }).bind(null, __webpack_require__));
	  }
	}), _jsx(_reactRouter.Route, {
	  path: '/subms/:slug-:cuid',
	  getComponent: function getComponent(nextState, cb) {
	    Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	      cb(null, __webpack_require__(41).default);
	    }).bind(null, __webpack_require__));
	  }
	}));
	
	/*
	export default (
	  <Route path="/" component={App}>
	    <IndexRoute
	      getComponent={(nextState, cb) => {
	        require.ensure([], require => {
	          cb(null, require('./modules/Form/pages/FormListPage/FormListPage').default);
	        });
	      }}
	    />
	    <Route
	      path="/forms/:slug-:cuid"
	      getComponent={(nextState, cb) => {
	        require.ensure([], require => {
	          cb(null, require('./modules/Form/pages/FormDetailPage/FormDetailPage').default);
	        });
	      }}
	    />
	  </Route>
	);*/

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.configureStore = configureStore;
	
	var _redux = __webpack_require__(44);
	
	var _reduxThunk = __webpack_require__(140);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _DevTools = __webpack_require__(34);
	
	var _DevTools2 = _interopRequireDefault(_DevTools);
	
	var _reducers = __webpack_require__(100);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Main store function
	 */
	function configureStore() {
	  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  // Middleware and store enhancers
	  var enhancers = [(0, _redux.applyMiddleware)(_reduxThunk2.default)];
	
	  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
	    // Enable DevTools only when rendering on client and during development.
	    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : _DevTools2.default.instrument());
	  }
	
	  var store = (0, _redux.createStore)(_reducers2.default, initialState, _redux.compose.apply(undefined, enhancers));
	
	  // For hot reloading reducers
	  if (false) {
	    // Enable Webpack hot module replacement for reducers
	    module.hot.accept('./reducers', function () {
	      var nextReducer = require('./reducers').default; // eslint-disable-line global-require
	      store.replaceReducer(nextReducer);
	    });
	  }
	
	  return store;
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var _subject = __webpack_require__(14);
	
	var _subject2 = _interopRequireDefault(_subject);
	
	var _researcher = __webpack_require__(26);
	
	var _researcher2 = _interopRequireDefault(_researcher);
	
	var _device = __webpack_require__(25);
	
	var _device2 = _interopRequireDefault(_device);
	
	var _swtool = __webpack_require__(27);
	
	var _swtool2 = _interopRequireDefault(_swtool);
	
	var _activity = __webpack_require__(24);
	
	var _activity2 = _interopRequireDefault(_activity);
	
	var _form = __webpack_require__(43);
	
	var _form2 = _interopRequireDefault(_form);
	
	var _mongoose = __webpack_require__(3);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _cuid = __webpack_require__(11);
	
	var _cuid2 = _interopRequireDefault(_cuid);
	
	var _chance = __webpack_require__(123);
	
	var _chance2 = _interopRequireDefault(_chance);
	
	var _apiCaller = __webpack_require__(4);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_mongoose2.default.Promise = global.Promise;
	var ObjectId = _mongoose2.default.Types.ObjectId;
	
	var chance = new _chance2.default();
	
	function dummyData(verbose) {
	
	  return Promise.resolve().then(function () {
	    return _subject2.default.count().exec();
	  }).then(function (count) {
	    if (count > 0) {
	      console.log('subjects collection was filled');
	      return;
	    }
	    console.log('filling subjects collection ...');
	    var subjects = [];
	    for (var i = 0; i < 1000; i++) {
	      var subject = new _subject2.default({
	        name: chance.first(),
	        surname: chance.last(),
	        birthdate: chance.birthday({ string: true }),
	        slug: 'test-subject',
	        cuid: (0, _cuid2.default)()
	      });
	      subjects.push(subject);
	    }
	    return _subject2.default.create(subjects);
	  }).then(function () {
	    return console.log('subjects filled');
	  }).then(function () {
	    return _researcher2.default.count().exec();
	  }).then(function (count) {
	    if (count > 0) {
	      console.log('researchers collection was filled');
	      return;
	    }
	    console.log('filling researchers collection ...');
	    var researchers = [];
	    for (var i = 0; i < 1000; i++) {
	      var researcher = new _researcher2.default({
	        name: chance.first(),
	        surname: chance.last(),
	        birthdate: chance.birthday({ string: true }),
	        slug: 'test-researcher',
	        cuid: (0, _cuid2.default)()
	      });
	      researchers.push(researcher);
	    }
	    return _researcher2.default.create(researchers);
	  }).then(function () {
	    return console.log('researchers filled');
	  }).then(function () {
	    return _device2.default.count().exec();
	  }).then(function (count) {
	    if (count > 0) {
	      console.log('devices collection was filled');
	      return;
	    }
	    console.log('filling devices collection ...');
	    var devices = [];
	    var types = ['device-type-1', 'device-type-2', 'device-type-3', 'device-type-4', 'device-type-5'];
	    for (var i = 0; i < 50; i++) {
	      var device = new _device2.default({
	        name: 'device-' + chance.word(),
	        type: types[chance.integer({ min: 0, max: types.length - 1 })],
	        slug: 'test-device',
	        cuid: (0, _cuid2.default)()
	      });
	      devices.push(device);
	    }
	    return _device2.default.create(devices);
	  }).then(function () {
	    return console.log('devices filled');
	  }).then(function () {
	    return _swtool2.default.count().exec();
	  }).then(function (count) {
	    if (count > 0) {
	      console.log('sw-tools collection was filled');
	      return;
	    }
	    console.log('filling sw-tools collection ...');
	    var swTools = [];
	    var tools = [{ name: 'software-A', company: 'Micky Mouse Inc.' }, { name: 'software-B', company: 'Duffy Duck Ltd.' }, { name: 'software-C', company: 'Bla bla NV' }, { name: 'software-D' }];
	    for (var i = 0; i < 50; i++) {
	      var tool = tools[chance.integer({ min: 0, max: tools.length - 1 })];
	      var vr = { min: 0, max: 10 };
	      var maj = chance.integer(vr);
	      var min = chance.integer(vr);
	      var rev = chance.integer(vr);
	      var version = maj + '.' + min + '.' + rev;
	      var swTool = new _swtool2.default({
	        name: tool.name,
	        version: version,
	        company: tool.company,
	        download_uri: chance.url(),
	        slug: 'test-software',
	        cuid: (0, _cuid2.default)()
	      });
	      swTools.push(swTool);
	    }
	    return _swtool2.default.create(swTools);
	  }).then(function () {
	    return console.log('sw-tools filled');
	  }).then(function () {
	    return _activity2.default.count().exec();
	  }).then(function (count) {
	    if (count > 0) {
	      console.log('activities collection was filled');
	      return;
	    }
	
	    console.log('filling activities collection ...');
	    return Promise.all([(0, _apiCaller2.default)('researchers'), (0, _apiCaller2.default)('subjects'), (0, _apiCaller2.default)('devices'), (0, _apiCaller2.default)('sw-tools')]).then(function (results) {
	      var data = results.reduce(function (acc, r) {
	        return Object.assign(acc, r);
	      }, {});
	      return data;
	    }).then(function (d) {
	
	      var activities = [];
	
	      //for (let i = 0; i < 1e4; i++) {
	      while (activities.length < 1e4) {
	
	        var i = activities.length;
	
	        var researchers = [{ id: ObjectId(d.researchers[chance.integer({ min: 0, max: d.researchers.length - 1 })]._id) }];
	
	        var useSubject = chance.bool({ likelihood: 15 });
	        var subjects = [];
	        if (useSubject) {
	          subjects = [{ id: ObjectId(d.subjects[chance.integer({ min: 0, max: d.subjects.length - 1 })]._id) }];
	        }
	
	        var devices = [];
	        for (var j = 0; j < chance.natural({ min: 1, max: 5 }); j++) {
	          devices.push({ id: ObjectId(d.devices[chance.integer({ min: 0, max: d.devices.length - 1 })]._id) });
	        }
	
	        var software = [];
	        for (var _j = 0; _j < chance.natural({ min: 1, max: 5 }); _j++) {
	          software.push({ id: ObjectId(d.SWTools[chance.integer({ min: 0, max: d.SWTools.length - 1 })]._id) });
	        }
	
	        var outputs = [];
	        for (var _j2 = 0; _j2 < chance.natural({ min: 1, max: 5 }); _j2++) {
	          outputs.push({
	            _id: ObjectId(),
	            cuid: (0, _cuid2.default)(),
	            name: chance.word(),
	            uri: chance.url()
	          });
	        }
	
	        // link data:
	        var other_resources = [];
	        if (i > 100) {
	          if (!useSubject) {
	            if (verbose) console.log('linking activity ' + i + ' ...');
	            var nGoodLinks = 0;
	            for (var k = 0; k < chance.natural({ min: 1, max: 3 }); k++) {
	              var nAttempts = 0;
	              var ok = false;
	              while (nAttempts < 5) {
	                var di = chance.natural({ min: 1, max: 5 });
	                var ii = i - di;
	                nAttempts++;
	                if (ii >= 0 && activities[ii].subjects.length > 0) {
	                  ok = true;
	                  var output = activities[ii].outputs[chance.integer({ min: 0, max: activities[ii].outputs.length - 1 })];
	                  other_resources.push({
	                    'id': output._id
	                  });
	                  break;
	                }
	              }
	              if (ok) {
	                nGoodLinks++;
	              }
	              if (verbose) console.log('link ' + k + ': attempts=' + nAttempts + ', src_has_sbj=' + ok);
	            }
	            if (nGoodLinks == 0) {
	              // don't insert activity
	              if (verbose) console.log('skipping activity ' + i);
	              continue;
	            }
	          }
	        }
	
	        var activity = {
	          description: chance.sentence(),
	          researchers: researchers,
	          subjects: subjects,
	          devices: devices,
	          software: software,
	          outputs: outputs,
	          other_resources: other_resources,
	          slug: 'test-activity',
	          cuid: (0, _cuid2.default)()
	        };
	
	        activities.push(activity);
	      }
	
	      return activities;
	    }).then(function (activities) {
	      return _activity2.default.create(activities);
	    });
	  }).then(function () {
	    return console.log('activities filled');
	  }).then(function () {
	    return _form2.default.count().exec();
	  }).then(function (count) {
	    if (count > 0) {
	      console.log('forms collection was filled');
	      return;
	    }
	    console.log('filling forms collection ...');
	    var forms = [];
	
	    var form1 = {
	      title: "sample lab activity",
	      json_schema: __webpack_require__(119),
	      ui_schema: __webpack_require__(120),
	      init_data: {},
	      slug: "sample-lab-activity",
	      cuid: (0, _cuid2.default)()
	    };
	    forms.push(form1);
	
	    var form2 = {
	      title: "empty",
	      json_schema: {},
	      ui_schema: {},
	      init_data: {},
	      slug: "empty",
	      cuid: (0, _cuid2.default)()
	    };
	    forms.push(form2);
	
	    return _form2.default.create(forms);
	  }).then(function () {
	    return console.log('forms filled');
	  });
	}
	
	module.exports = dummyData;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var _express = __webpack_require__(1);
	
	var _device = __webpack_require__(101);
	
	var DeviceController = _interopRequireWildcard(_device);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Devices
	router.route('/devices').get(DeviceController.getDevices);
	
	// Get one device by cuid
	router.route('/devices/:cuid').get(DeviceController.getDevice);
	
	//export default router;
	module.exports = router;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var _express = __webpack_require__(1);
	
	var _deviceSearch = __webpack_require__(102);
	
	var DeviceController = _interopRequireWildcard(_deviceSearch);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Devices
	router.route('/devices').get(DeviceController.getDevices);
	
	//export default router;
	module.exports = router;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var _express = __webpack_require__(1);
	
	var _form = __webpack_require__(103);
	
	var FormController = _interopRequireWildcard(_form);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Forms
	router.route('/forms').get(FormController.getForms);
	
	// Get one form by cuid
	router.route('/forms/:cuid').get(FormController.getForm);
	
	// Add a new Form
	router.route('/forms').post(FormController.addForm);
	
	// Update form by cuid
	router.route('/forms/:cuid').put(FormController.updateForm);
	
	// Delete a form by cuid
	router.route('/forms/:cuid').delete(FormController.deleteForm);
	
	//export default router;
	module.exports = router;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var _express = __webpack_require__(1);
	
	var _output = __webpack_require__(104);
	
	var OutputController = _interopRequireWildcard(_output);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	if (process.env.NODE_ENV === 'development') {
	  // Get all Outputs
	  router.route('/outputs').get(OutputController.getOutputs);
	}
	
	// Get one output by cuid
	router.route('/outputs/:cuid').get(OutputController.getOutput);
	
	//export default router;
	module.exports = router;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var _express = __webpack_require__(1);
	
	var _outputSearch = __webpack_require__(105);
	
	var OutputController = _interopRequireWildcard(_outputSearch);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Devices
	router.route('/outputs').get(OutputController.getOutputs);
	
	//export default router;
	module.exports = router;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var _express = __webpack_require__(1);
	
	var _post = __webpack_require__(106);
	
	var PostController = _interopRequireWildcard(_post);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Posts
	router.route('/posts').get(PostController.getPosts);
	
	// Get one post by cuid
	router.route('/posts/:cuid').get(PostController.getPost);
	
	// Add a new Post
	router.route('/posts').post(PostController.addPost);
	
	// Delete a post by cuid
	router.route('/posts/:cuid').delete(PostController.deletePost);
	
	//export default router;
	module.exports = router;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var _express = __webpack_require__(1);
	
	var _researcher = __webpack_require__(107);
	
	var ResearcherController = _interopRequireWildcard(_researcher);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Researchers
	router.route('/researchers').get(ResearcherController.getResearchers);
	
	// Get one researcher by cuid
	router.route('/researchers/:cuid').get(ResearcherController.getResearcher);
	
	//export default router;
	module.exports = router;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var _express = __webpack_require__(1);
	
	var _researcherSearch = __webpack_require__(108);
	
	var ResearcherController = _interopRequireWildcard(_researcherSearch);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Researchers
	router.route('/researchers').get(ResearcherController.getResearchers);
	
	//export default router;
	module.exports = router;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var _express = __webpack_require__(1);
	
	var _subject = __webpack_require__(109);
	
	var SubjectController = _interopRequireWildcard(_subject);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Subjects
	router.route('/subjects').get(SubjectController.getSubjects);
	
	// Get one subject by cuid
	router.route('/subjects/:cuid').get(SubjectController.getSubject);
	
	//export default router;
	module.exports = router;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var _express = __webpack_require__(1);
	
	var _subjectSearch = __webpack_require__(110);
	
	var SubjectController = _interopRequireWildcard(_subjectSearch);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Subjects
	router.route('/subjects').get(SubjectController.getSubjects);
	
	//export default router;
	module.exports = router;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var _express = __webpack_require__(1);
	
	var _subm = __webpack_require__(111);
	
	var SubmController = _interopRequireWildcard(_subm);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Submissions
	router.route('/subms').get(SubmController.getSubms);
	
	// Get one submission by cuid
	router.route('/subms/:cuid').get(SubmController.getSubm);
	
	// Add a new Submission
	router.route('/subms').post(SubmController.addSubm);
	
	// Update submission by cuid
	router.route('/subms/:cuid').put(SubmController.updateSubm);
	
	// Delete a submission by cuid
	router.route('/subms/:cuid').delete(SubmController.deleteSubm);
	
	//export default router;
	module.exports = router;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var _express = __webpack_require__(1);
	
	var _swtool = __webpack_require__(112);
	
	var SWToolController = _interopRequireWildcard(_swtool);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Software tools
	router.route('/sw-tools').get(SWToolController.getSWTools);
	
	// Get one software tool by cuid
	router.route('/sw-tools/:cuid').get(SWToolController.getSWTool);
	
	//export default router;
	module.exports = router;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var _express = __webpack_require__(1);
	
	var _swtoolSearch = __webpack_require__(113);
	
	var SWToolController = _interopRequireWildcard(_swtoolSearch);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Software tools
	router.route('/sw-tools').get(SWToolController.getSWTools);
	
	//export default router;
	module.exports = router;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var _express = __webpack_require__(1);
	
	var router = new _express.Router();
	
	router.get('/msg', function (req, res) {
	  res.send("Test server server HMR");
	});
	
	//export default router;
	module.exports = router;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var _express = __webpack_require__(1);
	
	var _upload = __webpack_require__(114);
	
	var UploadController = _interopRequireWildcard(_upload);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Upload file
	router.route('/upload/file').post(UploadController.uploadFile);
	
	// Upload data
	router.route('/upload/data').post(UploadController.uploadData);
	
	//export default router;
	module.exports = router;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fetchComponentData = fetchComponentData;
	
	var _promiseUtils = __webpack_require__(117);
	
	function fetchComponentData(store, components, params) {
	  var needs = components.reduce(function (prev, current) {
	    return (current.need || []).concat((current.WrappedComponent && current.WrappedComponent.need !== current.need ? current.WrappedComponent.need : []) || []).concat(prev);
	  }, []);
	
	  return (0, _promiseUtils.sequence)(needs, function (need) {
	    return store.dispatch(need(params, store.getState()));
	  });
	} /*
	  Utility function to fetch required data for component to render in server side.
	  This was inspired from https://github.com/caljrimmer/isomorphic-redux-app/blob/73e6e7d43ccd41e2eb557a70be79cebc494ee54b/src/common/api/fetchComponentDataBeforeRender.js
	  */

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	var webpack = __webpack_require__(31);
	var cssnext = __webpack_require__(129);
	var postcssFocus = __webpack_require__(130);
	var postcssReporter = __webpack_require__(131);
	
	module.exports = {
	  devtool: 'cheap-module-eval-source-map',
	
	  entry: {
	    app: ['eventsource-polyfill', 'webpack-hot-middleware/client', 'webpack/hot/only-dev-server', 'react-hot-loader/patch', './client/index.js'],
	    vendor: ['react', 'react-dom']
	  },
	
	  output: {
	    path: __dirname,
	    filename: 'app.js',
	    //publicPath: 'http://0.0.0.0:8000/',
	    publicPath: 'http://localhost:8000/'
	  },
	
	  resolve: {
	    extensions: ['', '.js', '.jsx', '.css'],
	    modules: ['client', 'node_modules']
	  },
	
	  module: {
	    loaders: [{
	      test: /\.css$/,
	      exclude: /node_modules/,
	      loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader'
	    }, {
	      test: /\.css$/,
	      include: /node_modules/,
	      loaders: ['style-loader', 'css-loader']
	    }, {
	      test: /\.jsx*$/,
	      exclude: [/node_modules/, /.+\.config.js/],
	      loader: 'babel'
	    }, {
	      test: /\.(jpe?g|gif|png|svg|eot|ttf|woff|woff2)$/i,
	      loader: 'url-loader?limit=10000'
	    }, {
	      test: /\.json$/,
	      loader: 'json-loader'
	    }, {
	      test: /*require.resolve*/(122),
	      loader: "null-loader"
	    }]
	  },
	
	  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.optimize.CommonsChunkPlugin({
	    name: 'vendor',
	    minChunks: Infinity,
	    filename: 'vendor.js'
	  }), new webpack.DefinePlugin({
	    'process.env': {
	      CLIENT: JSON.stringify(true),
	      'NODE_ENV': JSON.stringify('development')
	    }
	  })],
	
	  postcss: function postcss() {
	    return [postcssFocus(), cssnext({
	      browsers: ['last 2 versions', 'IE > 10']
	    }), postcssReporter({
	      clearMessages: true
	    })];
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = require("chokidar");

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = require("express-fileupload");

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = require("readline");

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ },
/* 73 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  locale: 'en',
	  messages: {
	    // generic
	    save: 'Save',
	    // posts
	    siteTitle: 'MERN App',
	    addPost: 'Add Post',
	    switchLanguage: 'Switch Language',
	    twitterMessage: 'We are on Twitter',
	    by: 'By',
	    deletePost: 'Delete Post',
	    createNewPost: 'Create new post',
	    authorName: 'Author\'s Name',
	    postTitle: 'Post Title',
	    postContent: 'Post Content',
	    submit: 'Submit',
	    comment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t}',
	    HTMLComment: 'user <b style=\'font-weight: bold\'>{name} </b> {value, plural,\n    \t  =0 {does not have <i style=\'font-style: italic\'>any</i> comments}\n    \t  =1 {has <i style=\'font-style: italic\'>#</i> comment}\n    \t  other {has <i style=\'font-style: italic\'>#</i> comments}\n    \t}',
	    nestedDateComment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t} as of {date}',
	    // forms
	    addForm: 'Add Form',
	    editForm: 'Edit Form',
	    deleteForm: 'Delete Form',
	    createNewForm: 'Create new form',
	    formTitle: 'Form Title',
	    formJSONSchema: 'Form JSON Schema',
	    formUISchema: 'Form UI Schema',
	    formInitData: 'Form initial data',
	    formPreview: 'Form preview',
	    // submissiones
	    acceptSubm: 'Accept Submission',
	    deleteSubm: 'Delete Submission'
	  }
	};

/***/ },
/* 74 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  locale: 'fr',
	  messages: {
	    siteTitle: 'MERN blog de démarrage',
	    addPost: 'Ajouter Poster',
	    switchLanguage: 'Changer de langue',
	    twitterMessage: 'Nous sommes sur Twitter',
	    by: 'Par',
	    deletePost: 'Supprimer le message',
	    createNewPost: 'Créer un nouveau message',
	    authorName: 'Nom de l\'auteur',
	    postTitle: 'Titre de l\'article',
	    postContent: 'Contenu après',
	    submit: 'Soumettre',
	    comment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t} (in real app this would be translated to French)',
	    HTMLComment: 'user <b style=\'font-weight: bold\'>{name} </b> {value, plural,\n    \t  =0 {does not have <i style=\'font-style: italic\'>any</i> comments}\n    \t  =1 {has <i style=\'font-style: italic\'>#</i> comment}\n    \t  other {has <i style=\'font-style: italic\'>#</i> comments}\n    \t} (in real app this would be translated to French)',
	    nestedDateComment: 'user {name} {value, plural,\n  \t\t  =0 {does not have any comments}\n  \t\t  =1 {has # comment}\n  \t\t  other {has # comments}\n  \t\t} as of {date} (in real app this would be translated to French)'
	  }
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactSelect = __webpack_require__(12);
	
	var _reactSelect2 = _interopRequireDefault(_reactSelect);
	
	var _apiSearchCaller = __webpack_require__(10);
	
	var _apiSearchCaller2 = _interopRequireDefault(_apiSearchCaller);
	
	var _apiCaller = __webpack_require__(4);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	var _pubsubJs = __webpack_require__(8);
	
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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactSelect = __webpack_require__(12);
	
	var _reactSelect2 = _interopRequireDefault(_reactSelect);
	
	var _apiSearchCaller = __webpack_require__(10);
	
	var _apiSearchCaller2 = _interopRequireDefault(_apiSearchCaller);
	
	var _apiCaller = __webpack_require__(4);
	
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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _isomorphicFetch = __webpack_require__(28);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _apiCaller = __webpack_require__(4);
	
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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactSelect = __webpack_require__(12);
	
	var _reactSelect2 = _interopRequireDefault(_reactSelect);
	
	var _apiSearchCaller = __webpack_require__(10);
	
	var _apiSearchCaller2 = _interopRequireDefault(_apiSearchCaller);
	
	var _apiCaller = __webpack_require__(4);
	
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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactSelect = __webpack_require__(12);
	
	var _reactSelect2 = _interopRequireDefault(_reactSelect);
	
	var _apiSearchCaller = __webpack_require__(10);
	
	var _apiSearchCaller2 = _interopRequireDefault(_apiSearchCaller);
	
	var _apiCaller = __webpack_require__(4);
	
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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactSelect = __webpack_require__(12);
	
	var _reactSelect2 = _interopRequireDefault(_reactSelect);
	
	var _apiSearchCaller = __webpack_require__(10);
	
	var _apiSearchCaller2 = _interopRequireDefault(_apiSearchCaller);
	
	var _apiCaller = __webpack_require__(4);
	
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pubsubJs = __webpack_require__(8);
	
	var _pubsubJs2 = _interopRequireDefault(_pubsubJs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var port = "";
	var data = {};
	var buffered = true;
	var maxBufferSize = 1000;
	var digestInterval = 10; // ms
	var send = true;
	var showContent = false;
	
	var _ref = _jsx('b', {}, void 0, 'Buffer size:');
	
	var _ref2 = _jsx('b', {}, void 0, 'Current buffered frames:');
	
	var _ref3 = _jsx('b', {}, void 0, 'Single package digest interval (ms):');
	
	var _ref4 = _jsx('b', {}, void 0, 'Content:');
	
	var _ref5 = _jsx('b', {}, void 0, _jsx('i', {}, void 0, '--In-port--'));
	
	var _ref6 = _jsx('b', {}, void 0, 'Port');
	
	var _ref7 = _jsx('b', {}, void 0, 'Buffered:');
	
	var InPort = function (_React$Component) {
	    _inherits(InPort, _React$Component);
	
	    function InPort(props) {
	        _classCallCheck(this, InPort);
	
	        var _this = _possibleConstructorReturn(this, (InPort.__proto__ || Object.getPrototypeOf(InPort)).call(this, props));
	
	        _this.state = {
	            bufferLength: 0
	        };
	        _this.digestSinglePackage = _this.digestSinglePackage.bind(_this);
	        _this.handleNewPackage = _this.handleNewPackage.bind(_this);
	        _this.buffer = [];
	        _this.digestLoop = null;
	        _this._isMounted = false;
	        return _this;
	    }
	
	    _createClass(InPort, [{
	        key: 'render',
	        value: function render() {
	            //return null
	
	            var bufferedInfo = undefined;
	            if (this.props.buffered) {
	                bufferedInfo = _jsx('div', {}, void 0, _jsx('div', {}, void 0, _ref, ' ', this.props.maxBufferSize), _jsx('div', {}, void 0, _ref2, ' ', this.state.bufferLength), _jsx('div', {}, void 0, _ref3, ' ', this.props.digestInterval));
	            }
	            var content = undefined;
	            if (this.props.showContent) {
	                content = _jsx('div', {}, void 0, _jsx('div', {}, void 0, _ref4, ' ', JSON.stringify(this.props.data.data)));
	            }
	            return _jsx('div', {}, void 0, _ref5, _jsx('div', {}, void 0, _ref6, ' ', this.props.port), _jsx('div', {}, void 0, _ref7, ' ', this.props.buffered ? "true" : "false"), bufferedInfo, content);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            if (this.props.buffered) {
	                // activate timed digesting
	                this.digestLoop = setInterval(this.digestSinglePackage, this.props.digestInterval);
	            }
	            this._isMounted = true;
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {}
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            if (this.props.buffered) {
	                // activate timed digesting
	                clearInterval(this.digestLoop);
	            }
	            this._isMounted = false;
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            if (Object.keys(nextProps.data).length == 0) return; // check must involve default value for no data: {}
	            if (this.props.data != nextProps.data) this.handleNewPackage(nextProps.data, nextProps.port, nextProps.buffered, nextProps.maxBufferSize, nextProps.send);
	            if (nextProps.buffered != this.props.buffered) {
	                if (nextProps.buffered) {
	                    // activate timed digesting
	                    this.digestLoop = setInterval(this.digestSinglePackage, nextProps.digestInterval);
	                } else {
	                    // de-activate timed digesting
	                    clearInterval(this.digestLoop);
	                    this.buffer = [];
	                }
	            }
	            if (nextProps.digestInterval != this.props.digestInterval) {
	                if (nextProps.buffered && this.props.buffered) {
	                    clearInterval(this.digestLoop);
	                    this.digestLoop = setInterval(this.digestSinglePackage, nextProps.digestInterval);
	                }
	            }
	        }
	    }, {
	        key: 'handleNewPackage',
	        value: function handleNewPackage(pckg, port, buffered, maxBufferSize, send) {
	            //console.log("NEWWW")
	            //console.log("In-buffer size: " + this.buffer.length);
	            if (buffered) {
	                // add package to buffer
	                for (var i = 0; i < pckg.data.length; i++) {
	                    this.buffer.push(pckg.data[i]);
	                    if (this.buffer.length > maxBufferSize) {
	                        // buffer is full; drop some data
	                        this.buffer.shift();
	                        //console.log("In-buffer full; old in-packages were dropped");
	                    }
	                    this.setState({ bufferLength: this.buffer.length });
	                }
	                //console.log("All new in-packages added to in-buffer");
	            } else {
	                // or send it immediately
	                if (port != "") {
	                    if (send) {
	                        _pubsubJs2.default.publishSync(port, pckg.data);
	                        //console.log("All new in-packages published immediately");
	                    }
	                } else {
	                        //console.log("Input port name is empty");
	                    }
	            }
	        }
	    }, {
	        key: 'digestSinglePackage',
	        value: function digestSinglePackage() {
	            if (this.props.port != "") {
	                if (this.buffer.length == 0) return;
	                var d = this.buffer.shift();
	                this.setState({ bufferLength: this.buffer.length });
	                if (this.props.send) {
	                    _pubsubJs2.default.publishSync(this.props.port, [d]);
	                    //console.log("Single in-package published");
	                }
	                //console.log("In-buffer size: " + this.buffer.length);
	            } else {
	                    //console.log("Input port name is empty");
	                }
	        }
	    }]);
	
	    return InPort;
	}(_react2.default.Component);
	
	InPort.defaultProps = {
	    port: port,
	    data: data,
	    buffered: buffered,
	    maxBufferSize: maxBufferSize,
	    digestInterval: digestInterval,
	    send: send,
	    showContent: showContent
	};
	
	exports.default = InPort;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pubsubJs = __webpack_require__(8);
	
	var _pubsubJs2 = _interopRequireDefault(_pubsubJs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var data = null;
	
	var dataInPort = "port";
	var receiveCallback = function receiveCallback(data) {};
	
	/*
	
	-- NOTE:
	This is the "smart" charting component, taking care of retrieving the data and
	providing the "dumb" chart with it through its props.
	
	*/
	
	var InPortConsumer = function (_React$Component) {
	    _inherits(InPortConsumer, _React$Component);
	
	    function InPortConsumer(props) {
	        _classCallCheck(this, InPortConsumer);
	
	        var _this = _possibleConstructorReturn(this, (InPortConsumer.__proto__ || Object.getPrototypeOf(InPortConsumer)).call(this, props));
	
	        _this.state = {
	            data: data
	        };
	        _this.token = null;
	        _this.recursiveCloneChildren = _this.recursiveCloneChildren.bind(_this);
	        _this._isMounted = false;
	        return _this;
	    }
	
	    _createClass(InPortConsumer, [{
	        key: 'render',
	        value: function render() {
	            return _jsx('div', {}, void 0, this.recursiveCloneChildren(this.props.children));
	        }
	    }, {
	        key: 'recursiveCloneChildren',
	        value: function recursiveCloneChildren(children) {
	            var _this2 = this;
	
	            return _react2.default.Children.map(children, function (child) {
	                var childProps = {};
	                if (_react2.default.isValidElement(child)) {
	                    if (_this2.props.propagateDataToChildren) {
	                        if (_this2.state.data != null) {
	                            childProps = { data: _this2.state.data };
	                        }
	                    }
	                } else {
	                    return child;
	                }
	                childProps.children = _this2.recursiveCloneChildren(child.props.children);
	                return _react2.default.cloneElement(child, childProps);
	            });
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.setUpNewDataInConnection(this.props.dataInPort);
	            this._isMounted = true;
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            if (this.token != null) {
	                // close current connection if existing
	                _pubsubJs2.default.unsubscribe(this.token);
	                this.token = null;
	            }
	            this._isMounted = false;
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps) {
	            // cannot use componentWillUpdate(), since setUpNewDataInConnection() can change state
	            var newPort = nextProps.dataInPort;
	            if (newPort != this.props.dataInPort) {
	                this.setUpNewDataInConnection(newPort);
	            }
	        }
	    }, {
	        key: 'setUpNewDataInConnection',
	        value: function setUpNewDataInConnection(port) {
	            var _this3 = this;
	
	            if (this.token != null) {
	                // close current connection if existing
	                _pubsubJs2.default.unsubscribe(this.token);
	                this.token = null;
	            }
	            if (port != "") {
	                this.token = _pubsubJs2.default.subscribe(port, function (msg, data) {
	                    // arrow func to preserve 'this'
	                    if (_this3._isMounted) {
	                        _this3.setState({ data: data });
	                        _this3.props.receiveCallback(data);
	                    }
	                });
	            }
	        }
	    }]);
	
	    return InPortConsumer;
	}(_react2.default.Component);
	
	InPortConsumer.defaultProps = {
	    dataInPort: dataInPort,
	    receiveCallback: receiveCallback,
	    propagateDataToChildren: true
	};
	
	exports.default = InPortConsumer;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pubsubJs = __webpack_require__(8);
	
	var _pubsubJs2 = _interopRequireDefault(_pubsubJs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var port = "";
	var sendCallback = function sendCallback(data) {};
	
	var _ref = _jsx('b', {}, void 0, _jsx('i', {}, void 0, '--Out-port--'));
	
	var _ref2 = _jsx('b', {}, void 0, 'Port: ');
	
	var OutPort = function (_React$Component) {
	    _inherits(OutPort, _React$Component);
	
	    function OutPort(props) {
	        _classCallCheck(this, OutPort);
	
	        var _this = _possibleConstructorReturn(this, (OutPort.__proto__ || Object.getPrototypeOf(OutPort)).call(this, props));
	
	        _this.token = null;
	        return _this;
	    }
	
	    _createClass(OutPort, [{
	        key: 'render',
	        value: function render() {
	            return _jsx('div', {}, void 0, _ref, _jsx('div', {}, void 0, _ref2, this.props.port));
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            //console.log("componentDidMount");
	            this.setUpNewDataOutConnection(this.props.port);
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {
	            if (this.props.port != nextProps.port) {
	                this.setUpNewDataOutConnection(nextProps.port);
	            }
	        }
	    }, {
	        key: 'setUpNewDataOutConnection',
	        value: function setUpNewDataOutConnection(port) {
	            var _this2 = this;
	
	            //console.log("setUpNewDataOutConnection")
	            if (this.token != null) {
	                _pubsubJs2.default.unsubscribe(this.token);
	            }
	            this.token = _pubsubJs2.default.subscribe(port, function (msg, data) {
	                /*console.log('blaaaa')
	                console.log(data);*/
	                _this2.props.sendCallback(port, data);
	            });
	        }
	    }]);
	
	    return OutPort;
	}(_react2.default.Component);
	
	OutPort.defaultProps = {
	    port: port,
	    sendCallback: sendCallback
	};
	
	exports.default = OutPort;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pubsubJs = __webpack_require__(8);
	
	var _pubsubJs2 = _interopRequireDefault(_pubsubJs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var data = {};
	var dataOutPort = "command";
	
	var _ref = _jsx('div', {});
	
	var OutPortFeeder = function (_React$Component) {
	    _inherits(OutPortFeeder, _React$Component);
	
	    function OutPortFeeder(props) {
	        _classCallCheck(this, OutPortFeeder);
	
	        var _this = _possibleConstructorReturn(this, (OutPortFeeder.__proto__ || Object.getPrototypeOf(OutPortFeeder)).call(this, props));
	
	        _this.handleNewPackageOut = function (port, data) {
	            if (port != "") {
	                _pubsubJs2.default.publishSync(port, data);
	                console.log("Out-package published");
	            } else {
	                console.log("Output port name is empty");
	            }
	        };
	
	        return _this;
	    }
	
	    _createClass(OutPortFeeder, [{
	        key: 'render',
	        value: function render() {
	            return _ref;
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            if (!this.props.data) {
	                this.handleNewPackageOut(this.props.dataOutPort, this.props.data);
	            }
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps) {
	            if (nextProps.dataOutPort == this.props.dataOutPort) {
	                this.handleNewPackageOut(nextProps.dataOutPort, nextProps.data);
	            }
	        }
	    }, {
	        key: 'send',
	        value: function send(data) {
	            this.handleNewPackageOut(this.props.dataOutPort, data);
	        }
	    }]);
	
	    return OutPortFeeder;
	}(_react2.default.Component);
	
	OutPortFeeder.defaultProps = {
	    data: data,
	    dataOutPort: dataOutPort
	};
	
	exports.default = OutPortFeeder;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactAddonsUpdate = __webpack_require__(132);
	
	var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);
	
	var _autobahn = __webpack_require__(121);
	
	var _autobahn2 = _interopRequireDefault(_autobahn);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var enabled = false;
	var url = "";
	var realm = "";
	var topic = "";
	var statusInPort = "status";
	var data = {};
	
	var _ref = _jsx('b', {}, void 0, 'Url:');
	
	var _ref2 = _jsx('b', {}, void 0, 'Realm:');
	
	var WAMPSocket = function (_React$Component) {
	    _inherits(WAMPSocket, _React$Component);
	
	    function WAMPSocket(props) {
	        _classCallCheck(this, WAMPSocket);
	
	        var _this = _possibleConstructorReturn(this, (WAMPSocket.__proto__ || Object.getPrototypeOf(WAMPSocket)).call(this, props));
	
	        _this.tearDownConnection = function () {
	            if (_this.connection != null) {
	                // close current connection if existing
	                //if (this.connection.isOpen) {
	                _this.connection.close();
	                //}
	                _this.connection = null;
	                _this.session = null;
	            }
	        };
	
	        _this.setUpNewConnection = function (url, realm) {
	            _this.tearDownConnection();
	            if (url != "" && realm != "") {
	                _this.connection = new _autobahn2.default.Connection({
	                    url: url,
	                    realm: realm
	                });
	                _this.connection.onopen = function (session, details) {
	
	                    _this.session = session;
	
	                    _react2.default.Children.map(_this.props.children, function (child) {
	                        if (_react2.default.isValidElement(child)) {
	                            //console.log("valid element")
	                            var childType = child.type.name;
	                            if (childType == "InPort") {
	                                var _topic = child.props.port;
	                                session.subscribe(_topic, function (args) {
	                                    _this.props.onData(_topic, args[0]);
	                                    //console.log(`In-package forwarded to target in-port ${topic}`);
	                                }).then(function (sub) {
	                                    console.log('WAMP socket subscribed to topic ' + _topic);
	                                    if (_topic == _this.props.statusInPort) {
	                                        _this.props.onData(_topic, { data: 'WAMP connected' });
	                                    }
	                                }, function (err) {
	                                    console.log('WAMP socket not subscribed to topic ' + _topic + ': ' + err);
	                                });
	                            }
	                        }
	                    });
	                };
	
	                _this.connection.onclose = function (reason, details) {
	                    console.log("WAMP socket disconnected");
	                    _this.props.onData(_this.props.statusInPort, { data: 'WAMP diconnected' });
	                };
	
	                _this.connection.open();
	            }
	        };
	
	        _this.handleSend = function (port, data) {
	            if (_this.connection != null && _this.session != null) {
	                _this.session.publish(port, [data]);
	            }
	        };
	
	        _this.state = {};
	        _this.connection = null;
	        _this.session = null;
	        return _this;
	    }
	
	    _createClass(WAMPSocket, [{
	        key: 'render',
	        value: function render() {
	            return _jsx('div', {}, void 0, _jsx('div', {}, void 0, _ref, ' ', this.props.url), _jsx('div', {}, void 0, _ref2, ' ', this.props.realm), this.props.children);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            if (this.props.enabled) {
	                this.setUpNewConnection(this.props.url, this.props.realm);
	            }
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {
	            var newUrl = nextProps.url;
	            var newRealm = nextProps.realm;
	            if (nextProps.enabled && !this.props.enabled) {
	                this.setUpNewConnection(newUrl, newRealm);
	            }
	            if (!nextProps.enabled && this.props.enabled) {
	                this.tearDownConnection();
	            }
	            if (newUrl != this.props.url || newRealm != this.props.realm) {
	                if (nextProps.enabled) {
	                    this.setUpNewConnection(newUrl, newRealm);
	                }
	            }
	            if (nextProps.data != this.props.data) {
	                var port = nextProps.data.port;
	                var _data = nextProps.data.data;
	                this.handleSend(port, _data);
	            }
	        }
	    }]);
	
	    return WAMPSocket;
	}(_react2.default.Component);
	
	WAMPSocket.defaultProps = {
	    enabled: enabled,
	    url: url,
	    realm: realm,
	    statusInPort: statusInPort
	};
	
	exports.default = WAMPSocket;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.App = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(5);
	
	var _App = {
	  "container": "_15uqt7TaQcflNYjiD0-re1"
	};
	
	var _App2 = _interopRequireDefault(_App);
	
	var _reactHelmet = __webpack_require__(9);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _DevTools = __webpack_require__(34);
	
	var _DevTools2 = _interopRequireDefault(_DevTools);
	
	var _Header = __webpack_require__(88);
	
	var _Header2 = _interopRequireDefault(_Header);
	
	var _Footer = __webpack_require__(87);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _Services = __webpack_require__(89);
	
	var _Services2 = _interopRequireDefault(_Services);
	
	var _WAMPConnection = __webpack_require__(90);
	
	var _WAMPConnection2 = _interopRequireDefault(_WAMPConnection);
	
	var _WorkFlowClient = __webpack_require__(91);
	
	var _WorkFlowClient2 = _interopRequireDefault(_WorkFlowClient);
	
	var _AppActions = __webpack_require__(18);
	
	var _IntlActions = __webpack_require__(38);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	
	// Import Components
	
	
	// Import Actions
	
	
	var _ref = _jsx(_DevTools2.default, {});
	
	var _ref2 = _jsx(_WAMPConnection2.default, {});
	
	var _ref3 = _jsx(_Footer2.default, {});
	
	var App = exports.App = function (_Component) {
	  _inherits(App, _Component);
	
	  function App(props) {
	    _classCallCheck(this, App);
	
	    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
	
	    _this.toggleAddPostSection = function () {
	      _this.props.dispatch((0, _AppActions.toggleAddPost)());
	    };
	
	    _this.redirectToForm = function (url) {
	      _this.context.router.push('/forms/' + url);
	    };
	
	    _this.state = { isMounted: false };
	    return _this;
	  }
	
	  _createClass(App, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      console.log("<App> module mounted");
	      this.setState({ isMounted: true }); // eslint-disable-line
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      return _jsx('div', {}, void 0, this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && _ref, _jsx('div', {}, void 0, _jsx(_reactHelmet2.default, {
	        title: 'Activity logging app',
	        titleTemplate: '%s',
	        meta: [{ charset: 'utf-8' }, {
	          'http-equiv': 'X-UA-Compatible',
	          content: 'IE=edge'
	        }, {
	          name: 'viewport',
	          content: 'width=device-width, initial-scale=1'
	        }]
	      }), _jsx(_Header2.default, {
	        switchLanguage: function switchLanguage(lang) {
	          return _this2.props.dispatch((0, _IntlActions.switchLanguage)(lang));
	        },
	        intl: this.props.intl,
	        toggleAddPost: this.toggleAddPostSection
	      }, void 0, _jsx(_Services2.default, {
	        data: [{ 'label': 'WAMP connection' }, { 'label': 'Work-flow client' }]
	      }, void 0, _ref2, _jsx(_WorkFlowClient2.default, {
	        onEnterTask: this.redirectToForm
	      }))), _jsx('div', {
	        className: _App2.default.container
	      }, void 0, this.props.children), _ref3));
	    }
	  }]);
	
	  return App;
	}(_react.Component);
	
	// Retrieve data from store as props
	function mapStateToProps(store) {
	  return {
	    intl: store.intl
	  };
	}
	
	App.contextTypes = {
	  router: _react2.default.PropTypes.object.isRequired
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(App);

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Style
	
	
	// Import Images
	
	
	exports.Footer = Footer;
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(2);
	
	var _Footer = {
	  "footer": "_1oiRVDtQ6fOWkhBVWcRyE_"
	};
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _headerBk = '/' + "bbaeb5f32b7042f0def39648a1d111b9.png";
	
	var _headerBk2 = _interopRequireDefault(_headerBk);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Footer() {
	  return _jsx('div', {
	    style: { background: '#FFF url(' + _headerBk2.default + ') center' },
	    className: _Footer2.default.footer
	  }, void 0);
	}
	
	exports.default = Footer;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Style
	
	
	exports.Header = Header;
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(6);
	
	var _reactIntl = __webpack_require__(2);
	
	var _Header = {
	  "header": "_3EGjKVGKCGTGQn_m_YASdF",
	  "content": "_391cv5n_RFU0K9SBOjXDEt",
	  "site-title": "_11V45Tl3_Hdy_ARI53CW9g",
	  "add-post-button": "XrNjmGRHH_vMEgGeC3S75",
	  "language-switcher": "X6vAu1vEuRDWiN2kDvA_z",
	  "panel-switcher": "_2I4ryUD_rnJMRXpUrwIASM",
	  "selected": "_3ecuVjN6tTUWkR7u3Co3s"
	};
	
	var _Header2 = _interopRequireDefault(_Header);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref = _jsx('li', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'switchLanguage'
	}));
	
	function Header(props, context) {
	  var languageNodes = props.intl.enabledLanguages.map(function (lang) {
	    return _jsx('li', {
	      onClick: function onClick() {
	        return props.switchLanguage(lang);
	      },
	      className: lang === props.intl.locale ? _Header2.default.selected : ''
	    }, lang, lang);
	  });
	
	  var panels = [{ name: 'Forms', 'url': '/' }, { name: 'Submissions', 'url': '/subms' }];
	
	  return _jsx('div', {
	    className: _Header2.default.header
	  }, void 0, _jsx('div', {
	    className: _Header2.default['language-switcher']
	  }, void 0, _jsx('ul', {}, void 0, _ref, languageNodes)), _jsx('div', {
	    className: _Header2.default.content
	  }, void 0, props.children), _jsx('div', {
	    className: _Header2.default['panel-switcher']
	  }, void 0, _jsx('ul', {}, void 0, panels.map(function (panel) {
	    return _jsx('li', {}, panel.name, _jsx(_reactRouter.Link, {
	      to: panel.url
	    }, void 0, panel.name));
	  }))));
	}
	
	Header.contextTypes = {
	  router: _react2.default.PropTypes.object
	};
	
	exports.default = Header;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(133);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Services = function (_React$Component) {
	  _inherits(Services, _React$Component);
	
	  function Services() {
	    _classCallCheck(this, Services);
	
	    return _possibleConstructorReturn(this, (Services.__proto__ || Object.getPrototypeOf(Services)).apply(this, arguments));
	  }
	
	  _createClass(Services, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      return _jsx('div', {}, void 0, _jsx(_reactBootstrap.Tabs, {
	        defaultActiveKey: 1,
	        id: 'services',
	        animation: false
	      }, void 0, _react2.default.Children.toArray(this.props.children).map(function (child, i) {
	        return _jsx(_reactBootstrap.Tab, {
	          eventKey: i + 1,
	          title: _this2.props.data[i].label,
	          unmountOnExit: false
	        }, i, child);
	      })));
	    }
	  }]);
	
	  return Services;
	}(_react2.default.Component);
	
	exports.default = Services;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _InPort = __webpack_require__(81);
	
	var _InPort2 = _interopRequireDefault(_InPort);
	
	var _OutPort = __webpack_require__(83);
	
	var _OutPort2 = _interopRequireDefault(_OutPort);
	
	var _WAMPSocket = __webpack_require__(85);
	
	var _WAMPSocket2 = _interopRequireDefault(_WAMPSocket);
	
	var _WAMPConnection = {
	  "summary": "_3jmTs_lW1oh4UoohJUunV9",
	  "inputs": "_2zMoFx1oFaecwO6hZthKlO",
	  "pos-right": "_1cYLihHSfKN6MUiYMdbHvX",
	  "pos-left": "_2yGCNyJ_vsu0seE2QGnFmC"
	};
	
	var _WAMPConnection2 = _interopRequireDefault(_WAMPConnection);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	
	var _ref = _jsx('td', {}, void 0, 'Url:');
	
	var _ref2 = _jsx('td', {}, void 0, 'Realm:');
	
	var _ref3 = _jsx('td', {}, void 0, 'Enabled:');
	
	var WAMPConnection = function (_Component) {
	  _inherits(WAMPConnection, _Component);
	
	  function WAMPConnection(props) {
	    _classCallCheck(this, WAMPConnection);
	
	    var _this = _possibleConstructorReturn(this, (WAMPConnection.__proto__ || Object.getPrototypeOf(WAMPConnection)).call(this, props));
	
	    _this.setUrlStream = function (event) {
	      var newUrl = event.target.value;
	      _this.setState({ urlStream: newUrl });
	    };
	
	    _this.setRealmStream = function (event) {
	      var newRealm = event.target.value;
	      _this.setState({ realmStream: newRealm });
	    };
	
	    _this.setEnabled = function (event) {
	      var enabled = event.target.checked;
	      _this.setState({ enabled: enabled });
	    };
	
	    _this.onData = function (port, data) {
	      _this.setState(_defineProperty({}, port, data));
	    };
	
	    _this.sendCallback = function (port, data) {
	      _this.setState({
	        socketData: {
	          port: port,
	          data: data
	        }
	      });
	    };
	
	    _this.state = {
	      urlStream: "ws://127.0.0.1:8002/ws",
	      realmStream: "realm1",
	      enabled: false
	    };
	    return _this;
	  }
	
	  _createClass(WAMPConnection, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {}, void 0, _jsx('div', {
	        className: _WAMPConnection2.default['pos-left']
	      }, void 0, _jsx('div', {
	        className: _WAMPConnection2.default['inputs']
	      }, void 0, _jsx('table', {}, void 0, _jsx('tbody', {}, void 0, _jsx('tr', {}, void 0, _ref, _jsx('td', {}, void 0, _jsx('input', {
	        type: 'text',
	        value: this.state.urlStream,
	        onChange: this.setUrlStream
	      }))), _jsx('tr', {}, void 0, _ref2, _jsx('td', {}, void 0, _jsx('input', {
	        type: 'text',
	        value: this.state.realmStream,
	        onChange: this.setRealmStream
	      }))), _jsx('tr', {}, void 0, _ref3, _jsx('td', {}, void 0, _jsx('input', {
	        type: 'checkbox',
	        checked: this.state.enabled,
	        onChange: this.setEnabled
	      }))))))), _jsx('div', {
	        className: _WAMPConnection2.default['pos-right']
	      }, void 0, _jsx('div', {
	        className: _WAMPConnection2.default['summary']
	      }, void 0, _jsx(_WAMPSocket2.default, {
	        enabled: this.state.enabled,
	        url: this.state.urlStream,
	        realm: this.state.realmStream,
	        statusInPort: 'ws-status',
	        onData: this.onData,
	        data: this.state.socketData
	      }, void 0, _jsx(_InPort2.default, {
	        port: 'ws-status',
	        data: this.state['ws-status'],
	        buffered: false,
	        showContent: true
	      }), _jsx(_InPort2.default, {
	        port: 'wf-task-enter',
	        data: this.state['wf-task-enter'],
	        buffered: false,
	        showContent: true
	      }), _jsx(_OutPort2.default, {
	        port: 'wf-task-exit',
	        sendCallback: this.sendCallback
	      })))));
	    }
	  }]);
	
	  return WAMPConnection;
	}(_react.Component);
	
	exports.default = WAMPConnection;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _InPortConsumer = __webpack_require__(82);
	
	var _InPortConsumer2 = _interopRequireDefault(_InPortConsumer);
	
	var _WorkFlowClient = {
	  "summary": "_2K51-6AHP9r6v2gtCME-I6",
	  "inputs": "_2HnMeZvRC20NHJRawOYMUF",
	  "pos-right": "OpFVwf7KS55QVrkBfXIYG",
	  "pos-left": "_3tZrrcIjzK-lY_8GXnIrn4"
	};
	
	var _WorkFlowClient2 = _interopRequireDefault(_WorkFlowClient);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	
	var _ref = _jsx('tr', {}, void 0, _jsx('td', {}, void 0, 'Listening on port:'), _jsx('td', {}, void 0, 'wf-task-enter'));
	
	var _ref2 = _jsx('td', {}, void 0, 'Enabled:');
	
	var WorkFlowClient = function (_Component) {
	  _inherits(WorkFlowClient, _Component);
	
	  function WorkFlowClient(props) {
	    _classCallCheck(this, WorkFlowClient);
	
	    var _this = _possibleConstructorReturn(this, (WorkFlowClient.__proto__ || Object.getPrototypeOf(WorkFlowClient)).call(this, props));
	
	    _this.handleReceiveMessage = function (data) {
	      if (_this.state.enabled) {
	        _this.props.onEnterTask(data);
	      }
	    };
	
	    _this.setEnabled = function (event) {
	      var enabled = event.target.checked;
	      _this.setState({ enabled: enabled });
	    };
	
	    _this.state = {
	      enabled: false
	    };
	    return _this;
	  }
	
	  _createClass(WorkFlowClient, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {}, void 0, _jsx('div', {
	        className: _WorkFlowClient2.default['pos-left']
	      }, void 0, _jsx('div', {
	        className: _WorkFlowClient2.default['inputs']
	      }, void 0, _jsx('table', {}, void 0, _jsx('tbody', {}, void 0, _ref, _jsx('tr', {}, void 0, _ref2, _jsx('td', {}, void 0, _jsx('input', {
	        type: 'checkbox',
	        checked: this.state.enabled,
	        onChange: this.setEnabled
	      }))))))), _jsx(_InPortConsumer2.default, {
	        dataInPort: 'wf-task-enter',
	        receiveCallback: this.handleReceiveMessage
	      }));
	    }
	  }]);
	
	  return WorkFlowClient;
	}(_react.Component);
	
	exports.default = WorkFlowClient;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _FormListItem = __webpack_require__(93);
	
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
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(6);
	
	var _reactIntl = __webpack_require__(2);
	
	var _FormEditWidget = __webpack_require__(35);
	
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
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _setup = __webpack_require__(32);
	
	var _IntlActions = __webpack_require__(38);
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var initLocale = global.navigator && global.navigator.language || 'en';
	
	var initialState = _extends({
	  locale: initLocale,
	  enabledLanguages: _setup.enabledLanguages
	}, _setup.localizationData[initLocale] || {});
	
	var IntlReducer = function IntlReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _IntlActions.SWITCH_LANGUAGE:
	      {
	        var type = action.type,
	            actionWithoutType = _objectWithoutProperties(action, ['type']); // eslint-disable-line
	
	
	        return _extends({}, state, actionWithoutType);
	      }
	
	    default:
	      return state;
	  }
	};
	
	exports.default = IntlReducer;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PostCreateWidget = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(2);
	
	var _PostCreateWidget = {
	  "form": "_1_WEV3z8MyISJ_IVeQGbfN",
	  "form-content": "_3CPctdi6XIS37va2ubmlCG",
	  "form-title": "_1CSMUfhA4ysKjSED0EfzhX",
	  "form-field": "_2UV8G3K76UKXYl2G9ov3yn",
	  "post-submit-button": "_1atG94QrpmrK4ei1Y4lDc3",
	  "appear": "_38mS7lSZiNDV5iEXieRUC7"
	};
	
	var _PostCreateWidget2 = _interopRequireDefault(_PostCreateWidget);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	
	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'createNewPost'
	});
	
	var _ref3 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'submit'
	});
	
	var PostCreateWidget = exports.PostCreateWidget = function (_Component) {
	  _inherits(PostCreateWidget, _Component);
	
	  function PostCreateWidget() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, PostCreateWidget);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PostCreateWidget.__proto__ || Object.getPrototypeOf(PostCreateWidget)).call.apply(_ref, [this].concat(args))), _this), _this.addPost = function () {
	      var nameRef = _this.refs.name;
	      var titleRef = _this.refs.title;
	      var contentRef = _this.refs.content;
	      if (nameRef.value && titleRef.value && contentRef.value) {
	        _this.props.addPost(nameRef.value, titleRef.value, contentRef.value);
	        nameRef.value = titleRef.value = contentRef.value = '';
	      }
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(PostCreateWidget, [{
	    key: 'render',
	    value: function render() {
	      var cls = _PostCreateWidget2.default.form + ' ' + (this.props.showAddPost ? _PostCreateWidget2.default.appear : '');
	      return _jsx('div', {
	        className: cls
	      }, void 0, _jsx('div', {
	        className: _PostCreateWidget2.default['form-content']
	      }, void 0, _jsx('h2', {
	        className: _PostCreateWidget2.default['form-title']
	      }, void 0, _ref2), _react2.default.createElement('input', { placeholder: this.props.intl.messages.authorName, className: _PostCreateWidget2.default['form-field'], ref: 'name' }), _react2.default.createElement('input', { placeholder: this.props.intl.messages.postTitle, className: _PostCreateWidget2.default['form-field'], ref: 'title' }), _react2.default.createElement('textarea', { placeholder: this.props.intl.messages.postContent, className: _PostCreateWidget2.default['form-field'], ref: 'content' }), _jsx('a', {
	        className: _PostCreateWidget2.default['post-submit-button'],
	        href: '#',
	        onClick: this.addPost
	      }, void 0, _ref3)));
	    }
	  }]);
	
	  return PostCreateWidget;
	}(_react.Component);
	
	exports.default = (0, _reactIntl.injectIntl)(PostCreateWidget);

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Components
	
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _PostListItem = __webpack_require__(97);
	
	var _PostListItem2 = _interopRequireDefault(_PostListItem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function PostList(props) {
	  return _jsx('div', {
	    className: 'listView'
	  }, void 0, props.posts.map(function (post) {
	    return _jsx(_PostListItem2.default, {
	      post: post,
	      onDelete: function onDelete() {
	        return props.handleDeletePost(post.cuid);
	      }
	    }, post.cuid);
	  }));
	}
	
	exports.default = PostList;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Style
	
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(6);
	
	var _reactIntl = __webpack_require__(2);
	
	var _PostListItem = {
	  "single-post": "_2wFZUrnLLPIM2UvuNgnV1r",
	  "post-title": "_1BU3HyU1b5fh1tsPA9MtRq",
	  "author-name": "_2pYEGhQRMs0Mh9CsoJsCrq",
	  "post-desc": "_2hG8tPFCGI0k7BZ5cz9nnH",
	  "post-action": "_37qYFcYfJHxrTH_bV6-TQo",
	  "divider": "_3H_6OlXO_Hx_93avyoPoZ2",
	  "post-detail": "_16xorg78DM6DwmPTBglw02"
	};
	
	var _PostListItem2 = _interopRequireDefault(_PostListItem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'by'
	});
	
	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'deletePost'
	});
	
	function PostListItem(props) {
	  return _jsx('div', {
	    className: _PostListItem2.default['single-post']
	  }, void 0, _jsx('h3', {
	    className: _PostListItem2.default['post-title']
	  }, void 0, _jsx(_reactRouter.Link, {
	    to: '/posts/' + props.post.slug + '-' + props.post.cuid
	  }, void 0, props.post.title)), _jsx('p', {
	    className: _PostListItem2.default['author-name']
	  }, void 0, _ref, ' ', props.post.name), _jsx('p', {
	    className: _PostListItem2.default['post-desc']
	  }, void 0, props.post.content), _jsx('p', {
	    className: _PostListItem2.default['post-action']
	  }, void 0, _jsx('a', {
	    href: '#',
	    onClick: props.onDelete
	  }, void 0, _ref2)), _jsx('hr', {
	    className: _PostListItem2.default.divider
	  }));
	}
	
	exports.default = PostListItem;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Components
	
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _SubmListItem = __webpack_require__(99);
	
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
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Style
	
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(6);
	
	var _reactIntl = __webpack_require__(2);
	
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

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(44);
	
	var _AppReducer = __webpack_require__(33);
	
	var _AppReducer2 = _interopRequireDefault(_AppReducer);
	
	var _PostReducer = __webpack_require__(22);
	
	var _PostReducer2 = _interopRequireDefault(_PostReducer);
	
	var _FormReducer = __webpack_require__(20);
	
	var _FormReducer2 = _interopRequireDefault(_FormReducer);
	
	var _SubmReducer = __webpack_require__(23);
	
	var _SubmReducer2 = _interopRequireDefault(_SubmReducer);
	
	var _IntlReducer = __webpack_require__(94);
	
	var _IntlReducer2 = _interopRequireDefault(_IntlReducer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Combine all reducers into one root reducer
	/**
	 * Root Reducer
	 */
	exports.default = (0, _redux.combineReducers)({
	  app: _AppReducer2.default,
	  posts: _PostReducer2.default,
	  forms: _FormReducer2.default,
	  subms: _SubmReducer2.default,
	  intl: _IntlReducer2.default
	});
	
	// Import Reducers

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getDevices = getDevices;
	exports.getDevice = getDevice;
	
	var _device = __webpack_require__(25);
	
	var _device2 = _interopRequireDefault(_device);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Get all devices
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getDevices(req, res) {
	  _device2.default.find().exec(function (err, devices) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ devices: devices });
	  });
	}
	
	/**
	 * Get a single device
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getDevice(req, res) {
	  _device2.default.findOne({ cuid: req.params.cuid }).exec(function (err, device) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ device: device });
	  });
	}

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getDevicesTextSearch = getDevicesTextSearch;
	exports.getDevicesRegex = getDevicesRegex;
	exports.getDevices = getDevices;
	
	var _device = __webpack_require__(25);
	
	var _device2 = _interopRequireDefault(_device);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Get all devices from text search
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getDevicesTextSearch(req, res) {
	  var q = req.query.q;
	  q = q.replace(/\+/g, ' ');
	  _device2.default.find({
	    $text: { $search: q }
	  }).exec(function (err, devices) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ devices: devices });
	  });
	}
	
	function getDevicesRegex(req, res) {
	  var q = req.query.q;
	  q = q.replace(/\+/g, ' ');
	  var pattern = new RegExp(q, 'i'); //{'$regex': q, '$options': 'i'}
	  _device2.default.find({
	    $or: [{ 'name': pattern }, { 'type': pattern }]
	  }).exec(function (err, devices) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ devices: devices });
	  });
	}
	
	function getDevices(req, res) {
	  var q = req.query.q;
	  var q_regex = '(' + q.trim().replace(/\s+/g, '|') + ')';
	  var pattern = new RegExp(q_regex, 'i');
	  _device2.default.find({
	    $or: [{ $text: { $search: q } }, { 'name': pattern }, { 'type': pattern }]
	  }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } }).exec(function (err, devices) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ devices: devices });
	  });
	}

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getForms = getForms;
	exports.addForm = addForm;
	exports.getForm = getForm;
	exports.deleteForm = deleteForm;
	exports.updateForm = updateForm;
	
	var _form = __webpack_require__(43);
	
	var _form2 = _interopRequireDefault(_form);
	
	var _cuid = __webpack_require__(11);
	
	var _cuid2 = _interopRequireDefault(_cuid);
	
	var _limax = __webpack_require__(15);
	
	var _limax2 = _interopRequireDefault(_limax);
	
	var _sanitizeHtml = __webpack_require__(16);
	
	var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);
	
	var _config = __webpack_require__(7);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Get all forms
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getForms(req, res) {
	  _form2.default.find().sort('-date_added').exec(function (err, forms) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ forms: forms });
	  });
	}
	
	/**
	 * Save a form
	 * @param req
	 * @param res
	 * @returns void
	 */
	function addForm(req, res) {
	  if (!req.body.form.title || !req.body.form.json_schema || !req.body.form.ui_schema || !req.body.form.init_data) {
	    return res.status(403).end();
	  }
	
	  var newForm = new _form2.default(req.body.form);
	
	  // Let's sanitize inputs
	  newForm.title = (0, _sanitizeHtml2.default)(newForm.title);
	  /*newForm.json_schema = JSON.parse(newForm.json_schema);
	  newForm.ui_schema = JSON.parse(newForm.ui_schema);
	  newForm.init_data = JSON.parse(newForm.init_data);*/
	
	  newForm.slug = (0, _limax2.default)(newForm.title.toLowerCase(), { lowercase: true });
	  newForm.cuid = (0, _cuid2.default)();
	  newForm.save(function (err, saved) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ form: saved });
	  });
	}
	
	/**
	 * Get a single form
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getForm(req, res) {
	  _form2.default.findOne({ cuid: req.params.cuid }).exec(function (err, form) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ form: form });
	  });
	}
	
	/**
	 * Delete a form
	 * @param req
	 * @param res
	 * @returns void
	 */
	function deleteForm(req, res) {
	  _form2.default.findOne({ cuid: req.params.cuid }).exec(function (err, form) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	
	    form.remove(function () {
	      res.status(200).end();
	    });
	  });
	}
	
	function updateForm(req, res) {
	  _form2.default.findOneAndUpdate({ cuid: req.params.cuid }, { $set: req.body.form }, { new: true }).exec(function (err, updated) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ form: updated });
	  });
	}

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getOutputs = getOutputs;
	exports.getOutput = getOutput;
	
	var _activity = __webpack_require__(24);
	
	var _activity2 = _interopRequireDefault(_activity);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Get all devices
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getOutputs(req, res) {
	  _activity2.default.aggregate([{ $unwind: "$outputs" }]).exec(function (err, outputs) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ outputs: outputs });
	  });
	}
	
	/**
	 * Get a single device
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getOutput(req, res) {
	  _activity2.default.aggregate([{ $match: { "outputs.cuid": req.params.cuid } }, { $unwind: "$outputs" }, { $match: { "outputs.cuid": req.params.cuid } }, { $addFields: { "output": "$outputs" } }, { $project: { 'outputs': 0 } }, { $addFields: { "output.activity": '$$CURRENT' } }, { $replaceRoot: { newRoot: "$output" } }, { $project: { 'activity.output': 0 } }]).exec(function (err, outputs) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    var output = undefined;
	    if (outputs) output = outputs[0];
	    res.json({ output: output });
	  });
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getOutputs = getOutputs;
	
	var _activity = __webpack_require__(24);
	
	var _activity2 = _interopRequireDefault(_activity);
	
	var _subject = __webpack_require__(14);
	
	var _subject2 = _interopRequireDefault(_subject);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ObjectId = __webpack_require__(3).Types.ObjectId;
	
	function getOutputs(req, res) {
	  var q = req.query.q;
	  var q_regex = '(' + q.trim().replace(/\s+/g, '|') + ')';
	  var pattern = new RegExp(q_regex, 'i');
	
	  var longEnoughTerms = q.trim().split(' ').reduce(function (acc, v) {
	    return acc && v.length >= 3;
	  }, true);
	
	  if (!longEnoughTerms) {
	    return res.json({ outputs: [] });
	  }
	
	  _subject2.default.find({
	    $or: [{ $text: { $search: q } }, { 'name': pattern }, { 'surname': pattern }, { 'birthdate': pattern }]
	  }).exec().then(function (subjects) {
	    return subjects.map(function (s) {
	      return ObjectId(s.id);
	    }); // wrapping into ObjectId is necessary
	  }).then(function (subjectIds) {
	
	    return _activity2.default.aggregate([
	    // text search in activities
	    { $match: { $or: [{ $text: { $search: q } }, { 'description': pattern }, { 'outputs.name': pattern }, { 'outputs.uri': pattern }, { 'subjects.id': { $in: subjectIds } }] }
	    },
	    // order by full text search score; it seems that sub-ordering by number
	    // of $or hits in partial text search is already performed
	    { $addFields: { score: { $meta: "textScore" } } },
	    // search back for linked activities (input-output)
	    { "$graphLookup": {
	        "from": "activities",
	        "startWith": "$other_resources.id",
	        "connectFromField": "other_resources.id",
	        "connectToField": "outputs._id",
	        "as": "prev"
	      } },
	    // create score depending if subject belongs to previous linked activities
	    // (*): necessary for the following $in to work properly.
	    { $unwind: { path: "$prev", "preserveNullAndEmptyArrays": true } }, // (*)
	    { $unwind: { path: "$prev.subjects", "preserveNullAndEmptyArrays": true } }, // (*)
	    { $addFields: { sbj_prev_involved: {
	          $cond: { if: { $in: ["$prev.subjects.id", subjectIds] }, then: 1, else: 0 }
	        } } },
	    // sort first by text search score and then by subject being involved in linked activities
	    { $sort: { score: { $meta: "textScore" }, sbj_prev_involved: -1 } },
	    // unwind by output
	    { $unwind: "$outputs" },
	    // rename 'outputs' to 'output'
	    { $addFields: { "output": "$outputs" } }, { $project: { 'outputs': 0 } },
	    // swap root and child (easier for clients)
	    { $addFields: { "output.activity": '$$CURRENT' } }, { $replaceRoot: { newRoot: "$output" } }, { $project: { 'activity.output': 0 } }]).exec();
	  }).then(function (outputs) {
	    return _activity2.default.populate(outputs, { path: 'activity.subjects.id', model: 'Subject' });
	  }).then(function (outputs) {
	    return _activity2.default.populate(outputs, { path: 'activity.prev.subjects.id', model: 'Subject' });
	  }
	  /*.then(outputs => {
	    return Activity.populate(outputs, {path: 'software.id'})
	  })
	  .then(outputs => {
	    return Activity.populate(outputs, {path: 'devices.id'})
	  })
	  .then(outputs => {
	    return Activity.populate(outputs, {path: 'researchers.id'})
	  })*/
	  ).then(function (outputs) {
	    res.json({ outputs: outputs });
	  }).catch(function (err) {
	    res.status(500).send(err);
	  });
	}

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getPosts = getPosts;
	exports.addPost = addPost;
	exports.getPost = getPost;
	exports.deletePost = deletePost;
	
	var _post = __webpack_require__(115);
	
	var _post2 = _interopRequireDefault(_post);
	
	var _cuid = __webpack_require__(11);
	
	var _cuid2 = _interopRequireDefault(_cuid);
	
	var _limax = __webpack_require__(15);
	
	var _limax2 = _interopRequireDefault(_limax);
	
	var _sanitizeHtml = __webpack_require__(16);
	
	var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Get all posts
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getPosts(req, res) {
	  _post2.default.find().sort('-dateAdded').exec(function (err, posts) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ posts: posts });
	  });
	}
	
	/**
	 * Save a post
	 * @param req
	 * @param res
	 * @returns void
	 */
	function addPost(req, res) {
	  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
	    return res.status(403).end();
	  }
	
	  var newPost = new _post2.default(req.body.post);
	
	  // Let's sanitize inputs
	  newPost.title = (0, _sanitizeHtml2.default)(newPost.title);
	  newPost.name = (0, _sanitizeHtml2.default)(newPost.name);
	  newPost.content = (0, _sanitizeHtml2.default)(newPost.content);
	
	  newPost.slug = (0, _limax2.default)(newPost.title.toLowerCase(), { lowercase: true });
	  newPost.cuid = (0, _cuid2.default)();
	  newPost.save(function (err, saved) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ post: saved });
	  });
	}
	
	/**
	 * Get a single post
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getPost(req, res) {
	  _post2.default.findOne({ cuid: req.params.cuid }).exec(function (err, post) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ post: post });
	  });
	}
	
	/**
	 * Delete a post
	 * @param req
	 * @param res
	 * @returns void
	 */
	function deletePost(req, res) {
	  _post2.default.findOne({ cuid: req.params.cuid }).exec(function (err, post) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	
	    post.remove(function () {
	      res.status(200).end();
	    });
	  });
	}

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getResearchers = getResearchers;
	exports.getResearcher = getResearcher;
	
	var _researcher = __webpack_require__(26);
	
	var _researcher2 = _interopRequireDefault(_researcher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Get all researchers
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getResearchers(req, res) {
	  _researcher2.default.find().exec(function (err, researchers) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ researchers: researchers });
	  });
	}
	
	/**
	 * Get a single researcher
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getResearcher(req, res) {
	  _researcher2.default.findOne({ cuid: req.params.cuid }).exec(function (err, researcher) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ researcher: researcher });
	  });
	}

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getResearchersTextSearch = getResearchersTextSearch;
	exports.getResearchersRegex = getResearchersRegex;
	exports.getResearchers = getResearchers;
	
	var _researcher = __webpack_require__(26);
	
	var _researcher2 = _interopRequireDefault(_researcher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Get all researchers from text search
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getResearchersTextSearch(req, res) {
	  var q = req.query.q;
	  q = q.replace(/\+/g, ' ');
	  _researcher2.default.find({
	    $text: { $search: q }
	  }).exec(function (err, researchers) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ researchers: researchers });
	  });
	}
	
	function getResearchersRegex(req, res) {
	  var q = req.query.q;
	  q = q.replace(/\+/g, ' ');
	  var pattern = new RegExp(q, 'i'); //{'$regex': q, '$options': 'i'}
	  _researcher2.default.find({
	    $or: [{ 'name': pattern }, { 'surname': pattern }, { 'birthdate': pattern }]
	  }).exec(function (err, researchers) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ researchers: researchers });
	  });
	}
	
	function getResearchers(req, res) {
	  var q = req.query.q;
	  var q_regex = '(' + q.trim().replace(/\s+/g, '|') + ')';
	  var pattern = new RegExp(q_regex, 'i');
	  _researcher2.default.find({
	    $or: [{ $text: { $search: q } }, { 'name': pattern }, { 'surname': pattern }, { 'birthdate': pattern }]
	  }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } }).exec(function (err, researchers) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ researchers: researchers });
	  });
	}

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getSubjects = getSubjects;
	exports.getSubject = getSubject;
	
	var _subject = __webpack_require__(14);
	
	var _subject2 = _interopRequireDefault(_subject);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Get all subjects
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getSubjects(req, res) {
	  _subject2.default.find().exec(function (err, subjects) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ subjects: subjects });
	  });
	}
	
	/**
	 * Get a single subject
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getSubject(req, res) {
	  _subject2.default.findOne({ cuid: req.params.cuid }).exec(function (err, subject) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ subject: subject });
	  });
	}

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getSubjectsTextSearch = getSubjectsTextSearch;
	exports.getSubjectsRegex = getSubjectsRegex;
	exports.getSubjects = getSubjects;
	
	var _subject = __webpack_require__(14);
	
	var _subject2 = _interopRequireDefault(_subject);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Get all subjects from text search
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getSubjectsTextSearch(req, res) {
	  var q = req.query.q;
	  q = q.replace(/\+/g, ' ');
	  _subject2.default.find({
	    $text: { $search: q }
	  }).exec(function (err, subjects) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ subjects: subjects });
	  });
	}
	
	function getSubjectsRegex(req, res) {
	  var q = req.query.q;
	  q = q.replace(/\+/g, ' ');
	  var pattern = new RegExp(q, 'i'); //{'$regex': q, '$options': 'i'}
	  _subject2.default.find({
	    $or: [{ 'name': pattern }, { 'surname': pattern }, { 'birthdate': pattern }]
	  }).exec(function (err, subjects) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ subjects: subjects });
	  });
	}
	
	function getSubjects(req, res) {
	  var q = req.query.q;
	  var q_regex = '(' + q.trim().replace(/\s+/g, '|') + ')';
	  var pattern = new RegExp(q_regex, 'i');
	  _subject2.default.find({
	    $or: [{ $text: { $search: q } }, { 'name': pattern }, { 'surname': pattern }, { 'birthdate': pattern }]
	  }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } }).exec(function (err, subjects) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ subjects: subjects });
	  });
	}

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getSubms = getSubms;
	exports.addSubm = addSubm;
	exports.getSubm = getSubm;
	exports.deleteSubm = deleteSubm;
	exports.updateSubm = updateSubm;
	
	var _subm = __webpack_require__(116);
	
	var _subm2 = _interopRequireDefault(_subm);
	
	var _cuid = __webpack_require__(11);
	
	var _cuid2 = _interopRequireDefault(_cuid);
	
	var _limax = __webpack_require__(15);
	
	var _limax2 = _interopRequireDefault(_limax);
	
	var _sanitizeHtml = __webpack_require__(16);
	
	var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);
	
	var _config = __webpack_require__(7);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Get all submissions
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getSubms(req, res) {
	  _subm2.default.find().sort('-date_added').populate('form').exec(function (err, subms) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ subms: subms });
	  });
	}
	
	/**
	 * Save a submission
	 * @param req
	 * @param res
	 * @returns void
	 */
	function addSubm(req, res) {
	  if (!req.body.subm.form || !req.body.subm.data) {
	    return res.status(403).end();
	  }
	
	  var newSubm = new _subm2.default(req.body.subm);
	
	  // Let's sanitize inputs
	  console.log(newSubm.data);
	  //newSubm.data = JSON.parse(newSubm.data);
	
	  newSubm.slug = 'submission';
	  newSubm.cuid = (0, _cuid2.default)();
	  newSubm.save(function (err, saved) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ subm: saved });
	  });
	}
	
	/**
	 * Get a single subm
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getSubm(req, res) {
	  _subm2.default.findOne({ cuid: req.params.cuid }).populate('form').exec(function (err, subm) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ subm: subm });
	  });
	}
	
	/**
	 * Delete a subm
	 * @param req
	 * @param res
	 * @returns void
	 */
	function deleteSubm(req, res) {
	  _subm2.default.findOne({ cuid: req.params.cuid }).exec(function (err, subm) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	
	    subm.remove(function () {
	      res.status(200).end();
	    });
	  });
	}
	
	function updateSubm(req, res) {
	  _subm2.default.findOneAndUpdate({ cuid: req.params.cuid }, { $set: req.body.subm }, { new: true }).populate('form').exec(function (err, updated) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ subm: updated });
	  });
	}

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getSWTools = getSWTools;
	exports.getSWTool = getSWTool;
	
	var _swtool = __webpack_require__(27);
	
	var _swtool2 = _interopRequireDefault(_swtool);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Get all software tools
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getSWTools(req, res) {
	  _swtool2.default.find().exec(function (err, SWTools) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ SWTools: SWTools });
	  });
	}
	
	/**
	 * Get a single software tool
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getSWTool(req, res) {
	  _swtool2.default.findOne({ cuid: req.params.cuid }).exec(function (err, SWTool) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ SWTool: SWTool });
	  });
	}

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getSWToolsTextSearch = getSWToolsTextSearch;
	exports.getSWToolsRegex = getSWToolsRegex;
	exports.getSWTools = getSWTools;
	
	var _swtool = __webpack_require__(27);
	
	var _swtool2 = _interopRequireDefault(_swtool);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Get all software tools from text search
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getSWToolsTextSearch(req, res) {
	  var q = req.query.q;
	  q = q.replace(/\+/g, ' ');
	  _swtool2.default.find({
	    $text: { $search: q }
	  }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } }).exec(function (err, SWTools) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ SWTools: SWTools });
	  });
	}
	
	function getSWToolsRegex(req, res) {
	  var q = req.query.q;
	  q = '(' + q.trim().replace(/\s+/g, '|') + ')';
	  var pattern = new RegExp(q, 'i'); //{'$regex': q, '$options': 'i'}
	  _swtool2.default.find({
	    $or: [{ 'name': pattern }, { 'version': pattern }, { 'company': pattern }]
	  }).exec(function (err, SWTools) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ SWTools: SWTools });
	  });
	}
	
	function getSWTools(req, res) {
	  var q = req.query.q;
	  var q_regex = '(' + q.trim().replace(/\s+/g, '|') + ')';
	  var pattern = new RegExp(q_regex, 'i');
	  _swtool2.default.find({
	    $or: [{ $text: { $search: q } }, { 'name': pattern }, { 'version': pattern }, { 'company': pattern }, { 'download_uri': pattern }]
	  }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } }).exec(function (err, SWTools) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    res.json({ SWTools: SWTools });
	  });
	}

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.uploadFile = uploadFile;
	exports.uploadData = uploadData;
	
	var _path = __webpack_require__(29);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _cuid = __webpack_require__(11);
	
	var _cuid2 = _interopRequireDefault(_cuid);
	
	var _limax = __webpack_require__(15);
	
	var _limax2 = _interopRequireDefault(_limax);
	
	var _sanitizeHtml = __webpack_require__(16);
	
	var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);
	
	var _config = __webpack_require__(7);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _fs = __webpack_require__(124);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function uploadFile(req, res) {
	  if (!req.files) return res.status(400).send('No files were uploaded.');
	
	  console.log(req.files
	  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	  );var sampleFile = req.files.file;
	
	  // Use the mv() method to place the file somewhere on your server
	  var newFileName = (0, _cuid2.default)();
	  sampleFile.mv(_path2.default.join(_config2.default.workDir, newFileName), function (err) {
	    if (err) return res.status(500).send(err);
	
	    res.json({ newFileName: newFileName });
	  });
	}
	
	function uploadData(req, res) {
	
	  var data = JSON.stringify(req.body, null, 2);
	
	  var fileName = (0, _cuid2.default)();
	
	  _fs2.default.writeFile(_path2.default.join(_config2.default.workDir, fileName + '.json'), data, function (err) {
	    if (err) {
	      return res.status(500).send(err);
	    };
	    console.log("File has been created");
	  });
	
	  res.json({ data: data });
	}

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(3);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	if ('Post' in _mongoose2.default.connection.models) delete _mongoose2.default.connection.models['Post'];
	
	var postSchema = new Schema({
	  name: { type: 'String', required: true },
	  title: { type: 'String', required: true },
	  content: { type: 'String', required: true },
	  slug: { type: 'String', required: true },
	  cuid: { type: 'String', required: true },
	  dateAdded: { type: 'Date', default: Date.now, required: true }
	});
	
	exports.default = _mongoose2.default.model('Post', postSchema);

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(3);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	if ('Subm' in _mongoose2.default.connection.models) delete _mongoose2.default.connection.models['Subm'];
	
	var submSchema = new Schema({
	  data: { type: 'Mixed', required: true },
	  form: { type: Schema.ObjectId, required: true, ref: 'Form' },
	  slug: { type: 'String', required: true },
	  cuid: { type: 'String', required: true },
	  date_added: { type: 'Date', default: Date.now, required: true }
	});
	
	exports.default = _mongoose2.default.model('Subm', submSchema);

/***/ },
/* 117 */
/***/ function(module, exports) {

	"use strict";
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sequence = sequence;
	/**
	 * Throw an array to it and a function which can generate promises
	 * and it will call them sequentially, one after another
	 */
	function sequence(items, consumer) {
	  var results = [];
	  var runner = function runner() {
	    var item = items.shift();
	    if (item) {
	      return consumer(item).then(function (result) {
	        results.push(result);
	      }).then(runner);
	    }
	
	    return Promise.resolve(results);
	  };
	
	  return runner();
	}

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Webpack Requirements
	
	
	var _express = __webpack_require__(1);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _compression = __webpack_require__(68);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _mongoose = __webpack_require__(3);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _bodyParser = __webpack_require__(66);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _path = __webpack_require__(29);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _IntlWrapper = __webpack_require__(45);
	
	var _IntlWrapper2 = _interopRequireDefault(_IntlWrapper);
	
	var _expressFileupload = __webpack_require__(69);
	
	var _expressFileupload2 = _interopRequireDefault(_expressFileupload);
	
	var _webpack = __webpack_require__(31);
	
	var _webpack2 = _interopRequireDefault(_webpack);
	
	var _webpackConfig = __webpack_require__(65);
	
	var _webpackConfig2 = _interopRequireDefault(_webpackConfig);
	
	var _webpackDevMiddleware = __webpack_require__(71);
	
	var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);
	
	var _webpackHotMiddleware = __webpack_require__(72);
	
	var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);
	
	var _store = __webpack_require__(47);
	
	var _reactRedux = __webpack_require__(5);
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(30);
	
	var _reactRouter = __webpack_require__(6);
	
	var _reactHelmet = __webpack_require__(9);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _routes = __webpack_require__(46);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _fetchData = __webpack_require__(64);
	
	var _config = __webpack_require__(7);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Initialize the Express App
	var app = new _express2.default();
	
	// Run Webpack dev server in development mode
	if (process.env.NODE_ENV === 'development') {
	  var compiler = (0, _webpack2.default)(_webpackConfig2.default);
	  app.use((0, _webpackDevMiddleware2.default)(compiler, {
	    noInfo: true,
	    publicPath: _webpackConfig2.default.output.publicPath,
	    stats: {
	      chunks: false // necessary otherwise autobahn logs a lot of data
	    }
	  }));
	  app.use((0, _webpackHotMiddleware2.default)(compiler));
	
	  // Watch files and clean cache (server)
	  compiler.plugin('done', function () {
	    console.log("Clearing /client/ module cache from server");
	    Object.keys(__webpack_require__.c).forEach(function (id) {
	      if (/[\/\\]client[\/\\]/.test(id)) {
	        //console.log(`Uncaching ${id} ...`);
	        delete __webpack_require__.c[id];
	      }
	    });
	  });
	}
	
	// React And Redux Setup
	
	
	// Import required modules
	
	//import dummyData from './app/dummyData';
	
	
	// Display server config
	console.log(_config2.default);
	
	// Set native promises as mongoose promise
	_mongoose2.default.Promise = global.Promise;
	
	// MongoDB Connection
	_mongoose2.default.connect(_config2.default.mongoURL, function (error) {
	  if (error) {
	    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
	    throw error;
	  }
	
	  if (process.env.NODE_ENV === 'development') {
	    // feed some dummy data in DB.
	    var readline = __webpack_require__(70);
	    var rl = readline.createInterface({
	      input: process.stdin,
	      output: process.stdout,
	      terminal: false
	    });
	    console.log('Type "fill" to fill Mongo with fictitious data ...');
	    rl.on('line', function (line) {
	      console.log('typed \'' + line + '\'');
	      if (line == 'fill') {
	        /*try {
	          require('./app/dummyData')();
	        } catch (err) {
	          console.log(err);
	        }*/
	        __webpack_require__(48)(false).then(function () {
	          return console.log('db filled with fictitious data!');
	        }).catch(function (err) {
	          return console.log(err);
	        });
	      }
	    });
	  }
	});
	
	// Apply body Parser and server public assets and routes (non-APIs)
	app.use((0, _compression2.default)());
	app.use(_bodyParser2.default.json({ limit: '20mb' }));
	app.use(_bodyParser2.default.urlencoded({ limit: '20mb', extended: false }));
	app.use(_express2.default.static(_path2.default.resolve(__dirname, '../dist')));
	app.use((0, _expressFileupload2.default)());
	
	// Specify APIs
	var API_URL = '/api';
	var SEARCH_API_URL = '/search-api';
	app.use(API_URL, function (req, res, next) {
	  __webpack_require__(54)(req, res, next);
	});
	app.use(API_URL, function (req, res, next) {
	  __webpack_require__(51)(req, res, next);
	});
	app.use(API_URL, function (req, res, next) {
	  __webpack_require__(59)(req, res, next);
	});
	app.use(API_URL, function (req, res, next) {
	  __webpack_require__(63)(req, res, next);
	});
	app.use(API_URL, function (req, res, next) {
	  __webpack_require__(57)(req, res, next);
	});
	app.use(API_URL, function (req, res, next) {
	  __webpack_require__(55)(req, res, next);
	});
	app.use(API_URL, function (req, res, next) {
	  __webpack_require__(49)(req, res, next);
	});
	app.use(API_URL, function (req, res, next) {
	  __webpack_require__(60)(req, res, next);
	});
	app.use(API_URL, function (req, res, next) {
	  __webpack_require__(52)(req, res, next);
	});
	app.use(SEARCH_API_URL, function (req, res, next) {
	  __webpack_require__(58)(req, res, next);
	});
	app.use(SEARCH_API_URL, function (req, res, next) {
	  __webpack_require__(56)(req, res, next);
	});
	app.use(SEARCH_API_URL, function (req, res, next) {
	  __webpack_require__(50)(req, res, next);
	});
	app.use(SEARCH_API_URL, function (req, res, next) {
	  __webpack_require__(61)(req, res, next);
	});
	app.use(SEARCH_API_URL, function (req, res, next) {
	  __webpack_require__(53)(req, res, next);
	});
	app.use('/test-hmr-api', function (req, res, next) {
	  __webpack_require__(62)(req, res, next);
	});
	
	// Render Initial HTML
	var renderFullPage = function renderFullPage(html, initialState) {
	  var head = _reactHelmet2.default.rewind();
	
	  // Import Manifests
	  var assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
	  var chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);
	
	  /*
	  removed:
	    <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
	    <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
	    fixed/improved:
	    - warning with https://github.com/Hashnode/mern-starter/issues/149
	    - add .replace(/</g, '\\u003c') to JSON.stringify(initialState)
	      (http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations)
	  */
	
	  return '\n    <!doctype html>\n    <html>\n      <head>\n        ' + head.base.toString() + '\n        ' + head.title.toString() + '\n        ' + head.meta.toString() + '\n        ' + head.link.toString() + '\n        ' + head.script.toString() + '\n\n        ' + (process.env.NODE_ENV === 'production' ? '<link rel=\'stylesheet\' href=\'' + assetsManifest['/app.css'] + '\' />' : '') + '\n\n      </head>\n      <body>\n        <div id="root">' + (process.env.NODE_ENV === 'production' ? html : '<div>' + html + '</div>') + '</div>\n        <script>\n          window.__INITIAL_STATE__ = ' + JSON.stringify(initialState).replace(/</g, '\\u003c') + ';\n          ' + (process.env.NODE_ENV === 'production' ? '//<![CDATA[\n          window.webpackManifest = ' + JSON.stringify(chunkManifest) + ';\n          //]]>' : '') + '\n        </script>\n        <script src=\'' + (process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js') + '\'></script>\n        <script src=\'' + (process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js') + '\'></script>\n      </body>\n    </html>\n  ';
	};
	
	var renderError = function renderError(err) {
	  var softTab = '&#32;&#32;&#32;&#32;';
	  var errTrace = process.env.NODE_ENV !== 'production' ? ':<br><br><pre style="color:red">' + softTab + err.stack.replace(/\n/g, '<br>' + softTab) + '</pre>' : '';
	  return renderFullPage('Server Error' + errTrace, {});
	};
	
	// Server Side Rendering based on routes matched by React-router.
	app.use(function (req, res, next) {
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirectLocation, renderProps) {
	    if (err) {
	      return res.status(500).end(renderError(err));
	    }
	
	    if (redirectLocation) {
	      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    }
	
	    if (!renderProps) {
	      return next();
	    }
	
	    var store = (0, _store.configureStore)();
	
	    return (0, _fetchData.fetchComponentData)(store, renderProps.components, renderProps.params).then(function () {
	      var initialView = (0, _server.renderToString)(_jsx(_reactRedux.Provider, {
	        store: store
	      }, void 0, _jsx(_IntlWrapper2.default, {}, void 0, _react2.default.createElement(_reactRouter.RouterContext, renderProps))));
	      var finalState = store.getState();
	
	      res.set('Content-Type', 'text/html').status(200).end(renderFullPage(initialView, finalState));
	    }).catch(function (error) {
	      return next(error);
	    });
	  });
	});
	
	if (process.env.NODE_ENV === 'development') {
	  // Watch files and clean cache (server)
	  var chokidar = __webpack_require__(67);
	  var watcher = chokidar.watch(_path2.default.resolve(__dirname) + '/app');
	  watcher.on('ready', function () {
	    console.log('Chokidar ready to watch server files');
	    watcher.on('all', function () {
	      console.log("Clearing /app/ module cache from server");
	      Object.keys(__webpack_require__.c).forEach(function (id) {
	        if (/[\/\\]app[\/\\]/.test(id)) {
	          //console.log(`Uncaching ${id} ...`);
	          delete __webpack_require__.c[id];
	        }
	      });
	    });
	  });
	}
	
	// start app
	app.listen(_config2.default.port, function (error) {
	  if (!error) {
	    console.log('SERVER is running on port: ' + _config2.default.port + '!'); // eslint-disable-line
	  }
	});
	
	exports.default = app;
	/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 119 */
/***/ function(module, exports) {

	module.exports = {
		"type": "object",
		"properties": {
			"researchers": {
				"type": "array",
				"title": "Researchers",
				"items": {
					"type": "object",
					"properties": {
						"id": {
							"type": "string",
							"title": "Id",
							"default": ""
						}
					}
				}
			},
			"subjects": {
				"type": "array",
				"title": "Subjects",
				"items": {
					"type": "object",
					"properties": {
						"id": {
							"type": "string",
							"title": "Id",
							"default": ""
						}
					}
				}
			},
			"devices": {
				"type": "array",
				"title": "Devices",
				"items": {
					"type": "object",
					"properties": {
						"id": {
							"type": "string",
							"title": "Id",
							"default": ""
						},
						"role": {
							"type": "string",
							"title": "Role",
							"default": ""
						}
					}
				}
			},
			"software": {
				"type": "array",
				"title": "Software",
				"items": {
					"type": "object",
					"properties": {
						"id": {
							"type": "string",
							"title": "Id",
							"default": ""
						}
					}
				}
			},
			"other_resources": {
				"type": "array",
				"title": "Other resources",
				"items": {
					"type": "object",
					"properties": {
						"id": {
							"type": "string",
							"title": "Id",
							"default": ""
						}
					}
				}
			},
			"outputs": {
				"type": "array",
				"title": "Outputs",
				"items": {
					"type": "object",
					"properties": {
						"name": {
							"type": "string",
							"title": "Name",
							"default": ""
						},
						"uri": {
							"type": "string",
							"title": "File",
							"default": ""
						},
						"metadata": {
							"type": "array",
							"title": "Meta-data",
							"items": {
								"type": "object",
								"properties": {
									"name": {
										"type": "string",
										"title": "Name",
										"default": ""
									},
									"value": {
										"type": "number",
										"title": "Value",
										"default": ""
									},
									"uom": {
										"type": "string",
										"enum": [
											"mm",
											"cm",
											"m"
										],
										"title": "Measurement unit",
										"default": ""
									}
								}
							}
						}
					}
				}
			}
		}
	};

/***/ },
/* 120 */
/***/ function(module, exports) {

	module.exports = {
		"researchers": {
			"items": {
				"id": {
					"ui:widget": "researcher"
				}
			}
		},
		"subjects": {
			"items": {
				"id": {
					"ui:widget": "subject"
				}
			}
		},
		"devices": {
			"items": {
				"id": {
					"ui:widget": "device"
				}
			}
		},
		"software": {
			"items": {
				"id": {
					"ui:widget": "software"
				}
			}
		},
		"other_resources": {
			"items": {
				"id": {
					"ui:widget": "output"
				}
			}
		}
	};

/***/ },
/* 121 */
/***/ function(module, exports) {

	module.exports = require("autobahn");

/***/ },
/* 122 */
/***/ function(module, exports) {

	module.exports = require("cbor");

/***/ },
/* 123 */
/***/ function(module, exports) {

	module.exports = require("chance");

/***/ },
/* 124 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 125 */
/***/ function(module, exports) {

	module.exports = require("intl");

/***/ },
/* 126 */
/***/ function(module, exports) {

	module.exports = require("intl-locales-supported");

/***/ },
/* 127 */
/***/ function(module, exports) {

	module.exports = require("intl/locale-data/jsonp/en");

/***/ },
/* 128 */
/***/ function(module, exports) {

	module.exports = require("intl/locale-data/jsonp/fr");

/***/ },
/* 129 */
/***/ function(module, exports) {

	module.exports = require("postcss-cssnext");

/***/ },
/* 130 */
/***/ function(module, exports) {

	module.exports = require("postcss-focus");

/***/ },
/* 131 */
/***/ function(module, exports) {

	module.exports = require("postcss-reporter");

/***/ },
/* 132 */
/***/ function(module, exports) {

	module.exports = require("react-addons-update");

/***/ },
/* 133 */
/***/ function(module, exports) {

	module.exports = require("react-bootstrap");

/***/ },
/* 134 */
/***/ function(module, exports) {

	module.exports = require("react-intl/locale-data/en");

/***/ },
/* 135 */
/***/ function(module, exports) {

	module.exports = require("react-intl/locale-data/fr");

/***/ },
/* 136 */
/***/ function(module, exports) {

	module.exports = require("react-jsonschema-form");

/***/ },
/* 137 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools");

/***/ },
/* 138 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools-dock-monitor");

/***/ },
/* 139 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools-log-monitor");

/***/ },
/* 140 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ }
/******/ ]);