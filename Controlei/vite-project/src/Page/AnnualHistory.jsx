import React, { Fragment, useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar'
import AnnualData from '../Components/FakeData'
import '../Components/HistoricalGraph'
import "./AnnualHistory.css"
import HistoricalGraph from '../Components/HistoricalGraph';
import { getHistory } from '../services/api';

const AnnualHistory = () => {
  
  const [history, setHistory] = useState({}); // Estado para armazenar o histórico das transações

  useEffect(() => { // useEffect para buscar o histórico das transações do backend e atualizar o estado history
    async function fetchHistory() {
      const dataHistory = await getHistory();

      const historyFormatted = {};
      Object.keys(dataHistory).forEach((key) => {

        const [year, month] = key.split('-');
        
        if (!historyFormatted[year]) {  //cria o grupo de ano e meses se não existir, e inicializa os valores de receita, despesa e investimento como 0
          historyFormatted[year] = {
            total: { Income: 0, Expenses: 0, Investments: 0 }, months: {}
          }; 
        }
        historyFormatted[year].months[month] = {    // Formata os dados do histórico para exibir no gráfico e na tabela
          income: dataHistory[key].income,
          expenses: dataHistory[key].expense,
          investments: dataHistory[key].investment,
        }
        historyFormatted[year].total.Income += dataHistory[key].income;   // Soma os valores de receita, despesa e investimento para cada ano
        historyFormatted[year].total.Expenses += dataHistory[key].expense;
        historyFormatted[year].total.Investments += dataHistory[key].investment;
      });
      setHistory(historyFormatted);
    }
       fetchHistory();
  }, []); 

  const [activeYear, setActiveYear] = useState(
  Object.keys(history).sort((a, b) => b - a)[0]
  );

  const toggleYear = (year) => {
    setActiveYear(prevYear => prevYear === year ? null : year);
  };

   const format = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

   const dataForGraph = activeYear
    ? Object.entries(history[activeYear].months).map(([month, dataMonth]) => {

      const date =  new Date(activeYear, month - 1);
      const monthLabel = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date);
      const monthCapitalized = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);
      return {

        label: monthCapitalized,
        Receita: dataMonth.income,      
        Despesa: dataMonth.expenses,    
        Investimento: dataMonth.investments, 
      };
    })
    : [];

  return (
    <div className="AnnualHistory-container">
      <Sidebar />
      <main className="AnnualHistory-content">
        <div className="header-container">
          <h1>Histórico Anual</h1>
          
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr className="table-header-row">
                <td></td>
                <td>Receita</td>
                <td>Despesa</td>
                <td>Investimento</td>
              </tr>
            </thead>
            <tbody>
              {Object.keys(history)
                .sort((a, b) => b - a)
                .map((year) => (
                  <Fragment key={year}>
                    <tr onClick={() => toggleYear(year)} className="year-row">
                      <td className="year-cell">{year}</td>
                      <td>{format(history[year].total.Income)}</td>
                      <td>{format(history[year].total.Expenses)}</td>
                      <td>{format(history[year].total.Investments)}</td>
                    </tr>
                    {activeYear === year &&
                      Object.entries(history[year].months).map(([month, dataMonth]) => (
                        <tr key={`${year}-${month}`} className="month-row">
                          <td className="month-cell">
                            {(() => {                 // Formata o mês para exibir o nome do mês em português com a primeira letra maiúscula
                            const name = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date(year, month - 1));
                            return name.charAt(0).toUpperCase() + name.slice(1);
                             })()}
                          </td>
                          <td>{format(dataMonth.income)}</td>
                          <td>{format(dataMonth.expenses)}</td>
                          <td>{format(dataMonth.investments)}</td>
                        </tr>
                      ))}
                  </Fragment>
                ))}
            </tbody>
          </table>
        </div>
        <HistoricalGraph monthlyData={dataForGraph} activeYear={activeYear} />
      </main>
    </div>
  );
};

export default AnnualHistory
