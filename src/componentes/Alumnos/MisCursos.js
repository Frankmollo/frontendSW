import React from 'react';
import { Box, Typography } from '@mui/material';

const MisCursos = ({ alumnoId }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
        Mis Cursos
      </Typography>
      <Typography variant="body1">Aquí se mostrarán los cursos a los que estás suscrito. (alumnoId: {alumnoId})</Typography>
    </Box>
  );
};

export default MisCursos; 