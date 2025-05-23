import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, InputAdornment, IconButton, Avatar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const CursosForm = ({ docenteId }) => {
  const [curso, setCurso] = useState({
    descripcion: '',
    categoria: '',
    imagen: '',
    precio: '',
    titulo: ''
  });
  const [imagenPreview, setImagenPreview] = useState(null);

  const handleChange = (e) => {
    setCurso({ ...curso, [e.target.name]: e.target.value });
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurso({ ...curso, imagen: file });
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Curso guardado (solo frontend): ' + JSON.stringify({ ...curso, imagen: curso.imagen ? curso.imagen.name : '' }, null, 2));
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, background: '#f8fafc' }}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom color="#1976d2">
          Formulario de Curso
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Descripción" name="descripcion" value={curso.descripcion} onChange={handleChange} fullWidth margin="normal" variant="outlined" required />
          <TextField label="Categoría" name="categoria" value={curso.categoria} onChange={handleChange} fullWidth margin="normal" variant="outlined" required />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
            <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
              Seleccionar Imagen
              <input type="file" accept="image/*" hidden onChange={handleImagenChange} />
            </Button>
            {imagenPreview && <Avatar src={imagenPreview} alt="preview" sx={{ width: 56, height: 56 }} />}
          </Box>
          <TextField label="Precio" name="precio" value={curso.precio} onChange={handleChange} fullWidth margin="normal" variant="outlined" type="number" inputProps={{ min: 0 }} />
          <TextField label="Título" name="titulo" value={curso.titulo} onChange={handleChange} fullWidth margin="normal" variant="outlined" required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: 16, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }} startIcon={<SaveIcon />}>
            GUARDAR
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CursosForm; 