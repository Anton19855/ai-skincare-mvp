export default function Hero() {
  return (
    <section className="min-h-[93.25vh] flex flex-col md:flex-row items-center justify-center px-6 md:px-20 pt-28 pb-16 bg-gradient-to-br from-[#F6F7DD] via-[#F6F7DD] to-[#DECFAC]">
      {/* Left: Text Content */}
      <div className="flex-1 max-w-2xl md:ml-[100px]">
        <h1 className="font-[Michroma] text-black text-4xl md:text-6xl font-bold leading-[1.1] mb-8 tracking-tight">
          Discover Your<br />
          Best Skin<br />
          with <span className="text-[#ff8ca9]">AI-<br className="md:hidden" />Powered</span><br />
          <span className="text-[#ff8ca9]">Analysis</span> &<br />
          Interactive<br />AR
        </h1>
        <p className="font-[Jost] text-[#ff8ca9] md:text-lg text-[#e0e0e0] mb-8 max-w-xl">
          Get personalized skin insights instantly and try skincare products virtually — all in one seamless app designed to help you glow with confidence.
        </p>
        <div className="flex gap-4 flex-wrap">
          <button className="bg-[#ff8ca9] text-white font-semibold py-3 px-6 rounded-full shadow hover:bg-[#ff6c91] transition">
            Try Skin Analysis Now
          </button>
          <button className="bg-white text-[#23243b] font-semibold py-3 px-6 rounded-full shadow hover:bg-gray-200 transition">
            Register As Pharmacy
          </button>
        </div>
      </div>
      {/* Right: Image */}
      <div className="flex-1 flex justify-center mt-12 md:mt-0 md:ml-12">
        <div className="bg-[#f8edea] rounded-[2rem] shadow-2xl flex items-center justify-center min-w-[320px] min-h-[350px]">
          <img
            src="/hero2.jpg"
            alt="Skincare products"
            className="rounded-xl object-cover w-[320x] h-[350px] md:w-[650px] md:h-[675px] shadow-lg"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
