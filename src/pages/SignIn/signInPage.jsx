import  { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Box } from "@mui/material";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 1,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            type="email"
            name="email"
            label="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            type="password"
            name="password"
            label="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" type="submit" fullWidth>
            Sign In
          </Button>
        </form>
        <Typography variant="body1" mt={2}>
          Don't have an account? 
          <Link to="/signup">Sign Up</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignInPage;
