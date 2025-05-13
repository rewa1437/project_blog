'use client'; 

import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';

export default function Checkout() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const productId = localStorage.getItem("selectedProductId"); 
    console.log(productId);

    if (productId) {
      const fetchProductData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/get_product_details/${productId}/`);

          if (!response.ok) {
            throw new Error('Failed to fetch product details');
          }

          const data = await response.json();

          if (data.id) {
            setProduct(data);
          } else {
            throw new Error('Product not found');
          }
        } catch (error) {
          setError(error.message);
          console.error('Error fetching product details:', error);
        }
      };
      fetchProductData();
    }
  }, []);


  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p>Loading product details...</p>
      </div>
    );
  }

  const rankClass = product?.product_rank === 1 ? 'ได้รับพื้นหลังโปรไฟล์เป็นสีเทา' :
                    product?.product_rank === 2 ? 'ได้รับพื้นหลังโปรไฟล์เป็นสีฟ้า' :
                    product?.product_rank === 3 ? 'ได้รับพื้นหลังโปรไฟล์เป็นสีเขียว' :
                    product?.product_rank === 4 ? 'ได้รับพื้นหลังโปรไฟล์เป็นสีเหลือง' :
                    'ได้รับพื้นหลังโปรไฟล์เป็นสีเทา';
  return (
    <div className="h-auto">
      <Navbar />
      <div className="p-8">
        <h1 className="text-4xl font-bold text-center">Checkout</h1>

        <div className="mt-8 flex gap-x-8">
          <div className="w-10/10 p-6 ">
            <h3 className="text-2xl font-semibold">Product: {product.product_name}</h3>
            <br></br>
            <p><strong>Price:</strong> {product.product_price} ฿</p>
            <br></br>
            <p><strong>Description:</strong> {product.product_description}</p>
            <br></br>
            <p><strong>Rank:</strong> {rankClass}</p>
          </div>

          <div className="w-1/10"></div>

          <div className="w-3/4 p-6 ">
            <h3 className="text-2xl font-semibold">Order Form</h3>
            <form className="mt-4">
              <div className="mb-4">
                <label className="block text-sm font-medium">Full Name</label>
                <input type="text" className="w-full p-2 mt-1 border rounded-md" placeholder="Enter your full name" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Email</label>
                <input type="email" className="w-full p-2 mt-1 border rounded-md" placeholder="Enter your email" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Phone Number</label>
                <input type="tel" className="w-full p-2 mt-1 border rounded-md" placeholder="Enter your phone number" required />
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
