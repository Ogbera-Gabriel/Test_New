import  { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box } from '@mui/material';

const SignUpPage = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        'https://reqres.in/api/register',
        { email: user.email, password: user.password }
      );
      localStorage.setItem('token', response.data.token);
      navigate('/signin');
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 1,
        }}
      >
        <Typography variant="h2" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" type="submit" fullWidth>
            Sign Up
          </Button>
        </form>
        <Typography variant="body1" mt={2}>
          Already have an account? <Link to="/signin">Sign In</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpPage;
