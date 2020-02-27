import React from "react";
import ReactDOM from "react-dom";
//import Chart from "chart.js";

function Scores(props) {
  return (
    <ul>
      {props.data.map(item => {
        return (
          <li>
            {item.name} {item.score_out_of_10.toFixed(1)}
          </li>
        );
      })}
    </ul>
  );
}

export default Scores;
