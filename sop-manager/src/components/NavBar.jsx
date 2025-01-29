import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const Navbar = ({ username, onLogout }) => {

  const navigate = useNavigate();

  return (
    <>
    
    <AppBar 
      position="fixed"
      display="flex"
      justify-content="space-between"
      sx={{ bgcolor: '#91A7FA' }}
      >
      <Toolbar>
        <Box
            component="img" 
            src="/logo.png" 
            alt="Logo"
            backgroundColor='transparent'
            sx={{
              height: 60, 
              marginLeft: 25,
              cursor: 'pointer' 
            }}
            onClick={() =>  navigate('/') }
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
