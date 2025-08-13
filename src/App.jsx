import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Notification from './components/Notification.jsx';
import Home from './components/Home.jsx';
import Projects from './components/Projects.jsx';
import Certificates from './components/Certificates.jsx';
import Contacts from './components/Contacts.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import About from './components/About.jsx';
import ProjectDetail from './components/ProjectDetail.jsx';
import './styles.css';

// Lê a URL da API da variável de ambiente
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [portfolioData, setPortfolioData] = useState({
    projects: [],
    certificates: [],
    participations: []
  });

  const fetchPortfolioData = async () => {
    try {
      const response = await fetch(`${API_URL}/portfolio`);

      if (!response.ok) {
        throw new Error('Falha ao buscar dados do portfólio.');
      }
      
      const allItems = await response.json();
      
      const projects = allItems.filter(item => item.type === 'projects');
      const certificates = allItems.filter(item => item.type === 'certificates');
      const participations = allItems.filter(item => item.type === 'participations');

      setPortfolioData({ projects, certificates, participations });
    } catch (error) {
      console.error('Erro ao buscar dados do portfólio:', error);
      showSystemNotification('Erro ao carregar dados do portfólio. Verifique se o servidor está rodando.', 'error');
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  const showSystemNotification = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        setCurrentPage('admin-dashboard');
        showSystemNotification('Login realizado com sucesso!', 'success');
      } else {
        showSystemNotification(data.msg || 'Erro ao fazer login.', 'error');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      showSystemNotification('Erro de conexão. Verifique se o servidor está rodando.', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    setCurrentPage('home');
    showSystemNotification('Sessão encerrada.', 'success');
  };

  const addPortfolioItem = async (formData) => {
    try {
      if (!token) {
        showSystemNotification('Você precisa estar logado para adicionar itens.', 'error');
        return;
      }

      const response = await fetch(`${API_URL}/portfolio`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
        body: formData 
      });

      const data = await response.json();

      if (response.ok) {
        showSystemNotification(`Novo item adicionado com sucesso!`, 'success');
        fetchPortfolioData();
      } else {
        showSystemNotification(data.msg || 'Erro ao adicionar item.', 'error');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      showSystemNotification('Erro ao conectar com o servidor.', 'error');
    }
  };

  const deletePortfolioItem = async (id) => {
    try {
      const response = await fetch(`${API_URL}/portfolio/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();

      if (response.ok) {
        showSystemNotification('Item removido com sucesso!', 'success');
        fetchPortfolioData();
      } else {
        showSystemNotification(data.msg || 'Erro ao remover item.', 'error');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      showSystemNotification('Erro ao conectar com o servidor.', 'error');
    }
  };

  return (
    <div className={`app-container`}>
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />
      <main className={`main-content ${isSidebarOpen ? 'main-content-wide' : 'main-content-narrow'}`}>
        <Notification show={showNotification} message={notificationMessage} type={notificationType} />
        <div key={currentPage} className="max-w-7xl mx-auto py-8 page-transition-enter">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects projects={portfolioData.projects} />} />
            {/* Passa a API_URL como prop para o ProjectDetail */}
            <Route path="/projects/:id" element={<ProjectDetail API_URL={API_URL} />} />
            <Route path="/certificates" element={<Certificates certificates={portfolioData.certificates} />} />
            <Route path="/contacts" element={<Contacts showNotification={showSystemNotification} />} />
            <Route path="/admin-login" element={isAuthenticated ? <AdminDashboard data={portfolioData} addItem={addPortfolioItem} deleteItem={deletePortfolioItem} showNotification={showSystemNotification} /> : <AdminLogin onLogin={handleLogin} />} />
            <Route path="/admin-dashboard" element={isAuthenticated ? <AdminDashboard data={portfolioData} addItem={addPortfolioItem} deleteItem={deletePortfolioItem} showNotification={showSystemNotification} /> : <AdminLogin onLogin={handleLogin} />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
