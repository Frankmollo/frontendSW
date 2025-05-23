import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const CategoriasForm = ({ docenteId }) => {
  const [categoria, setCategoria] = useState({
    nombre: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Categoría guardada (solo frontend): ' + JSON.stringify(categoria, null, 2));
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, background: '#f8fafc' }}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom color="#1976d2">
          Formulario de Categoría
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Nombre" name="nombre" value={categoria.nombre} onChange={handleChange} fullWidth margin="normal" variant="outlined" required />
          <TextField label="Descripción" name="descripcion" value={categoria.descripcion} onChange={handleChange} fullWidth margin="normal" variant="outlined" required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: 16, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }} startIcon={<SaveIcon />}>
            GUARDAR
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CategoriasForm; 