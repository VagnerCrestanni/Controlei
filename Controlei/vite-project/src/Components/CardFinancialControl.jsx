import React, { useState } from 'react';
import { createTransaction, putTransaction, deleteTransaction } from '../services/api';
import Modal from './modal';

 
    const typeMapper = { //Mapeamento dos tipos de transação para o formato esperado pela API
      'Renda': 'income',
      'Despesas': 'expense',
      'Investimentos': 'investment'
    }
 
    const emptyForm = { who: '', company: '', value: '', date: '' }; 

    const CardFinancialControl = ({ title, description, transactions, refresh, setRefresh }) => {
    const [modal, setModal] = useState(null);
    const [selectedTransaction, setSelectedTransaction] = useState(null); //transação clicada (editar/excluir)
    const [form, setForm] = useState(emptyForm);    // campos do formulário

    const handleChange = (e) => { // Atualiza o estado do formulário com os valores digitados pelo usuário
      setForm({ ...form, [e.target.name]: e.target.value });
    }
    
    const closeModal = () => { // Fecha o modal de edição/exclusão
      setModal(null);
      setSelectedTransaction(null);
      // Limpa o formulário ao fechar o modal
      setForm(emptyForm);
    }

    const openAdd = () => { // Abre o modal de adição de transação
      setModal('add');
      setSelectedTransaction(null);
      setForm(emptyForm);
    }

    const openEdit = (transaction) => {
      setModal('edit');
      setSelectedTransaction(transaction);
      setForm(transaction); // Preenche o formulário com os dados da transação selecionada
    }

    const openDelete = (transaction) => { // Abre o modal de exclusão de transação
      setModal('delete');
      setSelectedTransaction(transaction);
    }

    const handleSubmit = async (e) => { // Lida com o envio do formulário
      e.preventDefault();
      const { who, company, value, date } = form;

      const dateISO = new Date(date).toISOString(); // Converter a data para o formato ISO 8601
      
      const transactionType = typeMapper[title] || 'unknown';
      const newTransaction = { // Mapear os campos do formulário para os campos esperados pela API
        who,
        company,
        value: parseFloat(value),
        date: dateISO,
        type: transactionType
      };

  if (modal === 'add') {
    await createTransaction(newTransaction);
  } else if (modal === 'edit') {
    await putTransaction(selectedTransaction.id, newTransaction);
  } else if (modal === 'delete') {
    await deleteTransaction(selectedTransaction.id);
  }
  closeModal();
  setRefresh(prev => prev + 1); // Atualiza a lista de transações após adicionar, editar ou excluir uma transação
}

  const handleDelete = async () => { // Lida com a exclusão de uma transação
    await deleteTransaction(selectedTransaction.id);
    closeModal();
    setRefresh(prev => prev + 1); // Atualiza a lista de transações após excluir uma transação
  }


  return (
    <div className="CardFinancialControl">
      <h3>{title}</h3>
      <p>{description}</p>

     <button onClick={() => openAdd()} className="btn-receita">
        Adicionar {title}
      </button>

      <ul>
        {(transactions || []).map((item, index) => (
          <li key={index}>
            {item.who}- {item.company}- R$ {item.value}- 
            {(new Intl.DateTimeFormat('pt-BR').format(new Date(item.date)))} 
            <button onClick={() => openEdit(item)}>Editar</button>
            <button onClick={() => openDelete(item)}>Excluir</button>
          </li>
        ))}
      </ul>
      
      {(modal === 'add' || modal === 'edit') && ( // Modal de adição/edição de transação
        <Modal
          title={modal === 'add' ? `Adicionar ${title}` : `Editar ${title}`}
          onClose={closeModal}
        >
          <form onSubmit={handleSubmit}>
            <input
              name="who" type="text" placeholder="Quem vai adicionar?" value={form.who} onChange={handleChange}
            />
            <input 
              name="company" type="text"  placeholder="Qual Empresa?" value={form.company} onChange={handleChange}
            />
            <input
              name="value" type="number"  placeholder="Preço"  value={form.value}  onChange={handleChange}
            />
            <input
              name="date" type="date" value={form.date} onChange={handleChange}
            />
            <button type="submit" className="btn-receita">Salvar</button>
          </form>
        </Modal>
      )}

      {modal === 'delete' && ( // Modal de confirmação de exclusão
        <Modal title="Confirmar Exclusão" onClose={closeModal}>
          <p>Tem certeza que deseja excluir esta transação?</p>
          <button onClick={handleDelete} className="btn-perigo">Confirmar Exclusão</button>
          <button onClick={closeModal}>Cancelar</button>
        </Modal>
      )}
    </div>
  );
};

export default CardFinancialControl;

