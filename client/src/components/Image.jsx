import React from "react";

function Image(props) {
  return (
    <div className="image-container">
      <img src={props.url} alt="" />
    </div>
  );
}

export default Image;
