import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../components/ui/navigation-menu";

export const NavigationBarSection = (): JSX.Element => {
  // Navigation menu items data
  const navItems = [
    { label: "Home", active: true },
    { label: "About Us", active: false },
    { label: "Products", active: false },
    { label: "Blog", active: false },
    { label: "Contact", active: false },
  ];

  return (
    <header className="w-full h-16 bg-black flex items-center px-6">
      {/* Brand/Logo */}
      <a href="#" className="flex items-center gap-2 font-sans font-bold text-2xl text-white no-underline select-none">
        Fyndlynk<span className="text-primary text-3xl">.</span>
      </a>
      {/* Navigation */}
      <nav className="flex-1 flex justify-end">
        <ul className="flex gap-6">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`font-sans text-base px-2 py-1 transition-colors duration-200 ${
                  item.active
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
    </header>
  );
};
