import { useState, useEffect } from "react";
import axios from "axios"; 
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

const UpdateUserDialog = ({ open, onClose, onUpdateUser, userId }) => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });


  useEffect(() => {
    if (open) {
      fetchUserData();
    }
  }, [open]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${userId}`);
      const userDataFromApi = response.data.data;
      setUserData(userDataFromApi);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const updateUserData = async () => { 
    try {
      await axios.patch(
        `https://reqres.in/api/users/${userId}`,
        userData
      );
      onUpdateUser(userData); 
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error; 
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          value={userData.first_name}
          onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={userData.last_name}
          onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={updateUserData}> 
          Update
        </Button>
        <Button variant="outlined" onClick={onClose} sx={{ ml: 1 }}>
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserDialog;
