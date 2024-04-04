import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, Avatar, Typography, Grid, Button } from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const maxUsersPerPage = 6;

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const isLastPage = users.length < maxUsersPerPage;

  return (
    <div>
      <h3>User List</h3>
      <Grid container spacing={2}>
        {users.map(user => (
          <Grid item key={user.id} xs={12} sm={6} md={4}>
            <Card>
              <CardHeader
                avatar={<Avatar src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />}
                title={`${user.first_name} ${user.last_name}`}
                subheader={user.email}
              />
              <CardContent>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</Button>
        <Button onClick={handleNextPage} disabled={isLastPage}>Next Page</Button>
      </div>
    </div>
  );
};

export default UserList;
