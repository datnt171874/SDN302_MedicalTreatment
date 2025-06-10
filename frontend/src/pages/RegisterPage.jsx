import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ userName: '', password: '', email: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', formData);
      console.log("Sending to backend:", formData);
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white">
      <div className="flex w-full max-w-5xl bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="w-1/2 bg-gradient-to-br from-green-500 to-emerald-600 text-white p-10 flex flex-col justify-center relative">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Create Your Account</h2>
            <p className="text-lg">Join us to manage your health journey!</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-6 bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
            >
              Already have an account? Sign In
            </button>
          </div>
          <div className="absolute inset-0 opacity-20">
            {/* <svg className="w-full h-full text-green-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5V7l-10 5-10-5v10z"/>
            </svg> */}
            <img src="" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="w-1/2 p-10 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="inline-block bg-green-500 text-white rounded-full w-14 h-14 flex items-center justify-center mb-4 animate-pulse">
              <span className="text-2xl">🌱</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome!</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                placeholder="Enter Username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                placeholder="Enter Password"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                placeholder="Enter Email (e.g., user1@user.com)"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transition duration-300 transform hover:scale-105"
            >
              Register →
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Forgot your password?{' '}
            <a href="/forgot-password" className="text-green-600 hover:underline">Click Here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;