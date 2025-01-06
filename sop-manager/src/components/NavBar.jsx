import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = ({ username, onLogout }) => {
  return (
    <>
    <img src='../assets/logo.png' alt='Logo' style={{ position: 'fixed', top: 0, left: 0 }} />
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          SOP Training Matrix
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            {username}
          </Typography>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
    </>
  );
};

export default Navbar;
