import React, { useEffect } from 'react';
import UserList from '../../components/userList/userList';
import { Button, Container, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token, navigate])

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };
  

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome
      </Typography>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
      <UserList />
    </Container>
  );
};

export default HomePage;
