import { Bar, Line } from 'react-chartjs-2';
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
 
const chartData = Object.entries(monthlyData).map(([month, data]) => ({   //Transformar os dados mensais para o formato do gráfico
    name: month,
    Receita: data.Income,
    Despesa: data.Expenses,
    Investimento: data.Investments,
  }));

  const Labels = chartData.map(item => item.name);

  const data = { 
    labels: Labels,
    datasets: [
      {
        label: 'Receita',
        data: chartData.map(item => item.Receita),
        backgroundColor: '#4BC0C0',
      },
      {
        label: 'Despesa',
        data: chartData.map(item => item.Despesa),
        backgroundColor: '#FF6384',
      },
      {
        label: 'Investimento',
        data: chartData.map(item => item.Investimento),
        backgroundColor: '#36eb36ff',
      },
    ],
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
          <Bar data={data} options={options} />
        </div>
      );
    };
  



export default HistoricalGraph
