// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import React, { useState } from 'react';
// import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';


// const SignIn = ({setUsername}) => {
//     const [usernameInput, setUsernameInput] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [role, setRole] = useState('');

//     const navigate = useNavigate();

//     const fetchUser = async (userId, token) => {
//         try {
//             const response = await fetch(`http://localhost:3010/api/user/${userId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             if (!response.ok) {
//                 throw new Error('Not authorized');
//             }
//             const userData = await response.json();
//             //return userData.username;
//             return userData;
//         } catch (error) {
//             console.error('Error fetching user:', error);
//             return null;
//         }
//     };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     setLoading(true);
//     //     setError('');

//     //     try {
//     //         const response = await fetch('http://localhost:3010/api/signin',  {
//     //         method: 'POST',
//     //         headers: {
//     //           'Content-Type': 'application/json'
//     //         },
//     //         body: JSON.stringify({ username: usernameInput, password })
//     //         });
//     //         if (!response.ok) {
                
//     //             throw new Error('Login failed');
//     //         }

//     //           const { token } = await response.json();
//     //           localStorage.setItem('token', token);
//     //           const decodedToken = jwtDecode(token);
//     //           const fetchedUserdata = await fetchUser(decodedToken.id, token);
              
//     //           if (!fetchedUserdata) {
//     //               throw new Error('Error fetching user');
//     //           }
//     //             localStorage.setItem('username', fetchedUserdata.username);
//     //             setUsername(fetchedUserdata.username);
//     //             setRole(fetchedUserdata.profile);
//     //             localStorage.setItem('role', fetchedUserdata.profile);
//     //             navigate('/home', { replace: true });
//     //       } catch (err) {
//     //           setError('Login failed. Please try again.');
//     //       } finally {
//     //           setLoading(false);
//     //       }
//     // };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
      
//         try {
//           const response = await fetch('http://localhost:3010/api/signin', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username: usernameInput, password })
//           });
      
//           if (!response.ok) throw new Error('Login failed');
      
//           const { token } = await response.json();
//           localStorage.setItem('token', token);
      
//           const decodedToken = jwtDecode(token);
          
//           // Store username and role in localStorage
//           localStorage.setItem('username', decodedToken.username);
//           localStorage.setItem('role', decodedToken.role);
          
//           setUsername(decodedToken.username);
//           setRole(decodedToken.role);
//           navigate('/home', { replace: true });
//         } catch (err) {
//           setError('Login failed. Please try again.');
//         } finally {
//           setLoading(false);
//         }
//       };
      


//     return (
//         <Container component="main" maxWidth="xs">
//             <Box
//                 sx={{
//                     marginTop: 8,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                 }}
//             >
//                 <Typography component="h1" variant="h5">
//                     SOP Training Matrix
//                 </Typography>
//                 <Box
//                     component="img"
//                      src="/logo.png" 
//                      alt="Logo"
//                     sx={{
//                         height: 100,
//                         marginTop: 2,
//                         marginBottom: 2,
//                     }}
//                 />
                
//                 <Typography component="h2" variant="h6">
//                     Sign In
//                 </Typography>
//                 <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//                     <TextField
//                         variant="outlined"
//                         margin="normal"
//                         required
//                         fullWidth
//                         id="username"
//                         label="Username"
//                         name="username"
//                         autoComplete="username"
//                         autoFocus
//                         value={usernameInput}
//                         onChange={(e) => setUsernameInput(e.target.value)}
//                     />
//                     <TextField
//                         variant="outlined"
//                         margin="normal"
//                         required
//                         fullWidth
//                         name="password"
//                         label="Password"
//                         type="password"
//                         id="password"
//                         autoComplete="current-password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     {error && <Typography color="error">{error}</Typography>}
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         sx={{ mt: 3, mb: 2 }}
//                         disabled={loading}
//                     >
//                         {loading ? <CircularProgress size={24} /> : 'Sign In'}
//                     </Button>
//                 </Box>
                
//             </Box>
//         </Container>
//     );
// };

// export default SignIn;



// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// eslint-disable-next-line react/prop-types
const SignIn = ({ setUsername }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3010/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      const { token } = await response.json();
      localStorage.setItem('token', token);

      const decodedToken = jwtDecode(token);
      localStorage.setItem('username', decodedToken.username);
      localStorage.setItem('role', decodedToken.role);

      setUsername(decodedToken.username);
      navigate('/home', { replace: true });
    } catch (err) {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #90CAF9 0%, #5C6BC0 100%)',
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: 'center',
            backdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="Logo"
            sx={{
              height: 90,
              mb: 2,
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            SOP Training Matrix
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Sign in to continue
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <Typography
                variant="body2"
                color="error"
                sx={{ mt: 1, mb: 1, fontWeight: 500 }}
              >
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.2,
                backgroundColor: '#5C6BC0',
                fontWeight: 'bold',
                letterSpacing: 0.5,
                '&:hover': {
                  backgroundColor: '#3F51B5',
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mt: 3 }}
          >
            © {new Date().getFullYear()} Chief Medical | SOP Manager
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignIn;
