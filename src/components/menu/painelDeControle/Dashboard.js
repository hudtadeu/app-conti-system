import React, { useState, useEffect } from 'react';
import './styleDashboard.css';
import Modal from 'react-modal';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faCog, faAngleDown } from '@fortawesome/free-solid-svg-icons';
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
  const [lineData, setLineData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const base64Credentials = sessionStorage.getItem("token");
      try {
        const response = await fetch('http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/piGetDocumXML', {
          headers: {
            method: "POST",
            'Content-Type': 'application/json',
            Authorization: `Basic ${base64Credentials}`,
          },
        });
        const data = await response.json();
        const items = data.items;

        const processedLineData = {
          labels: items.map(item => item.emissao),
          datasets: [
            {
              label: 'Documentos',
              data: items.map(item => parseInt(item.nro_docto)),
              fill: false,
              backgroundColor: '#ebecee',
              borderColor: '#ebecee',
              tension: 0.4,
              borderWidth: 2,
            },
          ],
        };

        const processedBarData = {
          labels: items.map(item => item.emissao),
          datasets: [
            {
              label: 'Documentos',
              data: items.map(item => parseInt(item.nro_docto)),
              backgroundColor: '#ebecee',
              borderColor: '#ebecee',
              borderWidth: 1,
              borderRadius: 5,
              barPercentage: 0.6,
              categoryPercentage: 0.6,
            },
          ],
        };

        const processedPieData = {
          labels: ['Pendente', 'Atualizado', 'Cancelado'],
          datasets: [
            {
              data: [
                items.filter(item => item.situacao === 'Pendente').length,
                items.filter(item => item.situacao === 'Atualizado').length,
                items.filter(item => item.situacao === 'Cancelado').length,
              ],
              backgroundColor: ['#FFD700', '#008000', '#FF0000'],
              hoverBackgroundColor: ['#FFD700', '#008000', '#FF0000'],
              borderWidth: 1,
              hoverOffset: 4,
            },
          ],
        };

        setLineData(processedLineData);
        setBarData(processedBarData);
        setPieData(processedPieData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
      <h2>Visão Geral</h2>
      <div className="input-container">
        <div className="input-items">
          <div className="input-item">
            <label htmlFor="periodo">Período:</label>
            <input type="date" id="periodo" name="periodo" />
          </div>
          <div className="input-item">
            <label htmlFor="estabInicial">Estabelecimento Inicial:</label>
            <input type="text" id="estabInicial" name="estabInicial" />
          </div>
          <div className="input-item">
            <label htmlFor="estabFinal">Estabelecimento Final:</label>
            <input type="text" id="estabFinal" name="estabFinal" />
          </div>
        </div>
        <div className="action-buttons">
          <button className="btn btn-primary"><FontAwesomeIcon icon={faSyncAlt} /></button>
          <button className="btn btn-secondary" onClick={() => setModalIsOpen(true)}><FontAwesomeIcon icon={faCog} /></button>
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-item line-chart">
          <h3>Documentos pendentes</h3>
          {lineData && <Line data={lineData} options={options} />}
        </div>
        <div className="chart-item bar-chart">
          <h3>Documentos atualizados</h3>
          {barData && <Bar data={barData} options={options} />}
        </div>
        <div className="chart-item">
          <h3>Gráfico de Pizza</h3>
          {pieData && <Pie data={pieData} options={options} />}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="config-modal-content"
        overlayClassName="config-modal-backdrop"
      >
        <div className="modal-config">
        <h2 className='title-config'>Configurações</h2>
        <button className="close-button-dash" onClick={() => setModalIsOpen(false)}>&times;</button>
        </div>
        <div className="input-group-dash">
        <h3>SELEÇÃO</h3>
          <div className="input-item-dash">
            <label htmlFor="considerarDocumentos">Considerar Documentos:</label>
            <div className="input-dash-icon">
            <input type="text" id="considerarDocumentos" name="considerarDocumentos" />
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
          </div>
          <div className="input-item-dash">
            <label htmlFor="filtrarPeriodoPor">Filtrar período por:</label>
            <div className="input-dash-icon">
            <input type="text" id="filtrarPeriodoPor" name="filtrarPeriodoPor" />
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
          </div>
          <div className="input-item-dash">
            <label htmlFor="periodoRecorrente">Período recorrente (dias):</label>
            <input type="number" id="periodoRecorrente" name="periodoRecorrente" />
          </div>
        </div>
        <div className="input-group-config">
          <h3>VISUALIZAÇÃO</h3>
            <div className="input-item-config">
              <label htmlFor="faixasSelecao">Faixas de Seleção:</label>
              <div className="input-selecao-icon">
              <input type="text" id="faixasSelecao" name="faixasSelecao" className="small-input-selecao" />
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            <div className="input-item-config">
              <label htmlFor="graficosDash">Gráficos:</label>
              <div className="input-config-icon">
              <input type="text" id="graficosDash" name="graficosDash" className="long-input-dash"/>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            </div>
            <div className="input-item-config">
              <label htmlFor="bigNumbers">Big Numbers:</label>
              <div className="input-config-icon">
              <input type="text" id="bigNumbers" name="bigNumbers" className="long-input-dash"/>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            </div>
            <button className="save-button-config">Salvar</button>
          </div>
          </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
