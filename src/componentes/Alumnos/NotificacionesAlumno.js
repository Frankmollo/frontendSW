import React from 'react';
import { Box, Typography } from '@mui/material';

const NotificacionesAlumno = ({ alumnoId }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
        Mis Notificaciones
      </Typography>
      <Typography variant="body1">Aquí se mostrarán tus notificaciones. (alumnoId: {alumnoId})</Typography>
    </Box>
  );
};

export default NotificacionesAlumno; 