import React from "react";
import { Card, CardContent } from "../components/ui/card";

export const FeaturesSection = (): JSX.Element => {
  const featureCards = [
    {
      title: "Built for Real Human Use",
      description:
        "Fyndlynk designs software that begins with the user's workflow, pain points, and goals. We craft experiences that feel intuitive from day one.",
      color: "from-blue-500 to-cyan-500",
      glowColor: "shadow-blue-500/50",
      animationType: "profileCard",
    },
    {
      title: "One Platform, Many Realities",
      description:
        "Whether you're in design, operations, education, or healthcare, Fyndlynk provides flexible SaaS primitives that plug into your specific domain.",
      color: "from-purple-500 to-pink-500",
      glowColor: "shadow-purple-500/50",
      animationType: "dataBlocks",
    },
    {
      title: "Dynamic HTML Streaming",
      description:
        "Real-time, intelligent content delivery that adapts to user interactions. Our streaming technology powers seamless experiences with AI-driven personalization.",
      color: "from-emerald-500 to-teal-500",
      glowColor: "shadow-emerald-500/50",
      isSpecial: true,
      animationType: "htmlStreaming",
    },
  ];

  return (
    <section className="w-full relative bg-black py-20 md:py-32 overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 md:px-12 lg:px-24 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="relative mb-8">
            <h2 className="font-inter font-extrabold text-4xl md:text-6xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white mb-6 relative z-10">
              &quot;Technology That Grows With You, Not Over You.&quot;
            </h2>
            <div className="absolute inset-0 font-inter font-extrabold text-3xl md:text-4xl lg:text-7xl text-white/5">
              &quot;Technology That Grows With You, Not Over You.&quot;
            </div>
          </div>
          <p className="font-inter font-light text-xl md:text-2xl lg:text-2xl text-neutral-300 max-w-4xl leading-relaxed">
            Our vision is to craft adaptive, <span className="text-[#FF3131] font-medium">AI-powered experiences</span> that evolve
            with every interaction so software feels less like a product and
            more like a partner.
          </p>
        </div>

        <div className="features-grid max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureCards.map((card, index) => (
            <div key={index} className="group relative">
              <div className="border border-gray-700/50 rounded-xl p-6 hover:border-[#FF3131]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#FF3131]/20 h-full">
                <div className="font-inter text-white text-lg font-semibold mb-4">{card.title}</div>
                
                <div className="animation-container mb-4">
                  <div className="grid-bg"></div>
                  <div className="window">
                    <div className="window-header">
                      <div className="window-control"></div>
                      <div className="window-control"></div>
                      <div className="window-control"></div>
                    </div>
                    
                    {card.animationType === 'htmlStreaming' && (
                      <div className="window-content">
                        {/* Dynamic HTML Streaming Animation */}
                        <div className="content-left">
                          <div className="avatar" style={{ background: '#fff' }}></div>
                          <div className="line full" style={{ background: '#444' }}></div>
                          <div className="line half dim" style={{ background: '#666' }}></div>
                          <div className="line dim" style={{ background: '#555' }}></div>
                          <div className="line dim" style={{ background: '#555' }}></div>
                          <div className="line half dim" style={{ background: '#666' }}></div>
                        </div>
                        <div className="content-right">
                          <div className="header">
                            <div className="avatar" style={{ background: '#fff' }}></div>
                            <div className="line" style={{width: '20px', height: '6px', background: '#444'}}></div>
                          </div>
                          <div className="nav">
                            <div className="line" style={{width: '16px', height: '6px', background: '#444'}}></div>
                            <div className="line dim" style={{width: '40px', height: '6px', background: '#666'}}></div>
                          </div>
                          <div className="rectangles">
                            <div className="rect-column">
                              <div className="rectangle small" style={{ background: '#333' }}></div>
                              <div className="rectangle small" style={{ background: '#333' }}></div>
                              <div className="rectangle small" style={{ background: '#333' }}></div>
                            </div>
                            <div className="rect-column">
                              <div className="rectangle large" style={{ background: '#444' }}></div>
                              <div className="rectangle large" style={{ background: '#444' }}></div>
                              <div className="rectangle large" style={{ background: '#444' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {card.animationType === 'profileCard' && (
                      <div className="window-content p-4 flex flex-col items-center justify-center">
                        {/* Real-Time Profile Card Animation */}
                        <div className="w-16 h-16 rounded-full bg-white mb-3 animate-pulse"></div>
                        <div className="w-3/4 h-4 bg-gray-500 rounded-md animate-pulse mb-2"></div>
                        <div className="w-1/2 h-3 bg-gray-600 rounded-md animate-pulse"></div>
                      </div>
                    )}

                    {card.animationType === 'dataBlocks' && (
                      <div className="window-content p-4 flex justify-around items-center">
                        {/* Modular Data Blocks Animation */}
                        <div className="w-10 h-16 bg-white rounded-md animate-bounce"></div>
                        <div className="w-10 h-10 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-10 h-16 bg-white rounded-md animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="font-inter font-light text-sm md:text-base text-neutral-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
