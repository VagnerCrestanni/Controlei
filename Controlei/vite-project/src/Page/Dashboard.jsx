import React, { use, useState } from 'react';
import { data, useOutletContext } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import AnnualData from '../Components/FakeData'
import '../Components/DashboardGraph'
import { getLastMonthsData } from '../Components/chartUtils';
import './Dashboard.css';
import CardDashboard from '../Components/CardDashboard';
import DashboardGraph from '../Components/DashboardGraph';

const Dashboard = () => {
  const [ period, setPeriod ] = useState (1);
  const [activeYear, setActiveYear] = useState ('2025')
  const chartData = getLastMonthsData(AnnualData, period) 

  const { income = [], expenses = [], investments = [] } = useOutletContext();
  
  const [goalIncome, setGoalIncome] = useState ([]);
  const [goalExpenses, setGoalExpenses] = useState ([]);
  const [goalInvestments, setGoalInvestments] = useState ([]);

  const totalIncome = income.reduce((acc, item) => acc + Number(item.value), 0);
  const totalExpenses = expenses.reduce((acc, item) => acc + Number(item.value), 0);
  const totalInvestments = investments.reduce((acc, item) => acc + Number(item.value), 0);

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


