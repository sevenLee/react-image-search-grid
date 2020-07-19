import React, { PureComponent } from "react";
const styles = require("./main.css");

console.log("### styles.myTitle:", styles.myTitle);

export default class MoreBtn extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      moreInfoLabel,
      morePosition,
      isHover,
      isFirstPlayVideo,
      playing,
    } = this.props;

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
          padding: ".4em .2em",
          lineHeight: "1",
          cursor: "pointer",
          // fontSize: "75%",
          color: "#096dd9",
          backgroundColor: "#fff",
          zIndex: 10,
        }}
      >
        <span className={styles.myTitle}>
          {moreInfoLabel === undefined ? `More Info` : moreInfoLabel}
        </span>
      </div>
    );
  }
}
