import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const VideoDetail = ({ video }) => {
  if (!video) {
    return null;
  }

  const handleShowDetails = () => {
    // Lógica para mostrar detalles del video
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {video.title}
        </Typography>
        {/* Agrega cualquier otro detalle que desees mostrar */}
        <Button variant="contained" color="primary" onClick={handleShowDetails}>
          Ver Detalles
        </Button>
      </CardContent>
    </Card>
  );
};

export default VideoDetail;