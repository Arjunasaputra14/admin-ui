import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";

function Exercise() {
  // State untuk menyimpan data users dari API
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect untuk fetch data saat component pertama kali dimuat
  useEffect(() => {
    // Fungsi untuk fetch data dari API
    const fetchUsers = async () => {
      try {
        setLoading(true);
        
        // Fetch data dari JSONPlaceholder API
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // Cek apakah response berhasil
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        // Convert response ke JSON
        const data = await response.json();
        
        // Simpan data ke state
        setUsers(data);
        setLoading(false);
        
        console.log('Data berhasil diambil:', data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    // Panggil fungsi fetch
    fetchUsers();
  }, []); // [] artinya hanya dijalankan sekali saat component mount

  // Tampilkan loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-700 mb-2">Loading...</div>
          <div className="text-gray-500">Mengambil data users...</div>
        </div>
      </div>
    );
  }

  // Tampilkan error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-red-600 mb-2">Error!</div>
          <div className="text-gray-700">{error}</div>
        </div>
      </div>
    );
  }

  // Tampilkan data users
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        User Cards
      </h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {users.map((user) => (
          <UserCard 
            key={user.id}
            name={user.name}
            email={user.email}
            street={user.address.street}
            city={user.address.city}
          />
        ))}
      </div>

      <div className="text-center mt-6 text-gray-600">
        Total users: {users.length}
      </div>
    </div>
  );
}

export default Exercise;