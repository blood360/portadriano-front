import React from 'react';
import { Home, Folder, Award, Mail, LogIn, LogOut, LayoutDashboard, Menu, X, User2 } from 'lucide-react'; 

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
          <a
            href="#"
            onClick={() => setCurrentPage('home')}
            className={currentPage === 'home' ? 'active' : ''}
          >
            <Home size={20} />
            <span>Home</span>
          </a>
          <a
            href="#"
            onClick={() => setCurrentPage('projects')}
            className={currentPage === 'projects' ? 'active' : ''}
          >
            <Folder size={20} />
            <span>Projetos</span>
          </a>
          <a
            href="#"
            onClick={() => setCurrentPage('certificates')}
            className={currentPage === 'certificates' ? 'active' : ''}
          >
            <Award size={20} />
            <span>Certificados</span>
          </a>
          <a
            href="#"
            onClick={() => setCurrentPage('contacts')}
            className={currentPage === 'contacts' ? 'active' : ''}
          >
            <Mail size={20} />
            <span>Contatos</span>
          </a>
          <a 
          href="#"
          onClick={() => setCurrentPage('about')}
          className={currentPage === 'about' ? 'active' : ''}
          >
            <User2 size={20} />
            <span>Sobre Mim</span>
          </a>
        </nav>
      </div>

      <div className="mt-auto">
        {isAuthenticated ? (
          <>
            <a
              href="#"
              onClick={() => setCurrentPage('admin-dashboard')}
              className={currentPage === 'admin-dashboard' ? 'active' : ''}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </a>
            <a href="#" onClick={handleLogout}>
              <LogOut size={20} />
              <span>Sair</span>
            </a>
          </>
        ) : (
          <a
            href="#"
            onClick={() => setCurrentPage('admin-login')}
            className={currentPage === 'admin-login' ? 'active' : ''}
          >
            <LogIn size={20} />
            <span>Login Admin</span>
          </a>
        )}
      </div>
    </aside>
  );
}
