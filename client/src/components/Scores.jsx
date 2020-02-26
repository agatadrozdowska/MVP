import React from "react";
import ReactDOM from "react-dom";

function Scores(props) {
  return (
    <ul>
      {props.data.map(item => {
        return (
          <li>
            {item.name} {item.score_out_of_10}
          </li>
        );
      })}
    </ul>
  );
}

export default Scores;
