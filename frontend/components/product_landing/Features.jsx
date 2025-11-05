// components/RevolutionaryFeatures.jsx
import Image from 'next/image';
import { Lightbulb, RotateCw, Sparkles, BrainCircuit } from 'lucide-react'; // Import desired Lucide icons

const features = [
  {
    icon: Lightbulb, // Assign Lucide icon component directly
    image: '/hero1.jpg', // Replace with actual path to your image
    title: 'AI Skin Analysis',
    description:
      'Advanced AI algorithms analyze your skin condition and provide personalized insights for optimal skincare routines.',
  },
  {
    icon: RotateCw, // Assign Lucide icon component directly
    image: '/hero2.jpg', // Replace with actual path to your image
    title: 'AR Try-On Experience',
    description:
      'Virtually try skincare products and see real-time results before making a purchase decision.',
  },
  {
    icon: Sparkles, // Assign Lucide icon component directly
    image: '/hero1.jpg', // Replace with actual path to your image
    title: 'Smart Recommendations',
    description:
      'Get curated product recommendations based on your skin type, concerns, and budget preferences.',
  },
  {
    icon: BrainCircuit, // Assign Lucide icon component directly
    image: '/hero2.jpg', // Replace with actual path to your image
    title: 'Expert Consultation',
    description:
      'Connect with certified dermatologists and skincare experts for professional guidance and advice.',
  },
];

const Features = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 text-white font-[Michroma] bg-gradient-to-br from-[#F6F7DD] via-[#F6F7DD] to-[#DECFAC]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
          <span className="text-pink-500">Revolutionary</span> Features
        </h2>
        <p className="mt-4 text-lg leading-6 text-black">
          Experience the future of skincare with our cutting-edge AI technology and AR integration
        </p>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 font-[Jost]">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-[#F6F7DD] rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative w-full h-48 sm:h-56 md:h-64">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
                <div className="absolute top-4 left-4 p-2 bg-black bg-opacity-50 rounded-full">
                  {/* Render Lucide Icon component */}
                  <feature.icon className="h-6 w-6 text-pink-400" /> {/* Adjust size and color as needed */}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-pink-400 mb-2">{feature.title}</h3>
                <p className="text-black text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;