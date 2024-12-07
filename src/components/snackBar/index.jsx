import React, { useState } from 'react';
import { Snackbar as MuiSnackBar, Button } from '@mui/material';

const SnackBar = ({ message, open, onClose, autoHideDuration = 3000 }) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return; 
    setIsOpen(false);
    if (onClose) onClose(); 
  };

  return (
    <MuiSnackBar
      open={isOpen}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      message={message}
      action={
        <Button color="secondary" size="small" onClick={handleClose}>
          Fechar
        </Button>
      }
    />
  );
};

export default SnackBar;
