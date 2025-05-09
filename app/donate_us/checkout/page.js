'use client';
import Navbar from "@/app/components/Navbar";
import { useState } from "react";

export default function Checkout() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log({
      name,
      address,
      paymentMethod,
    });
  };

  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold mb-6">Checkout</h1>
        <p className="text-lg text-gray-700 mb-8">
          กรุณากรอกข้อมูลเพื่อทำการบริจาค
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              id="address"
              name="address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="payment" className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              id="payment"
              name="payment"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank-transfer">Bank Transfer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Confirm Donation
          </button>
        </form>
      </div>
    </div>
  );
}
