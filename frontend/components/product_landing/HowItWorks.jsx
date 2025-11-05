// components/HowItWorks.jsx
import { Upload, Brain, Lightbulb, Heart } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload Your Photo',
    description: 'Take a selfie or upload your photo for our AI to analyze your skin condition comprehensively.',
    bgColor: 'bg-purple-600', // Example gradient start for icon background
    ringColor: 'ring-purple-600', // Example ring color
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI Analysis',
    description: 'Our advanced algorithms process your image to identify skin type, concerns, and potential issues.',
    bgColor: 'bg-fuchsia-600',
    ringColor: 'ring-fuchsia-600',
  },
  {
    number: '03',
    icon: Lightbulb,
    title: 'Get Recommendations',
    description: 'Receive personalized product suggestions and skincare routines tailored to your specific needs.',
    bgColor: 'bg-orange-500',
    ringColor: 'ring-orange-500',
  },
  {
    number: '04',
    icon: Heart,
    title: 'Track Progress',
    description: 'Monitor your skin improvement journey with regular check-ins and progress tracking.',
    bgColor: 'bg-red-500',
    ringColor: 'ring-red-500',
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#1a1a2e] py-16 px-4 sm:px-6 lg:px-8 text-white font-[Michroma]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          How It <span className="text-pink-500">Works</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-gray-300">
          Simple steps to transform your skincare routine with the power of AI
        </p>

        <div className="mt-20 relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-y-16 lg:gap-y-0 lg:gap-x-8 items-start">
          {/* Connecting lines for larger screens */}
          <div className="hidden lg:block absolute top-[50px] left-[calc(12.5%+10px)] right-[calc(12.5%+10px)] h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent">
            <div className="absolute left-0 w-1/3 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
            <div className="absolute left-1/3 w-1/3 h-px bg-gray-700"></div>
            <div className="absolute left-2/3 w-1/3 h-px bg-gradient-to-l from-gray-700 to-transparent"></div>
          </div>


          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center px-4 relative z-10 font-[Jost]">
              <div className={`relative w-24 h-24 rounded-full flex items-center justify-center ${step.bgColor} shadow-lg ring-4 ${step.ringColor}`}>
                {/* Number overlay */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white text-gray-900 font-bold text-sm flex items-center justify-center shadow-md">
                  {step.number}
                </div>
                {/* Lucide Icon */}
                <step.icon className="h-12 w-12 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="mt-8 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-gray-300 text-sm max-w-[280px]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;