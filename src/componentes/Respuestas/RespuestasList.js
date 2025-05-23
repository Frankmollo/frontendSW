import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const alumnosEjemplo = [
  { id: 1, nombre: 'Juan Pérez' },
  { id: 2, nombre: 'Ana López' }
];
const preguntasEjemplo = [
  { id: 1, enunciado: '¿Cuál es la capital de Francia?' },
  { id: 2, enunciado: '¿2+2?' }
];

const RespuestasForm = ({ docenteId }) => {
  const [respuesta, setRespuesta] = useState({
    respuesta: '',
    alumno: '',
    pregunta: ''
  });

  const handleChange = (e) => {
    setRespuesta({ ...respuesta, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Respuesta guardada (solo frontend): ' + JSON.stringify(respuesta, null, 2));
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, background: '#f8fafc' }}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom color="#1976d2">
          Formulario de Respuesta
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Respuesta" name="respuesta" value={respuesta.respuesta} onChange={handleChange} fullWidth margin="normal" variant="outlined" required />
          <TextField label="Alumno" name="alumno" value={respuesta.alumno} onChange={handleChange} select fullWidth margin="normal" variant="outlined" required>
            {alumnosEjemplo.map((alumno) => (
              <MenuItem key={alumno.id} value={alumno.nombre}>{alumno.nombre}</MenuItem>
            ))}
          </TextField>
          <TextField label="Pregunta" name="pregunta" value={respuesta.pregunta} onChange={handleChange} select fullWidth margin="normal" variant="outlined" required>
            {preguntasEjemplo.map((pregunta) => (
              <MenuItem key={pregunta.id} value={pregunta.enunciado}>{pregunta.enunciado}</MenuItem>
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

export default RespuestasForm; 