import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const cursosEjemplo = [
  { id: 1, nombre: 'Matemáticas' },
  { id: 2, nombre: 'Lengua' },
  { id: 3, nombre: 'Ciencias' }
];

const TemasForm = ({ docenteId }) => {
  const [tema, setTema] = useState({
    descripcion: '',
    curso: '',
    titulo: ''
  });

  const handleChange = (e) => {
    setTema({ ...tema, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Tema guardado (solo frontend): ' + JSON.stringify(tema, null, 2));
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, background: '#f8fafc' }}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom color="#1976d2">
          Formulario de Tema
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Curso" name="curso" value={tema.curso} onChange={handleChange} select fullWidth margin="normal" variant="outlined" required>
            {cursosEjemplo.map((curso) => (
              <MenuItem key={curso.id} value={curso.nombre}>{curso.nombre}</MenuItem>
            ))}
          </TextField>
          <TextField label="Título" name="titulo" value={tema.titulo} onChange={handleChange} fullWidth margin="normal" variant="outlined" required />
          <TextField label="Descripción" name="descripcion" value={tema.descripcion} onChange={handleChange} fullWidth margin="normal" variant="outlined" required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: 16, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }} startIcon={<SaveIcon />}>
            GUARDAR
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default TemasForm; 