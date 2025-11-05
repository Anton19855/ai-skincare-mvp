'use client';

import Image from 'next/image';

const features = [
  {
    icon: '🛡️',
    title: 'Dermatologist Approved',
    description: 'Our AI analysis is validated by certified dermatologists for accuracy and safety.',
  },
  {
    icon: '⏱️',
    title: 'Instant Results',
    description: 'Get comprehensive skin analysis and recommendations in under 30 seconds.',
  },
  {
    icon: '🎯',
    title: 'Precision Targeting',
    description: 'Address specific skin concerns with targeted solutions and personalized routines.',
  },
  {
    icon: '⚡',
    title: 'Continuous Learning',
    description: 'Our AI improves with every analysis, providing increasingly accurate recommendations.',
  },
];

const imageSources = [
  '/hero1.jpg', // doctor
  '/hero2.jpg', // product
  '/hero2.jpg', // oil drop
  '/hero1.jpg', // skiing
];

export default function WhyChooseSkinAI() {
  return (
    <section className="bg-gradient-to-b from-[#F6F7DD] to-[#DECFAC] py-16 px-4 md:px-20 text-black font-[Michroma]">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-3">
          Why Choose <span className="text-pink-400">SKIN AI</span>
        </h2>
        <p className="text-pink-500">
          Experience the perfect blend of cutting-edge technology and skincare expertise
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Feature Cards */}
        <div className="flex flex-col space-y-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start font-[Jost] gap-4 p-5 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 shadow-md transition hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="text-pink-400 text-3xl">{feature.icon}</div>
              <div>
                <h4 className="text-lg font-semibold mb-1">{feature.title}</h4>
                <p className="text-pink-500 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-4">
          {imageSources.map((src, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src={src}
                alt={`feature-image-${idx}`}
                width={300}
                height={100}
                className="object-cover h-[20rem] w-[70rem] transition-transform duration-300 hover:scale-105 rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
