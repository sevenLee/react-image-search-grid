import PropTypes from "prop-types";
import React, { Component } from "react";
import CheckButton from "./CheckButton.js";

class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    };
  }

  tagStyle() {
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

  tileViewportStyle() {
    if (this.props.tileViewportStyle)
      return this.props.tileViewportStyle.call(this);
    var nanoBase64Backgorund = {};
    if (this.props.item.nano) {
      nanoBase64Backgorund = {
        background: `url(${this.props.item.nano})`,
        backgroundSize: "cover",
        backgroundPosition: "center center"
      };
    }
    if (this.props.item.isSelected)
      return Object.assign(
        {
          width: this.props.item.vwidth - 32,
          height: this.props.height - 32,
          margin: 16,
          overflow: "hidden"
        },
        nanoBase64Backgorund
      );
    return Object.assign(
      {
        width: this.props.item.vwidth,
        height: this.props.height,
        overflow: "hidden"
      },
      nanoBase64Backgorund
    );
  }

  thumbnailStyle() {
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

  renderCheckButton() {
    return (
      <CheckButton
        key="Select"
        index={this.props.index}
        color={"rgba(255, 255, 255, 0.7)"}
        selectedColor={"#4285f4"}
        hoverColor={"rgba(255, 255, 255, 1)"}
        isSelected={this.props.item.isSelected}
        isSelectable={this.props.isSelectable}
        onClick={this.props.isSelectable ? this.props.onSelectImage : null}
        parentHover={this.state.hover}
      />
    );
  }

  render() {
    var alt = this.props.item.alt ? this.props.item.alt : "";
    const resultItemId = this.props.item.resultItemId;
    var tags =
      typeof this.props.item.tags === "undefined" ? (
        <noscript />
      ) : (
        this.props.item.tags.map(tag => {
          const key =
            tag.key ||
            (typeof tag.value === "string" ? tag.value : null) ||
            tag.title;
          return (
            <div
              title={tag.title}
              key={"tag-" + key}
              style={{
                display: "inline-block",
                cursor: "pointer",
                pointerEvents: "visible",
                margin: "2px"
              }}
            >
              <span style={this.tagStyle()}>{tag.value}</span>
            </div>
          );
        })
      );

    var customOverlay =
      typeof this.props.item.customOverlay === "undefined" ? (
        <noscript />
      ) : (
        <div
          className="ReactGridGallery_custom-overlay"
          key={"custom-overlay-" + this.props.index}
          style={{
            pointerEvents: "none",
            opacity: this.state.hover ? 1 : 0,
            position: "absolute",
            height: "100%",
            width: "100%"
          }}
        >
          {this.props.item.customOverlay}
        </div>
      );

    var thumbnailProps = {
      key: "img-" + this.props.index,
      src: this.props.item.thumbnail,
      alt: alt,
      title:
        typeof this.props.item.caption === "string"
          ? this.props.item.caption
          : null,
      style: this.thumbnailStyle()
    };

    var ThumbnailImageComponent = this.props.thumbnailImageComponent;

    // console.log("### this.state.hover:", this.state.hover);

    const getZoomDisplayStatus = () => {
      if (this.state.hover && this.props.enableLightbox) {
        // if (this.props.enableLightbox) {
        return "inline-block";
      } else {
        return "none";
      }
    };

    return (
      <div
        className="ReactGridGallery_tile"
        key={"tile-" + this.props.index}
        onMouseEnter={e => this.setState({ hover: true })}
        onMouseLeave={e => this.setState({ hover: false })}
        style={{
          margin: this.props.margin,
          WebkitUserSelect: "none",
          position: "relative",
          float: "left",
          background: "#eee",
          padding: "0px"
        }}
      >
        <div
          className="ReactGridGallery_tile-icon-bar"
          key={"tile-icon-bar-" + this.props.index}
          style={{
            pointerEvents: "none",
            opacity: 1,
            position: "absolute",
            height: "36px",
            width: "100%"
          }}
        >
          {this.renderCheckButton()}
        </div>
        <div
          onClick={() => this.props.onClickMoreDetail(resultItemId)}
          style={{
            pointerEvents: "none",
            position: "absolute",
            left: 0,
            bottom: "0px",
            overflow: "hidden",
            display: this.state.hover ? "inline-block" : "none",
            // display: "inline-block",
            cursor: "pointer",
            pointerEvents: "visible",
            margin: "6px",
            padding: ".4em .6em .4em",
            lineHeight: "1",
            cursor: "pointer",
            // fontSize: "75%",
            color: "#096dd9",
            backgroundColor: "#fff"
          }}
        >
          <span>More Info</span>
        </div>

        <div
          onClick={() => this.props.onClickDownload(resultItemId)}
          style={{
            pointerEvents: "none",
            position: "absolute",
            right: 30,
            bottom: "0px",
            height: 24,
            width: 24,
            overflow: "hidden",
            display: this.state.hover ? "inline-block" : "none",
            // display: "inline-block",
            cursor: "pointer",
            pointerEvents: "visible",
            margin: "6px",
            padding: "3px",
            lineHeight: "1",
            cursor: "pointer",
            // fontSize: "75%",
            color: "#096dd9",
            backgroundColor: "#fff"
          }}
        >
          <svg viewBox="0 0 19.3 19">
            <path
              fill="currentColor"
              d="M16 6.3c-.6 0-1 .4-1 1s.4 1 1 1h1.3V17H2V8.3h1.3c.6 0 1-.4 1-1s-.4-1-1-1H0V19h19.3V6.3H16z"
            ></path>
            <path
              fill="currentColor"
              d="M9.7 15.5l4.4-5.2c.4-.4.3-1.1-.1-1.4-.4-.4-1.1-.3-1.4.1l-1.9 2.2V1c0-.6-.4-1-1-1s-1 .4-1 1v10.3L6.8 9c-.4-.4-1-.5-1.4-.1-.4.4-.5 1-.1 1.4l4.4 5.2z"
            ></path>
          </svg>
        </div>

        <div
          onClick={
            this.props.onClickZoom
              ? e => this.props.onClickZoom.call(this, this.props.index, e)
              : null
          }
          style={{
            pointerEvents: "none",
            position: "absolute",
            right: 0,
            bottom: "0px",
            overflow: "hidden",
            display: getZoomDisplayStatus(),
            cursor: "pointer",
            pointerEvents: "visible",
            margin: "6px",
            padding: ".12em .2em .12em",
            lineHeight: "1",
            cursor: "pointer",
            // fontSize: "75%",
            color: "#096dd9",
            backgroundColor: "#fff"
          }}
        >
          {/* <span>zoom</span> */}
          <svg
            role="presentation"
            viewBox="0 0 24 24"
            style={{
              display: "inline-block",
              fill: "currentColor",
              height: 20,
              stroke: "currentColor",
              strokeWidth: 0,
              width: 20
            }}
          >
            <path d="M14.016 5.016h4.969v4.969h-1.969v-3h-3v-1.969zM17.016 17.016v-3h1.969v4.969h-4.969v-1.969h3zM5.016 9.984v-4.969h4.969v1.969h-3v3h-1.969zM6.984 14.016v3h3v1.969h-4.969v-4.969h1.969z" />
          </svg>
        </div>

        <div
          className="ReactGridGallery_tile-bottom-bar"
          key={"tile-bottom-bar-" + this.props.index}
          style={{
            padding: "2px",
            pointerEvents: "none",
            position: "absolute",
            minHeight: "0px",
            maxHeight: "160px",
            width: "100%",
            bottom: "0px",
            overflow: "hidden"
          }}
        >
          {tags}
        </div>

        {customOverlay}

        <div
          className="ReactGridGallery_tile-overlay"
          key={"tile-overlay-" + this.props.index}
          style={{
            pointerEvents: "none",
            opacity: 1,
            position: "absolute",
            height: "100%",
            width: "100%",
            background:
              this.state.hover &&
              !this.props.item.isSelected &&
              this.props.isSelectable
                ? "linear-gradient(to bottom,rgba(0,0,0,0.26),transparent 56px,transparent)"
                : "none"
          }}
        ></div>

        <div
          className="ReactGridGallery_tile-viewport"
          style={this.tileViewportStyle()}
          key={"tile-viewport-" + this.props.index}
          onClick={
            this.props.onClick
              ? e => this.props.onClick.call(this, this.props.index, e)
              : null
          }
        >
          {ThumbnailImageComponent ? (
            <ThumbnailImageComponent
              {...this.props}
              imageProps={thumbnailProps}
            />
          ) : (
            <img {...thumbnailProps} />
          )}
        </div>
        {this.props.item.thumbnailCaption && (
          <div
            className="ReactGridGallery_tile-description"
            style={{
              background: "white",
              height: "100%",
              width: "100%",
              margin: 0,
              userSelect: "text",
              WebkitUserSelect: "text",
              MozUserSelect: "text",
              overflow: "hidden"
            }}
          >
            {this.props.item.thumbnailCaption}
          </div>
        )}
      </div>
    );
  }
}

Image.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  margin: PropTypes.number,
  height: PropTypes.number,
  isSelectable: PropTypes.bool,
  onClick: PropTypes.func,
  onSelectImage: PropTypes.func,
  tileViewportStyle: PropTypes.func,
  thumbnailStyle: PropTypes.func,
  tagStyle: PropTypes.object,
  customOverlay: PropTypes.element,
  thumbnailImageComponent: PropTypes.func
};

Image.defaultProps = {
  isSelectable: true,
  hover: false
};

export default Image;
