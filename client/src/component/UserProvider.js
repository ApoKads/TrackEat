import React, { createContext, useState, useEffect } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Tambahkan state loading
  const [profileImage, setProfileImage] = useState(null); // State untuk URL gambar profil

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token tidak ditemukan');
        setLoading(false); // Set loading ke false jika token tidak ada
        return;
      }

      const response = await axios.get('/user/info', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.data); // Simpan data pengguna
      setProfileImage(response.data.data.imageurl)

    } catch (error) {
      console.error('Error fetching user info:', error);
      if (error.response) {
        console.error('Response error:', error.response.data);
      }
    } finally {
      setLoading(false); // Set loading ke false setelah fetching selesai
    }
  };

  
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading,profileImage ,setProfileImage}}>
      {children}
    </UserContext.Provider>
  );
};