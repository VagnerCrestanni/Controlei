import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateAccount.css';


const CreatAccount = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [erro, setErro] = useState('');

  const handleCriarConta = (e) => {
    e.preventDefault(); 

    if (!nome || !email || !senha || !confirmarSenha) {
      setErro('Todos os campos são obrigatórios.');
      return;
    }
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }
    setErro('');
    alert('Conta criada com sucesso!');
  };


  return (
    <div className='fundo-create-account'>
     <img src="/fundo-dark-blue.jpg" alt="fundo" className='imagem-fundo' />'
    
    <div className='overlay-create'>
     <form className='criar-conta' onSubmit={handleCriarConta}>
      <h1>Criar Conta</h1>
      <p>Preencha os dados abaixo para criar sua conta:</p>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      
      <div className='senha-container'>
      <input
        type="text" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)}
      />
      </div>

      <div className='senha-container'>
      <input
        type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
      />
      </div>
  
      <div className='senha-container'>
        <input
          type={mostrarSenha ? 'text' : 'password'} placeholder='Senha' className='input-style'
          value={senha} onChange={(e) => setSenha(e.target.value)}
        />
        <span
          className='toggle-senha' onClick={() => setMostrarSenha(!mostrarSenha)}
        >
          {mostrarSenha ? '🙈' : '👁️'}
        </span>
      </div>
  
      <div className='senha-container'>
        <input
          type={mostrarConfirmacao ? 'text' : 'password'} placeholder="Confirmar senha"
          className='input-style' value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
        <span
          className='toggle-senha'
          onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
        >
          {mostrarConfirmacao ? '🙈' : '👁️'}
        </span>
      </div>

      <br />

      <button className="botaoLoguin" type="submit">
        Criar Conta
      </button>
      <br />

      <Link to="/">Voltar para Login</Link>
    </form>
    </div>
    </div>
  );
};

export default CreatAccount;
