import React, { useState, useEffect, useRef } from 'react';
import './styleDashboard.css';
import Modal from 'react-modal';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faCog, faAngleDown, faBuilding } from '@fortawesome/free-solid-svg-icons';
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Função para lidar com a seleção das opções
  const handleOptionSelect = (option) => {
    const index = selectedOptions.indexOf(option);
    if (index === -1) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    }
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
            <div className="input-estab-icon">
            <FontAwesomeIcon icon={faBuilding} />
            <input type="text" id="estabInicial" name="estabInicial" />
          </div>
          </div>
          <div className="input-item">
            <label htmlFor="estabFinal">Estabelecimento Final:</label>
            <div className="input-estab-icon">
            <FontAwesomeIcon icon={faBuilding} />
            <input type="text" id="estabFinal" name="estabFinal" />
          </div>
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
            <div className="input-dash-icon" ref={dropdownRef}>
            <input type="text" id="considerarDocumentos" name="considerarDocumentos" onClick={toggleDropdown} readOnly />
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
          {dropdownOpen && (
              <div className="dropdown-content-considera">
                <label>
                  <input
                    type="checkbox"
                    value="Selecionar todos"
                    checked={selectedOptions.includes("Selecionar todos")}
                    onChange={() => handleOptionSelect("Selecionar todos")}
                  />
                  Selecionar todos
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Cancelados"
                    checked={selectedOptions.includes("Cancelados")}
                    onChange={() => handleOptionSelect("Cancelados")}
                  />
                  Cancelados
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Em validação"
                    checked={selectedOptions.includes("Em validação")}
                    onChange={() => handleOptionSelect("Em validação")}
                  />
                  Em validação
                </label>
              </div>
            )}
          </div>
          <div className="input-item-dash">
            <label htmlFor="filtrarPeriodoPor">Filtrar período por:</label>
            <div className="input-dash-icon">
            <input type="text" id="filtrarPeriodoPor" name="filtrarPeriodoPor" />
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
          </div>
          <div className="input-item-dash-rec">
            <label htmlFor="periodoRecorrente">Período recorrente (dias):</label>
            <input type="number" id="periodoRecorrente" name="periodoRecorrente" />
            <FontAwesomeIcon icon={faSyncAlt} />
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
