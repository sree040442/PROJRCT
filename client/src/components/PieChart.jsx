// ./components/PieChart.js
import React from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import moment from "moment/moment";

const PieChart = ({ details }) => {
  const getDetailsByCondition = () => {
    const f = details.reduce((d, p) => {
      const { condition } = p;
      d[condition] = (d[condition] || 0) + 1;
      return d;
    }, {});

    const foo = [];
    for (const [key, value] of Object.entries(f)) {
      foo.push({ key, value });
    }
    return foo;
  };

  const labels = getDetailsByCondition().map((d) => d.key);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Condition",
        backgroundColor: ["rgb(255, 99, 132)","#3dd58f"],
        borderColor: "white",
        data: getDetailsByCondition().map((d) => d.value),
      },
    ],
  };
  return (
    <div className="card p-3 mx-auto" style={{ width: "70%" }}>
      <Pie data={data} />
    </div>
  );
};
export default PieChart;
