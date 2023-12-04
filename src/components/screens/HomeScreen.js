import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Button, AppBar, Toolbar, Typography } from '@mui/material';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import SearchBar from '../common/SearchBar';
import VideoPlayer from '../common/VideoPlayer';
import VideoList from '../common/VideoList';
import { useNavigate } from 'react-router-dom';
import youtubeSearch from 'youtube-api-v3-search';

const HomeScreen = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [videoCount, setVideoCount] = useState(0);
  const navigate = useNavigate();
  const apiKey = 'AIzaSyD-88EWVA3yKwbnYbjEHm0aEk2KkG1XkXA';

  const getRelatedVideos = async (searchTerm) => {
    try {
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      const url = `https://www.googleapis.com/youtube/v3/search?q=${encodedSearchTerm}&part=snippet&type=video&maxResults=3&key=${apiKey}`;
  
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.error) {
        console.error('Error al obtener videos relacionados:', data.error);
        return null;
      }
  
      const videos = data.items.map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
      }));
  
      setRelatedVideos(videos); 
  
      return videos;
    } catch (error) {
      console.error('Error al obtener videos relacionados:', error);
      return null;
    }
  };

  const handleSearch = async (query) => {
    try {
      const result = await youtubeSearch(apiKey, { q: query });

      if (result && result.items && result.items.length > 0) {
        const firstVideo = result.items[0];
        const videoInfo = {
          id: firstVideo.id.videoId,
          title: firstVideo.snippet.title,
          description: firstVideo.snippet.description,
          thumbnail: firstVideo.snippet.thumbnails.default.url,
        };

        setSelectedVideo(videoInfo);
      } else {
        console.error('No se encontraron videos.');
      }
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  useEffect(() => {
    if (selectedVideo) {
      getRelatedVideos(selectedVideo.id);
    }
  }, [selectedVideo]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setVideoCount((prevCount) => prevCount + 1);
  };

  const handleShowDetails = () => {
    navigate('/video-details');
  };

  return (
    <Container className="Container">
      <AppBar position="static" style={{ marginBottom: '16px' }}>
        <Toolbar>
          <Typography variant="h6">FacuTube</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SearchBar onSearch={handleSearch} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <div className="custom-paper"> {/* Nuevo contenedor */}
            <Paper elevation={3} className="video-player-container">
              {selectedVideo ? (
                <VideoPlayer video={selectedVideo} />
              ) : (
                <div className="logo-container">
                  <AddToQueueIcon style={{ fontSize: 100 }} />
                </div>
              )}
            </Paper>
          </div>
          {selectedVideo && (
            <div className="video-details-container">
              <h2 className="video-title">{selectedVideo.title}</h2>
              <Button variant="contained" color="primary" onClick={handleShowDetails}>
                Ver Detalles
              </Button>
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className="video-details-container">
            <VideoList videos={relatedVideos} onVideoSelect={handleVideoSelect} />
          </Paper>
          <div className="video-counter">
            <p>Videos Watched: {videoCount}</p>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeScreen;
