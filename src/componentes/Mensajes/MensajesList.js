import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const alumnosEjemplo = [
  { id: 1, nombre: 'Juan Pérez' },
  { id: 2, nombre: 'Ana López' }
];
const debatesEjemplo = [
  { id: 1, titulo: 'Debate 1' },
  { id: 2, titulo: 'Debate 2' }
];

const MensajesForm = ({ docenteId }) => {
  const [mensaje, setMensaje] = useState({
    mensaje: '',
    alumno: '',
    debate: ''
  });

  const handleChange = (e) => {
    setMensaje({ ...mensaje, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensaje guardado (solo frontend): ' + JSON.stringify(mensaje, null, 2));
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, background: '#f8fafc' }}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom color="#1976d2">
          Formulario de Mensaje
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Mensaje" name="mensaje" value={mensaje.mensaje} onChange={handleChange} fullWidth margin="normal" variant="outlined" required />
          <TextField label="Alumno" name="alumno" value={mensaje.alumno} onChange={handleChange} select fullWidth margin="normal" variant="outlined" required>
            {alumnosEjemplo.map((alumno) => (
              <MenuItem key={alumno.id} value={alumno.nombre}>{alumno.nombre}</MenuItem>
            ))}
          </TextField>
          <TextField label="Debate" name="debate" value={mensaje.debate} onChange={handleChange} select fullWidth margin="normal" variant="outlined" required>
            {debatesEjemplo.map((debate) => (
              <MenuItem key={debate.id} value={debate.titulo}>{debate.titulo}</MenuItem>
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

export default MensajesForm; 