import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import './AdminDashboard.css';

export default function AdminDashboard({ data, addItem, deleteItem, showNotification }) {
  const [selectedType, setSelectedType] = useState('projects');
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    repositoryLink: '',
    projectLink: '',
    issuer: '',
    date: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.title || (selectedType === 'projects' && !newItem.description) || (selectedType === 'certificates' && !newItem.issuer)) {
      showNotification('Preencha todos os campos obrigatórios.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('title', newItem.title);
    formData.append('description', newItem.description);
    formData.append('type', selectedType);
    formData.append('repositoryLink', newItem.repositoryLink);
    formData.append('projectLink', newItem.projectLink);
    formData.append('issuer', newItem.issuer);
    formData.append('date', newItem.date);
    
    if (selectedFile) {
      formData.append('image', selectedFile);
    }
    
    addItem(formData);

    setNewItem({ 
      title: '',
      description: '',
      repositoryLink: '',
      projectLink: '',
      issuer: '',
      date: ''
    });
    setSelectedFile(null);
  };

  const renderFormFields = () => {
    switch (selectedType) {
      case 'projects':
        return (
          <>
            <div className="form-group">
              <label className="form-label" htmlFor="projectTitle">Título</label>
              <input type="text" id="projectTitle" name="title" value={newItem.title} onChange={handleInputChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="projectDesc">Descrição</label>
              <textarea id="projectDesc" name="description" value={newItem.description} onChange={handleInputChange} className="form-textarea" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="projectImage">Imagem do Projeto</label>
              <input type="file" id="projectImage" name="image" accept="image/*" onChange={handleFileChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="projectRepo">Link do Repositório</label>
              <input type="text" id="projectRepo" name="repositoryLink" value={newItem.repositoryLink} onChange={handleInputChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="projectSite">Link do Site</label>
              <input type="text" id="projectSite" name="projectLink" value={newItem.projectLink} onChange={handleInputChange} className="form-input" />
            </div>
          </>
        );
      case 'certificates':
        return (
          <>
            <div className="form-group">
              <label className="form-label" htmlFor="certTitle">Título</label>
              <input type="text" id="certTitle" name="title" value={newItem.title} onChange={handleInputChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="certIssuer">Emissor</label>
              <input type="text" id="certIssuer" name="issuer" value={newItem.issuer} onChange={handleInputChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="certDate">Data</label>
              <input type="text" id="certDate" name="date" value={newItem.date} onChange={handleInputChange} className="form-input" />
            </div>
          </>
        );
      case 'participations':
        return (
          <>
            <div className="form-group">
              <label className="form-label" htmlFor="partTitle">Título</label>
              <input type="text" id="partTitle" name="title" value={newItem.title} onChange={handleInputChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="partDesc">Descrição</label>
              <textarea id="partDesc" name="description" value={newItem.description} onChange={handleInputChange} className="form-textarea" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="partLink">Link do Projeto (Opcional)</label>
              <input type="text" id="partLink" name="projectLink" value={newItem.projectLink} onChange={handleInputChange} className="form-input" />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-container dashboard-layout">
      <h1 className="page-title">Painel de Administração</h1>
      <div className="dashboard-card">
        <h2 className="card-title">Adicionar Novo Item</h2>
        <div className="form-group">
          <label className="form-label">Tipo de Item</label>
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setNewItem({ title: '', description: '', repositoryLink: '', projectLink: '', issuer: '', date: '' });
              setSelectedFile(null);
            }}
            className="form-select"
          >
            <option value="projects">Projeto</option>
            <option value="certificates">Certificado</option>
            <option value="participations">Participação</option>
          </select>
        </div>
        <form onSubmit={handleAddItem} className="add-item-form">
          {renderFormFields()}
          <button type="submit" className="submit-button">
            <PlusCircle size={20} style={{ marginRight: '0.5rem' }} />
            Adicionar
          </button>
        </form>
      </div>

      <div className="dashboard-card">
        <h2 className="card-title">Itens Existentes</h2>
        <div className="item-type-buttons">
          <button
            onClick={() => setSelectedType('projects')}
            className={`item-type-button ${selectedType === 'projects' ? 'active' : ''}`}
          >Projetos</button>
          <button
            onClick={() => setSelectedType('certificates')}
            className={`item-type-button ${selectedType === 'certificates' ? 'active' : ''}`}
          >Certificados</button>
          <button
            onClick={() => setSelectedType('participations')}
            className={`item-type-button ${selectedType === 'participations' ? 'active' : ''}`}
          >Participações</button>
        </div>
        <ul className="item-list">
          {data[selectedType].map(item => (
            <li key={item.id} className="item-list-item">
              <span className="text-white font-medium">{item.title}</span>
              <button onClick={() => deleteItem(item.id)} className="delete-button">
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
