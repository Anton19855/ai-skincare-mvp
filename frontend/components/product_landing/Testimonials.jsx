'use client';

import Image from 'next/image';

const testimonials = [
  {
    name: 'Sarah Johnson',
    title: 'Skincare Enthusiast',
    image: '/hero1.jpg',
    quote:
      'SKIN AI completely transformed my skincare routine. The AI analysis was spot-on and the product recommendations actually worked!',
  },
  {
    name: 'Emily Chen',
    title: 'Beauty Blogger',
    image: '/hero2.jpg',
    quote:
      'The AR try-on feature is incredible! I can test products virtually before buying. This app is a game-changer for online skincare shopping.',
  },
  {
    name: 'Maria Rodriguez',
    title: 'Working Professional',
    image: '/hero1.jpg',
    quote:
      'As someone with sensitive skin, finding the right products was always challenging. SKIN AI made it effortless and accurate.',
  },
];

export default function UserTestimonials() {
  return (
    <section className="bg-gradient-to-b from-[#DECFAC] to-[#F6F7DD] py-16 px-4 md:px-20 text-white font-[Michroma]">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-3">
          What Our <span className="text-pink-400">Users Say</span>
        </h2>
        <p className="text-black">
          Join thousands of satisfied users who transformed their skincare journey with SKIN AI
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((user, idx) => (
          <div
            key={idx}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-md hover:shadow-lg transition font-[Jost]"
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={user.image}
                alt={user.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-black">{user.name}</h4>
                <p className="text-pink-500 text-sm">{user.title}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex text-yellow-400 mb-3 text-lg">
              {'★★★★★'}
            </div>

            {/* Quote */}
            <p className="italic text-black text-sm">"{user.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}
