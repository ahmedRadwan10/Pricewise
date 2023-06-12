import React, { useEffect, useState } from 'react';
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

// let labels = [];

// export const data = {
//     labels,
//     datasets: [
//         {
//             label: "Price in EGP",
//             data: labels.map(() => Math.floor(Math.random() * 10000)),
//             borderColor: '#dddddd',
//             backgroundColor: '#222831',
//         }
//     ],
// };
  

const Chart = ({ history }) => {

    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: "Price in EGP",
                data: [],
                borderColor: '#dddddd',
                backgroundColor: '# ',
            }
        ],
    });

    useEffect(() => {
        let labels = [];
        let data = [];
        history.forEach(record => {
            labels.push(record.date);
            data.push(record.price);
        });
        setData({
            labels: labels,
            datasets: [
                {
                    label: "Price in EGP",
                    data: data,
                    borderColor: '#dddddd',
                    backgroundColor: '#222831',
                }
            ],
        })
    }, [history]);

    return (
        <div className={styles.chart_container}>
            <h4>Price History</h4>
            <Line options={options} data={data} />
        </div>
    );
}

export default Chart;