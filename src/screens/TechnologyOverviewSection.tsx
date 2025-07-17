import React from "react";
import { Link } from "react-router-dom";

export const TechnologyOverviewSection = (): JSX.Element => {
  // Company navigation links
  const companyLinks = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "#about" },
    { title: "Products", href: "#products" },
  ];

  // Services navigation links
  const serviceLinks = [
    { title: "Blog", href: "/blog", isRoute: true },
    { title: "Contact", href: "#contact" },
    { title: "Terms and Conditions", href: "#" },
    { title: "Privacy Policy", href: "#" },
  ];

  return (
    <footer className="w-full bg-black text-foreground py-12 md:py-16 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-0">
          {/* Company info section */}
          <div className="mb-8 md:mb-0 max-w-lg">
            <div className="font-inter text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-white">
              Fyndlynk<span className="text-primary text-3xl md:text-4xl lg:text-5xl">.</span>
            </div>
            <p className="font-inter text-base md:text-xl mb-6 text-neutral-400">
              Fyndlynk is your partner in progress developing smart,
              cloud-native tools that simplify complexity and accelerate
              innovation.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="LinkedIn" className="hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white hover:text-primary transition-colors">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white hover:text-primary transition-colors">
                  <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482c-4.086-.205-7.713-2.164-10.141-5.144a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 0 1-6.102 2.104c-.396 0-.787-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636a10.012 10.012 0 0 0 2.457-2.548z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div className="grid grid-cols-2 gap-x-8 md:gap-x-12 gap-y-8">
            {/* Company links */}
            <div>
              <h3 className="font-inter text-lg md:text-xl font-black mb-3 md:mb-4 text-white">Company</h3>
              <nav>
                <ul className="space-y-2">
                  {companyLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.href}
                        className="font-inter text-base hover:text-primary transition-colors text-neutral-400"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Services links */}
            <div>
              <h3 className="font-inter text-lg md:text-xl font-black mb-3 md:mb-4 text-white">Services</h3>
              <nav>
                <ul className="space-y-2">
                  {serviceLinks.map((link, index) => (
                    <li key={index}>
                      {link.isRoute ? (
                        <Link
                          to={link.href}
                          className="font-inter text-base hover:text-primary transition-colors text-neutral-400"
                        >
                          {link.title}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="font-inter text-base hover:text-primary transition-colors text-neutral-400"
                        >
                          {link.title}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Large brand name at bottom */}
        <div className="mt-12 md:mt-16 overflow-hidden">
          <h1 className="font-inter text-[80px] md:text-[180px] lg:text-[280px] font-extrabold leading-none text-white whitespace-nowrap">
            Fyndlynk<span className="text-primary">.</span>
          </h1>
        </div>
      </div>
    </footer>
  );
};
