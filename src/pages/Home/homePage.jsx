import React from 'react';
import UserList from '../../components/userList/userList';
import { Button, Container, Typography } from '@mui/material';

const HomePage = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/signin';
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/signin';
  };
  
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogout} sx={{ mb: 2 }}>
        Logout
      </Button>
      <UserList />
    </Container>
  );
};

export default HomePage;
