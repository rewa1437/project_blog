  'use client'; 

  import { useEffect, useState } from 'react';
  import Navbar from '@/app/components/Navbar';
  import Link from 'next/link';


  export default function Checkout() {
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const API_URL = process.env.API_URL || "https://microfinance-backend-763l.onrender.com";

    useEffect(() => {
      const productId = localStorage.getItem("selectedProductId"); 

      if (productId) {
        const fetchProductData = async () => {
          try {
            const response = await fetch(`${API_URL}/get_product_details/${productId}/`);
            const data = await response.json();
            if (data.id) setProduct(data);
            else throw new Error('Product not found');
          } catch (error) {
            setError(error.message);
          }
        };
        fetchProductData();
      }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.user_id;

      if (userId) {
        const fetchUserInfo = async () => {
          try {
            const response = await fetch(`https://microfinance-backend-763l.onrender.com/get_user/?user_id=${userId}`);
            const userInfo = await response.json();
            setUser({ user_id: userId, ...userInfo });
          } catch (error) {
            console.error("Error fetching user info:", error);
          }
        };
        fetchUserInfo();
      }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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

    const rankClass = product.product_rank === 1 ? 'ผู้สนับสนุนระดับนักผจญภัย ได้รับพื้นหลังโปรไฟล์เป็นสีเทา' :
                      product.product_rank === 2 ? 'ผู้สนับสนุนระดับจอมยุทธ ได้รับพื้นหลังโปรไฟล์เป็นสีฟ้า' :
                      product.product_rank === 3 ? 'ผู้สนับสนุนระดับวีรบุรุษ ได้รับพื้นหลังโปรไฟล์เป็นสีเขียว' :
                      product.product_rank === 4 ? 'ผู้สนับสนุนระดับตำนาน ได้รับพื้นหลังโปรไฟล์เป็นสีเหลือง' :
                      'ผู้สนับสนุนระดับนักผจญภัย ได้รับพื้นหลังโปรไฟล์เป็นสีเทา';

    return (
      <div className="h-auto">
        <Navbar />
          <div className="p-8 items-center justify-center text-center">
              <h1 className="text-4xl font-bold text-center">Donation detail</h1>

              <div className="mt-8 flex gap-x-8 items-center justify-center text-center">
                  <div className="w-3/10"></div>
                  <div className="w-4/10 p-6">
                      <h3 className="text-2xl font-semibold">ชื่อสินค้า: {product.product_name}</h3>
                      <br />
                      <p><strong>ราคา:</strong> {product.product_price} ฿</p>
                      <br />
                      <p><strong>รายละเอียดสินค้า:</strong> {product.product_description}</p>
                      <br />
                      <p><strong>ระดับผู้สนับสนุน:</strong> {rankClass}</p>
                  </div>

                  <div className="w-3/10"></div>
              </div>
              <Link href="../donate_us/checkout">
                      <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500">
                          Next
                      </button>
              </Link>
          </div>
        <footer className="text-center p-4 mt-8 text-gray-500 text-sm">
          © 2025, Microfinance
        </footer>
      </div>
    );
  }
