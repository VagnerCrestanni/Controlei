import {buildLabels, buildDatasets } from '../Components/chartUtils'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, BarElement, CategoryScale, Title, Legend, Tooltip } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
  
const HistoricalGraph = ({ monthlyData, activeYear }) => {  //Verifica se tem um ano selecionado para mostrar o gráfico, se não tiver, mostra uma mensagem pedindo para selecionar um ano
  if ( !activeYear || Object.keys(monthlyData).length === 0 ) {
      return (
         <div className="HistoricalGraph-placeholder">
          Clique em um ano na tabela para ver o gráfico detalhado.
         </div>
      );
    }

  const historicalData = { 
    labels: buildLabels(monthlyData), // Pega os nomes dos meses
    datasets: buildDatasets(monthlyData), // Pega Receita, Despesa, Investimento
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Balanço Mensal de ${activeYear}`,
      },
    },
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: 'Mês',
        },
      },
      y: {
        stacked: false,
        title: {
          display: true,
          text: 'Valor (R$)',
        },
      },
    },
  };
      
  return (
    <div className="HistoricalGraph-container">
          <Bar data={historicalData} options={options} />
        </div>
      );
    };
    
export default HistoricalGraph