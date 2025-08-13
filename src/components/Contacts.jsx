import React, { useState } from 'react';
import { Linkedin, Instagram, Phone, Github } from 'lucide-react';
import './Contacts.css';

export default function Contacts({ showNotification }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    showNotification('Mensagem enviada com sucesso!', 'success');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="page-container contact-layout">
      <h1 className="page-title">Entre em Contato</h1>
      <div className="contact-content">
        <div className="contact-card contact-form-card">
          <h2 className="card-title">Formulário de Contato</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label className="form-label" htmlFor="name">Nome</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">Mensagem</label>
              <textarea name="message" id="message" rows="5" value={formData.message} onChange={handleInputChange} className="form-textarea" required></textarea>
            </div>
            <button type="submit" className="submit-button">Enviar Mensagem</button>
          </form>
        </div>
        
        <div className="contact-card social-info-card">
          <h2 className="card-title">Informações de Contato</h2>
          <p>
            Se você tem uma ideia de projeto e precisa de um profissional qualificado, entre em contato comigo. Siga abaixo minhas redes sociais!
          </p>
          <div className="social-icons-wrapper">
            <div className="social-icons-container">
              <a href="https://wa.me/5521980867488" target="_blank" rel="noopener noreferrer">
                <Phone size={30} className="social-icon" />
              </a>
              <a href="https://www.linkedin.com/in/adrianosantosenigner/" target="_blank" rel="noopener noreferrer">
                <Linkedin size={30} className="social-icon" />
              </a>
              <a href="https://www.instagram.com/adriano_santosn?igsh=M2xjZ3A0ZWlsbWhz" target="_blank" rel="noopener noreferrer">
                <Instagram size={30} className="social-icon" />
              </a>
              <a href="https://github.com/seu-usuario" target="_blank" rel="noopener noreferrer">
                <Github size={30} className="social-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
