import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Sidebar from '../Components/Sidebar'
import "./FinancialControl.css"
import CardFinancialControl from '../Components/CardFinancialControl';
import { listTransactions } from '../services/api';

 const FinancialControl = () => {
  const {
    income,
    setIncome,
    expenses,
    setExpenses,
    investments,
    setInvestments
  } = useOutletContext();

  useEffect(() => {  //Carregar as transações ao abrir a pagina
    async function fetchTransactions() {
      const data = await listTransactions();
      setIncome(data.filter(transactions => transactions.type === 'income'))
      setExpenses(data.filter(transactions => transactions.type === 'expense'))
      setInvestments(data.filter(transactions => transactions.type === 'investment'))
    }
    fetchTransactions();
  }, []);

  return (
    <div className='FinancialControl-container'>
      <Sidebar/>
      <main className='FinancialControl-content'>
      <h1>Controle financeiro</h1>
        <div className="cards-container">
          <CardFinancialControl
          title = "Renda" description = "Valores depositados" transactions = {income}
          />
          <CardFinancialControl
          title="Despesas" description = "contas pagas" transactions = {expenses}
          />
          <CardFinancialControl
          title="Investimentos" description = "Valores investidos" transactions = {investments}
          />
        </div>
      </main>
     </div>
  );
};

export default FinancialControl;
