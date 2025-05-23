import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { getRoles, createRole, updateRole, deleteRole, getRolePermissions, updateRolePermissions } from '../../services/api';

const RolesList = ({ permisos = [] }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [nombre, setNombre] = useState('');
  const [formError, setFormError] = useState('');
  const [permisosModalOpen, setPermisosModalOpen] = useState(false);
  const [permisosDisponibles, setPermisosDisponibles] = useState([
    { nombre: 'Ver roles', id: 1 },
    { nombre: 'Crear roles', id: 2 },
    { nombre: 'Editar roles', id: 3 },
    { nombre: 'Eliminar roles', id: 4 },
    { nombre: 'Crear usuarios', id: 5 },
    { nombre: 'Ver usuarios', id: 6 },
    { nombre: 'Eliminar usuarios', id: 7 },
    { nombre: 'Editar usuarios', id: 8 },
    { nombre: 'Ver permisos rol', id: 9 },
    { nombre: 'Actualizar permisos rol', id: 10 },
  ]);
  const [permisosRol, setPermisosRol] = useState([]);
  const [rolSeleccionado, setRolSeleccionado] = useState(null);
  const [permisosError, setPermisosError] = useState('');
  const [permisosLoading, setPermisosLoading] = useState(false);

  const tienePermiso = (permiso) => permisos.includes(permiso);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await getRoles();
      setRoles(res.data[0] || []);
    } catch (err) {
      setError('Error al cargar los roles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleOpen = (role = null) => {
    setEditMode(!!role);
    setSelectedRole(role);
    setNombre(role ? role.nombre : '');
    setFormError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRole(null);
    setNombre('');
    setFormError('');
  };

  const handleSubmit = async () => {
    if (!nombre.trim()) {
      setFormError('El nombre es obligatorio');
      return;
    }
    try {
      if (editMode && selectedRole) {
        await updateRole(selectedRole.id, { nombre });
      } else {
        await createRole({ nombre });
      }
      handleClose();
      fetchRoles();
    } catch (err) {
      setFormError('Error al guardar el rol');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este rol?')) {
      try {
        await deleteRole(id);
        fetchRoles();
      } catch (err) {
        setError('Error al eliminar el rol');
      }
    }
  };

  const handleOpenPermisos = async (rol) => {
    setRolSeleccionado(rol);
    setPermisosError('');
    setPermisosLoading(true);
    setPermisosModalOpen(true);
    try {
      const res = await getRolePermissions(rol.id);
      // res.data[0] es un array de objetos con permiso_id
      setPermisosRol(res.data[0].map(p => p.permiso_id));
    } catch (err) {
      setPermisosError('Error al cargar permisos del rol');
    } finally {
      setPermisosLoading(false);
    }
  };

  const handlePermisoChange = (permisoId) => {
    setPermisosRol(prev =>
      prev.includes(permisoId)
        ? prev.filter(id => id !== permisoId)
        : [...prev, permisoId]
    );
  };

  const handleGuardarPermisos = async () => {
    setPermisosError('');
    setPermisosLoading(true);
    try {
      await updateRolePermissions(rolSeleccionado.id, permisosRol.map(id => ({ permiso_id: id })));
      setPermisosModalOpen(false);
    } catch (err) {
      setPermisosError('Error al actualizar permisos');
    } finally {
      setPermisosLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, width: '100%', maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>Roles</Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => handleOpen()}>Nuevo Rol</Button>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Permisos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((rol) => (
            <TableRow key={rol.id}>
              <TableCell>{rol.nombre.toLowerCase() === 'estudiante' ? 'Alumno' : rol.nombre}</TableCell>
              <TableCell align="right">
                <Button size="small" variant="text" color="primary" onClick={() => handleOpenPermisos(rol)}>
                  Permisos
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Editar Rol' : 'Nuevo Rol'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del Rol"
            type="text"
            fullWidth
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            error={!!formError}
            helperText={formError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={permisosModalOpen} onClose={() => setPermisosModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Permisos de {rolSeleccionado ? (rolSeleccionado.nombre && rolSeleccionado.nombre.toLowerCase() === 'estudiante' ? 'Alumno' : rolSeleccionado.nombre) : ''}</DialogTitle>
        <DialogContent>
          {permisosLoading ? (
            <CircularProgress />
          ) : (
            <Box>
              {permisosDisponibles.map(permiso => (
                <Box key={permiso.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <input
                    type="checkbox"
                    checked={permisosRol.includes(permiso.id)}
                    onChange={() => handlePermisoChange(permiso.id)}
                    id={`permiso-${permiso.id}`}
                  />
                  <label htmlFor={`permiso-${permiso.id}`} style={{ marginLeft: 8 }}>{permiso.nombre}</label>
                </Box>
              ))}
            </Box>
          )}
          {permisosError && <Alert severity="error">{permisosError}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPermisosModalOpen(false)}>Cancelar</Button>
          <Button onClick={handleGuardarPermisos} variant="contained" disabled={permisosLoading}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default RolesList;