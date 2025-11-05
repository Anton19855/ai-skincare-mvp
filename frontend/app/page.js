'use client'

import React from 'react';
import Hero from '@/components/product_landing/Hero';
import Features from '@/components/product_landing/Features';
import HowItWorks from '@/components/product_landing/HowItWorks';
import WhyChooseSkinAI from '@/components/product_landing/WhyChooseSkinAI';
import UserTestimonials from '@/components/product_landing/Testimonials';
import CallToActionSection from '@/components/product_landing/CTASection';
import { useRouter } from 'next/navigation';
import { getAuthData } from '@/utils/getAuthData';
import { useEffect } from 'react';

export default function Home() {

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
          // else stay here (already on Landing Page)
        } catch (err) {
          console.log(err)
        }
      };
  
      verifyUser();
    }, []);

  return (
    <div className="">
      <Hero />
      <Features />
      <HowItWorks />
      <WhyChooseSkinAI />
      <UserTestimonials />
      <CallToActionSection />
    </div>
  )
}

