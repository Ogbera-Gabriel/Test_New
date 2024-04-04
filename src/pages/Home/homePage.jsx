import React from 'react';

const HomePage = () => {
  const token = localStorage.getItem('token');
  const firstName = localStorage.getItem('firstName');
  if (!token) {
    window.location.href = '/signin';
    return null;
  }

  return (
    <div>
        hello world
      <h2>Welcome {firstName}</h2>
    </div>
  );
};

export default HomePage;
