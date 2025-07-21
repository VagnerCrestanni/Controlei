import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import './Dashboard.css';
import CardDashboard from '../Components/CardDashboard';

const Dashboard = () => {
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


