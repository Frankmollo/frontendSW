import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UsersList = ({ permisos = [] }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const tienePermiso = (permiso) => permisos.includes(permiso);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/usuario', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsers(response.data[0] || response.data); // Ajusta según la estructura real
      } catch {
        setError('Error al cargar los usuarios');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/users/edit/${id}`);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/usuario/${deleteId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(users.filter(u => u.id !== deleteId));
      setConfirmOpen(false);
      setDeleteId(null);
    } catch {
      setError('Error al eliminar el usuario');
      setConfirmOpen(false);
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, width: '100%', maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>Usuarios</Typography>
        <Button variant="contained" color="success" onClick={() => navigate('/users/create')}>Crear</Button>
      </Box>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.nombre}</TableCell>
              <TableCell>{user.correo}</TableCell>
              <TableCell>
                <Button size="small" variant="outlined" color="primary" sx={{ mr: 1 }} onClick={() => handleEdit(user.id)}>Editar</Button>
                <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(user.id)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={3} align="center">No hay usuarios registrados.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>¿Eliminar usuario?</DialogTitle>
        <DialogContent>¿Estás seguro de que deseas eliminar este usuario?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>
          <Button color="error" onClick={confirmDelete}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UsersList;