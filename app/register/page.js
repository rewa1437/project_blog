'use client';

import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const API_URL = process.env.API_URL || "http://localhost:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Registration successful!");
        setError("");
        setShowModal(true); 
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Something went wrong');
        setSuccessMessage("");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleRedirect = () => {
    window.location.href = "/logins";
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Link href="/">
        <div className="absolute top-4 left-4 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:shadow-2xl hover:scale-105 transition-all">
          <span className="text-2xl">×</span>
        </div>
      </Link>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Create an Account</h1>

        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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

          <div>
            <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">Re-Password</label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              placeholder="Confirm password"
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-sm text-center">
            <p>Already have an account? 
              <Link href="/logins">
                <span className="text-blue-500 hover:underline">Login here</span>
              </Link>
            </p>
          </div>

          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Sign Up
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-bold mb-4">Registration Successful!</h2>
            <p className="text-lg mb-6">Your account has been created successfully. You can now log in to your account.</p>
            <button
              onClick={handleRedirect}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
