import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateAccount.css';
import { FiEyeOff, FiEye  } from "react-icons/fi";
import { registerUser} from '../services/api';

const CreateAccount = () => {
  
  const navigate = useNavigate(); //Estado para redirecionar para a página de login
  const [registerData, setRegisterData] = useState({ //Estado para dados do banco de dados do formulário de registro
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [mostrarSenha, setMostrarSenha] = useState(false); //Estado para mostrar ou ocultar a senha
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const [erro, setErro] = useState(''); //Estado para mensagem de erro
  const [successMessage, setSuccessMessage] = useState(''); //Estado para mensagem de sucesso
 
  const handleCriarConta = async (e) => {
    e.preventDefault(); 
    setErro(''); //Limpa a mensagem de erro antes de validar os campos

    if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      setErro('Todos os campos são obrigatórios.');
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setErro('As senhas não coincidem.');
      return;
    }
    try {
      await registerUser({ //chama a função importada de api.js
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      });
      setSuccessMessage('Conta criada com sucesso!'); //Mensagem de sucesso
      setRegisterData({ name: '', email: '', password: '', confirmPassword: '' }); //Limpa os campos do formulário

      setTimeout(() => {
        navigate('/'); //Redireciona para a página de login após 2 segundos
      }, 1500) //redireciona para a página de login após 1,5 segundos

      } catch (error) {
      setErro(error.message || 'Erro ao criar conta.'); //Exibe a mensagem de erro retornada pelo backend
    }
  };


  return (
    <div className='fundo-create-account'>
     <img src="/fundo-dark-blue.jpg" alt="fundo" className='imagem-fundo' />'
    
    <div className='overlay-create'>
     <form className='criar-conta' onSubmit={handleCriarConta}>
      <h1>Criar Conta</h1>
      <p>Preencha os dados abaixo para criar sua conta:</p>

      {erro && <p style={{ color: 'red' }}>{erro}</p>} 

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} 
      
      <div className='senha-container'>
      <input
        type="text" placeholder="Nome completo" value={registerData.name} 
        onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
      />
      </div>

      <div className='senha-container'>
      <input
        type="email" placeholder="Email" value={registerData.email} 
        onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
      />
      </div>
  
      <div className='senha-container'>
        <input
          type={mostrarSenha ? 'text' : 'password'} placeholder='Senha' className='input-style'
          value={registerData.password} onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
        />
        <span
          className='toggle-senha' onClick={() => setMostrarSenha(!mostrarSenha)}
        >
          {mostrarSenha ? <FiEye /> : <FiEyeOff />}
        </span>
      </div>
  
      <div className='senha-container'>
        <input
          type={mostrarConfirmacao ? 'text' : 'password'} placeholder="Confirmar senha"
          className='input-style' value={registerData.confirmPassword} 
          onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
        />
        <span
          className='toggle-senha'
          onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
        >
          {mostrarConfirmacao ? <FiEye /> : <FiEyeOff />}
        </span>
      </div>

      <br />

      <button className="botaoLogin" type="submit">
        Criar Conta
      </button>
      <br />

      <Link to="/">Voltar para Login</Link>
    </form>
    </div>
    </div>
  );
};

export default CreateAccount;
