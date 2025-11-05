'use client';

import Link from 'next/link';
import { login } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { getAuthData } from '@/utils/getAuthData';
import {useState, useEffect} from 'react'

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false)
    const [message, setMessage] = useState("")

    const router = useRouter()
  
    
    useEffect(() => {
      const verifyUser = async () => {
        console.log("verifying")
        const auth = getAuthData();
        console.log(auth)
        const token = auth?.token;
        if (!auth || !auth.token) {
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
  
          if (data.verified) router.push('/analyze');
          // else stay here (already on /auth/login)
        } catch (err) {
          console.log(err)
        }
      };
  
      verifyUser();
    }, []);

    const handleLogin = async (e) => {
      e.preventDefault()
      try {
        setLoggingIn(true)
        const res = await login(email, password);
        window.location.href = "/analyze"
      } catch (err) {
        setMessage(err.message)
        setLoggingIn(false)
      }
    };

    return (
      <main className="min-h-screen flex items-center px-4 justify-center bg-gradient-to-br from-[#F6F7DD] via-[#F6F7DD] to-[#DECFAC] font-jost">
        <div className="relative flex w-full max-w-4xl shadow-2xl rounded-3xl overflow-hidden bg-[#DECFAC]">
          {/* Left Panel */}
          <div className="hidden md:flex flex-col justify-center items-center w-1/2 px-10 py-16 relative">
            <div className="z-10">
              <h2 className="text-white text-extrabold text-3xl font-[Michroma] mb-4">Level Up Your Skincare Game With AI-Powered Skin Analysis and Product Recommendations</h2>
            </div>
            {/* Decorative SVG Wave */}
          </div>

          {/* Right Panel (Form) */}
          <div className="flex flex-col font-[Jost] justify-center items-center w-full md:w-1/2 px-8 py-16 bg-white z-10">
            <div className="w-full max-w-sm">
              <p className="mb-8 text-green-500 font-jost">{message}</p>
              <h2 className="text-2xl font-michroma text-gray-800 mb-2">Hello There!</h2>
              <p className="mb-8 text-gray-500 font-jost">Welcome Back</p>
              <form className="flex flex-col gap-5">
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-jost mb-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded border border-gray-300 px-4 py-2 font-jost outline-indigo-400 focus:ring-2 focus:ring-indigo-200"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-gray-700 font-jost mb-1">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="w-full rounded border border-gray-300 px-4 py-2 font-jost outline-indigo-400 focus:ring-2 focus:ring-indigo-200"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 bg-[#DECFAC] text-black cursor-pointer font-michroma rounded py-2 text-lg hover:bg-[#F6F7DD] transition"
                  onClick={handleLogin}
                >
                  { loggingIn ? "Logging In" : "Login"}
                </button>
              </form>
              <div className="flex justify-between mt-6 text-sm text-gray-500">
                <Link href="/auth/signup" className="hover:underline">Create Account</Link>
                <a href="#" className="hover:underline">Forgot Password?</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}
