import { Bar } from "react-chartjs-2";
import moment from "moment/moment";

const BarChart = ({ details }) => {
  const getDetailsByDate = () => {
    details.map((d) => {
      d.date = moment(d.date).utc().format("YYYY/MM/DD");
    });

    const f = details.reduce((d, p) => {
      const { date } = p;
      d[date] = (d[date] || 0) + 1;
      return d;
    }, {});

    const foo = [];
    for (const [key, value] of Object.entries(f)) {
      foo.push({ key, value });
    }
    return foo;
  };

  const labels = getDetailsByDate().map((d) => d.key);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Shipping Count ",
        backgroundColor: "#3dd58f",
        borderColor: "#3dd58f",
        data: getDetailsByDate().map((d) => d.value),
      },
    ],
  };

  return (
    <div className="card p-3">
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
