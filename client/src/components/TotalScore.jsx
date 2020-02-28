import React from "react";

function TotalScore(props) {
  let divContent = "";
  let span = "";
  if (props.data !== undefined) {
    let total = 0;
    props.data.map(obj => {
      total += Number(obj["score_out_of_10"].toFixed(0));
      console.log(total);
      span = <span>Total score: </span>;
      divContent = <span className="span">{(total / 17).toFixed(1)}</span>;
    });
  }
  return (
    <div className="total-score">
      {span}
      {divContent}
    </div>
  );
}

export default TotalScore;
