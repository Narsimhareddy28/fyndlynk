import React from "react";
import {
  ContactFormSection,
  FeaturesSection,
  HeroBannerSection,
  NavigationBarSection,
  TechnologyOverviewSection,
  ProductsSection
} from "./screens";

const App: React.FC = () => {
  return (
    <>
      <NavigationBarSection />
      <HeroBannerSection />
      <FeaturesSection />
      <ProductsSection />
      <ContactFormSection />
      <TechnologyOverviewSection />
    </>
  );
};

export default App;
