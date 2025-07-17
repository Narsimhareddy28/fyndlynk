import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import {
  HomePageSection,
  BlogSection,
  PostPage,
  NavigationBarSection,
  TechnologyOverviewSection,
} from "./screens";

const AppContent = (): JSX.Element => {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  // Set active section based on current route
  useEffect(() => {
    if (location.pathname === '/blog') {
      setActiveSection('blog');
    } else if (location.pathname.startsWith('/post/')) {
      setActiveSection('blog'); // Keep blog active for individual posts
    } else if (location.pathname === '/') {
      // Reset to home when on homepage, let intersection observer handle the rest
      setActiveSection('home');
    }
  }, [location.pathname]);

  // Intersection observer for homepage sections ONLY
  useEffect(() => {
    // Only run intersection observer on homepage
    if (location.pathname !== '/') {
      // Cleanup any existing observers when not on homepage
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && location.pathname === '/') {
            // Double check we're still on homepage before updating
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
      // Cleanup observer
      observer.disconnect();
    };
  }, [location.pathname]);

  return (
    <div className="bg-black">
      <NavigationBarSection activeSection={activeSection} />
      <Routes>
        <Route path="/" element={<HomePageSection />} />
        <Route path="/blog" element={<BlogSection />} />
        <Route path="/post/:slug" element={<PostPage />} />
      </Routes>
      <TechnologyOverviewSection />
    </div>
  );
};

const App = (): JSX.Element => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
