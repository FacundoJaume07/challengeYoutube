import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useVideo } from '../../context/VideoContext';
import '../../styles/common/BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();
  const { setVideo, videoHistory } = useVideo();

  const handleButtonClick = () => {
    if (videoHistory.length > 0) {
      const previousVideo = videoHistory[videoHistory.length - 1];
      setVideo(previousVideo);
    } else {
      setVideo(null);
    }
    navigate('/');
  };

  return (
    <Button variant="outlined" onClick={handleButtonClick}>
      Back
    </Button>
  );
};

export default BackButton;
