'use client';

import Navbar from "../components/Navbar";
import Image from "next/image"; 
import rank_2 from '../image/product/1.png';
import rank_3 from '../image/product/2.png';
import rank_4 from '../image/product/3.png';
import Link from "next/link";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DonateUs() {
  const [products, setProducts] = useState([]);
  const [donations, setDonations] = useState([]);
  const API_URL = process.env.API_URL || "http://localhost:8000";

  useEffect(() => {
    if (!localStorage.getItem("selectedProductId")) {
      localStorage.setItem("selectedProductId", 0);
    }

    const fetchProductNames = async () => {
      try {
        const response = await fetch(`${API_URL}/get_product_names/`);
        const data = await response.json();
        console.log(data)
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching product names:", error);
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

    fetchProductNames();
    fetchDonations();
  }, []);

  const handleProductSelect = (productId) => {
    localStorage.setItem("selectedProductId", productId);
  };

  const totalDonation = donations.reduce((sum, d) => sum + parseFloat(d.amount), 0);

  const donationSummary = donations.reduce((acc, curr) => {
    const date = new Date(curr.timestamp);
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    const existing = acc.find(entry => entry.month === monthKey);
    if (existing) {
      existing.total += parseFloat(curr.amount);
    } else {
      acc.push({ month: monthKey, total: parseFloat(curr.amount) });
    }
  
    return acc;
  }, []).sort((a, b) => new Date(a.month) - new Date(b.month));
  
  

  return (
    <div className="h-auto">
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold text-center">Donate Us</h1>
        <p className="text-center text-lg mt-4">
          เพื่อเป็นการสนับสนุนเราและร่วมพัฒนาเนื้อหาที่มีคุณค่า เรามีหลายระดับการสนับสนุนที่คุณสามารถเลือกได้ตามความสะดวก <br />ท่านสามารถเลือกช่องทางการสนับสนุนที่ต้องการได้ที่นี่ เพื่อช่วยให้เราสามารถสร้างสรรค์และพัฒนาสื่อการเรียนรู้ให้ดียิ่งขึ้น!
        </p>

        <div className="grid grid-cols-3 gap-8 mt-8">
          {products.map((product) => (
            <div key={product.id} className="h-70 bg-gray-100 p-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col justify-between">
              <div className="h-40 flex items-center justify-center">
                <Image
                  src={product.id === 1 ? rank_2 :
                       product.id === 2 ? rank_3 : 
                       product.id === 3 ? rank_4 : 
                       rank_2}
                  alt="Volunteer"
                  width={300}
                  height={200}
                  className="object-cover w-auto h-full rounded-md"
                />
              </div>

              <div className="text-center mt-auto">
                <h3 className="font-semibold text-xl">{product.product_name}</h3>
                <Link href="/donate_us/detail">
                  <button
                    className={`${product.color} text-white px-6 py-2 rounded-md mt-4`}
                    onClick={() => handleProductSelect(product.id)}
                  >
                    Donate Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-center mb-6">สรุปยอดการบริจาคทั้งหมด</h2>
          <p className="text-center text-lg mb-8 text-green-700 font-bold">
            รวมยอดบริจาคทั้งหมด: {totalDonation.toLocaleString()} ฿
          </p>

          <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={donationSummary}>
                <XAxis dataKey="month" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#4ade80" barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
      <footer className="text-center p-4 mt-8 text-gray-500 text-sm">
        © 2025, Microfinance
      </footer>
    </div>
  );
}
