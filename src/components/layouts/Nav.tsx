import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/audora-logo.svg";
import { Menu, X } from "lucide-react";


export const Nav: React.FC = () => {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
   <header className="absolute inset-x-0 top-6 z-30">
          <nav className="mx-auto max-w-7xl px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Audora" className="h-8 w-auto" />
            </div>

            <ul className="hidden md:flex items-center gap-8 text-white/80 text-sm">
              <li className="hover:text-white">
                <a href="#home">Home</a>
              </li>
              <li className="hover:text-white">
                <a href="#offer">What we offer</a>
              </li>
              <li className="hover:text-white">
                <a href="#faq">FAQ</a>
              </li>
              <li className="hover:text-white">
                <a href="#about-us">About</a>
              </li>
              <li className="hover:text-white">
                <a href="#contact">Contact</a>
              </li>
              <li className="hover:text-white">
                <a href="/work-with-us">Work With Us</a>
              </li>
            </ul>

            <div className="hidden md:block">
              <Link to="/login">
                <button className="rounded-full bg-[#FFAD00] text-white px-4 py-2 text-sm font-semibold text-black">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-white hover:text-[#f5b640] focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </nav>

          {/* Mobile Navigation Drawer */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10 p-6 md:hidden">
              <ul className="flex flex-col gap-6 text-white text-lg font-medium text-center">
                <li className="hover:text-[#f5b640]">
                  <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
                </li>
                <li className="hover:text-[#f5b640]">
                  <a href="#offer" onClick={() => setIsMenuOpen(false)}>What we offer</a>
                </li>
                <li className="hover:text-[#f5b640]">
                  <a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
                </li>
                <li className="hover:text-[#f5b640]">
                  <a href="#about-us" onClick={() => setIsMenuOpen(false)}>About</a>
                </li>
                <li className="hover:text-[#f5b640]">
                  <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
                </li>
                <li className="hover:text-[#f5b640]">
                  <a href="/work-with-us" onClick={() => setIsMenuOpen(false)}>Work With Us</a>
                </li>
                <li className="pt-4">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full rounded-full bg-[#f5b640] px-6 py-3 text-base font-semibold text-black">
                      Get Started
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </header>
    );
};