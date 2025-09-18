import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login';
import CreateAccount from './CreateAccount';
import ForgotPassword from './ForgotPassword';
import Dashboard from './Page/Dashboard';
import FinancialControl from './Page/FinancialControl';
import AnnualHistory from './Page/AnnualHistory';
import FinanceProvider from './Components/FinanceProvider';

import ObjectKeysExerc1 from './treinosLogica/ObjectKeysExerc1';
import ObjectEntriesExerc1 from './treinosLogica/ObjectEntriesExerc1';


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

          {/* Rotas para treinos */}
          <Route path='Treino1' element={<ObjectKeysExerc1 />} />
          <Route path='Treino2' element={<ObjectEntriesExerc1 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

 export default App;