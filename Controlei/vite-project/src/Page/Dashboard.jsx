import React, { use, useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import '../Components/DashboardGraph'
import { getLastMonthsData, formatHistory } from '../Components/chartUtils';
import './Dashboard.css';
import CardDashboard from '../Components/CardDashboard';
import DashboardGraph from '../Components/DashboardGraph';
import { getSummary, getHistory } from '../services/api';

const Dashboard = () => {
  const [ period, setPeriod ] = useState (3); // Estado para armazenar o período selecionado (3, 6 ou 12 meses) do grafico
  const [activeYear, setActiveYear] = useState ('')
  const [chartData, setChartData] = useState([]); 

const [summary, setSummary] = useState({ income: 0, expense: 0, investment: 0 }); // Estado para armazenar o resumo das transações, que é atualizado a cada vez que uma nova transação é adicionada
  const totalIncome = summary.income;
  const totalExpenses = summary.expense; 
  const totalInvestments = summary.investment; 

useEffect(() => { // useEffect para buscar os dados do gráfico do backend e atualizar o estado chartData
    async function fetchHistory() {
      const dataHistory = await getHistory();
      const formatted = formatHistory(dataHistory);
      const chartFormatted = getLastMonthsData(formatted, period);
      setChartData(chartFormatted);
    }
    fetchHistory();
  }, [period]);


useEffect(() => { // useEffect para buscar o resumo das transações do backend e atualizar o estado summary
    async function fetchSummary() {
      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();
      
      const dataSummary = await getSummary(currentMonth, currentYear);
      setSummary(dataSummary);
    }
    fetchSummary();
  }, []); 

  const [goalIncome, setGoalIncome] = useState ([]);  // Estado para armazenar as metas de receita, despesa e investimento, que são passadas para o componente CardDashboard
  const [goalExpenses, setGoalExpenses] = useState ([]);
  const [goalInvestments, setGoalInvestments] = useState ([]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-content">
        <h1>Dashboard</h1>
        <p> Médias </p>
        <div className="period-buttons">
          <button onClick={() => setPeriod(3)}> 3 Meses</button>
          <button onClick={() => setPeriod(6)}> 6 Meses </button>
          <button onClick={() => setPeriod(12)}> 12 Meses </button>
        </div>

        <div className='chart-container'>
          <DashboardGraph dataForGraph ={chartData} period={period} />
        </div>

        <div className="cards-container">
          <CardDashboard 
          title="Receitas" value={`R$ ${totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          createGoal={goalIncome} onAddGoal={(newGoal) => setGoalIncome([...goalIncome, newGoal])}
          />
          <CardDashboard 
          title="Despesas" value={`R$ ${totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          createGoal={goalExpenses} onAddGoal={(newGoal) => setGoalExpenses([...goalExpenses, newGoal])}
          />
          <CardDashboard 
          title="Investimentos" value={`R$ ${totalInvestments.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
          createGoal={goalInvestments} onAddGoal={(newGoal) => setGoalInvestments([...goalInvestments, newGoal])}
          />
        </div>
         
      </main>
    </div>
  );
};

export default Dashboard;


