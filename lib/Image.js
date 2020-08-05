"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _CheckButton = require("./CheckButton.js");

var _CheckButton2 = _interopRequireDefault(_CheckButton);

var _MoreBtn = require("./MoreBtn");

var _MoreBtn2 = _interopRequireDefault(_MoreBtn);

var _DownloadBtn = require("./DownloadBtn");

var _DownloadBtn2 = _interopRequireDefault(_DownloadBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Image = function (_Component) {
  _inherits(Image, _Component);

  function Image(props) {
    _classCallCheck(this, Image);

    var _this = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, props));

    _this.state = {
      hover: false,
      isFirstPlayVideo: false,
      playing: false
    };

    _this.videoRef = _react2.default.createRef();
    _this.handleMoreClick = _this.handleMoreClick.bind(_this);
    _this.handleDownloadlick = _this.handleDownloadlick.bind(_this);
    _this.handleOnPlay = _this.handleOnPlay.bind(_this);
    return _this;
  }

  _createClass(Image, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.isVideo && this.videoRef.current && nextProps.activedId !== this.props.index) {
        this.videoRef.current.pause();
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      // console.log("### shouldComponentUpdate nextProps:", nextProps);
      // if (nextProps.activedId && nextProps.activedId !== this.props.index) {
      //   return false;
      // } else {
      //   return true;
      // }

      return true;
    }
  }, {
    key: "handleOnPlay",
    value: function handleOnPlay(e) {
      var _this2 = this;

      if (this.props.onClick) {
        if (this.props.isVideo) {
          this.setState({ isFirstPlayVideo: true, playing: !this.state.playing }, function () {
            if (!_this2.videoRef.current.src) {
              console.debug("#### Loading video...");
              _this2.videoRef.current.src = _this2.props.item.src;
            }
          });
        }

        this.props.onClick(this.props.index, e, this.props.item);
      }
    }
  }, {
    key: "tagStyle",
    value: function tagStyle() {
      if (this.props.tagStyle) return this.props.tagStyle;
      return {
        display: "inline",
        padding: ".2em .6em .3em",
        fontSize: "75%",
        fontWeight: "600",
        lineHeight: "1",
        color: "yellow",
        background: "rgba(0,0,0,0.65)",
        textAlign: "center",
        whiteSpace: "nowrap",
        verticalAlign: "baseline",
        borderRadius: ".25em"
      };
    }
  }, {
    key: "tileViewportStyle",
    value: function tileViewportStyle() {
      if (this.props.tileViewportStyle) return this.props.tileViewportStyle.call(this);
      var nanoBase64Backgorund = {};
      if (this.props.item.nano) {
        nanoBase64Backgorund = {
          background: "url(" + this.props.item.nano + ")",
          backgroundSize: "cover",
          backgroundPosition: "center center"
        };
      }
      if (this.props.item.isSelected) return Object.assign({
        width: this.props.item.vwidth - 32,
        height: this.props.height - 32,
        margin: 16,
        overflow: "hidden"
      }, nanoBase64Backgorund);
      return Object.assign({
        width: this.props.item.vwidth,
        height: this.props.height,
        overflow: "hidden"
      }, nanoBase64Backgorund);
    }
  }, {
    key: "thumbnailStyle",
    value: function thumbnailStyle() {
      if (this.props.thumbnailStyle) return this.props.thumbnailStyle.call(this);

      var rotationTransformValue = undefined;
      switch (this.props.item.orientation) {
        case 3:
          rotationTransformValue = "rotate(180deg)";
          break;
        case 6:
          rotationTransformValue = "rotate(90deg)";
          break;
        case 8:
          rotationTransformValue = "rotate(270deg)";
          break;
        case 2:
          rotationTransformValue = "rotateY(180deg)";
          break;
        case 4:
          rotationTransformValue = "rotate(180deg) rotateY(180deg)";
          break;
        case 5:
          rotationTransformValue = "rotate(270deg) rotateY(180deg)";
          break;
        case 7:
          rotationTransformValue = "rotate(90deg) rotateY(180deg)";
          break;
      }
      if (this.props.item.isSelected) {
        var ratio = this.props.item.scaletwidth / this.props.height;
        var height = 0;
        var width = 0;
        var viewportHeight = this.props.height - 32;
        var viewportWidth = this.props.item.vwidth - 32;

        if (this.props.item.scaletwidth > this.props.height) {
          width = this.props.item.scaletwidth - 32;
          height = Math.floor(width / ratio);
        } else {
          height = this.props.height - 32;
          width = Math.floor(height * ratio);
        }

        var marginTop = -Math.abs(Math.floor((viewportHeight - height) / 2));
        var marginLeft = -Math.abs(Math.floor((viewportWidth - width) / 2));
        return {
          // cursor: "pointer",
          width: width,
          height: height,
          marginLeft: marginLeft,
          marginTop: marginTop,
          transform: rotationTransformValue
        };
      }
      return {
        cursor: "pointer",
        width: this.props.item.scaletwidth,
        height: this.props.height,
        marginLeft: this.props.item.marginLeft,
        marginTop: 0,
        transform: rotationTransformValue
      };
    }
  }, {
    key: "renderCheckButton",
    value: function renderCheckButton() {
      return _react2.default.createElement(_CheckButton2.default, {
        key: "Select",
        index: this.props.index,
        color: "rgba(255, 255, 255, 0.7)",
        selectedColor: "#4285f4",
        hoverColor: "rgba(255, 255, 255, 1)",
        isSelected: this.props.item.isSelected,
        isSelectable: this.props.isSelectable,
        onClick: this.props.isSelectable ? this.props.onSelectImage : null,
        parentHover: this.state.hover
      });
    }
  }, {
    key: "handleMoreClick",
    value: function handleMoreClick() {
      this.props.onClickMoreDetail(this.props.item.resultItemId);
    }
  }, {
    key: "handleDownloadlick",
    value: function handleDownloadlick() {
      // this.props.onClickDownload(this.props.item.resultItemId);
      window.open(this.props.item.downloadUrl + "&download=true", "_blank");
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var alt = this.props.item.alt ? this.props.item.alt : "";
      var tags = typeof this.props.item.tags === "undefined" ? _react2.default.createElement("noscript", null) : this.props.item.tags.map(function (tag) {
        var key = tag.key || (typeof tag.value === "string" ? tag.value : null) || tag.title;
        return _react2.default.createElement(
          "div",
          {
            title: tag.title,
            key: "tag-" + key,
            style: {
              display: "inline-block",
              cursor: "pointer",
              pointerEvents: "visible",
              margin: "2px"
            }
          },
          _react2.default.createElement(
            "span",
            { style: _this3.tagStyle() },
            tag.value
          )
        );
      });

      var customOverlay = typeof this.props.item.customOverlay === "undefined" ? _react2.default.createElement("noscript", null) : _react2.default.createElement(
        "div",
        {
          className: "ReactGridGallery_custom-overlay",
          key: "custom-overlay-" + this.props.index,
          style: {
            pointerEvents: "none",
            opacity: this.state.hover ? 1 : 0,
            position: "absolute",
            height: "100%",
            width: "100%"
          }
        },
        this.props.item.customOverlay
      );

      var thumbnailProps = {
        key: "img-" + this.props.index,
        src: this.props.item.thumbnail,
        alt: alt,
        title: typeof this.props.item.caption === "string" ? this.props.item.caption : null,
        style: this.thumbnailStyle()
      };

      var videoProps = {
        key: "video-" + this.props.index,
        autoPlay: true,
        controls: true,
        style: this.thumbnailStyle(),
        onClick: function onClick() {
          // console.log(
          //   "### video Click , this.state.playing:",
          //   this.state.playing
          // );
          // this.setState({ playing: !this.state.playing }, (newState) => {
          //   console.log('### newState:', newState)
          //   console.log('### newState this.state:', this.state)
          // });
        },
        onPlay: function onPlay(e) {
          // console.log("### video onPlay!");
          _this3.handleOnPlay(e);
        },
        onPause: function onPause() {
          // console.log("### video onPause index:", this.props.index);
          _this3.setState({ playing: false }, function () {
            // console.log("### onPause after set, this.state:", this.state);
          });
        },
        onError: function onError(e) {
          console.log("Error video onError:", e);
        },
        preload: "none"
        // poster: this.props.item.thumbnail,
      };

      var ThumbnailImageComponent = this.props.thumbnailImageComponent;

      // console.log("### this.state.hover:", this.state.hover);

      var getZoomDisplayStatus = function getZoomDisplayStatus() {
        if (_this3.state.hover && _this3.props.enableLightbox) {
          // if (this.props.enableLightbox) {
          return "inline-block";
        } else {
          return "none";
        }
      };

      var makeMediaElement = function makeMediaElement() {
        if (_this3.state.isFirstPlayVideo && _this3.props.isVideo) {
          return _react2.default.createElement("video", _extends({}, videoProps, {
            ref: _this3.videoRef,
            style: {
              // display:
              //   this.state.isFirstPlayVideo && this.props.isVideo
              //     ? "block"
              //     : "none",
              cursor: "pointer",
              width: _this3.props.item.vwidth,
              height: _this3.props.height
              // transform: rotationTransformValue,
            }
          }));
        } else {
          if (ThumbnailImageComponent) {
            return _react2.default.createElement(ThumbnailImageComponent, _extends({}, _this3.props, {
              imageProps: thumbnailProps
            }));
          } else {
            return _react2.default.createElement("img", thumbnailProps);
          }
        }
      };

      return _react2.default.createElement(
        "div",
        {
          className: "ReactGridGallery_tile"
          // className={classNames({
          //   "media-thumb": true,
          //   video: this.props.isVideo && this.state.isFirstPlayVideo
          // })}
          , key: "tile-" + this.props.index,
          onMouseEnter: function onMouseEnter(e) {
            return _this3.setState({ hover: true });
          },
          onMouseLeave: function onMouseLeave(e) {
            return _this3.setState({ hover: false });
          },
          style: {
            margin: this.props.margin,
            WebkitUserSelect: "none",
            position: "relative",
            float: "left",
            background: "#eee",
            padding: "0px"
          }
        },
        _react2.default.createElement(
          "div",
          {
            className: "ReactGridGallery_tile-icon-bar",
            key: "tile-icon-bar-" + this.props.index,
            style: {
              pointerEvents: "none",
              opacity: 1,
              position: "absolute",
              height: "36px",
              width: "100%"
            }
          },
          this.renderCheckButton()
        ),
        _react2.default.createElement(
          "div",
          {
            style: {
              top: this.props.morePosition === "top" ? !this.state.isFirstPlayVideo ? 0 : 8 : "auto",
              bottom: this.props.morePosition === "top" ? "auto" : 0,
              overflow: "hidden",
              display: "flex",
              position: "absolute",
              flexWrap: "wrap",
              alignItems: "flex-start"
            }
          },
          _react2.default.createElement(_MoreBtn2.default, {
            resultItemId: this.props.resultItemId,
            onClick: this.handleMoreClick,
            moreInfoLabel: this.props.moreInfoLabel,
            isHover: this.state.hover,
            isFirstPlayVideo: this.state.isFirstPlayVideo,
            playing: this.state.playing
          }),
          this.props.showDownloadIcon && _react2.default.createElement(_DownloadBtn2.default, {
            resultItemId: this.props.resultItemId,
            onClick: this.handleDownloadlick,
            isHover: this.state.hover,
            isFirstPlayVideo: this.state.isFirstPlayVideo,
            playing: this.state.playing
          })
        ),
        _react2.default.createElement(
          "div",
          {
            className: "ReactGridGallery_tile-bottom-bar",
            key: "tile-bottom-bar-" + this.props.index,
            style: {
              padding: "2px",
              pointerEvents: "none",
              position: "absolute",
              minHeight: "0px",
              maxHeight: "160px",
              width: "100%",
              bottom: "0px",
              overflow: "hidden"
            }
          },
          tags
        ),
        customOverlay,
        _react2.default.createElement("div", {
          className: "ReactGridGallery_tile-overlay",
          key: "tile-overlay-" + this.props.index,
          style: {
            pointerEvents: "none",
            opacity: 1,
            position: "absolute",
            height: "100%",
            width: "100%",
            background: this.state.hover && !this.props.item.isSelected && this.props.isSelectable ? "linear-gradient(to bottom,rgba(0,0,0,0.26),transparent 56px,transparent)" : "none"
          }
        }),
        _react2.default.createElement(
          "div",
          {
            // className="ReactGridGallery_tile-viewport"
            className: (0, _classnames2.default)({
              "media-thumb": true,
              video: this.props.isVideo && !this.state.isFirstPlayVideo
            }),
            style: this.tileViewportStyle(),
            key: "tile-viewport-" + this.props.index,
            onClick: this.handleOnPlay
          },
          makeMediaElement()
        ),
        this.props.item.thumbnailCaption && _react2.default.createElement(
          "div",
          {
            className: "ReactGridGallery_tile-description",
            style: {
              background: "white",
              height: "100%",
              width: "100%",
              margin: 0,
              userSelect: "text",
              WebkitUserSelect: "text",
              MozUserSelect: "text",
              overflow: "hidden"
            }
          },
          this.props.item.thumbnailCaption
        )
      );
    }
  }]);

  return Image;
}(_react.Component);

Image.propTypes = {
  item: _propTypes2.default.object,
  index: _propTypes2.default.number,
  margin: _propTypes2.default.number,
  height: _propTypes2.default.number,
  isSelectable: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  onSelectImage: _propTypes2.default.func,
  tileViewportStyle: _propTypes2.default.func,
  thumbnailStyle: _propTypes2.default.func,
  tagStyle: _propTypes2.default.object,
  customOverlay: _propTypes2.default.element,
  thumbnailImageComponent: _propTypes2.default.func
};

Image.defaultProps = {
  isSelectable: true,
  hover: false
};

exports.default = Image;