import React, { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavigationBarSectionProps {
  activeSection: string;
}

export const NavigationBarSection = ({ activeSection }: NavigationBarSectionProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  // Navigation menu items data
  const navItems = [
    { label: "Home", id: "home", href: "/#home" },
    { label: "About Us", id: "about", href: "/#about" },
    { label: "Products", id: "products", href: "/#products" },
    { label: "Blog", id: "blog", href: "/blog" },
    { label: "Contact", id: "contact", href: "/#contact" },
  ];

  return (
    <>
      <header className="w-full h-16 bg-black/30 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
        {/* Brand/Logo */}
        <a href="#home" className="flex items-center gap-2 font-inter font-light text-2xl text-white no-underline select-none">
          Fyndlynk<span className="text-primary">.</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-end">
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`font-inter text-base px-2 py-1 transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-primary font-medium"
                      : "text-white hover:text-primary"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-lg z-40 flex flex-col items-center justify-center">
          <nav>
            <ul className="flex flex-col gap-8 text-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-inter text-3xl transition-colors duration-200 ${
                      activeSection === item.id
                        ? "text-primary font-semibold"
                        : "text-white hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};
