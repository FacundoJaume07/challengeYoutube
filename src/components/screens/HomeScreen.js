import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Button, AppBar, Toolbar, Typography } from '@mui/material';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import SearchBar from '../common/SearchBar';
import VideoPlayer from '../common/VideoPlayer';
import VideoList from '../common/VideoList';
import { useNavigate } from 'react-router-dom';
import youtubeSearch from 'youtube-api-v3-search';
import { useVideo } from '../../context/VideoContext'; // Importa el contexto
import '../../styles/screens/HomeScreen.css';


const HomeScreen = () => {
  const { selectedVideo, setVideo, addToHistory, relatedVideos, setRelatedVideosNew } = useVideo();
 // const [relatedVideos, setRelatedVideos] = useState([]);
  const [videoCount, setVideoCount] = useState(0);
  const navigate = useNavigate();
  const apiKey = 'AIzaSyD-88EWVA3yKwbnYbjEHm0aEk2KkG1XkXA';


  const handleSearch = async (query) => {
    try {
      const result = await youtubeSearch(apiKey, { q: query });

      if (result && result.items && result.items.length > 3) {

        const firstVideo = result.items[0];
        const firstVideoStatics = result.items[0].statistics; 

        const videoInfo = {
          id: firstVideo.id.videoId,
          title: firstVideo.snippet.title,
          description: firstVideo.snippet.description,
          thumbnail: firstVideo.snippet.thumbnails.default.url,
          uploadDate: firstVideo.snippet.publishedAt,
          channelTitle: firstVideo.snippet.channelTitle,
        };

        const videoStatistics = await getVideoStatistics(firstVideo.id.videoId);

        if (videoStatistics) {
          videoInfo.views = videoStatistics.viewCount;
          videoInfo.likes = videoStatistics.likeCount;
          videoInfo.comments = videoStatistics.commentCount;
        } else {
          console.error('No se pudieron obtener estadísticas del video.');
        }
        
        setVideo(videoInfo);
        addToHistory(videoInfo);
        getRelatedVideos(result);
        setVideoCount((prevCount) => prevCount + 1);
      } else {
        console.error('No se encontraron videos.');
      }

    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
    
  };

  function getRelatedVideos(result) {
    const videos = [];
    for (let i = 1; i < 4 && i < result.items.length; i++) {
      const item = result.items[i];
      videos.push({
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
      });
    }

    setRelatedVideosNew(videos);
  }

  const getVideoStatistics = async (videoId) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=statistics&key=${apiKey}`
      );
  
      const data = await response.json();
  
      if (data.items && data.items.length > 0) {
        return data.items[0].statistics;
      }
  
      return null;
    } catch (error) {
      console.error('Error al obtener estadísticas del video:', error);
      return null;
    }
  };

  const handleVideoSelect = (video) => {
    handleSearch(video.title);
  };

  const handleShowDetails = () => {
    navigate(`/video-details/${selectedVideo.id}`, { state: { selectedVideo } });
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
      <Grid container spacing={3} >
        <Grid item xs={12} md={8} >
          <Paper elevation={3} className="video-player-container" >
            {selectedVideo ? (
              <VideoPlayer video={selectedVideo} />
            ) : (
              <div className="logo-container">
                <AddToQueueIcon style={{ fontSize: 100 }} />
              </div>
            )}
          </Paper>
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
