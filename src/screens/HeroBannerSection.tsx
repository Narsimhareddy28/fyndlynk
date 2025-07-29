import React, { useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import heroVideo from "../utils/hero_banner_vid.mp4";

export const HeroBannerSection = (): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Set video to pause at the last frame when it ends
      const handleEnded = () => {
        video.pause();
        // Ensure we're at the very last frame
        video.currentTime = video.duration;
      };

      video.addEventListener('ended', handleEnded);
      
      // Start playing when component mounts
      video.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });

      return () => {
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  return (
    <div className="overflow-x-hidden w-full">
      <section className="w-full min-h-[400px] md:min-h-[500px] lg:min-h-[633px] relative flex items-center justify-center pt-20">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center center'
            }}
          >
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Fade to black effect at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto h-full px-4 relative flex flex-col items-center justify-center z-10">
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
