import React, { useState, useEffect, useRef } from 'react';
import {
  ContactFormSection,
  FeaturesSection,
  HeroBannerSection,
  NavigationBarSection,
  ProductsSection,
  TechnologyOverviewSection,
} from "./screens";

const App = (): JSX.Element => {
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of the viewport
        threshold: 0,
      }
    );

    const sections = ['home', 'about', 'products', 'contact'];
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <div className="bg-black">
      <NavigationBarSection activeSection={activeSection} />
      <div id="home">
        <HeroBannerSection />
      </div>
      <div id="about">
        <FeaturesSection />
      </div>
      <div id="products">
        <ProductsSection />
      </div>
      <div id="contact">
        <ContactFormSection />
      </div>
      <TechnologyOverviewSection />
    </div>
  );
};

export default App;
