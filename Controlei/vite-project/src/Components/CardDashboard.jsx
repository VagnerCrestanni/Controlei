import React, { useState } from 'react';
import { createGoal } from '../services/api';

const CardDashboard = ({ title, value, description, refresh, setRefresh, goalCreate = [],}) => {
   const [showForm, setShowForm] = useState (false);
   const [valueGoal, setValueGoal] = useState ('');
   const [date, setDate] = useState ('');

   const lidarEnvio = async (e) => {
    e.preventDefault();
    console.log("createGoal é:", createGoal)
    const typeMapper = {
      'Receitas': 'income',
      'Despesas': 'expense',
      'Investimentos': 'investment'
    }

    if (!valueGoal || !date) return;

   const goalType = typeMapper[title] || 'unknown'; // Mapeamento do tipo de meta com base no título do cartão
   const newGoal = {
    value: parseFloat(valueGoal),
    endDate: new Date(date).toISOString(),
    type: goalType
   };

    await createGoal(newGoal); // Chamada da função createGoal para enviar a nova meta para o backend
    setValueGoal ('');
    setDate ('');
    setShowForm (false);
    setRefresh(prev => prev + 1); // Atualiza a lista de metas após adicionar uma nova meta, forçando o useEffect a recarregar os dados do backend
   
  };

  return (
    <div className="card-dashboard">
      <h3>{title}</h3>
      <h2>{value}</h2>

      <button onClick={()=> setShowForm(!showForm)} className="btn-meta">Adiconar meta</button>
      
      {showForm && (
        <form onSubmit={lidarEnvio}>
          <p>{description}</p>
          <input type="number" placeholder='Valor da meta' value={valueGoal} onChange={(e) => setValueGoal(e.target.value)}
          />
          <input type="Date" placeholder='Data de fim' value={date} onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit" className="btn-meta">Salvar</button>
        </form>
      )}
      
       <ul>
        {goalCreate
          .filter((create) => new Date (create.endDate) >- new Date ())
          .map((create, index) => (
            <li key={index}>
            <strong>Meta:</strong> R$ {create.value} – até {new Intl.DateTimeFormat('pt-BR').format(new Date(create.endDate))}
            </li>
          ))}
       </ul>

    </div>
  );
};

export default CardDashboard;
