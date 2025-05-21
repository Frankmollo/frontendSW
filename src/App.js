import React from 'react';
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/Auth/Login';
import Dashboard from './componentes/Dashboard';
import CreateUser from './componentes/Users/CreateUser ';
import EditUser from './componentes/Users/EditUser ';

function BienvenidaVisual() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh',
      background: 'url("/imagenes/fondo.jpg") center/cover no-repeat',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <img src="/imagenes/logo.jpg" alt="Logo" style={{ width: 120, height: 120, borderRadius: '50%', marginBottom: 20, background: '#fff' }} />
      <h1 style={{ color: '#fff', fontSize: 48, marginBottom: 30, textShadow: '2px 2px 8px #1976d2' }}>Bienvenido</h1>
      <div style={{ display: 'flex', gap: 20 }}>
        <button
          style={{
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '18px 36px',
            fontSize: 22,
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 8px #1976d2'
          }}
          onClick={() => navigate('/login')}
        >
          INICIAR SESIÓN
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BienvenidaVisual />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/create" element={<CreateUser/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="*" element={<BienvenidaVisual />} />
      </Routes>
    </Router>
  );
}

export default App;