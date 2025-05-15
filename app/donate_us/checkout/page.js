'use client'; 

import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';

export default function Checkout() {
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const productId = localStorage.getItem("selectedProductId"); 

    if (productId) {
      const fetchProductData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/get_product_details/${productId}/`);
          const data = await response.json();
          if (data.id) setProduct(data);
          else throw new Error('Product not found');
        } catch (error) {
          setError(error.message);
        }
      };
      fetchProductData();
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.user_id;

    if (userId) {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/get_user/?user_id=${userId}`);
          const userInfo = await response.json();
          setUser({ user_id: userId, ...userInfo });
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };
      fetchUserInfo();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.user_id) {
      alert("กรุณาเข้าสู่ระบบก่อนทำการบริจาค");
      return;
    }

    const formData = new FormData(e.target);
    const fullName = formData.get("fullname");
    const email = formData.get("email");
    const phone = formData.get("phone");

    try {
      const donateRes = await fetch("http://127.0.0.1:8000/add_donation/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user_id,
          product_id: product.id,
          amount: product.product_price,
          note: `ชื่อ: ${fullName}, อีเมล: ${email}, เบอร์: ${phone}`,
        }),
      });

      const donateData = await donateRes.json();

      if (donateData.success) {
        const newRank = product.product_rank;

        if (newRank > user.rank) {
          await fetch("http://127.0.0.1:8000/update_rank/", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: user.user_id,
              rank: newRank,
            }),
          });
        }

        alert("ขอบคุณสำหรับการบริจาค!");
        window.location.href = "/";
      } else {
        alert("เกิดข้อผิดพลาด: " + donateData.message);
      }
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("ไม่สามารถทำรายการได้");
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p>{error}</p>
      </div>
    );
  }

  if (!product || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  const rankClass = product.product_rank === 1 ? 'ได้รับพื้นหลังโปรไฟล์เป็นสีเทา' :
                    product.product_rank === 2 ? 'ได้รับพื้นหลังโปรไฟล์เป็นสีฟ้า' :
                    product.product_rank === 3 ? 'ได้รับพื้นหลังโปรไฟล์เป็นสีเขียว' :
                    product.product_rank === 4 ? 'ได้รับพื้นหลังโปรไฟล์เป็นสีเหลือง' :
                    'ได้รับพื้นหลังโปรไฟล์เป็นสีเทา';

  return (
    <div className="h-auto">
      <Navbar />
      <div className="p-8">
        <h1 className="text-4xl font-bold text-center">Checkout</h1>

        <div className="mt-8 flex gap-x-8">
          <div className="w-10/10 p-6">
            <h3 className="text-2xl font-semibold">Product: {product.product_name}</h3>
            <br />
            <p><strong>Price:</strong> {product.product_price} ฿</p>
            <br />
            <p><strong>Description:</strong> {product.product_description}</p>
            <br />
            <p><strong>Rank:</strong> {rankClass}</p>
          </div>

          <div className="w-1/10"></div>

          <div className="w-3/4 p-6">
            <h3 className="text-2xl font-semibold">Order Form</h3>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Full Name</label>
                <input name="fullname" type="text" className="w-full p-2 mt-1 border rounded-md" placeholder="Enter your name" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Email</label>
                <input name="email" type="email" className="w-full p-2 mt-1 border rounded-md" placeholder="Enter your email" required/>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Phone Number</label>
                <input name="phone" type="tel" className="w-full p-2 mt-1 border rounded-md" placeholder="Enter your phone number" required />
              </div>
              <div className="mt-8">
                <div className="flex justify-between">
                  <p className="font-semibold">Total: {product.product_price} ฿</p>
                  <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500">
                    Confirm Donation
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
