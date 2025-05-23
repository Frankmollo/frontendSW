import React from 'react';
import { Box, Typography } from '@mui/material';

const MensajesAlumno = ({ alumnoId }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
        Mis Mensajes
      </Typography>
      <Typography variant="body1">Aquí se mostrarán tus mensajes. (alumnoId: {alumnoId})</Typography>
    </Box>
  );
};

export default MensajesAlumno; 