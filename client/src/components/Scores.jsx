import React from "react";
import ReactDOM from "react-dom";
import Chart from "chart.js";
import { HorizontalBar } from "react-chartjs-2";

export default function BarChart(props) {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.label,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: props.data
      }
    ]
  };

  return (
    <div>
      <HorizontalBar data={data} />
    </div>
  );
}

// function Scores(props) {
//   return (
//     <ul>
//       {props.data.map(item => {
//         return (
//           <li>
//             {item.name} {item.score_out_of_10.toFixed(1)}
//           </li>
//         );
//       })}
//     </ul>
//   );
// }

// class Scores extends React.Component {
//   constructor(props) {
//     super(props);
//     this.chartRef = React.createRef();
//   }

//   componentDidUpdate() {
//     this.myChart.data.datasets[0].data = this.props.data;
//     this.myChart.data.datasets[0].label = "agata";
//     this.myChart.update();
//   }

//   componentDidMount() {
//     this.myChart = new Chart(this.chartRef.current, {
//       type: "line",
//       data: {
//         datasets: [
//           {
//             label: "agata",
//             data: [{ x: 1, y: 2, x: 2, y: 3, x: 3, y: 5 }],
//             fill: "none",
//             backgroundColor: this.props.color,
//             pointRadius: 3,
//             showLine: true,
//             borderColor: this.props.color,
//             borderWidth: 1,
//             lineTension: 0
//           }
//         ]
//       }
//     });
//   }

//   render() {
//     return <canvas ref={this.chartRef} />;
//   }
// }

// export default Scores;
