
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../css/barChart.css';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  const { priceRanges } = data;

  let chartData;
  let chartOptions;
  if (priceRanges) {
    chartData = {
      labels: priceRanges.map(item => item.range),
      datasets: [
        {
          label: 'Number of Items',
          data: priceRanges.map(item => item.count),
          backgroundColor: 'rgba(75, 192, 192, 0.4)', 
          borderColor: 'rgba(75, 192, 192, 1)', 
          borderWidth: 1,
        },
      ],
    };

    chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `Items: ${tooltipItem.raw}`;
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#333',
            font: {
              size: 14,
            },
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
        },
        y: {
          ticks: {
            color: '#333',
            font: {
              size: 14,
            },
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
        },
      },
    };

  }

  return (
    <>
      {chartData ?
        <div className="barchart-container">
          <div className="barchart-header">Items v/s Price Ranges</div>
          <div className="barchart">


            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
        :
        <></>}
    </>
  );
};
export default BarChart;
