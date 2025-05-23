import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const tiposEjemplo = [
  { value: 'asistencia', label: 'Asistencia' },
  { value: 'calificaciones', label: 'Calificaciones' },
  { value: 'incidencias', label: 'Incidencias' }
];

const ReportesForm = ({ docenteId }) => {
  const [reporte, setReporte] = useState({
    descripcion: '',
    tipo: ''
  });

  const handleChange = (e) => {
    setReporte({ ...reporte, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Reporte guardado (solo frontend): ' + JSON.stringify(reporte, null, 2));
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, background: '#f8fafc' }}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom color="#1976d2">
          Formulario de Reporte
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Tipo de Reporte" name="tipo" value={reporte.tipo} onChange={handleChange} select fullWidth margin="normal" variant="outlined" required>
            {tiposEjemplo.map((tipo) => (
              <MenuItem key={tipo.value} value={tipo.value}>{tipo.label}</MenuItem>
            ))}
          </TextField>
          <TextField label="Descripción" name="descripcion" value={reporte.descripcion} onChange={handleChange} fullWidth margin="normal" variant="outlined" required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: 16, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }} startIcon={<SaveIcon />}>
            GUARDAR
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ReportesForm; 