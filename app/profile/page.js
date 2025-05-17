"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [data_profile, setData] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const API_URL = process.env.API_URL || "https://microfinance-backend-763l.onrender.com";
  const [donations, setDonations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


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
          const response = await fetch(`${API_URL}/get_user_all/?user_id=${userData.user_id}`);
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      const fetchDonations = async () => {
        try {
          const response = await fetch(`${API_URL}/get_all_donations/`);
          const data = await response.json();
          setDonations(data.donations);
        } catch (error) {
          console.error("Error fetching donations:", error);
        }
      };

      fetchUserData();
      fetchDonations();
    }
  }, [userData]);

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleSaveUsername = async () => {
    if (newUsername !== data_profile.username) {
      setIsSaving(true);
      try {
        const response = await fetch(`${API_URL}/update_username/`, {
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
        const response = await fetch(`${API_URL}/delete_user/`, {
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

  const filteredDonations = donations.filter(d => d.user_id === userData?.user_id);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDonations = filteredDonations.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const filteredData = donations.filter((item) => item.user_id === userData.user_id);
  
  const rankClass = data_profile?.rank === 1 ? 'ผู้สนับสนุนระดับนักผจญภัย' :
                    data_profile?.rank === 2 ? 'ผู้สนับสนุนระดับจอมยุทธ' :
                    data_profile?.rank === 3 ? 'ผู้สนับสนุนระดับวีรบุรุษ' :
                    data_profile?.rank === 4 ? 'ผู้สนับสนุนระดับตำนาน' :
                    'ผู้สนับสนุนระดับนักผจญภัย';
  return (
    <div className="h-full bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="container p-8 bg-white shadow-md rounded-lg max-w-sm w-full mt-10">
          <h1 className="text-3xl font-bold text-center text-green-600 mb-4">My Account</h1>
            <div className="" >
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
        </div>



        <div style={{ width: 600, marginTop: 20 }} className="bg-white shadow-md rounded-lg p-10">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-4">Donate History</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Timestamp</th>
                <th className="border border-gray-300 px-4 py-2">Product Name</th>
                <th className="border border-gray-300 px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentDonations.map((item, index) => (
                <tr key={item.id ?? index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{item.timestamp}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.product_name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{item.amount}</td>
                </tr>
              ))}
              {currentDonations.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No donations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between mt-3">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="self-center">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
