import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

// eslint-disable-next-line react/prop-types
const Navbar = ({ username, onLogout }) => {
  return (
    <>
    
    <AppBar position="fixed">
      <Toolbar>
        <Box 
            component="img" 
            src='../assets/logo.png' 
            alt='Logo'
            sx={{
              height: 40, // Ajusta el tamaño de la imagen
              marginRight: 20, // Espaciado entre el logo y el texto
            }}
          />

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
