import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Drawer, List, ListItem, ListItemButton, ListItemText, Avatar, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Importa tus componentes de usuarios, roles y permisos
import UsersList from './Users/UsersList';
import RolesList from './Roles/RolesList';

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
          },
        }}
      >
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: '#1976d2', width: 64, height: 64, fontSize: 32, mb: 1 }}>
            {perfil && perfil[0]?.nombre?.[0]}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>
            {perfil && perfil[0]?.nombre} {perfil && perfil[0]?.apellido}
          </Typography>
          <Typography variant="body2" sx={{ color: '#e3eafc', textAlign: 'center', mb: 2 }}>
            Administrador
          </Typography>
        </Box>
        <Divider sx={{ bgcolor: '#e3eafc', mb: 2 }} />
        <List>
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
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ p: 3 }}>
          <Button variant="contained" color="error" fullWidth sx={{ fontWeight: 'bold' }} onClick={handleLogout}>
            CERRAR SESIÓN
          </Button>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, p: 0, display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }}>
        {view === 'usuarios' && <UsersList />}
        {view === 'roles' && <RolesList />}
      </Box>
    </Box>
  );
};

export default Dashboard; 