// VideoDetailScreen.js
import React from 'react';
import { Container, Paper, Typography, Grid, Button } from '@mui/material';
import BackButton from '../common/BackButton';
import VideoDetail from '../common/VideoDetail';
import { useNavigate } from 'react-router-dom';
import '../../styles/screens/VideoDetailScreen.css';

const VideoDetailScreen = ({ selectedVideo }) => {
  const navigate = useNavigate();

  const handleBackHomeScreen = () => {
    navigate('/');
  };

  return (
    <Container>
      <Paper elevation={3} className="video-detail-container">
        <BackButton onClick={handleBackHomeScreen} />
        <Typography variant="h4" className="video-title">
          {"selectedVideo.title"}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {/* Aquí mostrar la imagen principal del video como la portada */}
            {/* Puedes usar selectedVideo.imageUrl para la URL de la imagen */}
            <img
              src={"selectedVideo.imageUrl"}
              alt={"selectedVideo.title"}
              className="video-cover-image"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Detalles del video */}
            <VideoDetail video={selectedVideo} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default VideoDetailScreen;
