import React, { use, useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import '../Components/DashboardGraph'
import { getLastMonthsData, formatHistory } from '../Components/chartUtils';
import './Dashboard.css';
import CardDashboard from '../Components/CardDashboard';
import DashboardGraph from '../Components/DashboardGraph';
import { getSummary, getHistory, listGoals, createGoal } from '../services/api';

const Dashboard = () => {
  const [ period, setPeriod ] = useState (3); // Estado para armazenar o período selecionado (3, 6 ou 12 meses) do grafico
  const [activeYear, setActiveYear] = useState ('')
  const [chartData, setChartData] = useState([]); 

  const [goalIncome, setGoalIncome] = useState ([]);  // Estado para armazenar as metas de receita, despesa e investimento, que são passadas para o componente CardDashboard
  const [goalExpenses, setGoalExpenses] = useState ([]);
  const [goalInvestments, setGoalInvestments] = useState ([]);

const [summary, setSummary] = useState({ income: 0, expense: 0, investment: 0 }); // Estado para armazenar o resumo das transações, que é atualizado a cada vez que uma nova transação é adicionada
  const totalIncome = summary.income;
  const totalExpenses = summary.expense; 
  const totalInvestments = summary.investment; 

  const [refresh, setRefresh] = useState (0);

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

  useEffect(() => { // useEffect para buscar as metas do backend e atualizar os estados goalIncome, goalExpenses e goalInvestments
    async function fetchGoals() {
      const goals = await listGoals();
      setGoalIncome(goals.filter(goal => goal.type === 'income'));
      setGoalExpenses(goals.filter(goal => goal.type === 'expense'));
      setGoalInvestments(goals.filter(goal => goal.type === 'investment'));
    }
    fetchGoals();
  }, [refresh]);
  
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
          goalCreate={goalIncome} onAddGoal={(newGoal) => setGoalIncome([...goalIncome, newGoal])}
          refresh={refresh} setRefresh={setRefresh}
          />
          <CardDashboard 
          title="Despesas" value={`R$ ${totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          goalCreate={goalExpenses} onAddGoal={(newGoal) => setGoalExpenses([...goalExpenses, newGoal])}
          refresh={refresh} setRefresh={setRefresh}
          />
          <CardDashboard 
          title="Investimentos" value={`R$ ${totalInvestments.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
          goalCreate={goalInvestments} onAddGoal={(newGoal) => setGoalInvestments([...goalInvestments, newGoal])}
          refresh={refresh} setRefresh={setRefresh}
          />
        </div>
         
      </main>
    </div>
  );
};

export default Dashboard;


