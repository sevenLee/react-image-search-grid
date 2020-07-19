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

require("./main.css");

var styles = {};

console.log("### styles.myTitle:", styles.myTitle);

var MoreBtn = function (_PureComponent) {
  _inherits(MoreBtn, _PureComponent);

  function MoreBtn(props) {
    _classCallCheck(this, MoreBtn);

    return _possibleConstructorReturn(this, (MoreBtn.__proto__ || Object.getPrototypeOf(MoreBtn)).call(this, props));
  }

  _createClass(MoreBtn, [{
    key: "render",
    value: function render() {
      var _ref;

      var _props = this.props,
          moreInfoLabel = _props.moreInfoLabel,
          morePosition = _props.morePosition,
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
          }, _defineProperty(_ref, "pointerEvents", "visible"), _defineProperty(_ref, "margin", "6px"), _defineProperty(_ref, "padding", ".4em .2em"), _defineProperty(_ref, "lineHeight", "1"), _defineProperty(_ref, "cursor", "pointer"), _defineProperty(_ref, "color", "#096dd9"), _defineProperty(_ref, "backgroundColor", "#fff"), _defineProperty(_ref, "zIndex", 10), _ref)
        },
        _react2.default.createElement(
          "span",
          { className: styles.myTitle },
          moreInfoLabel === undefined ? "More Info" : moreInfoLabel
        )
      );
    }
  }]);

  return MoreBtn;
}(_react.PureComponent);

exports.default = MoreBtn;