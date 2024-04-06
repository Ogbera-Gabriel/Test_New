import { useContext, useEffect } from 'react';
import UserList from '../../components/userList/userList';
import { Button, Container, Typography, Box, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../components/theme/ThemeContexeProvider';

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

  const { theme, setTheme } = useContext(ThemeContext)

  const handleThemeChange = () => {
    if (theme == "dark"){
      setTheme("light");
    } else {
      setTheme("dark")
    }
  };
  

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome
      </Typography>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {theme == "dark" ? (
          <Typography variant="subtitle2">Change to Light Mode</Typography>
        ) : (
          <Typography variant="subtitle2">Change to Dark Mode</Typography>
        )}
        <Switch onChange={handleThemeChange} />
      </Box>
      <UserList />
    </Container>
  );
};

export default HomePage;
