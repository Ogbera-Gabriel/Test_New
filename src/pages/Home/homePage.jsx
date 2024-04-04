import React from 'react';
import UserList from '../../components/userList/userList';

const HomePage = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/signin';
    return null;
  }
  
  return (
    <div>
      <h2>Welcome</h2>
      <UserList />
    </div>
  );
};

export default HomePage;
