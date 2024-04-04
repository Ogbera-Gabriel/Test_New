import React from 'react';
import UserList from '../../components/userList/userList';
import { Button, Container, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const handleCreateUser = () => {
    navigate('/create-user');
  };

  if (!token) {
    navigate('/signin');
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome
      </Typography>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleCreateUser}>
            Create User
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleLogout} sx={{ ml: 2 }}>
            Logout
          </Button>
        </Grid>
      </Grid>
      <UserList />
    </Container>
  );
};

export default HomePage;

