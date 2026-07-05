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

  const [refresh, setRefresh] = useState(0); //atualiza a cada vez que uma nova transação é adicionada

  useEffect(() => {  //Carregar as transações ao abrir a pagina
    async function fetchTransactions() {
      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();

      const data = await listTransactions(currentMonth, currentYear);
      setIncome(data.filter(transactions => transactions.type === 'income'))
      setExpenses(data.filter(transactions => transactions.type === 'expense'))
      setInvestments(data.filter(transactions => transactions.type === 'investment'))
    } 
    fetchTransactions();
  }, [refresh]);

  return (
    <div className='FinancialControl-container'>
      <Sidebar/>
      <main className='FinancialControl-content'>
      <h1>Controle financeiro</h1>
        <div className="cards-container">
          <CardFinancialControl
          title = "Renda" description = "Valores depositados" transactions = {income} refresh={refresh} setRefresh={setRefresh}
          />
          <CardFinancialControl
          title="Despesas" description = "contas pagas" transactions = {expenses} refresh={refresh} setRefresh={setRefresh}
          />
          <CardFinancialControl
          title="Investimentos" description = "Valores investidos" transactions = {investments} refresh={refresh} setRefresh={setRefresh}
          />
        </div>
      </main>
     </div>
  );
};

export default FinancialControl;
