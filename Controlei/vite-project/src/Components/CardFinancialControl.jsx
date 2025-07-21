import React, { useState } from 'react';

const CardFinancialControl = ({ title, description, transactions, toAdd }) => {
  const [showForm, setShowForm] = useState (false);
  const [who, setWho] = useState ('');
  const [company, setCompany] = useState ('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');

  const lidarEnvio = (e) => {
    e.preventDefault();
    if (!who || !company || !value || !date) return;

    toAdd({ who, company, value, date });
    setWho('');
    setCompany('');
    setValue('');
    setDate('');
    setShowForm(false);
  };

  return (
    <div className="CardFinancialControl">
      <h3>{title}</h3>
      <p>{description}</p>

     <button onClick={() => setShowForm(!showForm)} className="btn-receita">
        Adicionar {title}
      </button>

      {showForm && (
        <form onSubmit={lidarEnvio}>
          <input
            type="text" placeholder="Quem vai adicionar?" value={who} onChange={(e) => setWho(e.target.value)}
          />
          <input 
            type="text"  placeholder="Qual Empresa?" value={company} onChange={(e) =>setCompany(e.target.value)}
          />
          <input
            type="number"  placeholder="Preço"  value={value}  onChange={(e) => setValue(e.target.value)}
          />
          <input
            type='date' placeholder='Data' value={date} onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit" className="btn-receita">Salvar</button>
        </form>
      )}

      <ul>
        {(transactions || []).map((item, index) => (
          <li key={index}>
            {item.who}- {item.company}- R$ {item.value}- {item.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardFinancialControl;

