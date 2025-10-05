import React, { Fragment, useState } from 'react';
import Sidebar from '../Components/Sidebar'
import AnnualData from '../Components/FakeData'
import '../Components/HistoricalGraph'
import "./AnnualHistory.css"
import HistoricalGraph from '../Components/HistoricalGraph';
import { data } from 'react-router-dom';

const AnnualHistory = () => {
  
  const [activeYear, setActiveYear] = useState(
  Object.keys(AnnualData).sort((a, b) => b - a)[0]
  );

  const toggleYear = (year) => {
    setActiveYear(prevYear => prevYear === year ? null : year);
  };

   const format = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

   const dataForGraph = activeYear ? AnnualData[activeYear].months : {};

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
              {Object.keys(AnnualData)
                .sort((a, b) => b - a)
                .map((year) => (
                  <Fragment key={year}>
                    <tr onClick={() => toggleYear(year)} className="year-row">
                      <td className="year-cell">{year}</td>
                      <td>{format(AnnualData[year].total.Income)}</td>
                      <td>{format(AnnualData[year].total.Expenses)}</td>
                      <td>{format(AnnualData[year].total.Investments)}</td>
                    </tr>
                    {activeYear === year &&
                      Object.entries(AnnualData[year].months).map(([month, dataMonth]) => (
                        <tr key={`${year}-${month}`} className="month-row">
                          <td className="month-cell">{month}</td>
                          <td>{format(dataMonth.Income)}</td>
                          <td>{format(dataMonth.Expenses)}</td>
                          <td>{format(dataMonth.Investments)}</td>
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
