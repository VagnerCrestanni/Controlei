import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login';
import CreateAccount from './CreateAccount';
import ForgotPassword from './ForgotPassword';
import Dashboard from './Page/Dashboard';
import FinancialControl from './Page/FinancialControl';
import AnnualHistory from './Page/AnnualHistory';
import FinanceProvider from './Components/FinanceProvider';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/criar-conta" element={<CreateAccount />} />
        <Route path="/esqueci-senha" element={<ForgotPassword />} />

        {/* Rotas protegidas com contexto financeiro */}
        <Route element={<FinanceProvider />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/financialControl" element={<FinancialControl />} />
          <Route path="/annualHistory" element={<AnnualHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

 export default App;