import React from 'react';
import "./styleDashboard.css";
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
            label: 'Vendas',
            data: [65, 59, 80, 81, 56, 55],
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: '#4bc0c0',
            tension: 0.4,
            borderWidth: 2, // Aumenta a largura da linha
          },
        ],
      };
      
      const barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Lucros',
            data: [50, 75, 90, 60, 70, 85],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: '#36a2eb',
            borderWidth: 1,
            borderRadius: 5,
            barPercentage: 0.7, // Ajusta a largura das barras
            categoryPercentage: 0.7, // Ajusta o espaçamento entre as barras
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
          color: '#333',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#fff',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#ddd',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#333',
        },
      },
      y: {
        grid: {
          color: '#ddd',
        },
        ticks: {
          color: '#333',
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h2>Painel de Controle</h2>
      
      <div className="chart-container">
        <div className="chart-item line-chart">
          <h3>Gráfico de Linha</h3>
          <Line data={lineData} options={options} />
        </div>
        
        <div className="chart-item bar-chart">
          <h3>Gráfico de Barras</h3>
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
