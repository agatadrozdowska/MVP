import React from "react";
import ReactDOM from "react-dom";

function Scores(props) {
  let id = "";
  return (
    <ul className="score-list">
      {props.data.map((item, index) => {
        if (props.data[index] && props.comparison[index]) {
          console.log(props.data[7]["score_out_of_10"].toFixed(0));
          let data = props.data[index]["score_out_of_10"].toFixed(0);
          let comparison = props.comparison[index]["score_out_of_10"].toFixed(
            0
          );
          console.log(data, comparison);
          console.log(data < comparison);
          if (Number(data) < Number(comparison)) {
            id = "red";
          } else {
            id = "";
          }
        }

        return (
          <li key={index} className="score-container">
            <p className="score-name">{item.name}: </p>
            <div className="rating-bar">
              <div
                id={id}
                {...{
                  className:
                    "rating-bar-fill-" + item.score_out_of_10.toFixed(0)
                }}
              ></div>
            </div>
            <p className="score-number">
              {item.score_out_of_10.toFixed(0)} / 10
            </p>
          </li>
        );
      })}
    </ul>
  );
}

export default Scores;
