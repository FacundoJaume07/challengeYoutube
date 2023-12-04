import React from 'react';
import { Paper } from '@mui/material';

const VideoPlayer = ({ video }) => {
  return (
    <Paper elevation={3} className="video-player">
      {video && (
        <div>
          <iframe
            title={video.title}
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${video.id}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </Paper>
  );
};

export default VideoPlayer;