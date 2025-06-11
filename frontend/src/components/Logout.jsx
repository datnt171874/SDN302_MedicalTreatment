import React from 'react';
import {useNavigate }from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        console.log('Logout successful');
        navigate('/login'); 
    }

    return (
    
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200">
            Logout
        </button>)
}

export default Logout;