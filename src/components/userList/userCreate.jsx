import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

const CreateUserDialog = ({ open, onClose, onCreateUser }) => {
  const [userData, setUserData] = useState({
    name: "",
    job: "",
  });

  const handleCreateUser = () => {
    onCreateUser(userData);
    setUserData({ name: "", job: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Job"
          value={userData.job}
          onChange={(e) => setUserData({ ...userData, job: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCreateUser}>
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
