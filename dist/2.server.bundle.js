exports.ids=[2],exports.modules={107:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e,t){return{form:(0,P.getForm)(e,t.params.cuid)}}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,u=arguments.length-3;if(o||0===u||(o={}),o&&i)for(var a in i)void 0===o[a]&&(o[a]=i[a]);else o||(o=i||{});if(1===u)o.children=r;else if(u>1){for(var s=Array(u),l=0;l<u;l++)s[l]=arguments[l+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),l=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),c=o(1),f=n(c),p=(o(7),o(6)),d=o(11),v=n(d),h=(o(5),o(115)),m=n(h),y=o(123),b=n(y),_={"single-form":"_4IVkjbuHRDz7oZrva7hLo","form-title":"_3VnmjLrSTAgu0tbdMZoacN","author-name":"_1cNPfGQNRCha6l5dInqnVS","form-desc":"_aUxib4kQGpIdxhqFQZaU","form-action":"_1hJnnZBUAO8LftNEbzN2wZ",divider:"_2eStSMGYswW2w7EmRibls0","form-detail":"_1flNws2Fw_nAFFJfQxE8zX"},g=n(_),O=o(50),w=o(49),P=o(51),S=function(e){function t(e){r(this,t);var o=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.onSubmit=function(e){var t=e.formData;console.log("submitting..."),console.log(o.state.submitType);var n={form:o.props.form._id,data:t},r=function(){o.context.router.push("/"),o.sender.send("exited")};switch(o.state.submitType){case"submit_later":o.props.dispatch((0,w.addSubmRequest)(n)).then(function(){return r()});break;case"submit_now":o.props.dispatch((0,w.addSubmRequest)(n)).then(function(e){return o.props.dispatch((0,w.updateSubmRequest)(e.subm))}).then(function(e){return o.props.dispatch((0,w.acceptSubmRequest)(e.subm))}).then(function(){return r()})}},o.onChange=function(e){var t=e.formData;o.setState({formData:t})},o.onClick=function(e){o.setState({submitType:e.target.id})},o.state={formData:o.props.form.init_data},o.sender=new b["default"]({dataOutPort:"wf-task-exit"}),o}return u(t,e),l(t,[{key:"render",value:function(){return s("div",{},void 0,s(v["default"],{title:this.props.form.title}),s("div",{className:g["default"]["single-form"]+" "+g["default"]["form-detail"]},void 0,s("h3",{className:g["default"]["form-title"]},void 0,this.props.form.title)),s(m["default"],{schema:this.props.form.json_schema,uiSchema:this.props.form.ui_schema,formData:this.state.formData,onSubmit:this.onSubmit,onChange:this.onChange,listenToInternalEvents:!0},void 0,s("button",{type:"submit",className:"btn btn-info",id:"submit_now",onClick:this.onClick},void 0,"Submit (accept now)"),s("button",{type:"submit",className:"btn btn-info",id:"submit_later",onClick:this.onClick},void 0,"Submit (accept later)")))}}]),t}(c.Component);S.need=[function(e){return(0,O.fetchForm)(e.cuid)}],S.contextTypes={router:f["default"].PropTypes.object.isRequired},t["default"]=(0,p.connect)(a)(S)},111:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){return(0,u["default"])(l+"/"+e+"?q="+t,{headers:{"content-type":"application/json"},method:"get"}).then(function(e){return e.json().then(function(t){return{json:t,response:e}})}).then(function(e){var t=e.json,o=e.response;return o.ok?t:Promise.reject(t)})}Object.defineProperty(t,"__esModule",{value:!0}),t.API_URL=void 0,t["default"]=r;var i=o(48),u=n(i),a=o(4),s=n(a),l=t.API_URL="undefined"==typeof window?process.env.BASE_URL||"http://localhost:"+(process.env.PORT||s["default"].port)+"/search-api":"/search-api"},113:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e){return i("div",{},void 0,i("div",{},void 0,a," ",e.cuid),s,e.attributes&&e.attributes.map(function(e){return i("div",{style:{paddingLeft:"10px"}},Math.random(),i("b",{},void 0,e.name,":")," ",e.value)}))}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,u=arguments.length-3;if(o||0===u||(o={}),o&&i)for(var a in i)void 0===o[a]&&(o[a]=i[a]);else o||(o=i||{});if(1===u)o.children=r;else if(u>1){for(var s=Array(u),l=0;l<u;l++)s[l]=arguments[l+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}();t.SubjectViewer=r;var u=o(1),a=(n(u),i("b",{},void 0,"CUID:")),s=i("div",{},void 0,i("b",{},void 0,"Attributes:"));t["default"]=r},114:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,u=arguments.length-3;if(o||0===u||(o={}),o&&i)for(var a in i)void 0===o[a]&&(o[a]=i[a]);else o||(o=i||{});if(1===u)o.children=r;else if(u>1){for(var s=Array(u),l=0;l<u;l++)s[l]=arguments[l+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),s=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),l=o(1),c=n(l),f=o(112),p=n(f),d=o(111),v=n(d),h=o(9),m=n(h),y=o(10),b=(n(y),a("b",{},void 0,"CUID:")),_=a("b",{},void 0,"Name:"),g=a("b",{},void 0,"Type:"),O=a("b",{},void 0,"Producer:"),w=a("b",{},void 0,"Uri:"),P=function(e){function t(){var e,o,n,u;r(this,t);for(var a=arguments.length,s=Array(a),l=0;l<a;l++)s[l]=arguments[l];return o=n=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),n.handleMouseDown=function(e){e.preventDefault(),e.stopPropagation(),n.props.onSelect(n.props.option,e)},n.handleMouseEnter=function(e){n.props.onFocus(n.props.option,e)},n.handleMouseMove=function(e){n.props.isFocused||n.props.onFocus(n.props.option,e)},u=o,i(n,u)}return u(t,e),s(t,[{key:"render",value:function(){return a("div",{className:this.props.className,onMouseDown:this.handleMouseDown,onMouseEnter:this.handleMouseEnter,onMouseMove:this.handleMouseMove},void 0,a("div",{},void 0,b," ",this.props.option.cuid),a("div",{},void 0,_," ",this.props.option.name),a("div",{},void 0,g," ",this.props.option.type),a("div",{},void 0,O," ",this.props.option.producer),a("div",{},void 0,w," ",this.props.option.uri))}}]),t}(l.Component),S=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),s(t,[{key:"render",value:function(){return a("div",{className:"Select-value"},void 0,a("span",{className:"Select-value-label"},void 0,a("b",{},void 0,this.props.value.cuid)))}}]),t}(l.Component),j=function(e){function t(e){r(this,t);var o=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return M.call(o),o.state={},o}return u(t,e),s(t,[{key:"render",value:function(){return c["default"].createElement("div",{ref:"container"},a(p["default"].AsyncCreatable,{value:this.state.value,onChange:this.onChange,valueKey:"cuid",loadOptions:this.getDevices,optionComponent:P,valueComponent:S,filterOption:function(e,t){return!0}}))}}]),t}(l.Component),M=function(){var e=this;this.componentDidMount=function(){e.setValueFromProps(e.props)},this.componentWillReceiveProps=function(t){e.setValueFromProps(t)},this.setValueFromProps=function(t){var o=t.value;(0,m["default"])("devices/"+o).then(function(t){var n=t.device;n||(n={cuid:o}),e.refs.container&&e.setState({value:n})})},this.getDevices=function(e){return e?(0,v["default"])("devices",e).then(function(e){return{options:e.devices}}):Promise.resolve({options:[]})},this.onChange=function(t){e.props.onChange(t.cuid)}};t["default"]=j},115:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){var o={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(o[n]=e[n]);return o}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},l=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,u=arguments.length-3;if(o||0===u||(o={}),o&&i)for(var a in i)void 0===o[a]&&(o[a]=i[a]);else o||(o=i||{});if(1===u)o.children=r;else if(u>1){for(var s=Array(u),l=0;l<u;l++)s[l]=arguments[l+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),c=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),f=o(1),p=n(f),d=o(122),v=n(d),h=o(19),m=o(118),y=n(m),b=o(120),_=n(b),g=o(114),O=n(g),w=o(119),P=n(w),S=o(117),j=n(S),M=o(116),C=n(M),E=o(10),k=n(E),D={},N={researcher:y["default"],subject:_["default"],device:O["default"],software:P["default"],file:j["default"],output:C["default"]},F=function(e){function t(e){i(this,t);var o=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.componentDidMount=function(){o._update(o.state),o._listenToInternalEvents(o.props.listenToInternalEvents)},o._listenToInternalEvents=function(e){e&&k["default"].subscribe("jss-internals",function(e,t){if("formData"in t.targets){var n=Object.assign({},o.state.formData),r=t.targets.formData.path;n[r]=t.targets.formData.payload,o.setState({formData:n})}})},o._update=function(e){var t=e.schema,n=e.uiSchema,r=e.formData,i=!0;try{var u=(0,h.renderToString)(l(v["default"],{fields:D,widgets:N,schema:t,uiSchema:n,formData:r}));if(/unsupported/i.test(u))throw new Error(u)}catch(a){i=!1}o.props.onFormPropsChange({valid:i}),i?o.setState({valid:!0,schema:t,uiSchema:n,formData:r}):o.setState({valid:!1,formData:r})},o.state={valid:!1,schema:e.schema,uiSchema:e.uiSchema,formData:e.formData},o}return a(t,e),c(t,[{key:"componentWillReceiveProps",value:function(e){e.schema==this.props.schema&&e.uiSchema==this.props.uiSchema&&e.formData==this.props.formData||this._update(e),this._listenToInternalEvents(e.listenToInternalEvents)}},{key:"render",value:function(){var e=null,t=this.props,o=(t.schema,t.uiSchema,t.formData),n=r(t,["schema","uiSchema","formData"]),e=l("pre",{},void 0,JSON.stringify(o,null,2));if(this.state.valid)var e=p["default"].createElement(v["default"],s({fields:D,widgets:N,schema:this.state.schema,uiSchema:this.state.uiSchema,formData:this.state.formData,ref:"form"},n));return l("div",{},void 0,l("p",{},void 0,"Form definition: ",this.state.valid?"valid":"invalid"),e)}}]),t}(f.Component);F.defaultProps={schema:void 0,uiSchema:void 0,formData:void 0,listenToInternalEvents:!1,onFormPropsChange:function(){}},t["default"]=F},116:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,u=arguments.length-3;if(o||0===u||(o={}),o&&i)for(var a in i)void 0===o[a]&&(o[a]=i[a]);else o||(o=i||{});if(1===u)o.children=r;else if(u>1){for(var s=Array(u),l=0;l<u;l++)s[l]=arguments[l+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),s=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),l=o(1),c=n(l),f=o(112),p=n(f),d=o(113),v=n(d),h=o(111),m=n(h),y=o(9),b=n(y),_=a("b",{},void 0,"CUID:"),g=a("b",{},void 0,"Name:"),O=a("b",{},void 0,"Uri:"),w=a("b",{},void 0,"Activity:"),P=a("b",{},void 0,"Subject involved:"),S=a("b",{},void 0,"Subject involved previously:"),j=function(e){function t(){var e,o,n,u;r(this,t);for(var a=arguments.length,s=Array(a),l=0;l<a;l++)s[l]=arguments[l];return o=n=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),n.handleMouseDown=function(e){e.preventDefault(),e.stopPropagation(),n.props.onSelect(n.props.option,e)},n.handleMouseEnter=function(e){n.props.onFocus(n.props.option,e)},n.handleMouseMove=function(e){n.props.isFocused||n.props.onFocus(n.props.option,e)},u=o,i(n,u)}return u(t,e),s(t,[{key:"render",value:function(){var e=this;return this.props.option.activity?a("div",{className:this.props.className,onMouseDown:this.handleMouseDown,onMouseEnter:this.handleMouseEnter,onMouseMove:this.handleMouseMove},void 0,a("div",{},void 0,_," ",this.props.option.cuid),a("div",{},void 0,g," ",this.props.option.name),a("div",{},void 0,O," ",this.props.option.uri),a("div",{},void 0,w," ",this.props.option.activity.name),this.props.option.activity.subjects.map(function(e){return a("div",{},e.cuid,P,a("div",{style:{paddingLeft:"10px"}},void 0,c["default"].createElement(v["default"],e)))}),function(){if(!e.props.option.activity.prev)return null;var t=e.props.option.activity.prev.subject;return t?a("div",{},void 0,S,a("div",{style:{paddingLeft:"10px"}},void 0,c["default"].createElement(v["default"],t))):null}()):a("div",{className:this.props.className,onMouseDown:this.handleMouseDown,onMouseEnter:this.handleMouseEnter,onMouseMove:this.handleMouseMove})}}]),t}(l.Component),M=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),s(t,[{key:"render",value:function(){return a("div",{className:"Select-value"},void 0,a("span",{className:"Select-value-label"},void 0,a("b",{},void 0,this.props.value.cuid)))}}]),t}(l.Component),C=function(e){function t(e){r(this,t);var o=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return E.call(o),o.state={},o}return u(t,e),s(t,[{key:"render",value:function(){return c["default"].createElement("div",{ref:"container"},a(p["default"].AsyncCreatable,{value:this.state.value,onChange:this.onChange,valueKey:"cuid",loadOptions:this.getOutputs,optionComponent:j,valueComponent:M,filterOption:function(e,t){return!0}}))}}]),t}(l.Component),E=function(){var e=this;this.componentWillMount=function(){e.setValueFromProps(e.props)},this.componentWillReceiveProps=function(t){e.setValueFromProps(t)},this.setValueFromProps=function(t){var o=t.value;o&&(0,b["default"])("outputs/"+o).then(function(t){var n=t.output;n||(n={cuid:o}),e.refs.container&&e.setState({value:n})})},this.getOutputs=function(e){return!e||e.length<3?Promise.resolve({options:[]}):(0,m["default"])("outputs",e).then(function(e){return e.outputs||(e.outputs=[]),{options:e.outputs}})},this.onChange=function(t){e.props.onChange(t.cuid)}};t["default"]=C},117:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e){var t=e.name,o=e.size,n=e.type;return new Promise(function(r,i){(0,m.uploadFile)(e).then(function(e){console.log("response:"),console.log(e),r({newName:e.newFileName,name:t,size:o,type:n})})})}function s(e){return Promise.all([].map.call(e,a))}function l(e){var t=e.filesInfo;return 0===t.length?null:f("ul",{className:"file-info"},void 0,t.map(function(e,t){var o=e.name,n=e.newName,r=e.size,i=e.type;return i||(i="unknown type"),f("li",{},t,f("div",{},void 0,f("strong",{},void 0,o)," (",i,", ",r," bytes)",_,"Renamed as: ",n))}))}function c(e){return e.filter(function(e){return"undefined"!=typeof e}).map(function(e){try{var t=JSON.parse(e),o=t.name,n=t.newName,r=t.size,i=t.type}catch(u){var o=n=r=i=void 0}var a={name:o,newName:n,size:r,type:i};return a}).filter(function(e){return"undefined"!=typeof e.name})}Object.defineProperty(t,"__esModule",{value:!0});var f=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,u=arguments.length-3;if(o||0===u||(o={}),o&&i)for(var a in i)void 0===o[a]&&(o[a]=i[a]);else o||(o=i||{});if(1===u)o.children=r;else if(u>1){for(var s=Array(u),l=0;l<u;l++)s[l]=arguments[l+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),p=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),d=o(1),v=n(d),h=o(48),m=(n(h),o(9)),y=function(e){function t(e){r(this,t);var o=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return b.call(o),o}return u(t,e),p(t,[{key:"render",value:function(){var e=this,t=this.props,o=t.multiple,n=t.id,r=t.readonly,i=t.disabled,u=t.autofocus,a=(t.value,this.state.filesInfo);return f("div",{},void 0,f("p",{},void 0,v["default"].createElement("input",{ref:function(t){return e.inputRef=t},id:n,type:"file",disabled:r||i,onChange:this.onChange,defaultValue:"",autoFocus:u,multiple:o,style:{color:"transparent"}})),f(l,{filesInfo:a}))}}]),t}(d.Component),b=function(){var e=this;this.componentWillMount=function(){e.setValueFromProps(e.props)},this.componentWillReceiveProps=function(t){e.setValueFromProps(t)},this.setValueFromProps=function(t){var o=t.value,n=Array.isArray(o)?o:[o];e.setState({values:n,filesInfo:c(n)})},this.onChange=function(t){var o=e.props,n=o.multiple,r=o.onChange;s(t.target.files).then(function(t){var o={values:t.map(function(e){return JSON.stringify(e)}),filesInfo:t};e.setState(o,function(){r(n?o.values:o.values[0])})})}},_=f("br",{});t["default"]=y},118:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,u=arguments.length-3;if(o||0===u||(o={}),o&&i)for(var a in i)void 0===o[a]&&(o[a]=i[a]);else o||(o=i||{});if(1===u)o.children=r;else if(u>1){for(var s=Array(u),l=0;l<u;l++)s[l]=arguments[l+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),s=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),l=o(1),c=n(l),f=o(112),p=n(f),d=o(111),v=n(d),h=o(9),m=n(h),y=a("b",{},void 0,"CUID:"),b=a("b",{},void 0,"Name:"),_=a("b",{},void 0,"Surname:"),g=a("b",{},void 0,"Birthdate:"),O=function(e){function t(){var e,o,n,u;r(this,t);for(var a=arguments.length,s=Array(a),l=0;l<a;l++)s[l]=arguments[l];return o=n=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),n.handleMouseDown=function(e){e.preventDefault(),e.stopPropagation(),n.props.onSelect(n.props.option,e)},n.handleMouseEnter=function(e){n.props.onFocus(n.props.option,e)},n.handleMouseMove=function(e){n.props.isFocused||n.props.onFocus(n.props.option,e)},u=o,i(n,u)}return u(t,e),s(t,[{key:"render",value:function(){return a("div",{className:this.props.className,onMouseDown:this.handleMouseDown,onMouseEnter:this.handleMouseEnter,onMouseMove:this.handleMouseMove},void 0,a("div",{},void 0,y," ",this.props.option.cuid),a("div",{},void 0,b," ",this.props.option.name),a("div",{},void 0,_," ",this.props.option.surname),a("div",{},void 0,g," ",this.props.option.birthdate))}}]),t}(l.Component),w=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),s(t,[{key:"render",value:function(){return a("div",{className:"Select-value"},void 0,a("span",{className:"Select-value-label"},void 0,a("b",{},void 0,this.props.value.cuid)))}}]),t}(l.Component),P=function(e){function t(e){r(this,t);var o=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return S.call(o),o.state={},o}return u(t,e),s(t,[{key:"render",value:function(){return c["default"].createElement("div",{ref:"container"},a(p["default"].AsyncCreatable,{value:this.state.value,onChange:this.onChange,valueKey:"cuid",loadOptions:this.getResearchers,optionComponent:O,valueComponent:w,filterOption:function(e,t){return!0}}))}}]),t}(l.Component),S=function(){var e=this;this.componentWillMount=function(){e.setValueFromProps(e.props)},this.componentWillReceiveProps=function(t){e.setValueFromProps(t)},this.setValueFromProps=function(t){var o=t.value;(0,m["default"])("researchers/"+o).then(function(t){var n=t.researcher;n||(n={cuid:o}),e.refs.container&&e.setState({value:n})})},this.getResearchers=function(e){return e?(0,v["default"])("researchers",e).then(function(e){return{options:e.researchers}}):Promise.resolve({options:[]})},this.onChange=function(t){e.props.onChange(t.cuid)}};t["default"]=P},119:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,u=arguments.length-3;if(o||0===u||(o={}),o&&i)for(var a in i)void 0===o[a]&&(o[a]=i[a]);else o||(o=i||{});if(1===u)o.children=r;else if(u>1){for(var s=Array(u),l=0;l<u;l++)s[l]=arguments[l+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),s=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),l=o(1),c=n(l),f=o(112),p=n(f),d=o(111),v=n(d),h=o(9),m=n(h),y=a("b",{},void 0,"CUID:"),b=a("b",{},void 0,"Name:"),_=a("b",{},void 0,"Version:"),g=a("b",{},void 0,"Producer:"),O=a("b",{},void 0,"Uri:"),w=function(e){function t(){var e,o,n,u;r(this,t);for(var a=arguments.length,s=Array(a),l=0;l<a;l++)s[l]=arguments[l];return o=n=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),n.handleMouseDown=function(e){e.preventDefault(),e.stopPropagation(),n.props.onSelect(n.props.option,e)},n.handleMouseEnter=function(e){n.props.onFocus(n.props.option,e)},n.handleMouseMove=function(e){n.props.isFocused||n.props.onFocus(n.props.option,e)},u=o,i(n,u)}return u(t,e),s(t,[{key:"render",value:function(){return a("div",{className:this.props.className,onMouseDown:this.handleMouseDown,onMouseEnter:this.handleMouseEnter,onMouseMove:this.handleMouseMove},void 0,a("div",{},void 0,y," ",this.props.option.cuid),a("div",{},void 0,b," ",this.props.option.name),a("div",{},void 0,_," ",this.props.option.version),a("div",{},void 0,g," ",this.props.option.producer),a("div",{},void 0,O," ",this.props.option.uri))}}]),t}(l.Component),P=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),s(t,[{key:"render",value:function(){return a("div",{className:"Select-value"},void 0,a("span",{className:"Select-value-label"},void 0,a("b",{},void 0,this.props.value.cuid)))}}]),t}(l.Component),S=function(e){function t(e){r(this,t);var o=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return j.call(o),o.state={},o}return u(t,e),s(t,[{key:"render",value:function(){return c["default"].createElement("div",{ref:"container"},a(p["default"].AsyncCreatable,{value:this.state.value,onChange:this.onChange,valueKey:"cuid",loadOptions:this.getSWTools,optionComponent:w,valueComponent:P,filterOption:function(e,t){return!0}}))}}]),t}(l.Component),j=function(){var e=this;this.componentWillMount=function(){e.setValueFromProps(e.props)},this.componentWillReceiveProps=function(t){e.setValueFromProps(t)},this.setValueFromProps=function(t){var o=t.value;(0,m["default"])("sw-tools/"+o).then(function(t){var n=t.SWTool;n||(n={cuid:o}),e.refs.container&&e.setState({value:n})})},this.getSWTools=function(e){return e?(0,v["default"])("sw-tools",e).then(function(e){return{options:e.SWTools}}):Promise.resolve({options:[]})},this.onChange=function(t){e.props.onChange(t.cuid)}};t["default"]=S},120:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,u=arguments.length-3;if(o||0===u||(o={}),o&&i)for(var a in i)void 0===o[a]&&(o[a]=i[a]);else o||(o=i||{});if(1===u)o.children=r;else if(u>1){for(var s=Array(u),l=0;l<u;l++)s[l]=arguments[l+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),s=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),l=o(1),c=n(l),f=o(112),p=n(f),d=o(113),v=n(d),h=o(111),m=n(h),y=o(9),b=n(y),_=function(e){function t(){var e,o,n,u;r(this,t);for(var a=arguments.length,s=Array(a),l=0;l<a;l++)s[l]=arguments[l];return o=n=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),n.handleMouseDown=function(e){e.preventDefault(),e.stopPropagation(),n.props.onSelect(n.props.option,e)},n.handleMouseEnter=function(e){n.props.onFocus(n.props.option,e)},n.handleMouseMove=function(e){n.props.isFocused||n.props.onFocus(n.props.option,e)},u=o,i(n,u)}return u(t,e),s(t,[{key:"render",value:function(){return a("div",{className:this.props.className,onMouseDown:this.handleMouseDown,onMouseEnter:this.handleMouseEnter,onMouseMove:this.handleMouseMove},void 0,c["default"].createElement(v["default"],this.props.option))}}]),t}(l.Component),g=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),s(t,[{key:"render",value:function(){return a("div",{className:"Select-value"},void 0,a("span",{className:"Select-value-label"},void 0,a("b",{},void 0,this.props.value.cuid)))}}]),t}(l.Component),O=function(e){function t(e){r(this,t);var o=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return w.call(o),o.state={},o}return u(t,e),s(t,[{key:"render",value:function(){return c["default"].createElement("div",{ref:"container"},a(p["default"].AsyncCreatable,{value:this.state.value,onChange:this.onChange,valueKey:"cuid",loadOptions:this.getSubjects,optionComponent:_,valueComponent:g,filterOption:function(e,t){return!0}}))}}]),t}(l.Component),w=function(){var e=this;this.componentWillMount=function(){e.setValueFromProps(e.props)},this.componentWillReceiveProps=function(t){e.setValueFromProps(t)},this.setValueFromProps=function(t){var o=t.value;(0,b["default"])("subjects/"+o).then(function(t){var n=t.subject;n||(n={cuid:o}),e.refs.container&&e.setState({value:n})})},this.getSubjects=function(e){return e?(0,m["default"])("subjects",e).then(function(e){return{options:e.subjects}}):Promise.resolve({options:[]})},this.onChange=function(t){e.props.onChange(t.cuid)}};t["default"]=O},123:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){
if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,u=arguments.length-3;if(o||0===u||(o={}),o&&i)for(var a in i)void 0===o[a]&&(o[a]=i[a]);else o||(o=i||{});if(1===u)o.children=r;else if(u>1){for(var s=Array(u),l=0;l<u;l++)s[l]=arguments[l+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),s=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),l=o(1),c=n(l),f=o(10),p=n(f),d={},v="command",h=a("div",{}),m=function(e){function t(e){r(this,t);var o=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.handleNewPackageOut=function(e,t){""!=e?(p["default"].publishSync(e,t),console.log("Out-package published")):console.log("Output port name is empty")},o}return u(t,e),s(t,[{key:"render",value:function(){return h}},{key:"componentDidMount",value:function(){this.props.data||this.handleNewPackageOut(this.props.dataOutPort,this.props.data)}},{key:"componentWillUpdate",value:function(e){e.dataOutPort==this.props.dataOutPort&&this.handleNewPackageOut(e.dataOutPort,e.data)}},{key:"send",value:function(e){this.handleNewPackageOut(this.props.dataOutPort,e)}}]),t}(c["default"].Component);m.defaultProps={data:d,dataOutPort:v},t["default"]=m}};