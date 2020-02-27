import React from "react";
import ReactDOM from "react-dom";

function Scores(props) {
  return (
    <ul className="score-list">
      {props.data.map((item, index) => {
        return (
          <li key={index} className="score-container">
            <p className="score-name">{item.name}: </p>
            <div className="rating-bar">
              <div
                {...{
                  className:
                    "rating-bar-fill-" + item.score_out_of_10.toFixed(0)
                }}
              ></div>
              <p className="score-number">
                {item.score_out_of_10.toFixed(0)} / 10
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Scores;
