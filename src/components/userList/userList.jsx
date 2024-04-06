import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Grid,
  Button,
} from "@mui/material";
import CreateUserDialog from "./userCreate";
import UpdateUserDialog from "./userUpdate";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${currentPage}`
      );
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
    }
  };

  const handleUpdateUser = (user) => {
    setSelectedUser(user);
    setUpdateDialogOpen(true);
  };

  const isLastPage = currentPage === totalPages;

  return (
    <div>
      <h3>User List</h3>
      <Button onClick={() => setDialogOpen(true)}>Create New User</Button>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item key={user.id} xs={12} sm={6} md={4}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                  />
                }
                title={`${user.first_name} ${user.last_name}`}
                subheader={user.email}
              />
              <CardContent>
                <div style={{ display: "flex" }}>
                  <Button
                    onClick={() => handleDeleteUser(user.id)}
                    variant="outlined"
                    color="error"
                    style={{ marginRight: "8px" }}
                  >
                    Delete User
                  </Button>
                  <Button
                    onClick={() => handleUpdateUser(user)}
                    variant="outlined"
                    color="primary"
                  >
                    Update User
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </Button>
        <Button onClick={handleNextPage} disabled={isLastPage}>
          Next Page
        </Button>
      </div>
      <CreateUserDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        setUsers={setUsers}
      />
      {selectedUser && (
        <UpdateUserDialog
          open={updateDialogOpen}
          onClose={() => setUpdateDialogOpen(false)}
          onUpdateUser={(updatedUserData) => {
            const updatedUsers = users.map((user) =>
              user.id === updatedUserData.id ? updatedUserData : user
            );
            setUsers(updatedUsers);
          }}
          userId={selectedUser.id}
        />
      )}
    </div>
  );
};

export default UserList;
