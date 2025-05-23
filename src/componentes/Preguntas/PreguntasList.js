import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const tiposPregunta = [
  { value: 'opcion_multiple', label: 'Opción Múltiple' },
  { value: 'abierta', label: 'Abierta' }
];

const PreguntasForm = ({ docenteId }) => {
  const [pregunta, setPregunta] = useState({
    enunciado: '',
    tipo: ''
  });

  const handleChange = (e) => {
    setPregunta({ ...pregunta, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Pregunta guardada (solo frontend): ' + JSON.stringify(pregunta, null, 2));
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, background: '#f8fafc' }}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom color="#1976d2">
          Formulario de Pregunta
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Enunciado" name="enunciado" value={pregunta.enunciado} onChange={handleChange} fullWidth margin="normal" variant="outlined" required />
          <TextField label="Tipo de Pregunta" name="tipo" value={pregunta.tipo} onChange={handleChange} select fullWidth margin="normal" variant="outlined" required>
            {tiposPregunta.map((tipo) => (
              <MenuItem key={tipo.value} value={tipo.value}>{tipo.label}</MenuItem>
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

export default PreguntasForm; 