import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import './AdminLogin.css';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h1 className="login-title">Login Administrativo</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label className="form-field-label" htmlFor="username">Usuário</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-field-input"
              required
            />
          </div>
          <div>
            <label className="form-field-label" htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-field-input"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            <LogIn size={20} />
            Entrar
          </button>
        </form>
        <p className="login-disclaimer">
          ATENÇÃO! Somente pode ser acessado por mim!
        </p>
      </div>
    </div>
  );
}
