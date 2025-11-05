'use client';

export default function CallToActionSection() {
  return (
    <section className="text-white font-[Michroma]">
      {/* Top Stats Section */}
      <div className="bg-pink-300 text-[#0f172a] py-10 px-4 grid grid-cols-2 md:grid-cols-4 text-center font-semibold text-xl md:text-2xl gap-6 font-[Michroma]">
        <div>
          <h3 className="text-3xl md:text-4xl font-bold">500K+</h3>
          <p className="text-sm mt-1">Happy Users</p>
        </div>
        <div>
          <h3 className="text-3xl md:text-4xl font-bold">98%</h3>
          <p className="text-sm mt-1">Accuracy Rate</p>
        </div>
        <div>
          <h3 className="text-3xl md:text-4xl font-bold">10M+</h3>
          <p className="text-sm mt-1">Skin Analyses</p>
        </div>
        <div>
          <h3 className="text-3xl md:text-4xl font-bold">50+</h3>
          <p className="text-sm mt-1">Partner Brands</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-b from-[#DECFAC] to-[#F6F7DD] py-20 px-4 md:px-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Ready to Transform <br />
          Your <span className="text-pink-400">Skincare Journey?</span>
        </h2>

        <p className="text-black mt-6 max-w-2xl mx-auto">
          Join millions of users who discovered their perfect skincare routine with AI-powered analysis. 
          Start your journey to healthier, more radiant skin today.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-pink-400 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-pink-500 transition">
            Start Free Analysis
          </button>
          <button className="bg-white text-pink-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>

        {/* Bullet Points */}
        <div className="text-sm text-green-400 mt-6 space-y-1">
          <p>✓ No credit card required</p>
          <p>✓ Results in under 30 seconds</p>
          <p>✓ Trusted by 500K+ users worldwide</p>
        </div>
      </div>
    </section>
  );
}
