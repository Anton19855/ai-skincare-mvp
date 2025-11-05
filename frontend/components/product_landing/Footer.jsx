'use client';

import {
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 px-6 py-10 font-[Jost]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            SKIN <span className="text-pink-400">AI</span>
          </h3>
          <p className="text-sm">
            AI-powered skincare analysis helping you achieve healthier, more radiant skin with precision.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-pink-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">How It Works</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Testimonials</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Pricing</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-pink-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Careers</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-white font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4 text-xl">
            <a href="#" aria-label="Instagram" className="hover:text-pink-400 transition">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-pink-400 transition">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-pink-400 transition">
              <Linkedin size={20} />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-pink-400 transition">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SKIN AI. All rights reserved. 
        <a href='https://linkedin.com/in/ehsan-saleem-web3'> Developed By Ehsan Saleem</a>
      </div>
    </footer>
  );
}
