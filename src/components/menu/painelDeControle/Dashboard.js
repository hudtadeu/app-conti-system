import React, { useState, useEffect, useRef } from 'react';
import './styleDashboard.css';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faCog, faAngleDown, faBuilding, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import ApexCharts from 'react-apexcharts';

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
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
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

      const pendingDocumentsByDate = items
        .filter(item => item.situacao === 'Pendente')
        .reduce((acc, item) => {
          const date = item.emissao;
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

      const updatedDocumentsByDate = items
        .filter(item => item.situacao === 'Atualizado')
        .reduce((acc, item) => {
          const date = item.emissao;
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

      const pendingDates = Object.keys(pendingDocumentsByDate);
      const updatedDates = Object.keys(updatedDocumentsByDate);

      const processedLineData = {
        chart: {
          type: 'line',
        },
        series: [
          {
            name: 'Documentos Pendentes',
            data: pendingDates.map(date => pendingDocumentsByDate[date]),
          },
        ],
        xaxis: {
          categories: pendingDates,
        },
        colors: ['#0098c9'],
      };

      const processedBarData = {
        chart: {
          type: 'bar',
          toolbar: {
            show: false 
          }
        },
        series: [
          {
            name: 'Documentos Atualizados',
            data: updatedDates.map(date => updatedDocumentsByDate[date]),
          },
        ],
        xaxis: {
          categories: updatedDates,
        },
        colors: ['#0098c9'],
        plotOptions: {
          bar: {
            borderRadius: 5, 
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'all', 
          },
        },
      };

      const processedPieData = {
        series: [
          items.filter(item => item.situacao === 'Pendente').length,
          items.filter(item => item.situacao === 'Atualizado').length,
          items.filter(item => item.situacao === 'Cancelado').length,
          items.filter(item => item.situacao === 'Status Desconhecido').length,
        ],
        options: {
          chart: {
            type: 'donut',
            height: 350,
            toolbar: {
              show: false,
            },
          },
          labels: ['Pendente', 'Atualizado', 'Cancelado', 'Desconhecido'],
          plotOptions: {
            pie: {
              startAngle: -90,
              endAngle: 270,
              donut: {
                size: '65%',
                labels: {
                  show: true,
                  total: {
                    show: true,
                    showAlways: false,
                    label: 'Total',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#373d3f',
                  },
                },
              },
            },
          },
          colors: ['#FFD700', '#008000', '#FF0000', '#808080'],
          legend: {
            position: 'bottom',
          },
        },
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
      setLoading(false);
      setChartData(Object.values(processedChartData));
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
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
          {loading ? (
            <div className="loading-spinner-chart">
              <FontAwesomeIcon icon={faSpinner} spin />
            </div>
          ) : (
            lineData && <ApexCharts options={lineData} series={lineData.series} type="line" height={350} />
          )}
        </div>
        <div className="chart-item bar-chart">
          <h3>Documentos atualizados</h3>
          {loading ? (
            <div className="loading-spinner-chart">
              <FontAwesomeIcon icon={faSpinner} spin />
            </div>
          ) : (
            barData && <ApexCharts options={barData} series={barData.series} type="bar" height={350} />
          )}
        </div>
        <div className="chart-item" onClick={() => setPieModalIsOpen(true)}>
          <h3>Status do Documento</h3>
          {loading ? (
            <div className="loading-spinner-chart">
              <FontAwesomeIcon icon={faSpinner} spin />
            </div>
          ) : (
            pieData && <ApexCharts type="donut" series={pieData.series} options={pieData.options} height={350} />
          )}
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
          <button className="close-button-dash" onClick={() => setModalIsOpen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
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
                  <button onClick={() => removeOption(option)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
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
                  <button onClick={() => removeFaixasOption(option)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
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
                  <button onClick={() => removeGraficosOption(option)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
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
                  <button onClick={() => removeBigNumbersOption(option)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
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
          <h2 className='title-config-graph'>Status do Documento</h2>
          <button className="close-button-dash-graph" onClick={() => setPieModalIsOpen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="chart-container-graph centered-chart">
          {pieData && <ApexCharts type="donut" series={pieData.series} options={pieData.options} height={500} width={500} />}
          </div>
          <div>
          <button className="detail-button-chart" onClick={handleChartClick}>Detalhar Documento</button>
        </div>
      </Modal>
      <Modal
        isOpen={secondModalIsOpen}
        onRequestClose={() => setSecondModalIsOpen(false)}
        className="config-modal-content-second-graph"
        overlayClassName="config-modal-backdrop-second-graph"
      >
        <div className="modal-config-second-graph">
          <h2 className='title-config-second-graph'>Tipo de Documento</h2>
          <button className="close-button-dash-second-graph" onClick={() => setSecondModalIsOpen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="chart-container-second-graph">
          <ApexCharts
            options={{
              chart: {
                type: 'bar',
                toolbar: {
                  show: false 
                }
              },
              plotOptions: {
                bar: {
                  distributed: true,
                  borderRadius: 5, 
                  borderRadiusApplication: 'end',
                  borderRadiusWhenStacked: 'last'
                },
              },
              legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                labels: {
                  colors: '#333',
                },
                itemMargin: {
                  horizontal: 10, 
                  vertical: 5     
                }
              },
              tooltip: {
                enabled: true,
                followCursor: false,
                intersect: false,
                custom: function({ series, seriesIndex, dataPointIndex, w }) {
                  const { tipoDoc, color } = chartData[dataPointIndex];
                  const value = series[seriesIndex][dataPointIndex];
                  return `<div style="padding: 10px; background-color: ${color}; color: #fff;">
                            ${tipoDoc}: ${value}
                          </div>`;
                },
              },
              xaxis: {
                categories: chartData.map(item => item.tipoDoc),
              },
              colors: chartData.map(item => item.color),
            }}
            series={[{ data: chartData.map(item => item.count) }]}
            type="bar"
            height={500}
            width={500}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
