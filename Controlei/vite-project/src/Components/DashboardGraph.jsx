import { buildLabels, buildDatasets } from '../Components/chartUtils';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement , CategoryScale, Title, Legend, Tooltip, plugins } from 'chart.js';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  Title,
  Legend,
  Tooltip
);

const DashboardGraph = ({ dataForGraph, period }) => {             //Recebe os dados mensais e o período selecionado para filtrar os dados em 1, 6 e 12 meses.

const dashData = { 
    labels: buildLabels(dataForGraph),
    datasets: buildDatasets(dataForGraph),
  };

const dashOptions = {
  responsive: true,
  maintainAspectRatio: false, // Permite que o gráfico se ajuste ao tamanho do contêiner pai

  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: `Balanço dos últimos ${period} meses`,
    },
  },
  scales: {
    x: {
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
    <div className="DashboardGraph-container"
    style={{ position: 'relative', 
             width: '100%',
             height: '380px' }}>

      <Line data={dashData} options={dashOptions}/>
    </div>
  )
 }

export default DashboardGraph