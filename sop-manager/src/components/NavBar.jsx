import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const Navbar = ({ username, onLogout }) => {

  const navigate = useNavigate();

  return (
    <>
    
    <AppBar
      position="fixed"
      sx={{
        bgcolor: '#91A7FA',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 3 }}>
        <Box
          component="img"
          src="/logo.png"
          alt="Logo"
          sx={{
            height: 50,
            cursor: 'pointer',
            mr: 2,
          }}
          onClick={() => navigate('/')}
        />
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
          }}
        >
          SOP Training Matrix
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography
            variant="body1"
            sx={{
              marginRight: 2,
              color: '#ffffff',
              fontWeight: '500',
            }}
          >
            {username}
          </Typography>
          <Button
            color="inherit"
            onClick={onLogout}
            sx={{
              bgcolor: '#ffffff',
              color: '#91A7FA',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#e3f2fd',
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
    </>
  );
};

export default Navbar;
