import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ userName: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      console.log('Login successful:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 bg-green-500 text-white p-8 flex flex-col justify-center relative">
          <img
            src=""
            alt=""
            className="absolute inset-0 w-1/2 h-full object-cover opacity-50"
          />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Login<br /></h2>
            <p className="text-lg">gggggg</p>
            <button
              onClick={() => navigate('/register')} // Chuyển sang trang đăng ký
              className="mt-6 bg-white text-green-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100"
            >
              Don’t have an account? Sign Up
            </button>
          </div>
        </div>

        <div className="w-1/2 p-8 flex flex-col justify-center">
          <div className="text-center mb-6">
            <div className="inline-block bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-2">
              <span>🌱</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600">Username</label>
              <input
                type="text"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Username"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Login →
            </button>
            <p className="text-sm text-purple-600 text-center cursor-pointer hover:underline">
              Forgot your password? Click Here
            </p>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;