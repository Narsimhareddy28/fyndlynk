import React from "react";

const shimmer = "animate-pulse bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 bg-[length:200%_100%]";

const ProductsSection = (): JSX.Element => {
  return (
    <section className="w-full bg-black py-20 px-4 md:px-0">
      <div className="container mx-auto flex flex-col items-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400 mb-4 text-center">
          The Future of SaaS is Here.
        </h2>
        <span className="inline-block px-4 py-1 mb-8 rounded-full bg-red-500/10 text-red-400 text-base font-semibold border border-red-500/30 shadow-lg shadow-red-500/10">
          <span className="mr-2">🚀</span> Coming Soon
        </span>
        {/* Description */}
        <p className="font-inter font-light text-lg md:text-2xl text-neutral-400 max-w-2xl text-center mb-16">
          We&apos;re crafting a suite of intelligent, cloud-native tools designed to simplify complexity and accelerate innovation. Get ready for something amazing.
        </p>
        {/* Product Placeholders */}
        <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-center">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`relative w-80 h-64 rounded-2xl border border-neutral-800 shadow-xl overflow-hidden flex flex-col items-center justify-center bg-neutral-900/50 ${shimmer}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="absolute inset-0 pointer-events-none rounded-2xl border border-white/5" />
              <div className="w-20 h-20 rounded-full bg-neutral-800/80 flex items-center justify-center mb-4 border border-neutral-700">
                <div className="w-8 h-8 rounded-sm bg-red-500/20 animate-spin" style={{ animationDuration: `${2 + i}s` }} />
              </div>
              <div className="h-4 w-40 rounded-md bg-neutral-700 mb-2" />
              <div className="h-3 w-32 rounded-md bg-neutral-800" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
