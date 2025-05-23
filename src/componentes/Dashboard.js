import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Drawer, List, ListItem, ListItemButton, ListItemText, Avatar, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BookIcon from '@mui/icons-material/Book';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ForumIcon from '@mui/icons-material/Forum';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Importa tus componentes de usuarios, roles y permisos
import UsersList from './Users/UsersList';
import RolesList from './Roles/RolesList';
import CursosForm from './Cursos/CursosList.js';
import TemasForm from './Temas/TemasList.js';
import ExamenesForm from './Examenes/ExamenesList.js';
import ReportesForm from './Reportes/ReportesList.js';
import DebatesForm from './Debates/DebatesList.js';
import PreguntasForm from './Preguntas/PreguntasList.js';
import RespuestasForm from './Respuestas/RespuestasList.js';
import MensajesForm from './Mensajes/MensajesList.js';
import EjemplosForm from './Ejemplos/EjemplosList.js';
import CategoriasForm from './Categorias/CategoriasList.js';
import AlumnoExamenForm from './AlumnoExamen/AlumnoExamenList.js';
import MisCursos from './Alumnos/MisCursos';
import ExamenesAlumno from './Alumnos/ExamenesAlumno';
import NotificacionesAlumno from './Alumnos/NotificacionesAlumno';
import MensajesAlumno from './Alumnos/MensajesAlumno';
import DebatesAlumno from './Alumnos/DebatesAlumno';
import EjemplosAlumno from './Alumnos/EjemplosAlumno';

const roles = {
  1: "Admin",
  2: "Docente",
  3: "Estudiante"
  // Agrega los que correspondan
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [view, setView] = useState('usuarios'); // usuarios | roles

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/perfil', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('================ PERFIL RECIBIDO ================');
        console.log(JSON.stringify(response.data, null, 2));
        setPerfil(response.data);
      } catch (err) {
        setError('No se pudo cargar el perfil');
      } finally {
        setLoading(false);
      }
    };
    fetchPerfil();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Función utilitaria para verificar permisos
  const tienePermiso = (permiso) => {
    // El perfil puede venir como array o como objeto, adaptamos
    if (!perfil) return false;
    if (Array.isArray(perfil)) {
      // Si viene como array, tomamos el primer elemento
      return perfil[0]?.permisos?.includes(permiso);
    }
    return perfil?.permisos?.includes(permiso);
  };

  // Detectar si es docente
  const esDocente = perfil && perfil[0]?.rol_id === 2;
  const docenteId = perfil && perfil[0]?.id;

  const esAdmin = perfil && perfil[0]?.rol_id === 1;
  const esAlumno = perfil && perfil[0]?.rol_id === 3;
  const alumnoId = perfil && perfil[0]?.id;

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Typography color="error">{error}</Typography>
        <Button variant="contained" onClick={handleLogout}>Cerrar Sesión</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #e3eafc 0%, #b6c8e6 100%)' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 260,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 260,
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, #1976d2 80%, #1565c0 100%)',
            color: '#fff',
            border: 'none',
            boxShadow: '2px 0 8px #1976d2',
            p: 0,
          },
        }}
      >
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#1565c0', borderBottom: '1px solid #e3eafc' }}>
          <Avatar sx={{ bgcolor: '#1976d2', width: 80, height: 80, fontSize: 40, mb: 2 }}>
            {perfil && perfil[0]?.nombre?.[0]}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff', textAlign: 'center', mb: 0.5 }}>
            {perfil && perfil[0]?.nombre} {perfil && perfil[0]?.apellido}
          </Typography>
          <Typography variant="body2" sx={{ color: '#e3eafc', textAlign: 'center', mb: 2 }}>
            {esAdmin ? 'Administrador' : esDocente ? 'Docente' : 'Estudiante'}
          </Typography>
        </Box>
        <Divider sx={{ bgcolor: '#e3eafc', mb: 2 }} />
        <List>
          {esAdmin && (
            <>
              <ListItem disablePadding>
                <ListItemButton selected={view === 'usuarios'} onClick={() => setView('usuarios')} sx={{ pl: 4 }}>
                  <ListItemText primary={<span style={{ fontWeight: view === 'usuarios' ? 'bold' : 'normal' }}>Usuarios</span>} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={view === 'roles'} onClick={() => setView('roles')} sx={{ pl: 4 }}>
                  <ListItemText primary={<span style={{ fontWeight: view === 'roles' ? 'bold' : 'normal' }}>Roles</span>} />
                </ListItemButton>
              </ListItem>
            </>
          )}
          {esDocente && (
            <>
              <ListItem disablePadding>
                <ListItemButton selected={view === 'cursos'} onClick={() => setView('cursos')} sx={{ pl: 4, py: 2, '&.Mui-selected': { background: '#1565c0', color: '#fff' }, '&:hover': { background: '#1976d2', color: '#fff' } }}>
                  <SchoolIcon sx={{ mr: 2 }} />
                  <ListItemText primary={<span style={{ fontWeight: view === 'cursos' ? 'bold' : 'normal' }}>Cursos</span>} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={view === 'examenes'} onClick={() => setView('examenes')} sx={{ pl: 4, py: 2, '&.Mui-selected': { background: '#1565c0', color: '#fff' }, '&:hover': { background: '#1976d2', color: '#fff' } }}>
                  <AssignmentIcon sx={{ mr: 2 }} />
                  <ListItemText primary={<span style={{ fontWeight: view === 'examenes' ? 'bold' : 'normal' }}>Exámenes</span>} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={view === 'temas'} onClick={() => setView('temas')} sx={{ pl: 4, py: 2, '&.Mui-selected': { background: '#1565c0', color: '#fff' }, '&:hover': { background: '#1976d2', color: '#fff' } }}>
                  <BookIcon sx={{ mr: 2 }} />
                  <ListItemText primary={<span style={{ fontWeight: view === 'temas' ? 'bold' : 'normal' }}>Temas</span>} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={view === 'reportes'} onClick={() => setView('reportes')} sx={{ pl: 4, py: 2, '&.Mui-selected': { background: '#1565c0', color: '#fff' }, '&:hover': { background: '#1976d2', color: '#fff' } }}>
                  <AssessmentIcon sx={{ mr: 2 }} />
                  <ListItemText primary={<span style={{ fontWeight: view === 'reportes' ? 'bold' : 'normal' }}>Reportes</span>} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={view === 'debates'} onClick={() => setView('debates')} sx={{ pl: 4, py: 2, '&.Mui-selected': { background: '#1565c0', color: '#fff' }, '&:hover': { background: '#1976d2', color: '#fff' } }}>
                  <ForumIcon sx={{ mr: 2 }} />
                  <ListItemText primary={<span style={{ fontWeight: view === 'debates' ? 'bold' : 'normal' }}>Debates</span>} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={view === 'preguntas'} onClick={() => setView('preguntas')} sx={{ pl: 4, py: 2, '&.Mui-selected': { background: '#1565c0', color: '#fff' }, '&:hover': { background: '#1976d2', color: '#fff' } }}>
                  <AssignmentIcon sx={{ mr: 2 }} />
                  <ListItemText primary={<span style={{ fontWeight: view === 'preguntas' ? 'bold' : 'normal' }}>Preguntas</span>} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={view === 'respuestas'} onClick={() => setView('respuestas')} sx={{ pl: 4, py: 2, '&.Mui-selected': { background: '#1565c0', color: '#fff' }, '&:hover': { background: '#1976d2', color: '#fff' } }}>
                  <AssignmentIcon sx={{ mr: 2 }} />
                  <ListItemText primary={<span style={{ fontWeight: view === 'respuestas' ? 'bold' : 'normal' }}>Respuestas</span>} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={view === 'mensajes'} onClick={() => setView('mensajes')} sx={{ pl: 4, py: 2, '&.Mui-selected': { background: '#1565c0', color: '#fff' }, '&:hover': { background: '#1976d2', color: '#fff' } }}>
                  <ForumIcon sx={{ mr: 2 }} />
                  <ListItemText primary={<span style={{ fontWeight: view === 'mensajes' ? 'bold' : 'normal' }}>Mensajes</span>} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={view === 'ejemplos'} onClick={() => setView('ejemplos')} sx={{ pl: 4, py: 2, '&.Mui-selected': { background: '#1565c0', color: '#fff' }, '&:hover': { background: '#1976d2', color: '#fff' } }}>
                  <BookIcon sx={{ mr: 2 }} />
                  <ListItemText primary={<span style={{ fontWeight: view === 'ejemplos' ? 'bold' : 'normal' }}>Ejemplos</span>} />
                </ListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <ListItemButton selected={view === 'categorias'} onClick={() => setView('categorias')} sx={{ pl: 4, py: 2, '&.Mui-selected': { background: '#1565c0', color: '#fff' }, '&:hover': { background: '#1976d2', color: '#fff' } }}>
                  <BookIcon sx={{ mr: 2 }} />
                  <ListItemText primary={<span style={{ fontWeight: view === 'categorias' ? 'bold' : 'normal' }}>Categorías</span>} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={view === 'alumnoexamen'} onClick={() => setView('alumnoexamen')} sx={{ pl: 4, py: 2, '&.Mui-selected': { background: '#1565c0', color: '#fff' }, '&:hover': { background: '#1976d2', color: '#fff' } }}>
                  <AssignmentIcon sx={{ mr: 2 }} />
                  <ListItemText primary={<span style={{ fontWeight: view === 'alumnoexamen' ? 'bold' : 'normal' }}>Alumno Examen</span>} />
                </ListItemButton>
              </ListItem>
            </>
          )}
          {esAlumno && (
            <>
              <ListItem disablePadding>
                <ListItemButton selected={view === 'mis_cursos'} onClick={() => setView('mis_cursos')} sx={{ pl: 4 }}>
                  <ListItemText primary={<span style={{ fontWeight: view === 'mis_cursos' ? 'bold' : 'normal' }}>Mis Cursos</span>} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={view === 'examenes'} onClick={() => setView('examenes')} sx={{ pl: 4 }}>
                  <ListItemText primary={<span style={{ fontWeight: view === 'examenes' ? 'bold' : 'normal' }}>Exámenes</span>} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={view === 'notificaciones'} onClick={() => setView('notificaciones')} sx={{ pl: 4 }}>
                  <ListItemText primary={<span style={{ fontWeight: view === 'notificaciones' ? 'bold' : 'normal' }}>Notificaciones</span>} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={view === 'mensajes'} onClick={() => setView('mensajes')} sx={{ pl: 4 }}>
                  <ListItemText primary={<span style={{ fontWeight: view === 'mensajes' ? 'bold' : 'normal' }}>Mensajes</span>} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={view === 'debates'} onClick={() => setView('debates')} sx={{ pl: 4 }}>
                  <ListItemText primary={<span style={{ fontWeight: view === 'debates' ? 'bold' : 'normal' }}>Debates</span>} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={view === 'ejemplos'} onClick={() => setView('ejemplos')} sx={{ pl: 4 }}>
                  <ListItemText primary={<span style={{ fontWeight: view === 'ejemplos' ? 'bold' : 'normal' }}>Ejemplos</span>} />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ p: 3 }}>
          <Button variant="contained" color="error" fullWidth sx={{ fontWeight: 'bold', borderRadius: 2, py: 1.5, fontSize: 16 }} onClick={handleLogout}>
            CERRAR SESIÓN
          </Button>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, p: 0, display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }}>
        {esAdmin && view === 'usuarios' && <UsersList />}
        {esAdmin && view === 'roles' && <RolesList />}
        {esDocente && view === 'cursos' && <CursosForm docenteId={docenteId} />}
        {esDocente && view === 'temas' && <TemasForm docenteId={docenteId} />}
        {esDocente && view === 'examenes' && <ExamenesForm docenteId={docenteId} />}
        {esDocente && view === 'reportes' && <ReportesForm docenteId={docenteId} />}
        {esDocente && view === 'debates' && <DebatesForm docenteId={docenteId} />}
        {esDocente && view === 'preguntas' && <PreguntasForm docenteId={docenteId} />}
        {esDocente && view === 'respuestas' && <RespuestasForm docenteId={docenteId} />}
        {esDocente && view === 'mensajes' && <MensajesForm docenteId={docenteId} />}
        {esDocente && view === 'ejemplos' && <EjemplosForm docenteId={docenteId} />}
        {esDocente && view === 'categorias' && <CategoriasForm docenteId={docenteId} />}
        {esDocente && view === 'alumnoexamen' && <AlumnoExamenForm docenteId={docenteId} />}
        {esAlumno && view === 'mis_cursos' && <MisCursos alumnoId={alumnoId} />}
        {esAlumno && view === 'examenes' && <ExamenesAlumno alumnoId={alumnoId} />}
        {esAlumno && view === 'notificaciones' && <NotificacionesAlumno alumnoId={alumnoId} />}
        {esAlumno && view === 'mensajes' && <MensajesAlumno alumnoId={alumnoId} />}
        {esAlumno && view === 'debates' && <DebatesAlumno alumnoId={alumnoId} />}
        {esAlumno && view === 'ejemplos' && <EjemplosAlumno alumnoId={alumnoId} />}
      </Box>
    </Box>
  );
};

export default Dashboard; 