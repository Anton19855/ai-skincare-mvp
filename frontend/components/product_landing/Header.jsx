'use client'

import { useState, useEffect } from 'react';
import { getAuthData } from '@/utils/getAuthData';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [islogged, setIsLogged] = useState(false)

  useEffect(() => {
    const verifyUser = async () => {
      console.log("verifying")
      const auth = getAuthData();
      console.log(auth)
      const token = auth?.token;
      if (auth==null || !auth.token) {
        return;
      }

      try {
        const res = await fetch('http://localhost:8000/auth/verify', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include', // include cookies
        });

        if (!res.ok) throw new Error('Unauthorized');
        const data = await res.json();

        if (data.verified) setIsLogged(true);
        // else stay here (already on /auth/signup)
      } catch (err) {
        console.log(err)
      }
    };

    verifyUser();
  }, []);

  return (
    <header className="font-[Jost] w-full bg-gradient-to-r from-[#F6F7DD] to-[#F6F7DD] shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
        {/* Logo */}
        <div className="text-red-400 font-bold text-2xl tracking-wide select-none font-[Jost]">
          SKIN AI
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-7 text-black font-medium text-[1rem]">
          <li><a href="/" className="hover:text-[#ff8ca9] transition">Home</a></li>
          <li><a href="/analyze" className="hover:text-[#ff8ca9] transition">Analyze</a></li>
          <li><a href="/recommendations" className="hover:text-[#ff8ca9] transition">Recommendations</a></li>
          <li><a href="#pharmacies" className="hover:text-[#ff8ca9] transition">Pharmacies</a></li>
          <li><a href="#subscriptions" className="hover:text-[#ff8ca9] transition">Reports</a></li>
          <li><a href="/contact" className="hover:text-[#ff8ca9] transition">Contact Us</a></li>
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-2">

          {
            islogged ? 

            <button onClick={() => {window.location.href = "/account"}} className="bg-[#ff8ca9] text-white font-semibold px-5 py-2 rounded-lg focus:outline-none hover:bg-[#ff6c91] transition">
              Your Account
            </button>
            :
            <>
              <button onClick={() => {window.location.href = "/auth/login"}} className="bg-white text-[#181924] font-semibold px-5 py-2 rounded-lg focus:outline-none hover:bg-gray-200 transition">
                Login
              </button>
              <button onClick={() => {window.location.href = "/auth/signup"}} className="bg-[#ff8ca9] text-white font-semibold px-5 py-2 rounded-lg focus:outline-none hover:bg-[#ff6c91] transition">
                Signup
              </button>
            </>
          }
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden flex flex-col justify-center items-center"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block h-1 w-6 rounded-full bg-black transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block h-1 w-6 rounded-full bg-black my-1 transition-all duration-300 ${open ? 'opacity-0' : ''}`}></span>
          <span className={`block h-1 w-6 rounded-full bg-black transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#17181d] px-6 pb-4 pt-2">
          <ul className="flex flex-col gap-4 text-white font-medium">
            <li><a href="/" className="hover:text-[#ff8ca9] transition" onClick={() => setOpen(false)}>Home</a></li>
            <li><a href="/analyze" className="hover:text-[#ff8ca9] transition" onClick={() => setOpen(false)}>Analyze</a></li>
            <li><a href="/recommendations" className="hover:text-[#ff8ca9] transition" onClick={() => setOpen(false)}>Recommendations</a></li>
            <li><a href="#pharmacies" className="hover:text-[#ff8ca9] transition" onClick={() => setOpen(false)}>Pharmacies</a></li>
            <li><a href="#subscriptions" className="hover:text-[#ff8ca9] transition" onClick={() => setOpen(false)}>Reports</a></li>
            <li><a href="/contact" className="hover:text-[#ff8ca9] transition" onClick={() => setOpen(false)}>Contact Us</a></li>
          </ul>
          <div className="flex gap-2 mt-4">
             {
            islogged ? 

            <button onClick={() => {window.location.href = "/account"}} className="bg-[#ff8ca9] text-white font-semibold px-5 py-2 rounded-lg w-full focus:outline-none hover:bg-[#ff6c91] transition">
              Your Account
            </button>
            :
            <>
              <button onClick={() => {window.location.href = "/auth/login"}} className="bg-white text-[#181924] font-semibold px-5 py-2 rounded-lg w-full focus:outline-none hover:bg-gray-200 transition">
              Login
            </button>
            <button onClick={() => {window.location.href = "/auth/signup"}} className="bg-[#ff8ca9] text-white font-semibold px-5 py-2 rounded-lg w-full focus:outline-none hover:bg-[#ff6c91] transition">
              Signup
            </button>
            </>
          }
          </div>
        </div>
      )}
    </header>
  );
}
