import React from 'react';
import { Box, Typography } from '@mui/material';

const DebatesAlumno = ({ alumnoId }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
        Mis Debates
      </Typography>
      <Typography variant="body1">Aquí se mostrarán los debates en los que participas. (alumnoId: {alumnoId})</Typography>
    </Box>
  );
};

export default DebatesAlumno; 