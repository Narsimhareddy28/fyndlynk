import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavigationBarSectionProps {
  activeSection: string;
}

export const NavigationBarSection = ({ activeSection }: NavigationBarSectionProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation menu items data
  const navItems = [
    { label: "Home", id: "home", href: "/#home" },
    { label: "About Us", id: "about", href: "/#about" },
    { label: "Products", id: "products", href: "/#products" },
    { label: "Blog", id: "blog", href: "/blog" },
    { label: "Contact", id: "contact", href: "/#contact" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    if (id === "blog") {
      navigate("/blog");
      window.scrollTo(0, 0);
      setIsOpen(false);
      return;
    }
    if (location.pathname !== "/") {
      // Navigate to home, then scroll after navigation
      navigate(href);
      setTimeout(() => {
        const targetId = href.replace("/#", "");
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      setIsOpen(false);
      return;
    }
    // Already on home page
    const targetId = href.replace("/#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand/Logo - Left */}
          <a href="#home" className="flex items-center font-inter font-semibold text-2xl text-white no-underline select-none" onClick={e => handleClick(e as any, "/#home", "home") }>
            Fyndlynk<span className="text-primary">.</span>
          </a>
          {/* Navigation Menu - Center (Desktop Only) */}
          <nav className="flex-1 justify-center hidden md:flex">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href, item.id)}
                    className={`font-inter text-base font-medium transition-all duration-300 px-3 py-2 rounded-md relative ${
                      activeSection === item.id
                        ? "text-red-500"
                        : "text-white hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                    <div 
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent transition-all duration-300 ${
                        activeSection === item.id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {/* Right side spacer for balance (Desktop Only) */}
          <div className="w-32 hidden md:block"></div>
          {/* Mobile Menu Button (Mobile Only) */}
          <div className="flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white bg-black/40 rounded-full p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Menu Slide-in (Mobile Only) */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} md:hidden`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black/90 z-50 shadow-lg transform transition-transform duration-300 md:hidden flex flex-col pt-24 px-6 gap-6 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav>
          <ul className="flex flex-col gap-6 text-left">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href, item.id)}
                  className={`font-inter text-xl px-2 py-2 rounded-md transition-all duration-200 relative ${
                    activeSection === item.id
                      ? "text-red-500 font-semibold"
                      : "text-white hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
