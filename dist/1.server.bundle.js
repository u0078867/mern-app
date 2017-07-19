exports.ids=[1],exports.modules={103:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{showAddForm:(0,b.getShowAddForm)(e),forms:(0,b.getForms)(e)}}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&i)for(var s in i)void 0===o[s]&&(o[s]=i[s]);else o||(o=i||{});if(1===a)o.children=r;else if(a>1){for(var u=Array(a),l=0;l<a;l++)u[l]=arguments[l+3];o.children=u}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),l=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),c=o(1),f=n(c),p=o(7),d=o(120),h=n(d),v=o(117),m=n(v),y=o(51),b=o(52),_=function(e){function t(){var e,o,n,a;r(this,t);for(var s=arguments.length,u=Array(s),l=0;l<s;l++)u[l]=arguments[l];return o=n=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),n.handleDeleteForm=function(e){confirm("Do you want to delete this form")&&n.props.dispatch((0,y.deleteFormRequest)(e))},n.handleUpdateForm=function(e){confirm("Do you want to update this form")&&n.props.dispatch((0,y.updateFormRequest)(e))},n.handleAddForm=function(e){n.props.dispatch((0,y.toggleAddForm)()),console.log("handleAddForm"),console.log(e),n.props.dispatch((0,y.addFormRequest)(e))},n.handleToggleAddForm=function(){n.props.dispatch((0,y.toggleAddForm)())},a=o,i(n,a)}return a(t,e),l(t,[{key:"componentDidMount",value:function(){this.props.dispatch((0,y.fetchForms)())}},{key:"render",value:function(){return u("div",{},void 0,u("a",{href:"#",onClick:this.handleToggleAddForm},void 0,"Add form"),u(m["default"],{saveForm:this.handleAddForm,showEditForm:this.props.showAddForm}),u(h["default"],{handleDeleteForm:this.handleDeleteForm,handleUpdateForm:this.handleUpdateForm,forms:this.props.forms}))}}]),t}(c.Component);_.need=[function(){return(0,y.fetchForms)()}],_.contextTypes={router:f["default"].PropTypes.object},t["default"]=(0,p.connect)(s)(_)},108:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){return(0,a["default"])(l+"/"+e+"?q="+t,{headers:{"content-type":"application/json"},method:"get"}).then(function(e){return e.json().then(function(t){return{json:t,response:e}})}).then(function(e){var t=e.json,o=e.response;return o.ok?t:Promise.reject(t)}).then(function(e){return e},function(e){return e})}Object.defineProperty(t,"__esModule",{value:!0}),t.API_URL=void 0,t["default"]=r;var i=o(49),a=n(i),s=o(3),u=n(s),l=t.API_URL="undefined"==typeof window?process.env.BASE_URL||"http://localhost:"+(process.env.PORT||u["default"].port)+"/search-api":"/search-api"},110:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&i)for(var s in i)void 0===o[s]&&(o[s]=i[s]);else o||(o=i||{});if(1===a)o.children=r;else if(a>1){for(var u=Array(a),l=0;l<a;l++)u[l]=arguments[l+3];o.children=u}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),u=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),l=o(1),c=n(l),f=o(109),p=n(f),d=o(108),h=n(d),v=o(5),m=n(v),y=o(12),b=n(y),_=function(e){function t(){var e,o,n,a;r(this,t);for(var s=arguments.length,u=Array(s),l=0;l<s;l++)u[l]=arguments[l];return o=n=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),n.handleMouseDown=function(e){e.preventDefault(),e.stopPropagation(),n.props.onSelect(n.props.option,e)},n.handleMouseEnter=function(e){n.props.onFocus(n.props.option,e)},n.handleMouseMove=function(e){n.props.isFocused||n.props.onFocus(n.props.option,e)},a=o,i(n,a)}return a(t,e),u(t,[{key:"render",value:function(){return s("div",{className:this.props.className,onMouseDown:this.handleMouseDown,onMouseEnter:this.handleMouseEnter,onMouseMove:this.handleMouseMove},void 0,s("div",{},void 0,this.props.option.name+" ",s("i",{},void 0,"(",this.props.option.type,")")))}}]),t}(l.Component),g=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){return s("div",{className:"Select-value"},void 0,s("span",{className:"Select-value-label"},void 0,this.props.value.name+" ",s("b",{},void 0,"(",this.props.value.cuid,")")))}}]),t}(l.Component),O=function(e){function t(e){r(this,t);var o=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return w.call(o),o.state={},o}return a(t,e),u(t,[{key:"render",value:function(){return c["default"].createElement("div",{ref:"container"},s(p["default"].AsyncCreatable,{value:this.state.value,onChange:this.onChange,valueKey:"cuid",loadOptions:this.getDevices,optionComponent:_,valueComponent:g,filterOption:function(e,t){return!0}}))}}]),t}(l.Component),w=function(){var e=this;this.componentDidMount=function(){setTimeout(function(){try{var t=JSON.parse(JSON.stringify(e.props.options.events.timeout));t.targets.formData.payload="random string",b["default"].publishSync("jss-internals",t)}catch(o){}},2e3),e.setValueFromProps(e.props)},this.componentWillReceiveProps=function(t){e.setValueFromProps(t)},this.setValueFromProps=function(t){var o=t.value;(0,m["default"])("devices/"+o).then(function(t){var n=t.device;n||(n={cuid:o}),e.refs.container&&e.setState({value:n})})},this.getDevices=function(e){return e?(0,h["default"])("devices",e).then(function(e){return{options:e.devices}}):Promise.resolve({options:[]})},this.onChange=function(t){e.props.onChange(t.cuid)}};t["default"]=O},111:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){var o={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(o[n]=e[n]);return o}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},l=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&i)for(var s in i)void 0===o[s]&&(o[s]=i[s]);else o||(o=i||{});if(1===a)o.children=r;else if(a>1){for(var u=Array(a),l=0;l<a;l++)u[l]=arguments[l+3];o.children=u}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),c=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),f=o(1),p=n(f),d=o(118),h=n(d),v=o(19),m=o(114),y=n(m),b=o(116),_=n(b),g=o(110),O=n(g),w=o(115),S=n(w),P=o(113),j=n(P),M=o(112),F=n(M),C=o(12),E=n(C),N={},D={researcher:y["default"],subject:_["default"],device:O["default"],software:S["default"],file:j["default"],output:F["default"]},k=function(e){function t(e){i(this,t);var o=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.componentDidMount=function(){o._update(o.state),o._listenToInternalEvents(o.props.listenToInternalEvents)},o._listenToInternalEvents=function(e){e&&E["default"].subscribe("jss-internals",function(e,t){if("formData"in t.targets){var n=Object.assign({},o.state.formData),r=t.targets.formData.path;n[r]=t.targets.formData.payload,o.setState({formData:n})}})},o._update=function(e){var t=e.schema,n=e.uiSchema,r=e.formData,i=!0;try{var a=(0,v.renderToString)(l(h["default"],{fields:N,widgets:D,schema:t,uiSchema:n,formData:r}));if(/unsupported/i.test(a))throw new Error(a)}catch(s){console.log(s),i=!1}o.props.onFormPropsChange({valid:i}),i?o.setState({valid:!0,schema:t,uiSchema:n,formData:r}):o.setState({valid:!1})},o.state={valid:!1,schema:e.schema,uiSchema:e.uiSchema,formData:e.formData},o}return s(t,e),c(t,[{key:"componentWillReceiveProps",value:function(e){e.schema==this.props.schema&&e.uiSchema==this.props.uiSchema&&e.formData==this.props.formData||this._update(e),this._listenToInternalEvents(e.listenToInternalEvents)}},{key:"render",value:function(){var e=null,t=this.props,o=(t.schema,t.uiSchema,t.formData,r(t,["schema","uiSchema","formData"]));if(this.state.valid)var e=p["default"].createElement(h["default"],u({fields:N,widgets:D,schema:this.state.schema,uiSchema:this.state.uiSchema,formData:this.state.formData,ref:"form"},o));return l("div",{},void 0,l("p",{},void 0,"Form definition: ",this.state.valid?"valid":"invalid"),e)}}]),t}(f.Component);k.defaultProps={valid:!1,schema:void 0,uiSchema:void 0,formData:void 0,listenToInternalEvents:!1,onFormPropsChange:function(){}},t["default"]=k},112:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&i)for(var s in i)void 0===o[s]&&(o[s]=i[s]);else o||(o=i||{});if(1===a)o.children=r;else if(a>1){for(var u=Array(a),l=0;l<a;l++)u[l]=arguments[l+3];o.children=u}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),u=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),l=o(1),c=n(l),f=o(109),p=n(f),d=o(108),h=n(d),v=o(5),m=n(v),y=s("b",{},void 0,"CUID:"),b=s("b",{},void 0,"Name:"),_=s("b",{},void 0,"Uri:"),g=s("b",{},void 0,"Activity:"),O=s("b",{},void 0,"Involved: "),w=s("b",{},void 0,"Involved previously: "),S=function(e){function t(){var e,o,n,a;r(this,t);for(var s=arguments.length,u=Array(s),l=0;l<s;l++)u[l]=arguments[l];return o=n=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),n.handleMouseDown=function(e){e.preventDefault(),e.stopPropagation(),n.props.onSelect(n.props.option,e)},n.handleMouseEnter=function(e){n.props.onFocus(n.props.option,e)},n.handleMouseMove=function(e){n.props.isFocused||n.props.onFocus(n.props.option,e)},a=o,i(n,a)}return a(t,e),u(t,[{key:"render",value:function(){var e=this;return this.props.option.activity?s("div",{className:this.props.className,onMouseDown:this.handleMouseDown,onMouseEnter:this.handleMouseEnter,onMouseMove:this.handleMouseMove},void 0,s("div",{},void 0,y," ",this.props.option.cuid),s("div",{},void 0,b," ",this.props.option.name),s("div",{},void 0,_," ",this.props.option.uri),s("div",{},void 0,g," ",this.props.option.activity.description),this.props.option.activity.subjects.map(function(e){var t=e.id;return s("div",{},e.id,O,t.name," ",t.surname," (born: ",t.birthdate,")")}),function(){if(!e.props.option.activity.prev)return null;var t=e.props.option.activity.prev.subjects.id;return s("div",{},void 0,w,t.name," ",t.surname," (born: ",t.birthdate,")")}()):s("div",{className:this.props.className,onMouseDown:this.handleMouseDown,onMouseEnter:this.handleMouseEnter,onMouseMove:this.handleMouseMove})}}]),t}(l.Component),P=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){return s("div",{className:"Select-value"},void 0,s("span",{className:"Select-value-label"},void 0,s("b",{},void 0,this.props.value.cuid)))}}]),t}(l.Component),j=function(e){function t(e){r(this,t);var o=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return M.call(o),o.state={},o}return a(t,e),u(t,[{key:"render",value:function(){return c["default"].createElement("div",{ref:"container"},s(p["default"].AsyncCreatable,{value:this.state.value,onChange:this.onChange,valueKey:"cuid",loadOptions:this.getOutputs,optionComponent:S,valueComponent:P,filterOption:function(e,t){return!0}}))}}]),t}(l.Component),M=function(){var e=this;this.componentWillMount=function(){e.setValueFromProps(e.props)},this.componentWillReceiveProps=function(t){e.setValueFromProps(t)},this.setValueFromProps=function(t){var o=t.value;(0,m["default"])("outputs/"+o).then(function(t){var n=t.output;n||(n={cuid:o}),e.refs.container&&e.setState({value:n})})},this.getOutputs=function(e){return!e||e.length<3?Promise.resolve({options:[]}):(0,h["default"])("outputs",e).then(function(e){return e.outputs||(e.outputs=[]),{options:e.outputs}})},this.onChange=function(t){e.props.onChange(t.cuid)}};t["default"]=j},113:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){var t=e.name,o=e.size,n=e.type;return new Promise(function(r,i){(0,m.uploadFile)(e).then(function(e){console.log("response:"),console.log(e),r({newName:e.newFileName,name:t,size:o,type:n})})})}function u(e){return Promise.all([].map.call(e,s))}function l(e){var t=e.filesInfo;return 0===t.length?null:f("ul",{className:"file-info"},void 0,t.map(function(e,t){var o=e.name,n=e.newName,r=e.size,i=e.type;return i||(i="unknown type"),f("li",{},t,f("strong",{},void 0,o)," (",i,", ",r," bytes) -> ",n)}))}function c(e){return e.filter(function(e){return"undefined"!=typeof e}).map(function(e){try{var t=JSON.parse(e),o=t.name,n=t.newName,r=t.size,i=t.type}catch(a){var o=n=r=i=void 0}var s={name:o,newName:n,size:r,type:i};return s})}Object.defineProperty(t,"__esModule",{value:!0});var f=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&i)for(var s in i)void 0===o[s]&&(o[s]=i[s]);else o||(o=i||{});if(1===a)o.children=r;else if(a>1){for(var u=Array(a),l=0;l<a;l++)u[l]=arguments[l+3];o.children=u}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),p=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),d=o(1),h=n(d),v=o(49),m=(n(v),o(5)),y=function(e){function t(e){r(this,t);var o=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return b.call(o),o}return a(t,e),p(t,[{key:"render",value:function(){var e=this,t=this.props,o=t.multiple,n=t.id,r=t.readonly,i=t.disabled,a=t.autofocus,s=(t.value,this.state.filesInfo);return f("div",{},void 0,f("p",{},void 0,h["default"].createElement("input",{ref:function(t){return e.inputRef=t},id:n,type:"file",disabled:r||i,onChange:this.onChange,defaultValue:"",autoFocus:a,multiple:o,style:{color:"transparent"}})),f(l,{filesInfo:s}))}}]),t}(d.Component),b=function(){var e=this;this.componentWillMount=function(){e.setValueFromProps(e.props)},this.componentWillReceiveProps=function(t){e.setValueFromProps(t)},this.setValueFromProps=function(t){var o=t.value,n=Array.isArray(o)?o:[o];e.setState({values:n,filesInfo:c(n)})},this.onChange=function(t){var o=e.props,n=o.multiple,r=o.onChange;u(t.target.files).then(function(t){var o={values:t.map(function(e){return JSON.stringify(e)}),filesInfo:t};e.setState(o,function(){r(n?o.values:o.values[0])})})}};t["default"]=y},114:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&i)for(var s in i)void 0===o[s]&&(o[s]=i[s]);else o||(o=i||{});if(1===a)o.children=r;else if(a>1){for(var u=Array(a),l=0;l<a;l++)u[l]=arguments[l+3];o.children=u}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),u=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),l=o(1),c=n(l),f=o(109),p=n(f),d=o(108),h=n(d),v=o(5),m=n(v),y=function(e){function t(){var e,o,n,a;r(this,t);for(var s=arguments.length,u=Array(s),l=0;l<s;l++)u[l]=arguments[l];return o=n=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),n.handleMouseDown=function(e){e.preventDefault(),e.stopPropagation(),n.props.onSelect(n.props.option,e)},n.handleMouseEnter=function(e){n.props.onFocus(n.props.option,e)},n.handleMouseMove=function(e){n.props.isFocused||n.props.onFocus(n.props.option,e)},a=o,i(n,a)}return a(t,e),u(t,[{key:"render",value:function(){return s("div",{className:this.props.className,onMouseDown:this.handleMouseDown,onMouseEnter:this.handleMouseEnter,onMouseMove:this.handleMouseMove},void 0,s("div",{},void 0,this.props.option.name+" "+this.props.option.surname+" ",s("i",{},void 0,"(",this.props.option.birthdate,")")))}}]),t}(l.Component),b=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){return s("div",{className:"Select-value"},void 0,s("span",{className:"Select-value-label"},void 0,this.props.value.name+" "+this.props.value.surname+" ",s("b",{},void 0,"(",this.props.value.cuid,")")))}}]),t}(l.Component),_=function(e){function t(e){r(this,t);var o=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return g.call(o),o.state={},o}return a(t,e),u(t,[{key:"render",value:function(){return c["default"].createElement("div",{ref:"container"},s(p["default"].AsyncCreatable,{value:this.state.value,onChange:this.onChange,valueKey:"cuid",loadOptions:this.getResearchers,optionComponent:y,valueComponent:b,filterOption:function(e,t){return!0}}))}}]),t}(l.Component),g=function(){var e=this;this.componentWillMount=function(){e.setValueFromProps(e.props)},this.componentWillReceiveProps=function(t){e.setValueFromProps(t)},this.setValueFromProps=function(t){var o=t.value;(0,m["default"])("researchers/"+o).then(function(t){var n=t.researcher;n||(n={cuid:o}),e.refs.container&&e.setState({value:n})})},this.getResearchers=function(e){return e?(0,h["default"])("researchers",e).then(function(e){return{options:e.researchers}}):Promise.resolve({options:[]})},this.onChange=function(t){e.props.onChange(t.cuid)}};t["default"]=_},115:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&i)for(var s in i)void 0===o[s]&&(o[s]=i[s]);else o||(o=i||{});if(1===a)o.children=r;else if(a>1){for(var u=Array(a),l=0;l<a;l++)u[l]=arguments[l+3];o.children=u}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),u=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),l=o(1),c=n(l),f=o(109),p=n(f),d=o(108),h=n(d),v=o(5),m=n(v),y=s("br",{}),b=function(e){function t(){var e,o,n,a;r(this,t);for(var s=arguments.length,u=Array(s),l=0;l<s;l++)u[l]=arguments[l];return o=n=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),n.handleMouseDown=function(e){e.preventDefault(),e.stopPropagation(),n.props.onSelect(n.props.option,e)},n.handleMouseEnter=function(e){n.props.onFocus(n.props.option,e)},n.handleMouseMove=function(e){n.props.isFocused||n.props.onFocus(n.props.option,e)},a=o,i(n,a)}return a(t,e),u(t,[{key:"render",value:function(){return s("div",{className:this.props.className,onMouseDown:this.handleMouseDown,onMouseEnter:this.handleMouseEnter,onMouseMove:this.handleMouseMove},void 0,s("div",{},void 0,this.props.option.company+" "+this.props.option.name+" "+this.props.option.version+" ",y,s("i",{},void 0,"(",this.props.option.download_uri,")")))}}]),t}(l.Component),_=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){return s("div",{className:"Select-value"},void 0,s("span",{className:"Select-value-label"},void 0,this.props.value.company+" "+this.props.value.name+" "+this.props.value.version+" ",s("b",{},void 0,"(",this.props.value.cuid,")")))}}]),t}(l.Component),g=function(e){function t(e){r(this,t);var o=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return O.call(o),o.state={},o}return a(t,e),u(t,[{key:"render",value:function(){return c["default"].createElement("div",{ref:"container"},s(p["default"].AsyncCreatable,{value:this.state.value,onChange:this.onChange,valueKey:"cuid",loadOptions:this.getSWTools,optionComponent:b,valueComponent:_,filterOption:function(e,t){return!0}}))}}]),t}(l.Component),O=function(){var e=this;this.componentWillMount=function(){e.setValueFromProps(e.props)},this.componentWillReceiveProps=function(t){e.setValueFromProps(t)},this.setValueFromProps=function(t){var o=t.value;(0,m["default"])("sw-tools/"+o).then(function(t){var n=t.SWTool;n||(n={cuid:o}),e.refs.container&&e.setState({value:n})})},this.getSWTools=function(e){return e?(0,h["default"])("sw-tools",e).then(function(e){return{options:e.SWTools}}):Promise.resolve({options:[]})},this.onChange=function(t){e.props.onChange(t.cuid)}};t["default"]=g},116:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&i)for(var s in i)void 0===o[s]&&(o[s]=i[s]);else o||(o=i||{});if(1===a)o.children=r;else if(a>1){for(var u=Array(a),l=0;l<a;l++)u[l]=arguments[l+3];o.children=u}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),u=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),l=o(1),c=n(l),f=o(109),p=n(f),d=o(108),h=n(d),v=o(5),m=n(v),y=function(e){function t(){var e,o,n,a;r(this,t);for(var s=arguments.length,u=Array(s),l=0;l<s;l++)u[l]=arguments[l];return o=n=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),n.handleMouseDown=function(e){e.preventDefault(),e.stopPropagation(),n.props.onSelect(n.props.option,e)},n.handleMouseEnter=function(e){n.props.onFocus(n.props.option,e)},n.handleMouseMove=function(e){n.props.isFocused||n.props.onFocus(n.props.option,e)},a=o,i(n,a)}return a(t,e),u(t,[{key:"render",value:function(){return s("div",{className:this.props.className,onMouseDown:this.handleMouseDown,onMouseEnter:this.handleMouseEnter,onMouseMove:this.handleMouseMove},void 0,s("div",{},void 0,this.props.option.name+" "+this.props.option.surname+" ",s("i",{},void 0,"(",this.props.option.birthdate,")")))}}]),t}(l.Component),b=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){return s("div",{className:"Select-value"},void 0,s("span",{className:"Select-value-label"},void 0,this.props.value.name+" "+this.props.value.surname+" ",s("b",{},void 0,"(",this.props.value.cuid,")")))}}]),t}(l.Component),_=function(e){function t(e){r(this,t);var o=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return g.call(o),o.state={},o}return a(t,e),u(t,[{key:"render",value:function(){return c["default"].createElement("div",{ref:"container"},s(p["default"].AsyncCreatable,{value:this.state.value,onChange:this.onChange,valueKey:"cuid",loadOptions:this.getSubjects,optionComponent:y,valueComponent:b,filterOption:function(e,t){return!0}}))}}]),t}(l.Component),g=function(){var e=this;this.componentWillMount=function(){e.setValueFromProps(e.props)},this.componentWillReceiveProps=function(t){e.setValueFromProps(t)},this.setValueFromProps=function(t){var o=t.value;(0,m["default"])("subjects/"+o).then(function(t){var n=t.subject;n||(n={cuid:o}),e.refs.container&&e.setState({value:n})})},this.getSubjects=function(e){return e?(0,h["default"])("subjects",e).then(function(e){return{options:e.subjects}}):Promise.resolve({options:[]})},this.onChange=function(t){e.props.onChange(t.cuid)}};t["default"]=_},117:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.FormEditWidget=void 0;var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&i)for(var s in i)void 0===o[s]&&(o[s]=i[s]);else o||(o=i||{});if(1===a)o.children=r;else if(a>1){for(var u=Array(a),l=0;l<a;l++)u[l]=arguments[l+3];o.children=u}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},l=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),c=o(1),f=n(c),p=o(6),d=o(111),h=n(d),v={"input-form":"_1hQBT9QdJlqQkPUz55fNJ0","input-form-content":"_3ZIbKsbrPGzmo6w9urTDC_","input-form-title":"_2FZExmfhMecg0D6EW1_U-B","input-form-field":"UH7-nOFc8ZWMenw5lRyJH","form-submit-button":"_12TOKHEQtbFm61Ys52v-qV","form-submit-button-disabled":"_2vn8scRXB7uca5cjbvbRo4",appear:"bTKCaoR9QrRy6nJk-knEs"},m=n(v),y=s(p.FormattedMessage,{id:"editForm"}),b=s(p.FormattedMessage,{id:"save"}),_=s(p.FormattedMessage,{id:"formPreview"}),g=t.FormEditWidget=function(e){function t(e){r(this,t);var o=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.componentWillMount=function(){
o.setState(o._parse(o.state))},o.saveForm=function(){if(o.state.valid){var e=Object.assign({},o.props.initialForm,{title:o.state.title,json_schema:o.state._JSONSchema,ui_schema:o.state._UISchema,init_data:o.state._initData});o.props.saveForm(e)}},o.setTitle=function(e){var t=e.target.value;o.setState({title:t})},o.setJSONSchema=function(e){var t=e.target.value,n=o._parse(u({},o.state,{JSONSchema:t}));o.setState(u({},n,{JSONSchema:t}))},o.setUISchema=function(e){var t=e.target.value,n=o._parse(u({},o.state,{UISchema:t}));o.setState(u({},n,{UISchema:t}))},o.setInitData=function(e){var t=e.target.value,n=o._parse(u({},o.state,{initData:t}));o.setState(u({},n,{initData:t}))},o.onChange=function(e){var t=e.formData,n=JSON.stringify(t,null,2),r=o._parse(u({},o.state,{initData:n}));o.setState(u({},r,{initData:n}))},o.onSubmit=function(e){var t=e.formData;console.log(t)},o.onFormPropsChange=function(e){var t=e.valid;o.setState({valid:t})},o._parse=function(e){var t=e.JSONSchema,o=e.UISchema,n=e.initData;try{var r=JSON.parse(t),i=JSON.parse(o),a=JSON.parse(n)}catch(s){var r=void 0,i=void 0,a=void 0}return{_JSONSchema:r,_UISchema:i,_initData:a}},o.state={title:e.initialForm.title,JSONSchema:JSON.stringify(e.initialForm.json_schema,null,2),UISchema:JSON.stringify(e.initialForm.ui_schema,null,2),initData:JSON.stringify(e.initialForm.init_data,null,2),valid:!1},o}return a(t,e),l(t,[{key:"render",value:function(){var e=m["default"]["input-form"]+" "+(this.props.showEditForm?m["default"].appear:"");return s("div",{className:e},void 0,s("div",{className:m["default"]["input-form-content"]},void 0,s("h2",{className:m["default"]["input-form-title"]},void 0,y),f["default"].createElement("input",{placeholder:this.props.intl.messages.formTitle,className:m["default"]["input-form-field"],onChange:this.setTitle,value:this.state.title,ref:"title"}),f["default"].createElement("textarea",{placeholder:this.props.intl.messages.formJSONSchema,className:m["default"]["input-form-field"],ref:"JSONSchema",value:this.state.JSONSchema,onChange:this.setJSONSchema}),f["default"].createElement("textarea",{placeholder:this.props.intl.messages.formUISchema,className:m["default"]["input-form-field"],ref:"UISchema",value:this.state.UISchema,onChange:this.setUISchema}),f["default"].createElement("textarea",{placeholder:this.props.intl.messages.formInitData,className:m["default"]["input-form-field"],ref:"InitData",value:this.state.initData,onChange:this.setInitData}),s("a",{className:this.state.valid?m["default"]["form-submit-button"]:m["default"]["form-submit-button-disabled"],href:"#",onClick:this.saveForm},void 0,b)),s("div",{},void 0,s("h2",{className:m["default"]["input-form-title"]},void 0,_),f["default"].createElement(h["default"],{className:m["default"]["input-form-field"],ref:"ciao",schema:this.state._JSONSchema,uiSchema:this.state._UISchema,formData:this.state._initData,onSubmit:this.onSubmit,onChange:this.onChange,onFormPropsChange:this.onFormPropsChange})))}}]),t}(c.Component);g.defaultProps={initialForm:{title:"",json_schema:{},ui_schema:{},init_data:{}}},t["default"]=(0,p.injectIntl)(g)},120:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&i)for(var s in i)void 0===o[s]&&(o[s]=i[s]);else o||(o=i||{});if(1===a)o.children=r;else if(a>1){for(var u=Array(a),l=0;l<a;l++)u[l]=arguments[l+3];o.children=u}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),u=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),l=o(1),c=(n(l),o(121)),f=n(c),p=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){var e=this;return s("div",{className:"listView"},void 0,this.props.forms.map(function(t){return s(f["default"],{form:t,onDelete:function(){return e.props.handleDeleteForm(t.cuid)},onUpdate:e.props.handleUpdateForm},t.cuid)}))}}]),t}(l.Component);t["default"]=p},121:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&i)for(var s in i)void 0===o[s]&&(o[s]=i[s]);else o||(o=i||{});if(1===a)o.children=r;else if(a>1){for(var u=Array(a),l=0;l<a;l++)u[l]=arguments[l+3];o.children=u}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),u=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),l=o(1),c=(n(l),o(8)),f=o(6),p=o(117),d=n(p),h={"single-form":"_4IVkjbuHRDz7oZrva7hLo","form-title":"_3VnmjLrSTAgu0tbdMZoacN","author-name":"_1cNPfGQNRCha6l5dInqnVS","form-desc":"_aUxib4kQGpIdxhqFQZaU","form-action":"_1hJnnZBUAO8LftNEbzN2wZ",divider:"_2eStSMGYswW2w7EmRibls0","form-detail":"_1flNws2Fw_nAFFJfQxE8zX"},v=n(h),m=s(f.FormattedMessage,{id:"deleteForm"}),y=s(f.FormattedMessage,{id:"editForm"}),b=function(e){function t(e){r(this,t);var o=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.showEdit=function(){o.setState({isEditShown:!o.state.isEditShown})},o.state={isEditShown:!1},o}return a(t,e),u(t,[{key:"render",value:function(){return s("div",{className:v["default"]["single-form"]},void 0,s("h3",{className:v["default"]["form-title"]},void 0,s(c.Link,{to:"/forms/"+this.props.form.slug+"-"+this.props.form.cuid},void 0,this.props.form.title)),s("p",{className:v["default"]["form-action"]},void 0,s("a",{href:"#",onClick:this.props.onDelete},void 0,m)),s("p",{className:v["default"]["form-action"]},void 0,s("a",{href:"#",onClick:this.showEdit},void 0,y)),s(d["default"],{saveForm:this.props.onUpdate,showEditForm:this.state.isEditShown,initialForm:this.props.form}),s("hr",{className:v["default"].divider}))}}]),t}(l.Component);t["default"]=b}};