import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const alumnosEjemplo = [
  { id: 1, nombre: 'Juan Pérez' },
  { id: 2, nombre: 'Ana López' }
];
const examenesEjemplo = [
  { id: 1, nombre: 'Examen 1' },
  { id: 2, nombre: 'Examen 2' }
];

const AlumnoExamenForm = ({ docenteId }) => {
  const [alumnoExamen, setAlumnoExamen] = useState({
    alumno: '',
    examen: '',
    fecha_tomado: ''
  });

  const handleChange = (e) => {
    setAlumnoExamen({ ...alumnoExamen, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Alumno Examen guardado (solo frontend): ' + JSON.stringify(alumnoExamen, null, 2));
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, background: '#f8fafc' }}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom color="#1976d2">
          Formulario de Alumno Examen
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Alumno" name="alumno" value={alumnoExamen.alumno} onChange={handleChange} select fullWidth margin="normal" variant="outlined" required>
            {alumnosEjemplo.map((alumno) => (
              <MenuItem key={alumno.id} value={alumno.nombre}>{alumno.nombre}</MenuItem>
            ))}
          </TextField>
          <TextField label="Examen" name="examen" value={alumnoExamen.examen} onChange={handleChange} select fullWidth margin="normal" variant="outlined" required>
            {examenesEjemplo.map((examen) => (
              <MenuItem key={examen.id} value={examen.nombre}>{examen.nombre}</MenuItem>
            ))}
          </TextField>
          <TextField label="Fecha Tomado" name="fecha_tomado" value={alumnoExamen.fecha_tomado} onChange={handleChange} type="date" fullWidth margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: 16, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }} startIcon={<SaveIcon />}>
            GUARDAR
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AlumnoExamenForm; 