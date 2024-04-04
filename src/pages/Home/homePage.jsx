import React from 'react';

const HomePage = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/signin';
    return null;
  }

  return (
    <div>
      <h2>Welcome</h2>
    </div>
  );
};

export default HomePage;
