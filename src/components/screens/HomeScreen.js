import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Button, AppBar, Toolbar, Typography } from '@mui/material';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import SearchBar from '../common/SearchBar';
import VideoPlayer from '../common/VideoPlayer';
import VideoList from '../common/VideoList';
import { useNavigate } from 'react-router-dom';
import { useVideo } from '../../context/VideoContext';
import { searchVideos, getVideoStatistics } from '../../services/youtubeService';
import '../../styles/screens/HomeScreen.css';

const HomeScreen = () => {
  const { selectedVideo, setVideo, addToHistory, relatedVideos, setRelatedVideosNew } = useVideo();
  const [videoCount, setVideoCount] = useState(0);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    try {
      const result = await searchVideos(query);

      if (result && result.items && result.items.length > 3) {
        const firstVideo = result.items[0];

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
          console.error('Failed to obtain video statistics.');
        }

        setVideo(videoInfo);
        addToHistory(videoInfo);
        getRelatedVideos(result);
        setVideoCount((prevCount) => prevCount + 1);
      } else {
        console.error('No videos found.');
      }
    } catch (error) {
      console.error('Error searching:', error);
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
          <Typography variant="h6">CahllengeYouTube</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SearchBar onSearch={handleSearch} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className="video-player-container">
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
                View Details
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
