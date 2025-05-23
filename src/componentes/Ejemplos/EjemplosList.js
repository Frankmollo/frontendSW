import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const temasEjemplo = [
  { id: 1, nombre: 'Álgebra' },
  { id: 2, nombre: 'Gramática' }
];

const EjemplosForm = ({ docenteId }) => {
  const [ejemplo, setEjemplo] = useState({
    contenido_audio: '',
    contenido_imagen: '',
    contenido_video: '',
    tema: ''
  });

  const handleChange = (e) => {
    setEjemplo({ ...ejemplo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Ejemplo guardado (solo frontend): ' + JSON.stringify(ejemplo, null, 2));
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, background: '#f8fafc' }}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom color="#1976d2">
          Formulario de Ejemplo
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Audio (URL)" name="contenido_audio" value={ejemplo.contenido_audio} onChange={handleChange} fullWidth margin="normal" variant="outlined" />
          <TextField label="Imagen (URL)" name="contenido_imagen" value={ejemplo.contenido_imagen} onChange={handleChange} fullWidth margin="normal" variant="outlined" />
          <TextField label="Video (URL)" name="contenido_video" value={ejemplo.contenido_video} onChange={handleChange} fullWidth margin="normal" variant="outlined" />
          <TextField label="Tema" name="tema" value={ejemplo.tema} onChange={handleChange} select fullWidth margin="normal" variant="outlined" required>
            {temasEjemplo.map((tema) => (
              <MenuItem key={tema.id} value={tema.nombre}>{tema.nombre}</MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: 16, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }} startIcon={<SaveIcon />}>
            GUARDAR
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EjemplosForm; 