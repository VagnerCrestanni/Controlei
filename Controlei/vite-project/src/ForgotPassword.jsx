import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateAccount.css';
import { FiEyeOff, FiEye  } from "react-icons/fi";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleRedefinirSenha = (e) => {
    e.preventDefault();

    if (!email || !novaSenha || !confirmarNovaSenha) {
      setErro('Todos os campos são obrigatórios.');
      return;
    }
    if (novaSenha !== confirmarNovaSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    setErro('');
    setSucesso('Senha redefinida com sucesso!');
    alert('Sua senha foi redefinida! Você será redirecionado para o login.');
  };

  return (
    <div className='fundo-create-account'>
     <img src="/fundo-dark-blue.jpg" alt="fundo" className='imagem-fundo' />'
    
    <div className='overlay-create'></div>
    <form className="login" onSubmit={handleRedefinirSenha}>
      <h1>Esqueci Minha Senha</h1>
      <p>Preencha os dados abaixo para redefinir sua senha:</p>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}

      {/* Campo de E-mail */}
      <div className='senha-container'>
      <input
        type="email" placeholder="Digite seu e-mail" className="input-style" 
        value={email} onChange={(e) => setEmail(e.target.value)}
      />
      </div>
  

      {/* Campo de Nova Senha */}
      <div className="senha-container">
        <input
          type={mostrarNovaSenha? 'text' : 'password'} 
          placeholder="Nova Senha" className="input-style" value={novaSenha} 
          onChange={(e) => setNovaSenha(e.target.value)}
        />
        <span
            className='toggle-senha'
            onClick={()=> setMostrarNovaSenha(!mostrarNovaSenha)}
            >
                {mostrarNovaSenha ? <FiEye /> : <FiEyeOff />}
                </span> 
      </div>

      {/* Campo de Confirmar Nova Senha */ }
      <div className="senha-container">
        <input
          type={mostrarConfirmacao?'text' : 'password'}
          placeholder="Confirmar Nova Senha" className="input-style" value={confirmarNovaSenha}
          onChange={(e) => setConfirmarNovaSenha(e.target.value)}
        />
         <span
          className="toggle-senha"
          onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
        >
          {mostrarConfirmacao ? <FiEye /> : <FiEyeOff />}
        </span>
      </div>

      <button className="botaoLoguin" type="submit">
        Redefinir Senha
      </button>
    <br/>

      <Link to="/">Voltar para Login</Link>
    </form>
    </div>
    
  );
};

export default ForgotPassword;
