import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GoogleCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token'); // Ambil token dari URL

        if (token) {
            localStorage.setItem('token', token); // Simpan token di localStorage
            navigate('/home'); // Redirect ke halaman setelah login berhasil
        } else {
            navigate('/login'); // Redirect ke halaman registrasi jika tidak ada token
        }
    }, [location, navigate]);

    return <div>Loading...</div>; // Tampilkan pesan loading saat memproses
};

export default GoogleCallback;