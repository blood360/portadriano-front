import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './ProjectDetail.css';

export default function ProjectDetail({ API_URL }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${API_URL}/portfolio/${id}`);
        if (!response.ok) {
          throw new Error('Project not found');
        }
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return <div className="loading-message">Carregando...</div>;
  }

  if (error) {
    return <div className="error-message">Erro: {error}</div>;
  }

  if (!project) {
    return <div className="not-found-message">Projeto não encontrado.</div>;
  }

  return (
    <div className="page-container project-detail-layout">
      <div className="back-button-container">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={24} />
          <span>Voltar</span>
        </button>
      </div>

      <div className="project-detail-header">
        <h1 className="page-title">{project.title}</h1>
      </div>
      
      <div className="project-detail-card">
        {project.imageData && (
          <img 
            src={`data:${project.mimeType};base64,${project.imageData}`} 
            alt={project.title} 
            className="detail-image"
          />
        )}
        <div className="detail-content">
          <p className="detail-description">{project.description}</p>
          <div className="detail-links">
            {project.repositoryLink && (
              <a 
                href={project.repositoryLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="link-button"
              >
                Repositório
              </a>
            )}
            {project.projectLink && (
              <a 
                href={project.projectLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="link-button"
              >
                Link do Projeto
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
