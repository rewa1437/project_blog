'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser); 

      const fetchUserInfo = async () => {
        try {
          const userResponse = await fetch(`http://127.0.0.1:8000/get_user/?user_id=${parsedUser.user_id}`);
          const userInfo = await userResponse.json();

          const completeUserData = { ...parsedUser, ...userInfo };
          console.log(completeUserData);
          setUser(completeUserData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user info:', error);
          setLoading(false);
        }
      };

      fetchUserInfo();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  const rankClass = user?.rank === 1 ? 'bg-gray-500' :
                    user?.rank === 2 ? 'bg-blue-500' :
                    user?.rank === 3 ? 'bg-green-500' :
                    user?.rank === 4 ? 'bg-yellow-500' :
                    'bg-gray-500';

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center space-x-6">
        <div className="font-bold text-xl">MicroFinance</div>

        <div className="flex items-center space-x-4">
          <Link href="/">
            <span className="cursor-pointer">Home</span>
          </Link>

          <Link href="/blog">
            <span className="cursor-pointer">Blog</span>
          </Link>

          <Link href="/donate_us">
            <span className="cursor-pointer">Donate</span>
          </Link>

          {user ? (
            <div className="flex items-center">
              <Link href="/profile">
                <div className={`${rankClass} text-white p-2 rounded-md cursor-pointer hover:scale-101 transition-all`}>
                  {user.username}
                </div>
              </Link>
              <button
                className="ml-4 bg-red-600 text-white px-4 py-2 rounded-md hover:scale-101"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/logins">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
