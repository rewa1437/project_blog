'use client';

import { useState } from 'react';
import Link from 'next/link';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const API_URL = process.env.API_URL || "http://localhost:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful', data);

        localStorage.setItem('user', JSON.stringify(data));

        window.location.href = '/';
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Link href="/">
        <div className="absolute top-4 left-4 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:shadow-2xl hover:scale-105 transition-all">
          <span className="text-2xl">×</span>
        </div>
      </Link>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Microfinance Login</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-sm text-center">
            <p>Don't have an account yet? 
              <Link href="/register">
                <span className="text-blue-500 hover:underline">Sign Up here</span>
              </Link>
            </p>
          </div>

          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
