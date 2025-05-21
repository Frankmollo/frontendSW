import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        correo,
        password,
      });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setError('Respuesta del servidor inválida');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Error al iniciar sesión');
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
    }}>
      <Paper elevation={6} sx={{ p: 4, maxWidth: 350, width: '100%', borderRadius: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <img src="/imagenes/logo.jpg" alt="Logo" style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 10, objectFit: 'cover', boxShadow: '0 2px 8px #1976d2' }} />
          <Avatar sx={{ m: 1, bgcolor: '#1976d2', display: 'none' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Iniciar Sesión
          </Typography>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            margin="normal"
            fullWidth
            label="Correo"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            autoFocus
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, bgcolor: '#1976d2', color: '#fff', fontWeight: 'bold', '&:hover': { bgcolor: '#115293' } }}
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
