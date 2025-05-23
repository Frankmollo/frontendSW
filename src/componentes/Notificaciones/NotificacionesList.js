import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const tiposEjemplo = [
  { value: 'general', label: 'General' },
  { value: 'urgente', label: 'Urgente' },
  { value: 'recordatorio', label: 'Recordatorio' }
];

const NotificacionesForm = ({ docenteId }) => {
  const [notificacion, setNotificacion] = useState({
    asunto: '',
    descripcion: '',
    tipo: ''
  });

  const handleChange = (e) => {
    setNotificacion({ ...notificacion, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Notificación guardada (solo frontend): ' + JSON.stringify(notificacion, null, 2));
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, background: '#f8fafc' }}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom color="#1976d2">
          Formulario de Notificación
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Tipo de Notificación" name="tipo" value={notificacion.tipo} onChange={handleChange} select fullWidth margin="normal" variant="outlined" required>
            {tiposEjemplo.map((tipo) => (
              <MenuItem key={tipo.value} value={tipo.value}>{tipo.label}</MenuItem>
            ))}
          </TextField>
          <TextField label="Asunto" name="asunto" value={notificacion.asunto} onChange={handleChange} fullWidth margin="normal" variant="outlined" required />
          <TextField label="Descripción" name="descripcion" value={notificacion.descripcion} onChange={handleChange} fullWidth margin="normal" variant="outlined" required multiline rows={3} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: 16, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }} startIcon={<SaveIcon />}>
            GUARDAR
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default NotificacionesForm; 