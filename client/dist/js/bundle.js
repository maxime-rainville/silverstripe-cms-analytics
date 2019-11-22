/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/bundle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/bundle.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gtag = __webpack_require__("./client/src/gtag.js");

var _gtag2 = _interopRequireDefault(_gtag);

var _jquery = __webpack_require__(1);

var _jquery2 = _interopRequireDefault(_jquery);

var _TrackingConsentModal = __webpack_require__("./client/src/containers/TrackingConsentModal/TrackingConsentModal.js");

var _TrackingConsentModal2 = _interopRequireDefault(_TrackingConsentModal);

var _reactDom = __webpack_require__(0);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Config = __webpack_require__(6);

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readConsent = function readConsent() {
  var data = localStorage.getItem('ss-tracking-consent');
  return data ? JSON.parse(data) : null;
};

var writeConsent = function writeConsent() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { hasConsent: hasConsent, version: version };

  localStorage.setItem('ss-tracking-consent', JSON.stringify(data));
};

var hasConsent = function hasConsent(currentVersion) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { hasConsent: hasConsent, version: version };

  return version == currentVersion && hasConsent;
};

_jquery2.default.entwine('ss', function ($) {
  $('.js-react-boot').entwine({
    onmatch: function onmatch() {
      var consentData = readConsent();
      var container = document.createElement('div');
      var config = _Config2.default.getSection('SilverStripe\\Admin\\LeftAndMain').cmsAnalytics;
      container.setAttribute('class', 'tracking-consent-modal-container');
      if (!consentData || !hasConsent(config.version, consentData)) {
        _reactDom2.default.render(React.createElement(_TrackingConsentModal2.default, {
          content: config.content,
          onGrant: function onGrant() {
            writeConsent({ hasConsent: true, version: config.version });
          },
          onDeny: function onDeny() {
            writeConsent({ hasConsent: false, version: config.version });
          }
        }), document.body.appendChild(container));
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {});

/***/ }),

/***/ "./client/src/containers/TrackingConsentModal/TrackingConsentModal.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _i18n = __webpack_require__(5);

var _i18n2 = _interopRequireDefault(_i18n);

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactstrap = __webpack_require__(4);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TrackingConsentModal = function (_React$Component) {
  _inherits(TrackingConsentModal, _React$Component);

  function TrackingConsentModal(props) {
    _classCallCheck(this, TrackingConsentModal);

    var _this = _possibleConstructorReturn(this, (TrackingConsentModal.__proto__ || Object.getPrototypeOf(TrackingConsentModal)).call(this, props));

    _this.state = {
      modal: true
    };

    _this.toggle = _this.toggle.bind(_this);
    return _this;
  }

  _createClass(TrackingConsentModal, [{
    key: 'toggle',
    value: function toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _reactstrap.Modal,
        { isOpen: this.state.modal },
        _react2.default.createElement(
          _reactstrap.ModalHeader,
          null,
          _i18n2.default._t('TrackingConsentModal.ModalTitle', 'Help us improve Silverstripe')
        ),
        _react2.default.createElement(
          _reactstrap.ModalBody,
          null,
          _react2.default.createElement('div', { dangerouslySetInnerHTML: this.props.content })
        ),
        _react2.default.createElement(
          _reactstrap.ModalFooter,
          null,
          _react2.default.createElement(
            _reactstrap.Button,
            { key: 'ok', onClick: function onClick() {
                _this2.props.onGrant();
                _this2.toggle();
              } },
            _i18n2.default._t('TrackingConsentModal.OK', 'OK')
          )
        )
      );
    }
  }]);

  return TrackingConsentModal;
}(_react2.default.Component);

;

TrackingConsentModal.propTypes = {
  onGrant: _propTypes2.default.func,
  onDeny: _propTypes2.default.func,
  content: _propTypes2.default.string
};

exports.default = TrackingConsentModal;

/***/ }),

/***/ "./client/src/gtag.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
window.dataLayer = window.dataLayer || [];

var gtag = function gtag() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  window.dataLayer.push(args);
};

exports.default = gtag;

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = ReactDom;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = PropTypes;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = Reactstrap;

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = i18n;

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = Config;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map