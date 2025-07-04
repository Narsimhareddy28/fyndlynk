import React from "react";
import { Card, CardContent } from "../components/ui/card";

export const FeaturesSection = (): JSX.Element => {
  const featureCards = [
    {
      title: "Built for Real Human Use",
      description:
        "Fyndlynk designs software that begins with the user's workflow, pain points, and goals. We craft experiences that feel intuitive from day one.",
      image: "/images/feature1.png",
    },
    {
      title: "One Platform, Many Realities",
      description:
        "Whether you're in design, operations, education, or healthcare, Fyndlynk provides flexible SaaS primitives that plug into your specific domain.",
      image: "/images/feature2.png",
    },
    {
      title: "Smarter Systems",
      description:
        "Artificial intelligence in our stack powers subtle personalization and decision support, always in service of clarity, not complexity.",
      image: "/images/feature3.png",
    },
  ];

  return (
    <section className="w-full relative bg-black py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-12 lg:px-24">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <h2 className="font-extrabold text-3xl md:text-5xl text-white mb-4 md:mb-5 max-w-4xl md:max-w-5xl">
            &quot;Technology That Grows With You, Not Over You.&quot;
          </h2>
          <p className="font-light text-lg md:text-2xl text-neutral-400 max-w-2xl md:max-w-4xl">
            Our vision is to craft adaptive, AI-powered experiences that evolve
            with every interaction so software feels less like a product and
            more like a partner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featureCards.map((card, index) => (
            <Card
              key={index}
              className={"bg-black rounded-lg border-neutral-700 shadow-[0_12px_16px_-8px_rgba(239,68,68,0.7)] hover:shadow-[0_16px_24px_-8px_rgba(239,68,68,0.9)] transition-shadow duration-200"}
            >
              <CardContent className="pt-6 pb-6 flex flex-col ">
                <img src={card.image} alt={card.title} className="w-16 h-16 mb-4 object-contain" />
                <h3 className="font-semibold text-lg md:text-2xl text-white mb-3 md:mb-4">
                  {card.title}
                </h3>
                <p className="font-light text-base md:text-xl text-neutral-400" >
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
