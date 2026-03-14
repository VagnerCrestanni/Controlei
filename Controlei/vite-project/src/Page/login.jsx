import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { FiEyeOff, FiEye  } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');
  const [showPassword, setShowPassword]=useState (false);
  const navigate=useNavigate();

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = () => {
    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }
    if (!validarEmail(email)) {
      setError('Digite um email válido.');
      return;
    }
    setError('');
    alert('Login realizado!');
    navigate('/Dashboard');
  };

  return (
    <div className='fundo-login'>
      <img src="/paisagem.jpg" alt="Paisagem" className='imagem-fundo'/>
      <div className="overlay-login">
      <div className="login">
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
          value={email} 
          onChange={(e) => 
          setEmail(e.target.value)}
        />
        <br />

        <div className="senha-container">
        <input
          type={showPassword?"text" : "password"}  
          placeholder="Senha" 
          className="input-style" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
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
        <button className="botaoLoguin" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
    </div>
  );
};

export default Login;
