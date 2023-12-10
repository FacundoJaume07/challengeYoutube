import React, { createContext, useContext, useState } from 'react';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoHistory, setVideoHistory] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);

  const setVideo = (video) => {
    setSelectedVideo(video);
  };

  const addToHistory = (video) => {
    setVideoHistory((prevHistory) => [...prevHistory, video]);
  };

  const setRelatedVideosNew = (videos) => {
    setRelatedVideos(videos);
  };

  return (
    <VideoContext.Provider value={{ selectedVideo, setVideo, videoHistory, addToHistory, relatedVideos, setRelatedVideosNew }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  const { selectedVideo, setVideo, videoHistory, addToHistory, relatedVideos, setRelatedVideosNew} = context;
  return { selectedVideo, setVideo, videoHistory, addToHistory, relatedVideos, setRelatedVideosNew };
};

export { VideoContext };
