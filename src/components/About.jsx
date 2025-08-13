import React from 'react';
import { Atom, Code, GitBranch, Database, Terminal, Coffee } from 'lucide-react';
import './About.css';

export default function About() {
  return (
    <div className="page-container about-layout">
      <h1 className="page-title">Sobre Mim</h1>
      
      <div className="about-card">
        <h2 className="card-title">Minha História</h2>
        <p>
          Olá! Eu sou o Adriano Santos, um desenvolvedor full-stack apaixonado por tecnologia e em constante aprendizado. Atualmente, estou cursando Engenharia de Software na Universidade Cruzeiro do Sul, onde aprofundo meus conhecimentos em teoria e práticas de desenvolvimento. Em paralelo, estou me dedicando ao bootcamp de Desenvolvimento de Software do Boticário e a diversos cursos online, como os oferecidos pelo Curso em Vídeo, que me deram uma base sólida em programação.
        </p>
        <p>
          Minha jornada começou com o aprendizado autodidata em Python, HTML, CSS e JavaScript, e hoje me sinto à vontade para criar soluções inovadoras que unem funcionalidade e design. Busco sempre evoluir e estar por dentro das novas tendências do mercado, com foco em segurança da informação e na construção de softwares robustos.
        </p>
      </div>

      <div className="skills-card">
        <h2 className="card-title">Habilidades e Tecnologias</h2>
        <div className="skills-grid">
          <div className="skill-item">
            <Coffee size={40} className="skill-icon" />
            <p>JavaScript</p>
          </div>
          <div className="skill-item">
            <Code size={40} className="skill-icon" />
            <p>HTML & CSS</p>
          </div>
          <div className="skill-item">
            <Atom size={40} className="skill-icon" />
            <p>React</p>
          </div>
          <div className="skill-item">
            <Terminal size={40} className="skill-icon" />
            <p>Python</p>
          </div>
          <div className="skill-item">
            <Database size={40} className="skill-icon" />
            <p>PostgreSQL</p>
          </div>
          <div className="skill-item">
            <Database size={40} className="skill-icon" />
            <p>PGAdmin</p>
          </div>
          <div className="skill-item">
            <GitBranch size={40} className="skill-icon" />
            <p>Git</p>
          </div>
        </div>
      </div>
    </div>
  );
}
