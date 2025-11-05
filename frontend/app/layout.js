import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Michroma, Jost } from 'next/font/google'
import Header from '@/components/product_landing/Header';
import Footer from '@/components/product_landing/Footer';

// Import Michroma for headings
const michroma = Michroma({
  subsets: ['latin'],
  variable: '--font-michroma',
  weight: '400',
})

// Import Jost for body text
const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  weight: ['400', '600'], // you can specify weights you need
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Radiant AI - Skincare With AI",
  description: "Discover Radiant AI, where advanced artificial intelligence meets personalized skincare. Unlock tailored routines, smart product recommendations, and real-time skin analysis for healthier, glowing skin—powered by the latest in AI technology. Experience the future of skincare today",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${michroma.variable} ${jost.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
