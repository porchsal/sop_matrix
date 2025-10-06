/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const SignIn = ({setUsername}) => {
    const [usernameInput, setUsernameInput] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();

    const fetchUser = async (userId, token) => {
        try {
            const response = await fetch(`http://localhost:3010/api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Not authorized');
            }
            const userData = await response.json();
            //return userData.username;
            return userData;
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setError('');

    //     try {
    //         const response = await fetch('http://localhost:3010/api/signin',  {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ username: usernameInput, password })
    //         });
    //         if (!response.ok) {
                
    //             throw new Error('Login failed');
    //         }

    //           const { token } = await response.json();
    //           localStorage.setItem('token', token);
    //           const decodedToken = jwtDecode(token);
    //           const fetchedUserdata = await fetchUser(decodedToken.id, token);
              
    //           if (!fetchedUserdata) {
    //               throw new Error('Error fetching user');
    //           }
    //             localStorage.setItem('username', fetchedUserdata.username);
    //             setUsername(fetchedUserdata.username);
    //             setRole(fetchedUserdata.profile);
    //             localStorage.setItem('role', fetchedUserdata.profile);
    //             navigate('/home', { replace: true });
    //       } catch (err) {
    //           setError('Login failed. Please try again.');
    //       } finally {
    //           setLoading(false);
    //       }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
      
        try {
          const response = await fetch('http://localhost:3010/api/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usernameInput, password })
          });
      
          if (!response.ok) throw new Error('Login failed');
      
          const { token } = await response.json();
          localStorage.setItem('token', token);
      
          const decodedToken = jwtDecode(token);
          
          // Store username and role in localStorage
          localStorage.setItem('username', decodedToken.username);
          localStorage.setItem('role', decodedToken.role);
          
          setUsername(decodedToken.username);
          setRole(decodedToken.role);
          navigate('/home', { replace: true });
        } catch (err) {
          setError('Login failed. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      


    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    SOP Training Matrix
                </Typography>
                <Box
                    component="img"
                     src="/logo.png" 
                     alt="Logo"
                    sx={{
                        height: 100,
                        marginTop: 2,
                        marginBottom: 2,
                    }}
                />
                
                <Typography component="h2" variant="h6">
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Sign In'}
                    </Button>
                </Box>
                
            </Box>
        </Container>
    );
};

export default SignIn;
