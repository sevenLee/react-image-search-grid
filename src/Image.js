import PropTypes from "prop-types";
import React, { Component } from "react";
import classNames from "classnames";
import CheckButton from "./CheckButton.js";
import MoreBtn from "./MoreBtn";
import DownloadBtn from "./DownloadBtn";

class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      isFirstPlayVideo: false,
      playing: false,
    };

    this.videoRef = React.createRef();
    this.handleMoreClick = this.handleMoreClick.bind(this);
    this.handleDownloadlick = this.handleDownloadlick.bind(this);
    this.handleOnPlay = this.handleOnPlay.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isVideo &&
      this.videoRef.current &&
      nextProps.activedId !== this.props.index
    ) {
      this.videoRef.current.pause();
    }
  }

  shouldComponentUpdate(nextProps) {
    // console.log("### shouldComponentUpdate nextProps:", nextProps);
    // if (nextProps.activedId && nextProps.activedId !== this.props.index) {
    //   return false;
    // } else {
    //   return true;
    // }

    return true;
  }

  handleOnPlay(e) {
    if (this.props.onClick) {
      if (this.props.isVideo) {
        this.setState(
          { isFirstPlayVideo: true, playing: !this.state.playing },
          () => {
            if (!this.videoRef.current.src) {
              console.debug("#### Loading video...");
              this.videoRef.current.src = this.props.item.src;
            }
          }
        );
      }

      this.props.onClick(this.props.index, e, this.props.item);
    }
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
      borderRadius: ".25em",
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
        backgroundPosition: "center center",
      };
    }
    if (this.props.item.isSelected)
      return Object.assign(
        {
          width: this.props.item.vwidth - 32,
          height: this.props.height - 32,
          margin: 16,
          overflow: "hidden",
        },
        nanoBase64Backgorund
      );
    return Object.assign(
      {
        width: this.props.item.vwidth,
        height: this.props.height,
        overflow: "hidden",
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
        transform: rotationTransformValue,
      };
    }
    return {
      cursor: "pointer",
      width: this.props.item.scaletwidth,
      height: this.props.height,
      marginLeft: this.props.item.marginLeft,
      marginTop: 0,
      transform: rotationTransformValue,
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

  handleMoreClick() {
    this.props.onClickMoreDetail(this.props.item.resultItemId);
  }

  handleDownloadlick() {
    // this.props.onClickDownload(this.props.item.resultItemId);
    window.open(this.props.item.downloadUrl + "&download=true", "_blank");
  }

  render() {
    var alt = this.props.item.alt ? this.props.item.alt : "";
    var tags =
      typeof this.props.item.tags === "undefined" ? (
        <noscript />
      ) : (
        this.props.item.tags.map((tag) => {
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
                margin: "2px",
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
            width: "100%",
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
      style: this.thumbnailStyle(),
    };

    var videoProps = {
      key: "video-" + this.props.index,
      autoPlay: true,
      controls: true,
      style: this.thumbnailStyle(),
      onClick: () => {
        // console.log(
        //   "### video Click , this.state.playing:",
        //   this.state.playing
        // );
        // this.setState({ playing: !this.state.playing }, (newState) => {
        //   console.log('### newState:', newState)
        //   console.log('### newState this.state:', this.state)
        // });
      },
      onPlay: (e) => {
        // console.log("### video onPlay!");
        this.handleOnPlay(e);
      },
      onPause: () => {
        // console.log("### video onPause index:", this.props.index);
        this.setState({ playing: false }, () => {
          // console.log("### onPause after set, this.state:", this.state);
        });
      },
      onError: (e) => {
        console.log("Error video onError:", e);
      },
      preload: "none",
      // poster: this.props.item.thumbnail,
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

    const makeMediaElement = () => {
      if (this.state.isFirstPlayVideo && this.props.isVideo) {
        return (
          <video
            {...videoProps}
            ref={this.videoRef}
            style={{
              // display:
              //   this.state.isFirstPlayVideo && this.props.isVideo
              //     ? "block"
              //     : "none",
              cursor: "pointer",
              width: this.props.item.vwidth,
              height: this.props.height,
              // transform: rotationTransformValue,
            }}
          />
        );
      } else {
        if (ThumbnailImageComponent) {
          return (
            <ThumbnailImageComponent
              {...this.props}
              imageProps={thumbnailProps}
            />
          );
        } else {
          return <img {...thumbnailProps} />;
        }
      }
    };

    return (
      <div
        className="ReactGridGallery_tile"
        // className={classNames({
        //   "media-thumb": true,
        //   video: this.props.isVideo && this.state.isFirstPlayVideo
        // })}
        key={"tile-" + this.props.index}
        onMouseEnter={(e) => this.setState({ hover: true })}
        onMouseLeave={(e) => this.setState({ hover: false })}
        style={{
          margin: this.props.margin,
          WebkitUserSelect: "none",
          position: "relative",
          float: "left",
          background: "#eee",
          padding: "0px",
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
            width: "100%",
          }}
        >
          {this.renderCheckButton()}
        </div>

        <div
          style={{
            top:
              this.props.morePosition === "top"
                ? !this.state.isFirstPlayVideo
                  ? 0
                  : 8
                : "auto",
            bottom: this.props.morePosition === "top" ? "auto" : 0,
            overflow: "hidden",
            display: "flex",
            position: "absolute",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <MoreBtn
            resultItemId={this.props.resultItemId}
            onClick={this.handleMoreClick}
            moreInfoLabel={this.props.moreInfoLabel}
            isHover={this.state.hover}
            isFirstPlayVideo={this.state.isFirstPlayVideo}
            playing={this.state.playing}
          />
          {this.props.showDownloadIcon && (
            <DownloadBtn
              resultItemId={this.props.resultItemId}
              onClick={this.handleDownloadlick}
              isHover={this.state.hover}
              isFirstPlayVideo={this.state.isFirstPlayVideo}
              playing={this.state.playing}
            />
          )}
        </div>

        {/* <div
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
        </div> */}

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
            overflow: "hidden",
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
                : "none",
          }}
        ></div>

        <div
          // className="ReactGridGallery_tile-viewport"
          className={classNames({
            "media-thumb": true,
            video: this.props.isVideo && !this.state.isFirstPlayVideo,
          })}
          style={this.tileViewportStyle()}
          key={"tile-viewport-" + this.props.index}
          onClick={this.handleOnPlay}
        >
          {makeMediaElement()}

          {/* {ThumbnailImageComponent ? (
            <ThumbnailImageComponent
              {...this.props}
              imageProps={thumbnailProps}
            />
          ) : (
            <img {...thumbnailProps} />
          )} */}
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
              overflow: "hidden",
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
  thumbnailImageComponent: PropTypes.func,
};

Image.defaultProps = {
  isSelectable: true,
  hover: false,
};

export default Image;
