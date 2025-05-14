"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [data_profile, setData] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser); 
    }
  }, []);

  useEffect(() => {
    if (userData) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/get_user_all/?user_id=${userData.user_id}`);
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userData]);

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleSaveUsername = async () => {
    if (newUsername !== data_profile.username) {
      setIsSaving(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/update_username/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userData.user_id,
            username: newUsername,
          }),
        });

        const data = await response.json();
        if (data.success) {
          alert("เปลี่ยนชื่อเรียบร้อย");
          setData((prevData) => ({ ...prevData, username: newUsername }));
          window.location.reload();
        } else {
          alert("ไม่มีการอัพเดท");
        }
      } catch (error) {
        console.error("Error updating username:", error);
        alert("Error updating username.");
      } finally {
        setIsSaving(false);
      }
    } else {
      alert("ไม่มีการอัพเดท");
    }
  };
  const handleDeleteUser = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/delete_user/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userData.user_id,
          }),
        });

        const data = await response.json();
        if (data.success) {
          alert("User deleted successfully!");
          localStorage.removeItem('user');
          window.location.href = "/";
        } else {
          alert("Failed to delete user.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error deleting user.");
      }
    }
  };  
  
  const rankClass = data_profile?.rank === 1 ? 'ผู้สนับสนุนระดับนักผจญภัย' :
                    data_profile?.rank === 2 ? 'ผู้สนับสนุนระดับจอมยุทธ' :
                    data_profile?.rank === 3 ? 'ผู้สนับสนุนระดับวีรบุรุษ' :
                    data_profile?.rank === 4 ? 'ผู้สนับสนุนระดับตำนาน' :
                    'ผู้สนับสนุนระดับนักผจญภัย';
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <div className="container p-8 bg-white shadow-md rounded-lg max-w-sm w-full">
          <h1 className="text-3xl font-bold text-center text-green-600 mb-4">My Account</h1>
          
          {data_profile ? (
            <div>
            <h2 className="text-xl font-semibold mb-2 text-center">Account Details</h2>
            
            <div className="mb-4  items-center">
              <label htmlFor="username" className="block text-lg font-semibold mb-2 mr-4">Username:</label>
              <input
                type="text"
                id="username"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={newUsername} 
                onChange={handleUsernameChange}
                placeholder={data_profile.username}  
              />
            </div>
            
            <p className="text-lg font-semibold mb-2">Email</p><p className="text-lg  mb-2">&emsp;{data_profile.email}</p>
            <p className="text-lg font-semibold mb-4">Rank</p><p className="text-lg  mb-2">&emsp;{rankClass}</p>

            <div className="mt-4 text-center flex space-x-4 items-center justify-center">
              <button
                onClick={handleSaveUsername}
                className={`bg-gray-600 text-white px-6 py-2 rounded-md ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isSaving}
              >
                Save
              </button>
              <button
                onClick={handleDeleteUser}
                className={`bg-red-600 text-white px-6 py-2 rounded-md ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isSaving}
              >
                Delete
              </button>
            </div>

          </div>
          ) : (
            <p className="text-center text-gray-500">Loading account details...</p>
          )}
        </div>
      </div>
      <footer className="text-center p-4 mt-8 text-gray-500 text-sm">
        © 2025, Microfinance
      </footer>
    </div>
  );
}
