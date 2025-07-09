import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../components/ui/navigation-menu";

interface NavigationBarSectionProps {
  activeSection: string;
}

export const NavigationBarSection = ({ activeSection }: NavigationBarSectionProps): JSX.Element => {
  // Navigation menu items data
  const navItems = [
    { label: "Home", id: "home" },
    { label: "About Us", id: "about" },
    { label: "Products", id: "products" },
    { label: "Blog", active: false },

    { label: "Contact", id: "contact" },
  ];

  return (
    <header className="w-full h-16 bg-black/30 backdrop-blur-md flex items-center px-6 sticky top-0 z-50">
      {/* Brand/Logo */}
      <a href="#home" className="flex items-center gap-2 font-inter font-light text-2xl text-white no-underline select-none">
        Fyndlynk<a className=" -ml-2 text-primary ">.</a>
      </a>
      {/* Navigation */}
      <nav className="flex-1 flex justify-end">
        <ul className="flex gap-6">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={`#${item.id}`}
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
    </header>
  );
};
