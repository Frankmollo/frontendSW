import React from 'react';
import { Box, Typography } from '@mui/material';

const EjemplosAlumno = ({ alumnoId }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
        Ejemplos
      </Typography>
      <Typography variant="body1">Aquí se mostrarán los ejemplos disponibles. (alumnoId: {alumnoId})</Typography>
    </Box>
  );
};

export default EjemplosAlumno; 