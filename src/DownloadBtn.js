import React, { PureComponent } from "react";

export default class DownloadBtn extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { isHover, isFirstPlayVideo, playing } = this.props;

    return (
      <div
        onClick={this.props.onClick}
        style={{
          pointerEvents: "none",
          display:
            (isHover && !isFirstPlayVideo) || (!playing && isFirstPlayVideo)
              ? "inline-block"
              : "none",
          cursor: "pointer",
          pointerEvents: "visible",
          margin: "6px",
          // padding: ".4em .2em",
          lineHeight: "1",
          cursor: "pointer",
          // fontSize: "75%",
          color: "#096dd9",
          backgroundColor: "#fff",
          zIndex: 10,
          // height: 24,
          width: 24,
        }}
      >
        <svg
          viewBox="0 0 19.3 19"
          style={{
            transform: "scale(0.6)",
          }}
        >
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
    );
  }
}
