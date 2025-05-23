import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Alert, MenuItem } from '@mui/material';
import { getRoles, updateUser } from '../../services/api';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ nombre: '', apellido: '', fecha_nacimiento: '', correo: '', rol_id: '' });
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/usuario/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const u = response.data;
        setUser({
          nombre: u.nombre || '',
          apellido: u.apellido || '',
          fecha_nacimiento: u.fecha_nacimiento ? u.fecha_nacimiento.substring(0, 10) : '',
          correo: u.correo || '',
          rol_id: u.rol_id || '',
        });
      } catch (error) {
        setError('Error al cargar los datos del usuario');
      } finally {
        setLoading(false);
      }
    };
    const fetchRoles = async () => {
      try {
        const res = await getRoles();
        setRoles(res.data[0] || []);
      } catch (err) {
        setRoles([]);
      }
    };
    fetchUser();
    fetchRoles();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors([]);
    if (password || passwordConfirmation) {
      if (!password || !passwordConfirmation) {
        setError('La contraseña y la confirmación son obligatorias si deseas cambiar la contraseña.');
        return;
      }
      if (password.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres.');
        return;
      }
      if (password !== passwordConfirmation) {
        setError('La contraseña y la confirmación no coinciden.');
        return;
      }
    }
    const data = {
      nombre: user.nombre,
      apellido: user.apellido,
      fecha_nacimiento: user.fecha_nacimiento,
      correo: user.correo,
      rol_id: user.rol_id,
    };
    if (password && passwordConfirmation) {
      data.password = password;
      data.password_confirmation = passwordConfirmation;
    }
    try {
      await updateUser(id, data);
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        if (error.response.data && error.response.data.error) {
          const err = error.response.data.error;
          if (typeof err === 'object') {
            setValidationErrors(Object.values(err).flat());
          } else {
            setError(err);
          }
        } else if (error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else if (typeof error.response.data === 'string') {
          setError(error.response.data);
        } else {
          setError('Error al actualizar usuario');
        }
      } else if (error.request) {
        setError('Error de conexión con el servidor');
      } else {
        setError('Error al procesar la solicitud');
      }
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>Cargando...</Box>;

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e3eafc 0%, #b6c8e6 100%)',
      overflow: 'auto',
      p: 2,
    }}>
      <Paper elevation={6} sx={{
        p: { xs: 2, sm: 4 },
        maxWidth: 420,
        width: '100%',
        borderRadius: 3,
        boxSizing: 'border-box',
        mx: 'auto',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        minWidth: 0,
        overflow: 'hidden',
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Editar Usuario
          </Typography>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {validationErrors.length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {validationErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            label="Nombre"
            value={user.nombre}
            onChange={e => setUser({ ...user, nombre: e.target.value })}
            required
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Apellido"
            value={user.apellido || ''}
            onChange={e => setUser({ ...user, apellido: e.target.value })}
            required
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Fecha de Nacimiento"
            type="date"
            value={user.fecha_nacimiento ? user.fecha_nacimiento.substring(0, 10) : ''}
            onChange={e => setUser({ ...user, fecha_nacimiento: e.target.value })}
            required
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Correo"
            type="email"
            value={user.correo}
            onChange={e => setUser({ ...user, correo: e.target.value })}
            required
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            select
            label="Rol"
            value={user.rol_id || ''}
            onChange={e => setUser({ ...user, rol_id: e.target.value })}
            required
            variant="outlined"
          >
            {roles.map((rol) => (
              <MenuItem key={rol.id} value={rol.id}>{rol.nombre.toLowerCase() === 'estudiante' ? 'Alumno' : rol.nombre}</MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            fullWidth
            label="Contraseña (dejar vacío para no cambiar)"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Confirmar Contraseña"
            type="password"
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
            variant="outlined"
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button onClick={() => navigate('/dashboard')} fullWidth variant="outlined" color="secondary">Cancelar</Button>
            <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: '#1976d2', color: '#fff', fontWeight: 'bold', '&:hover': { bgcolor: '#004ba0' } }}>
              Guardar Cambios
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditUser;