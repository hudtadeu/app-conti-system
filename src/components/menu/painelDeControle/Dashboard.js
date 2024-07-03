import React from 'react';
import './styleDashboard.css';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Documentos',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: '#ebecee',
        borderColor: '#ebecee', // Linhas em branco
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Documentos',
        data: [50, 75, 90, 60, 70, 85],
        backgroundColor: '#ebecee', 
        borderColor: '#ebecee',
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.6,
        categoryPercentage: 0.6,
      },
    ],
  };

  const pieData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
        hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            family: 'Poppins',
            size: 14,
          },
          color: '#fff',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#fff',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#fff',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#fff',
        },
      },
      y: {
        grid: {
          color: '#fff',
        },
        ticks: {
          color: '#fff',
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h2>Painel de Controle</h2>

      <div className="chart-container">
        <div className="chart-item line-chart">
          <h3>Documentos pendentes</h3>
          <Line data={lineData} options={options} />
        </div>

        <div className="chart-item bar-chart">
          <h3>Documentos atualizados</h3>
          <Bar data={barData} options={options} />
        </div>

        <div className="chart-item">
          <h3>Gráfico de Pizza</h3>
          <Pie data={pieData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
