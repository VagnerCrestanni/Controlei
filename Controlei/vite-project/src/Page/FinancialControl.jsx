import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Sidebar from '../Components/Sidebar'
import "./FinancialControl.css"
import CardFinancialControl from '../Components/CardFinancialControl';

 const FinancialControl = () => {
  const {
    income,
    setIncome,
    expenses,
    setExpenses,
    investments,
    setInvestments
  } = useOutletContext();
   
    const AddIncome = (newIncome) => {
      setIncome([...(income || []), newIncome]);
    }
    
    const AddExpenses = (newExpenses) => {
       setExpenses([...(expenses || []), newExpenses]);
    }

    const AddInvestments = (newInvestments) => {
        setInvestments([...(investments || []), newInvestments]);
    }

  return (
    <div className='FinancialControl-container'>
      <Sidebar/>
      <main className='FinancialControl-content'>
      <h1>Controle financeiro</h1>
        <div className="cards-container">
          <CardFinancialControl
          title = "Renda" description = "Valores depositados" transactions = {income} toAdd = {AddIncome}
          />
          <CardFinancialControl
          title="Despesas" description = "contas pagas" transactions = {expenses} toAdd = {AddExpenses}
          />
          <CardFinancialControl
          title="Investimentos" description = "Valores investidos" transactions = {investments} toAdd = {AddInvestments}
          />
        </div>
      </main>
     </div>
  );
};

export default FinancialControl;













