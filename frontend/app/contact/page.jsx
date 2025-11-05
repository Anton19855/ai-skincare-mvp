'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[80vh] bg-[#faf7e6] font-[Jost] flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-white/90 rounded-3xl shadow-xl flex flex-col md:flex-row max-w-4xl w-full p-0">
        {/* Image or illustration */}
        <div className="md:w-1/2 flex items-center justify-center bg-[#e0f0f6] rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
          <img
            src="https://tse1.mm.bing.net/th/id/OIP.k6_sYeLlIIgwYQfD--RYCQHaE8?pid=Api&P=0&h=220"
            alt="Contact Illustration"
            className="w-full h-full object-contain rounded-2xl shadow-lg"
          />
        </div>

        {/* Contact Form */}
        <div className="md:w-1/2 flex flex-col justify-center px-8 py-10">
          <h2 className="text-2xl font-[800] mb-2 text-[#2d2d2d]">
            Get in <span className="text-pink-500">Touch</span>
          </h2>
          <p className="text-[#6B7280] mb-6">
            Questions or feedback? Fill out the form and our team will reach out soon!
          </p>
          <form className="space-y-5">
            <div>
              <label className="block mb-1 font-semibold text-[#111]">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-[#111]">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-[#111]">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                rows={4}
                placeholder="How can we help you?"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white bg-pink-400 hover:bg-pink-500 font-bold shadow-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
