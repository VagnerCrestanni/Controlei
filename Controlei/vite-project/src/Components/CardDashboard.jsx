import React, { useState } from 'react';
import { createGoal, putGoal, deleteGoal } from '../services/api';
import Modal from './modal';
import { Pencil, Trash2 } from "lucide-react";


  const typeMapper = {
      'Rendas': 'income',
      'Despesas': 'expense',
      'Investimentos': 'investment'
    }

    const emptyForm = { value: '', endDate: ''};

    const CardDashboard = ({ title, description, value, goalCreate, refresh, setRefresh }) => {
    const [modal, setModal] = useState(null);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [form, setForm] = useState(emptyForm);

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    }

    const closeModal = () => {
      setModal(null);
      setSelectedGoal(null);
      setForm(emptyForm);
    }

    const openAdd = () => {
      setModal('add');
      setSelectedGoal(null);
      setForm(emptyForm);
    }

    const openEdit = (goal) => {
      setModal('edit');
      setSelectedGoal(goal);
      setForm(goal);
    }

    const openDelete = (goal) => {
      setModal('delete');
      setSelectedGoal(goal);
    }

    // Lógica para enviar o formulário
    const handleSubmit = async (e) => {
      e.preventDefault();
      const { value, endDate } = form;

    const DateISO = new Date(endDate).toISOString(); // Converter a data para o formato ISO 8601

    const TransactionType = typeMapper[title] || 'unknown';
    const newGoal = {
      value: parseFloat(value),
      endDate: DateISO,
      type: TransactionType
    };

    if (modal === 'add') {
      await createGoal(newGoal);
    } else if (modal === 'edit') {
      await putGoal(selectedGoal.id, newGoal);
    } else if (modal === 'delete') {
      await deleteGoal(selectedGoal.id);
    }
    closeModal();
    setRefresh(!refresh); // Atualiza a lista de metas após a operação
  }

  const handleDelete = async (goal) => {
    await deleteGoal(goal.id);
    closeModal();
    setRefresh(!refresh); // Atualiza a lista de metas após a exclusão
  }


  return (
    <div className="card-dashboard">
      <h3>{title}</h3>
      <h2>{value}</h2>

      <button onClick={()=> openAdd()} className="btn-meta">
        Adicionar meta</button>

        <ul>
          {(goalCreate || []).map((create, index) => (
            <li className="goal-item" key={index}>
              <span className="goal-info">
                <strong>Meta:</strong> 
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(create.value)}
                até {new Intl.DateTimeFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(new Date(create.endDate))}
                </span>
                <div className="goal-actions">
                  <button className="btn-edit" onClick={() => openEdit(create)}>
                    <Pencil size={15} />
                    Editar
                  </button>
                  <button className="btn-delete" onClick={() => openDelete(create)}>
                    <Trash2 size={15} />
                    Excluir
                  </button>
                </div>
              </li>
            ))}
        </ul>

        {(modal === 'add' || modal === 'edit') && (
          <Modal
            title={modal === 'add' ? `Adicionar ${title}` : `Editar ${title}`}
            onClose={closeModal}
            >
            <form onSubmit={handleSubmit}>
              <p>{description}</p>
                <input type="number" placeholder='Valor da meta' name="value" value={form.value} onChange={handleChange}
                />
                <input type="Date" placeholder='Data de fim' name="endDate" value={form.endDate} onChange={handleChange}
                />
                <button type="submit" className="btn-meta">Salvar</button>
            </form>
           </Modal>
        )}

        {modal === 'delete' && (
          <Modal title="Confirmar Exclusão" onClose={closeModal}>
            <p style={{ color: '#444444', fontSize: '15px' }}>
              Tem certeza que deseja excluir esta meta?
              </p>
              <div className="modal-actions-container">
              <button onClick={() => handleDelete(selectedGoal)} className="btn-perigo">
                Confirmar Exclusão</button>
              <button onClick={closeModal} className="btn-cancelar">
                Cancelar
              </button>
              </div>
          </Modal>
        )}
    </div>
  );
};

export default CardDashboard;