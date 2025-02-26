import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { useAuth } from '@auth/model/AuthProvider';  
import "./Login.css"
const Login = () => {
  const { login } = useAuth();  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [error, setError] = useState('');  
  const navigate = useNavigate(); 
  const location = useLocation(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    setError('');
    login(username);  
    const from = location.state?.from || '/'; 

    navigate(from);  
  };

  return (
    <div className="login-page">
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Логин</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите логин"
          />
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}  
        <button className="login" type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
