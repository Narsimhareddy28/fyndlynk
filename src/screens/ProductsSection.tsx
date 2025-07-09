import React from "react";

const shimmer =
  "animate-pulse bg-gradient-to-r from-[#232526] via-[#2c2c2e] to-[#232526] bg-[length:200%_100%]";

const ProductsSection = (): JSX.Element => {
  return (
    <section className="w-full bg-black py-20 px-4 md:px-0">
      <div className="container mx-auto flex flex-col items-center">
        {/* Heading */}
        <h2 className="font-inter text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 mb-4 text-center drop-shadow-lg">
          Products
        </h2>
        <span className="font-inter inline-block px-4 py-1 mb-8 rounded-full bg-[#232526]/70 text-white text-base font-semibold border border-primary/40 shadow shadow-primary/20 backdrop-blur-md">
          <span className="mr-2">🚀</span> Coming Soon
        </span>
        {/* Description */}
        <p className="font-inter font-light text-lg md:text-2xl text-neutral-400 max-w-2xl text-center mb-12">
          We&apos;re building a suite of smart, cloud-native tools to simplify complexity and accelerate innovation. Stay tuned for something amazing!
        </p>
        {/* Product Placeholders */}
        <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-center">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`relative w-72 h-56 rounded-2xl border border-primary/30 shadow-lg ${shimmer} overflow-hidden flex flex-col items-center justify-center backdrop-blur-md bg-white/5`}
            >
              <div className="absolute inset-0 pointer-events-none rounded-2xl border border-white/10" style={{boxShadow: '0 0 32px 0 rgba(255,49,49,0.15)'}} />
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <div className="h-4 w-32 rounded bg-white/20 mb-2" />
              <div className="h-3 w-24 rounded bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection; 