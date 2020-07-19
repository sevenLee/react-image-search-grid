"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DownloadBtn = function (_PureComponent) {
  _inherits(DownloadBtn, _PureComponent);

  function DownloadBtn(props) {
    _classCallCheck(this, DownloadBtn);

    return _possibleConstructorReturn(this, (DownloadBtn.__proto__ || Object.getPrototypeOf(DownloadBtn)).call(this, props));
  }

  _createClass(DownloadBtn, [{
    key: "render",
    value: function render() {
      var _ref;

      var _props = this.props,
          isHover = _props.isHover,
          isFirstPlayVideo = _props.isFirstPlayVideo,
          playing = _props.playing;


      return _react2.default.createElement(
        "div",
        {
          onClick: this.props.onClick,
          style: (_ref = {
            pointerEvents: "none",
            display: isHover && !isFirstPlayVideo || !playing && isFirstPlayVideo ? "inline-block" : "none",
            cursor: "pointer"
          }, _defineProperty(_ref, "pointerEvents", "visible"), _defineProperty(_ref, "margin", "6px"), _defineProperty(_ref, "lineHeight", "1"), _defineProperty(_ref, "cursor", "pointer"), _defineProperty(_ref, "color", "#096dd9"), _defineProperty(_ref, "backgroundColor", "#fff"), _defineProperty(_ref, "zIndex", 10), _defineProperty(_ref, "width", 24), _ref)
        },
        _react2.default.createElement(
          "svg",
          {
            viewBox: "0 0 19.3 19",
            style: {
              transform: "scale(0.6)"
            }
          },
          _react2.default.createElement("path", {
            fill: "currentColor",
            d: "M16 6.3c-.6 0-1 .4-1 1s.4 1 1 1h1.3V17H2V8.3h1.3c.6 0 1-.4 1-1s-.4-1-1-1H0V19h19.3V6.3H16z"
          }),
          _react2.default.createElement("path", {
            fill: "currentColor",
            d: "M9.7 15.5l4.4-5.2c.4-.4.3-1.1-.1-1.4-.4-.4-1.1-.3-1.4.1l-1.9 2.2V1c0-.6-.4-1-1-1s-1 .4-1 1v10.3L6.8 9c-.4-.4-1-.5-1.4-.1-.4.4-.5 1-.1 1.4l4.4 5.2z"
          })
        )
      );
    }
  }]);

  return DownloadBtn;
}(_react.PureComponent);

exports.default = DownloadBtn;