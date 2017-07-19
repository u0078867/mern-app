exports.ids = [4];
exports.modules = {

/***/ 101:
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
	
	var _PostList = __webpack_require__(119);
	
	var _PostList2 = _interopRequireDefault(_PostList);
	
	var _PostCreateWidget = __webpack_require__(118);
	
	var _PostCreateWidget2 = _interopRequireDefault(_PostCreateWidget);
	
	var _PostActions = __webpack_require__(50);
	
	var _AppActions = __webpack_require__(16);
	
	var _AppReducer = __webpack_require__(53);
	
	var _PostReducer = __webpack_require__(51);
	
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

/***/ 118:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PostCreateWidget = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(4);
	
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

/***/ 119:
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
	
	var _PostListItem = __webpack_require__(120);
	
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

/***/ 120:
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

/***/ }

};;