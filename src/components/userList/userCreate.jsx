import { useState } from "react";
import axios from "axios"; 
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

const CreateUserDialog = ({ open, onClose, setUsers }) => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const createUser = async () => { 
    try {
      const response = await axios.post(
        'https://reqres.in/api/users',
        userData
      );
      setUsers(prevUsers => [response.data, ...prevUsers])
      onClose();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; 
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create User</DialogTitle>
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
        <Button variant="contained" color="primary" onClick={createUser}> 
          Create
        </Button>
        <Button variant="outlined" onClick={onClose} sx={{ ml: 1 }}>
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
