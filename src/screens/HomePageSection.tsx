import React from 'react';
import {
  ContactFormSection,
  FeaturesSection,
  HeroBannerSection,
  ProductsSection,
} from "./index";

export const HomePageSection = (): JSX.Element => {
  return (
    <>
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
    </>
  );
}; 