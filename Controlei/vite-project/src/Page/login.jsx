import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { FiEyeOff, FiEye  } from "react-icons/fi";
import { loginUser } from '../services/api';

const Login = () => {
  const [loginData, setLoginData] = useState({ //estado para dados do formulário de login
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword]=useState (false); //estado para mostrar ou ocultar a senha

  const [error, setError] = useState(''); //estado para mensagem de erro
  const [successMessage, setSuccessMessage] = useState(''); //estado para mensagem de sucesso

  const navigate=useNavigate(); //estado para redirecionar para a página de dashboard

  const validarEmail = (loginEmail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail);

  const handleLogin = async () => {
    setError(''); //limpa a mensagem de erro antes de validar os campos

    if (!loginData.email || !loginData.password) {
      setError('Preencha todos os campos.');
      return;
    }
    if (!validarEmail(loginData.email)) {
      setError('Digite um email válido.');
      return;
    }

    try {
      const response = await loginUser({ //chama a função importada de api.js
        email: loginData.email,
        password: loginData.password,
      });
      localStorage.setItem('userEmail', loginData.email); //armazena o email do usuário no localStorage
      localStorage.setItem('token', response.token); //armazena o token do usuário no localStorage

      setSuccessMessage('Login realizado com sucesso!'); //mensagem de sucesso
     
      setLoginData({ email: '', password: '' }); //limpa os campos do formulário

      navigate('/Dashboard'); //Redireciona para a página de dashboard após o login bem-sucedido
    } catch (error) {
      setError(error.message || 'Erro ao realizar login.'); //exibe a mensagem de erro retornada pelo backend
    }
  };

  return (
    <div className='fundo-login'>
      <img src="/paisagem.jpg" alt="Paisagem" className='imagem-fundo'/>

      <div className="overlay-login">
      <div className="login">
        <form className="formulario-login" noValidate onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <h1>Controlei</h1>
        <p>Entrar no Controlei Web</p>
        Novo usuário?{' '}
        <Link className="CrieConta__link" to="/criar-conta">
          Crie uma conta
        </Link>
        <br />

        <input
          type="email"  
          placeholder="Email"  
          className="input-style" 
          value={loginData.email} 
          onChange={(e) => 
          setLoginData({...loginData, email: e.target.value})}
        />
        <br />

        <div className="senha-container">
        <input
          type={showPassword?"text" : "password"}  
          placeholder="Senha" 
          className="input-style" 
          value={loginData.password} 
          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
        />
        <br />
  
        <span
        className="toggle-senha" onClick={() => setShowPassword(!showPassword)}
         >
            {showPassword ? <FiEye /> : <FiEyeOff />}
        </span>
        </div>

        <a className="EsqueciSenha__link" href="/Esqueci-Senha">
          Esqueci minha Senha
        </a>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>} 

        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} 

        <button type="submit" className="botaoLogin">
          Entrar
        </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
