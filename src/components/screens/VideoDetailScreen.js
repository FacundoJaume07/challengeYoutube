import React from 'react';
import { Container, Paper, Typography, Grid } from '@mui/material';
import BackButton from '../common/BackButton';
import VideoDetail from '../common/VideoDetail';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/screens/VideoDetailScreen.css';

const VideoDetailScreen = () => {
  const { state } = useLocation();
  const selectedVideo = state && state.selectedVideo;



  return (
    <Container>
      <Paper elevation={3} className="video-detail-container">
        <BackButton />
        <Typography variant="h4" className="video-title">
          {selectedVideo.title}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img
              src={selectedVideo.thumbnail}
              alt={selectedVideo.title}
              className="video-cover-image"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <VideoDetail video={selectedVideo} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default VideoDetailScreen;
