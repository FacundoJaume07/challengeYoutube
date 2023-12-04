import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const VideoList = ({ videos, onVideoSelect }) => {
  return (
    <List>
      {videos.map((video, index) => (
        <ListItem key={index} button onClick={() => onVideoSelect(video)}>
          <img
            src={video.thumbnail}
            alt={video.title}
            style={{ width: 80, height: 80, objectFit: 'cover', marginRight: '8px', borderRadius: '8px' }}
          />
          <ListItemText
            primary={video.title}
            primaryTypographyProps={{ variant: 'subtitle2', sx: { fontSize: '0.8rem' } }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default VideoList;
