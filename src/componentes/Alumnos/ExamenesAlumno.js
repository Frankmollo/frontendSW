import React from 'react';
import { Box, Typography } from '@mui/material';

const ExamenesAlumno = ({ alumnoId }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
        Mis Exámenes
      </Typography>
      <Typography variant="body1">Aquí se mostrarán los exámenes asignados y resultados. (alumnoId: {alumnoId})</Typography>
    </Box>
  );
};

export default ExamenesAlumno; 