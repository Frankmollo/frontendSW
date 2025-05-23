import React from 'react';
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/Auth/Login';
import Dashboard from './componentes/Dashboard';
import CreateUser from './componentes/Users/CreateUser ';
import EditUser from './componentes/Users/EditUser ';
import AlumnoForm from './componentes/Alumnos/AlumnoForm';
import CursosList from './componentes/Cursos/CursosList';
import CursoForm from './componentes/Cursos/CursoForm';
import ExamenesList from './componentes/Examenes/ExamenesList';
import ExamenForm from './componentes/Examenes/ExamenForm';
import NotificacionesList from './componentes/Notificaciones/NotificacionesList';
import NotificacionForm from './componentes/Notificaciones/NotificacionForm';
import ReportesList from './componentes/Reportes/ReportesList';
import ReporteForm from './componentes/Reportes/ReporteForm';
import DebatesList from './componentes/Debates/DebatesList';
import DebateForm from './componentes/Debates/DebateForm';
import TemasList from './componentes/Temas/TemasList';
import TemaForm from './componentes/Temas/TemaForm';
import SuscripcionesList from './componentes/Suscripciones/SuscripcionesList';
import SuscripcionForm from './componentes/Suscripciones/SuscripcionForm';
import DocentesList from './componentes/Docentes/DocentesList';
import DocenteForm from './componentes/Docentes/DocenteForm';
import CategoriasList from './componentes/Categorias/CategoriasList';
import CategoriaForm from './componentes/Categorias/CategoriaForm';
import PermisosList from './componentes/Permisos/PermisosList';
import PermisoForm from './componentes/Permisos/PermisoForm';

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
        <Route path="/alumnos/crear" element={<AlumnoForm />} />
        <Route path="/cursos" element={<CursosList />} />
        <Route path="/cursos/crear" element={<CursoForm />} />
        <Route path="/examenes" element={<ExamenesList />} />
        <Route path="/examenes/crear" element={<ExamenForm />} />
        <Route path="/notificaciones" element={<NotificacionesList />} />
        <Route path="/notificaciones/crear" element={<NotificacionForm />} />
        <Route path="/reportes" element={<ReportesList />} />
        <Route path="/reportes/crear" element={<ReporteForm />} />
        <Route path="/debates" element={<DebatesList />} />
        <Route path="/debates/crear" element={<DebateForm />} />
        <Route path="/temas" element={<TemasList />} />
        <Route path="/temas/crear" element={<TemaForm />} />
        <Route path="/suscripciones" element={<SuscripcionesList />} />
        <Route path="/suscripciones/crear" element={<SuscripcionForm />} />
        <Route path="/docentes" element={<DocentesList />} />
        <Route path="/docentes/crear" element={<DocenteForm />} />
        <Route path="/categorias" element={<CategoriasList />} />
        <Route path="/categorias/crear" element={<CategoriaForm />} />
        <Route path="/permisos" element={<PermisosList />} />
        <Route path="/permisos/crear" element={<PermisoForm />} />
        <Route path="*" element={<BienvenidaVisual />} />
      </Routes>
    </Router>
  );
}

export default App;