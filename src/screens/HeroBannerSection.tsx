import React from "react";
import { Button } from "../components/ui/button";

export const HeroBannerSection = (): JSX.Element => {
  return (
    <section className="w-full min-h-[400px] md:min-h-[500px] lg:min-h-[633px] bg-black  overflow-hidden relative flex items-center">
      <div className="container mx-auto h-full px-4 relative">
        <div className="flex flex-col-reverse lg:flex-row h-full items-center justify-between gap-8 lg:gap-0">
          <div className="flex flex-col justify-center space-y-6 max-w-2xl z-10 text-center lg:text-left">
            <h1 className="font-semibold text-4xl md:text-6xl lg:text-7xl text-white leading-tight font-sans">
              Linking future,<br className="hidden md:block" />
              one system <br className="hidden md:block" />
              at-a-time
            </h1>
            <p className="font-normal text-lg md:text-xl text-neutral-400">
              Simplifying complexity with AI-driven SaaS solutions.
            </p>
            <div className="pt-4 flex justify-center lg:justify-start">
              <Button
                variant="outline"
                className="h-10 w-[124px] bg-[#D9D9D9]  text-black rounded-md "
              >
                <span className=" text-lg md:text-2xl text-black ">
                  Fyndout<span className="text-primary">.</span>
                </span>
              </Button>
            </div>
          </div>
          <div className="relative w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl flex-shrink-0">
            <img
              className="w-full h-auto object-cover"
              alt="Artificial Intelligence visualization"
              src="/artificial-intelligence-ai-png-images-hd-1.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
