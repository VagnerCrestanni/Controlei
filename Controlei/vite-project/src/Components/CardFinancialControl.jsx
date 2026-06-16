import React, { useState } from 'react';
import { createTransaction } from '../services/api';

const CardFinancialControl = ({ title, description, transactions, refresh, setRefresh }) => {
  const [showForm, setShowForm] = useState (false);
  const [who, setWho] = useState ('');
  const [company, setCompany] = useState ('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');

  const lidarEnvio = async (e) => {
    e.preventDefault();
    //Mapeamento dos tipos de transação para o formato esperado pela API
    const typeMapper = {
      'Renda': 'income',
      'Despesas': 'expense',
      'Investimentos': 'investment'
    }
 
    if (!who || !company || !value || !date) return;

    const dateISO = new Date(date).toISOString(); // Converter a data para o formato ISO 8601

    const transactionType = typeMapper[title] || 'unknown';
    const newTransaction = { // Mapear os campos do formulário para os campos esperados pela API
      who, 
      company, 
      value: parseFloat(value),
      date: dateISO,
      type: transactionType };

    await createTransaction(newTransaction);
    setWho('');
    setCompany('');
    setValue('');
    setDate('');
    setShowForm(false);
    setRefresh(prev => prev + 1); // Atualiza a lista de transações após adicionar uma nova transação, forçando o useEffect a recarregar os dados do backend
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
            {item.who}- {item.company}- R$ {item.value}- {(new Date(item.date).toLocaleDateString())} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardFinancialControl;

