import React, { useState, useEffect, useRef } from 'react';
import './styleDashboard.css';
import Modal from 'react-modal';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faCog, faAngleDown, faBuilding } from '@fortawesome/free-solid-svg-icons';
import ApexCharts from 'react-apexcharts';
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

const getTipoDocumentoInfo = (tipoDoc) => {
  let tipoText;
  let tipoColor;
  switch (tipoDoc) {
    case 'NF-e':
      tipoText = 'NF-e';
      tipoColor = '#32CD32';
      break;
    case 'CT-e':
      tipoText = 'CT-e';
      tipoColor = '#00BFFF';
      break;
    case 'CTe-OS':
      tipoText = 'CTe-OS';
      tipoColor = '#8A2BE2';
      break;
    case 'NFS-e':
      tipoText = 'NFS-e';
      tipoColor = '#FF8C00';
      break;
    case 'NF3e':
      tipoText = 'NF3e';
      tipoColor = '#FF1493';
      break;
    default:
      tipoText = 'Diversos';
      tipoColor = '#808080';
      break;
  }
  return { text: tipoText, color: tipoColor };
};

const Dashboard = () => {
  const [lineData, setLineData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pieModalIsOpen, setPieModalIsOpen] = useState(false);
  const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
  const [considerarDocumentos, setConsiderarDocumentos] = useState([]);
  const [faixasSelecao, setFaixasSelecao] = useState([]);
  const [graficosSelecao, setGraficosSelecao] = useState([]);
  const [bigNumbersSelecao, setBigNumbersSelecao] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFaixasDropdown, setShowFaixasDropdown] = useState(false);
  const [showGraficosDropdown, setShowGraficosDropdown] = useState(false);
  const [showBigNumbersDropdown, setShowBigNumbersDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const faixasDropdownRef = useRef(null);
  const graficosDropdownRef = useRef(null);
  const bigNumbersDropdownRef = useRef(null);

  const optionsList = ['Selecionar Todos', 'Cancelados', 'Em Validação'];
  const faixasOptionsList = ['Selecionar Todos', 'Período', 'Estabelecimento'];
  const graficosOptionsList = ['Selecionar Todos', 'Documentos Pendentes', 'Documentos Digitados', 'Documentos Atualizados'];
  const bigNumbersOptionsList = [
    'Selecionar Todos',
    'NF-e(s) pendentes de cancelamento',
    'CT-e(s) pendentes de cancelamento',
    'NF-e(s) faltando conferência',
    'NF-e(s) com divergências (Comparativo XML)',
  ];

  const toggleOption = (option) => {
    if (considerarDocumentos.includes(option)) {
      setConsiderarDocumentos(considerarDocumentos.filter(item => item !== option));
    } else {
      setConsiderarDocumentos([...considerarDocumentos, option]);
    }
  };

  const removeOption = (option) => {
    setConsiderarDocumentos(considerarDocumentos.filter(item => item !== option));
  };

  const toggleFaixasOption = (option) => {
    if (faixasSelecao.includes(option)) {
      setFaixasSelecao(faixasSelecao.filter(item => item !== option));
    } else {
      setFaixasSelecao([...faixasSelecao, option]);
    }
  };

  const removeFaixasOption = (option) => {
    setFaixasSelecao(faixasSelecao.filter(item => item !== option));
  };

  const toggleGraficosOption = (option) => {
    if (graficosSelecao.includes(option)) {
      setGraficosSelecao(graficosSelecao.filter(item => item !== option));
    } else {
      setGraficosSelecao([...graficosSelecao, option]);
    }
  };

  const removeGraficosOption = (option) => {
    setGraficosSelecao(graficosSelecao.filter(item => item !== option));
  };

  const toggleBigNumbersOption = (option) => {
    if (bigNumbersSelecao.includes(option)) {
      setBigNumbersSelecao(bigNumbersSelecao.filter(item => item !== option));
    } else {
      setBigNumbersSelecao([...bigNumbersSelecao, option]);
    }
  };

  const removeBigNumbersOption = (option) => {
    setBigNumbersSelecao(bigNumbersSelecao.filter(item => item !== option));
  };

  const fetchData = async () => {
    const base64Credentials = sessionStorage.getItem("token");
    try {
      const response = await fetch('http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/piGetDocumXML/graph', {
        method: "GET",
        headers: {
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

      const processedChartData = items.reduce((acc, item) => {
        const tipoInfo = getTipoDocumentoInfo(item.tipo_doc);
        if (!acc[item.tipo_doc]) {
          acc[item.tipo_doc] = { tipoDoc: tipoInfo.text, count: 0, color: tipoInfo.color };
        }
        acc[item.tipo_doc].count += 1;
        return acc;
      }, {});

      setLineData(processedLineData);
      setBarData(processedBarData);
      setPieData(processedPieData);
      setChartData(Object.values(processedChartData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (faixasDropdownRef.current && !faixasDropdownRef.current.contains(event.target)) {
        setShowFaixasDropdown(false);
      }
      if (graficosDropdownRef.current && !graficosDropdownRef.current.contains(event.target)) {
        setShowGraficosDropdown(false);
      }
      if (bigNumbersDropdownRef.current && !bigNumbersDropdownRef.current.contains(event.target)) {
        setShowBigNumbersDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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

  const handleChartClick = () => {
    setSecondModalIsOpen(true);
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
        <div className="chart-item" onClick={() => setPieModalIsOpen(true)}>
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
            <div className="multi-select" ref={dropdownRef}>
              <div className="multi-select__control" onClick={() => setShowDropdown(!showDropdown)}>
                <span>{considerarDocumentos.length > 0 ? considerarDocumentos.join(', ') : 'Selecionar...'}</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
              {showDropdown && (
                <div className="multi-select__menu">
                  {optionsList.map(option => (
                    <label key={option}>
                      <input
                        type="checkbox"
                        checked={considerarDocumentos.includes(option)}
                        onChange={() => toggleOption(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="selected-options">
              {considerarDocumentos.map(option => (
                <div key={option} className="selected-option">
                  {option}
                  <button onClick={() => removeOption(option)}>x</button>
                </div>
              ))}
            </div>
          </div>
          <div className="input-item-dash">
            <label htmlFor="filtrarPeriodoPor">Filtrar período por:</label>
            <div className="input-dash-icon">
              <select id="filtrarPeriodoPor" name="filtrarPeriodoPor">
                <option value="dataEmissao">Data de Emissão</option>
                <option value="dataTransacao">Data de Transação</option>
              </select>
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
          <div className="input-item-dash-config">
            <label htmlFor="faixasSelecao">Faixas de Seleção:</label>
            <div className="multi-select" ref={faixasDropdownRef}>
              <div className="multi-select__control" onClick={() => setShowFaixasDropdown(!showFaixasDropdown)}>
                <span>{faixasSelecao.length > 0 ? faixasSelecao.join(', ') : 'Selecionar...'}</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
              {showFaixasDropdown && (
                <div className="multi-select__menu">
                  {faixasOptionsList.map(option => (
                    <label key={option}>
                      <input
                        type="checkbox"
                        checked={faixasSelecao.includes(option)}
                        onChange={() => toggleFaixasOption(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="selected-options">
              {faixasSelecao.map(option => (
                <div key={option} className="selected-option">
                  {option}
                  <button onClick={() => removeFaixasOption(option)}>x</button>
                </div>
              ))}
            </div>
          </div>
          <div className="input-item-dash-config">
            <label htmlFor="graficosDash">Gráficos:</label>
            <div className="multi-select" ref={graficosDropdownRef}>
              <div className="multi-select__control" onClick={() => setShowGraficosDropdown(!showGraficosDropdown)}>
                <span>{graficosSelecao.length > 0 ? graficosSelecao.join(', ') : 'Selecionar...'}</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
              {showGraficosDropdown && (
                <div className="multi-select__menu">
                  {graficosOptionsList.map(option => (
                    <label key={option}>
                      <input
                        type="checkbox"
                        checked={graficosSelecao.includes(option)}
                        onChange={() => toggleGraficosOption(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="selected-options">
              {graficosSelecao.map(option => (
                <div key={option} className="selected-option">
                  {option}
                  <button onClick={() => removeGraficosOption(option)}>x</button>
                </div>
              ))}
            </div>
          </div>
          <div className="input-item-dash-config">
            <label htmlFor="bigNumbers">Big Numbers:</label>
            <div className="multi-select" ref={bigNumbersDropdownRef}>
              <div className="multi-select__control" onClick={() => setShowBigNumbersDropdown(!showBigNumbersDropdown)}>
                <span>{bigNumbersSelecao.length > 0 ? bigNumbersSelecao.join(', ') : 'Selecionar...'}</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
              {showBigNumbersDropdown && (
                <div className="multi-select__menu">
                  {bigNumbersOptionsList.map(option => (
                    <label key={option}>
                      <input
                        type="checkbox"
                        checked={bigNumbersSelecao.includes(option)}
                        onChange={() => toggleBigNumbersOption(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="selected-options">
              {bigNumbersSelecao.map(option => (
                <div key={option} className="selected-option">
                  {option}
                  <button onClick={() => removeBigNumbersOption(option)}>x</button>
                </div>
              ))}
            </div>
          </div>
          <button className="save-button-config">Salvar</button>
        </div>
      </Modal>
      <Modal
        isOpen={pieModalIsOpen}
        onRequestClose={() => setPieModalIsOpen(false)}
        className="config-modal-content-graph"
        overlayClassName="config-modal-backdrop-graph"
      >
        <div className="modal-config-graph">
          <h2 className='title-config-graph'>Gráfico de Pizza Ampliado</h2>
          <button className="close-button-dash-graph" onClick={() => setPieModalIsOpen(false)}>&times;</button>
        </div>
        <div className="chart-container-graph" onClick={handleChartClick}>
          {pieData && <Pie data={pieData} options={options} />}
        </div>
      </Modal>
      <Modal
        isOpen={secondModalIsOpen}
        onRequestClose={() => setSecondModalIsOpen(false)}
        className="config-modal-content-second-graph"
        overlayClassName="config-modal-backdrop-second-graph"
      >
        <div className="modal-config-second-graph">
          <h2 className='title-config-second-graph'>Gráfico de Tipo de Documento</h2>
          <button className="close-button-dash-second-graph" onClick={() => setSecondModalIsOpen(false)}>&times;</button>
        </div>
        <div className="chart-container-second-graph">
          <ApexCharts
            options={{
              chart: {
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  track: {
                    background: '#fff',
                    strokeWidth: '50%',
                  },
                  dataLabels: {
                    total: {
                      show: false,
                    },
                    value: {
                      show: true,
                      formatter: (val) => (val / 100) * 100,
                      offsetY: 12,
                      color: '#333',
                      fontSize: '20px',
                    },
                  },
                },
              },
              legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '13px',
                labels: {
                  colors: '#333',
                },
              },
              tooltip: {
                enabled: true,
                shared: true,
                followCursor: false,
                intersect: false,
                style: {
                  fontSize: '14px',
                },
                onDatasetHover: {
                  highlightDataSeries: true,
                },
                x: {
                  show: true,
                },
                marker: {
                  show: true,
                },
              },
              labels: chartData.map(item => item.tipoDoc),
            }}
            series={chartData.map(item => item.count)}
            type="radialBar"
            height={450}
            width={450}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
