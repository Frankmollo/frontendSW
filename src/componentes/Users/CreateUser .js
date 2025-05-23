import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Alert, MenuItem } from '@mui/material';
import { getRoles } from '../../services/api';

const CreateUser = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fecha_nacimiento, setFechaNacimiento] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [rolId, setRolId] = useState('');
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await getRoles();
        setRoles(res.data[0] || []);
      } catch (err) {
        setRoles([]);
      }
    };
    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors([]);
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/usuario',
        {
          nombre,
          apellido,
          fecha_nacimiento,
          correo,
          password,
          password_confirmation: passwordConfirmation,
          rol_id: rolId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        navigate('/dashboard');
      } else {
        setError('No se pudo crear el usuario');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data && error.response.data.error) {
          const err = error.response.data.error;
          if (typeof err === 'object') {
            setValidationErrors(Object.values(err).flat());
          } else {
            setError(err);
          }
        } else {
          setError(error.response.data.message || 'Error al crear usuario');
        }
      } else if (error.request) {
        setError('Error de conexión con el servidor');
      } else {
        setError('Error al procesar la solicitud');
      }
    }
  };

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
      <Box sx={{ width: '100%', maxWidth: 440, mx: 'auto' }}>
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
            <img src="/imagenes/logo.jpg" alt="Logo" style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 10, objectFit: 'cover', boxShadow: '0 2px 8px #1976d2' }} />
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
              Crear Usuario
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
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              variant="outlined"
            />
            <TextField
              margin="normal"
              fullWidth
              label="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              variant="outlined"
            />
            <TextField
              margin="normal"
              fullWidth
              label="Fecha de Nacimiento"
              type="date"
              value={fecha_nacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              required
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField
              margin="normal"
              fullWidth
              label="Correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              variant="outlined"
            />
            <TextField
              margin="normal"
              fullWidth
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
            />
            <TextField
              margin="normal"
              fullWidth
              label="Confirmar Contraseña"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              variant="outlined"
            />
            <TextField
              margin="normal"
              fullWidth
              select
              label="Rol"
              value={rolId}
              onChange={(e) => setRolId(e.target.value)}
              required
              variant="outlined"
            >
              {roles.map((rol) => (
                <MenuItem key={rol.id} value={rol.id}>{rol.nombre.toLowerCase() === 'estudiante' ? 'Alumno' : rol.nombre}</MenuItem>
              ))}
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, bgcolor: '#2e7d32', color: '#fff', fontWeight: 'bold', '&:hover': { bgcolor: '#005005' } }}
            >
              Crear Usuario
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default CreateUser;
