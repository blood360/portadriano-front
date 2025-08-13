import React from 'react';
import { Linkedin, Instagram, Phone } from 'lucide-react'; 
import './Home.css'; 

export default function Home() {
  return (
    <div className="page-container">
      <h1 className="page-title">Bem-vindo ao Meu Portfólio</h1>
      <div className="home-card">
        <div className="about-content">
          <div className="card">
            <div className="profile-photo-container">
              <img 
                src={'/images/perfil.jpg'} 
                alt="Minha Foto de Perfil" 
                className="profile-photo"
              />
            </div>
            <p className="card-description">
              Olá! Eu sou Adriano Santos
            </p>
          </div>
          
          <div className="about-text-wrapper">
            <div className="about-text-container">
              <p>
                Este portfólio é um espaço onde compartilho meus projetos, certificações e experiências. Explore as outras seções
                para saber mais sobre o que faço.
              </p>
            </div>
            <div className="social-links-container">
              <div className="social-card">
                <ul>
                  <li>
                    <a href="https://www.linkedin.com/in/adrianosantosenigner/" target="_blank" rel="noopener noreferrer">
                      <span className="iso-pro">
                        <Linkedin size={60} className="svg" />
                        <span className="text">LinkedIn</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/adriano_santosn?igsh=M2xjZ3A0ZWlsbWhz" target="_blank" rel="noopener noreferrer">
                      <span className="iso-pro">
                        <Instagram size={60} className="svg" />
                        <span className="text">Instagram</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/5521980867488" target="_blank" rel="noopener noreferrer">
                      <span className="iso-pro">
                        <Phone size={60} className="svg" />
                        <span className="text">WhatsApp</span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
