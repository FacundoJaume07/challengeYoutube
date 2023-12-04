import React from 'react';
import Button from '@mui/material/Button';
import '../../styles/common/BackButton.css';

const BackButton = ({ onClick }) => {
  return (
    <Button variant="outlined" onClick={onClick}>Volver</Button>
  );
};

export default BackButton;