import React from 'react';
import styles from '../Product.module.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: '',
      },
    },
};

const labels = ['07/2022', '08/2022', '09/2022', '10/2022', '11/2022', '12/2022', '01/2023'];

export const data = {
    labels,
    datasets: [
        {
            label: "Price in EGP",
            data: labels.map(() => Math.floor(Math.random() * 10000)),
            borderColor: '#dddddd',
            backgroundColor: '#222831',
        }
    ],
};
  

const Chart = () => {
    return (
        <div className={styles.chart_container}>
            <h4>Last Prices</h4>
            <Line options={options} data={data} />
        </div>
    );
}

export default Chart;