'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import { getAuthData } from '@/utils/getAuthData';
import {useState, useEffect} from 'react'
import Image from 'next/image';
import SelfieModal from '@/components/features/selfie';

const page = () => {

  const [isSelfieModalOpen, setSelfieModalOpen] = useState(false);

  const router = useRouter()
    
    useEffect(() => {
      const verifyUser = async () => {
        console.log("verifying")
        const auth = getAuthData();
        console.log(auth)

        const token = auth?.token;
        if (auth==null || !auth.token) {
          router.push('/')
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
  
          if (!data.verified) router.push('/auth/login');
          // else stay here (already on /auth/signup)
        } catch (err) {
          console.log(err)
        }
      };
  
      verifyUser();
    }, []);

  return (
    <div className="min-h-screen bg-[#f9f8ea] flex flex-col justify-center font-[Jost]">
      <SelfieModal 
        isOpen={isSelfieModalOpen}
        onClose={() => setSelfieModalOpen(false)}
      />
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto py-16 px-4 gap-10">
        
        {/* Left Side: Card with Call to Action */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="bg-white shadow-xl rounded-2xl px-8 py-10 flex flex-col items-center text-center max-w-sm">
            <Image
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
              alt="AI Skin Analysis"
              width={280}
              height={180}
              className="rounded-xl object-cover mb-6"
              priority
            />
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Take A Photo & Start <span className="text-pink-400">Free Analysis</span>
            </h2>
            <p className="text-gray-600 mb-8">Unlock instant skin insights using advanced AI and take your personalized skincare journey today.</p>
            <button onClick={() => setSelfieModalOpen(true)} className="bg-pink-400 text-white py-3 px-7 rounded-full font-semibold transition-all hover:bg-pink-500 focus:outline-none text-lg shadow focus:shadow-lg">
              Start Skin Analysis
            </button>
          </div>
        </div>

        {/* Right Side: Benefits List */}
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Why Use <span className="text-pink-400">Skin AI?</span>
          </h3>
          <ul className="space-y-7">
            <li className="flex items-start gap-4">
              <Image
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=48&q=80"
                alt="Recommendations"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <div>
                <p className="font-semibold text-gray-800">Product Recommendations</p>
                <span className="text-gray-500 text-base">Get AI-powered suggestions tailored to your unique skin profile.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Image
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=48&q=80"
                alt="Personalized Orders"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <div>
                <p className="font-semibold text-gray-800">Personalised Skincare Orders</p>
                <span className="text-gray-500 text-base">Order skincare products directly from trusted pharmacies, tailored for you.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Image
                src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=48&q=80"
                alt="Accurate Results"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <div>
                <p className="font-semibold text-gray-800">High Accuracy</p>
                <span className="text-gray-500 text-base">Benefit from advanced AI algorithms for precise skin analysis and recommendations.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Image
                src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=48&q=80"
                alt="Interactive AR"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <div>
                <p className="font-semibold text-gray-800">Interactive AR Experience</p>
                <span className="text-gray-500 text-base">Try skincare virtually with interactive augmented reality.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default page