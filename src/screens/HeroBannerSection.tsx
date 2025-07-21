import React from "react";
import { Button } from "../components/ui/button";

export const HeroBannerSection = (): JSX.Element => {
  return (
    <div className="overflow-x-hidden w-full">
      <section className="w-full min-h-[400px] md:min-h-[500px] lg:min-h-[633px] relative flex items-center justify-center pt-20">
        <div className="absolute -top-16 left-0 right-0 bottom-0 bg-[#FF3131] opacity-20 mix-blend-multiply"></div>
        <div className="container mx-auto h-full px-4 relative flex flex-col items-center justify-center z-10">
          {/* Generative Art as a background element */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-full max-w-lg h-full flex items-center justify-center">
              <div className="absolute w-72 h-72 bg-white/10 rounded-full filter blur-3xl animate-pulse" />
              <div className="absolute w-56 h-56 bg-[#FF3131]/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute w-48 h-48 bg-white/5 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-6 w-full">
            <h1 className="font-semibold text-4xl md:text-6xl lg:text-7xl text-white leading-tight font-sans text-center">
              Linking future,one system <br className="hidden md:block" />
              at-a-time
            </h1>
            <p className="font-normal text-lg md:text-xl text-neutral-400 text-center">
              Simplifying complexity with AI-driven SaaS solutions.
            </p>
            <div className="pt-4 flex justify-center">
              <Button
                variant="outline"
                className="h-10 w-[124px] bg-[#D9D9D9] text-black rounded-md"
              >
                <span className="text-lg md:text-2xl text-black">
                  Fyndout<span className="text-primary">.</span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
