
import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">Controlei</div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/FinancialControl">Controle financeiro</Link>
        <Link to="/AnnualHistory">Historico Anual</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
