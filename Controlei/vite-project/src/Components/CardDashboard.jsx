import React, { useState } from 'react';

const CardDashboard = ({ title, value, description, createGoal = [], onAddGoal}) => {
   const [showForm, setShowForm] = useState (false);
   const [valueGoal, setValueGoal] = useState ('');
   const [date, setDate] = useState ('');

   const lidarEnvio = (e) => {
    e.preventDefault();
    if (!valueGoal || !date) return;

    onAddGoal ({valueGoal, date});
    setValueGoal('');
    setDate('');
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
        {createGoal
          .filter((create) => new Date (create.date) >- new Date ())
          .map((create, index) => (
            <li key={index}>
            <strong>Meta:</strong> R$ {create.valueGoal} – até {create.date}
            </li>
          ))}
       </ul>

    </div>
  );
};

export default CardDashboard;
