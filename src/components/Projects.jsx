import React from 'react';
import { Link } from 'react-router-dom';
import './Projects.css'; 

export default function Projects({ projects }) {
  return (
    <div className="page-container">
      <h1 className="page-title">Meus Projetos</h1>
      <div className="grid-container">
        {projects.map(project => (
          <Link to={`/projects/${project.id}`} key={project.id} className="card-link">
            <div className="card">
              <div className="content">
                {/* Lado da frente do card (mostra a imagem) */}
                <div className="front">
                  {/* CORREÇÃO: Usa imageData e mimeType do DB para o src */}
                  {project.imageData && (
                    <img 
                      src={`data:${project.mimeType};base64,${project.imageData}`} 
                      alt={project.title} 
                      className="img" 
                    />
                  )}
                  <div className="front-content">
                    <div className="title">
                      <p>{project.title}</p>
                      <span className="badge">Projeto</span>
                    </div>
                    <div className="card-footer">
                      <span>{project.repositoryLink && <a href={project.repositoryLink} target="_blank" rel="noopener noreferrer">Repositório</a>}</span>
                      <span>{project.projectLink && <a href={project.projectLink} target="_blank" rel="noopener noreferrer">Site</a>}</span>
                    </div>
                  </div>
                </div>
                
                {/* Lado de trás do card (mostra a descrição) */}
                <div className="back">
                  <div className="back-content">
                    <div className="description">
                      {project.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
