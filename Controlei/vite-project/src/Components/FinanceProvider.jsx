import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

function FinanceProvider() {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [investments, setInvestments] = useState([]);

  return (
    <Outlet context={{
      income,
      setIncome,
      expenses,
      setExpenses,
      investments,
      setInvestments
    }} />
  );
}

export default FinanceProvider;