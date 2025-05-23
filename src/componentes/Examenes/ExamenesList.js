import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, MenuItem, IconButton, List, ListItem, ListItemText } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const cursosEjemplo = [
  { id: 1, nombre: 'Matemáticas' },
  { id: 2, nombre: 'Lengua' }
];
const temasEjemplo = [
  { id: 1, nombre: 'Álgebra', curso: 'Matemáticas' },
  { id: 2, nombre: 'Gramática', curso: 'Lengua' }
];

const ExamenesForm = ({ docenteId }) => {
  const [examen, setExamen] = useState({
    codigo: '',
    curso: '',
    tema: '',
    preguntas: [],
    preguntaActual: ''
  });

  const handleChange = (e) => {
    setExamen({ ...examen, [e.target.name]: e.target.value });
  };

  const handleAddPregunta = () => {
    if (examen.preguntaActual.trim() !== '') {
      setExamen({
        ...examen,
        preguntas: [...examen.preguntas, examen.preguntaActual],
        preguntaActual: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Examen guardado (solo frontend): ' + JSON.stringify({ ...examen, preguntas: examen.preguntas }, null, 2));
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, background: '#f8fafc' }}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom color="#1976d2">
          Formulario de Examen
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Código" name="codigo" value={examen.codigo} onChange={handleChange} fullWidth margin="normal" variant="outlined" required />
          <TextField label="Curso" name="curso" value={examen.curso} onChange={handleChange} select fullWidth margin="normal" variant="outlined" required>
            {cursosEjemplo.map((curso) => (
              <MenuItem key={curso.id} value={curso.nombre}>{curso.nombre}</MenuItem>
            ))}
          </TextField>
          <TextField label="Tema" name="tema" value={examen.tema} onChange={handleChange} select fullWidth margin="normal" variant="outlined" required>
            {temasEjemplo.filter(t => t.curso === examen.curso).map((tema) => (
              <MenuItem key={tema.id} value={tema.nombre}>{tema.nombre}</MenuItem>
            ))}
          </TextField>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
            <TextField label="Agregar pregunta" name="preguntaActual" value={examen.preguntaActual} onChange={handleChange} fullWidth variant="outlined" />
            <IconButton color="primary" onClick={handleAddPregunta} sx={{ height: 56 }}>
              <AddCircleIcon />
            </IconButton>
          </Box>
          <List dense>
            {examen.preguntas.map((preg, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={`Pregunta ${idx + 1}: ${preg}`} />
              </ListItem>
            ))}
          </List>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: 16, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }} startIcon={<SaveIcon />}>
            GUARDAR
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ExamenesForm; 