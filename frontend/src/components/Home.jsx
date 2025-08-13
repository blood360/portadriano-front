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
                Seja bem-vindo(a) ao meu espaço digital, onde transformo ideias em soluções. Este portfólio é um resumo do meu percurso, um lugar onde compartilho os projetos que desenvolvi, as habilidades que aprimorei e as certificações que conquistei.

                Pra ver o que eu faço, navegue pelas outras seções pra conhecer um pouco mais sobre minha jornada. Tá tudo organizado pra lhe dar uma visão completa das minhas experiências e como posso agregar valor ao seu time.
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
