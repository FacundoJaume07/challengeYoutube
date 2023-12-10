import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useVideo } from '../../context/VideoContext'; // Importa el contexto
import '../../styles/common/BackButton.css';

const BackButton = ({ onClick }) => {
  const navigate = useNavigate();
  const { setVideo, videoHistory  } = useVideo();

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
      Volver
    </Button>
  );
};

export default BackButton;
