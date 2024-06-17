import { useState, useEffect } from "react";
import axios from "axios";

const useUserPagination = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${currentPage}`
      );
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = (userId, updatedUserData) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, ...updatedUserData } : user
      )
    );
  };

  return { users, loading, currentPage, totalPages, handleNextPage, handlePrevPage, deleteUser, updateUser };
};

export default useUserPagination;
