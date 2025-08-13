import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Folder, Award, Mail, LogIn, LogOut, LayoutDashboard, Menu, X, User2 } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar({ currentPage, setCurrentPage, isSidebarOpen, setIsSidebarOpen, isAuthenticated, handleLogout }) {
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div>
        <div className="flex items-center justify-between mb-8">
          {isSidebarOpen && <h1 className="text-2xl font-bold text-white">Menu</h1>}
          <button onClick={toggleSidebar} className="toggle-button">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="nav-links">
          <Link to="/" onClick={() => setCurrentPage('home')} className={currentPage === 'home' ? 'active' : ''}>
            <HomeIcon size={20} />
            <span>Home</span>
          </Link>
          <Link to="/about" onClick={() => setCurrentPage('about')} className={currentPage === 'about' ? 'active' : ''}>
            <User2 size={20} />
            <span>Sobre Mim</span>
          </Link>
          <Link to="/projects" onClick={() => setCurrentPage('projects')} className={currentPage === 'projects' ? 'active' : ''}>
            <Folder size={20} />
            <span>Projetos</span>
          </Link>
          <Link to="/certificates" onClick={() => setCurrentPage('certificates')} className={currentPage === 'certificates' ? 'active' : ''}>
            <Award size={20} />
            <span>Certificados</span>
          </Link>
          <Link to="/contacts" onClick={() => setCurrentPage('contacts')} className={currentPage === 'contacts' ? 'active' : ''}>
            <Mail size={20} />
            <span>Contatos</span>
          </Link>
        </nav>
      </div>

      <div className="mt-auto nav-links">
        {isAuthenticated ? (
          <>
            <Link to="/admin-dashboard" onClick={() => setCurrentPage('admin-dashboard')} className={currentPage === 'admin-dashboard' ? 'active' : ''}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to="#" onClick={handleLogout}>
              <LogOut size={20} />
              <span>Sair</span>
            </Link>
          </>
        ) : (
          <Link to="/admin-login" onClick={() => setCurrentPage('admin-login')} className={currentPage === 'admin-login' ? 'active' : ''}>
            <LogIn size={20} />
            <span>Login Admin</span>
          </Link>
        )}
      </div>
    </aside>
  );
}
