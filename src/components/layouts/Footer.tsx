import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Menu,
  X,
  type LucideIcon,
  Headphones,
} from "lucide-react";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";



export const Footer: React.FC = () => {
      const { isInstallable, promptInstall, isIOS } = useInstallPrompt();
      const socialPlatforms: Array<{ name: string; Icon: LucideIcon }> = [
        { name: "Facebook", Icon: Facebook },
        { name: "Twitter", Icon: Twitter },
        { name: "Instagram", Icon: Instagram },
        { name: "LinkedIn", Icon: Linkedin },
        { name: "YouTube", Icon: Youtube },
      ];
    
      const currentYear = new Date().getFullYear();
    return (
      <footer className="bg-gradient-to-b from-black via-[#2d1608] to-[#b27618]">
        {/* Footer content */}
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <div className="hero-font">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Want product news and updates?
            </h2>
            <p className="mt-3 text-base text-white/70">
              Sign up for our newsletter to stay up to date
            </p>
          </div>

          <form className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-full border border-white/15 bg-white/10 px-6 py-4 text-base text-white placeholder-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.35)] focus:border-[#f5b640] focus:outline-none focus:ring-2 focus:ring-[#f5b640]/40 sm:max-w-md"
            />
            <button
              type="submit"
              className="min-w-[150px] rounded-full bg-gradient-to-r from-[#f5b640] via-[#f0a71e] to-[#d78919] px-8 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(214,137,25,0.35)] transition-transform duration-200 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f6c15b]/50"
            >
              Notify Me
            </button>
          </form>

          <p className="mt-6 text-sm text-white/70">
            We care about the protection of your data. Read our{" "}
            <Link
              to="/privacy-policy"
              className="underline decoration-[#f5b640] decoration-2 underline-offset-4 hover:text-white"
            >
              Privacy Policy.
            </Link>
          </p>

          <div className="mt-10 flex justify-center gap-4">
            {socialPlatforms.map(({ name, Icon }) => (
              <span
                key={name}
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
                aria-label={name}
              >
                <Icon className="h-5 w-5 text-[#FFAD00]" />
              </span>
            ))}
          </div>

          <div className="mt-12 text-sm text-white/70">
            Click to download our app. Download Now!
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          
              <button 
                onClick={promptInstall}
                className="flex items-center gap-3 rounded-lg bg-white text-[#FFAD00] px-15 py-3 text-sm font-semibold shadow-[0_18px_40px_rgba(255,255,255,0.1)] transition hover:translate-y-[-2px] hover:bg-gray-100"
              >
                Install Web App
              </button>
         
            {/* <button className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#f5b640] via-[#f0a71e] to-[#d78919] px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(214,137,25,0.45)] transition hover:translate-y-[-2px]">
              <img src={appstore} alt="apple store" className=" w-5 h-5" />
              Apple Store
            </button>
            <button className="flex items-center gap-3 rounded-full border border-white/10 bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(0,0,0,0.2)] transition hover:translate-y-[-2px]">
              <img src={googleplay} alt="google play" className=" w-5 h-5" />
              Play Store
            </button> */}
          </div>

          <div className="mt-16 border-t border-white/10"></div>
          <p className="mt-6 text-sm text-white/70">
            Copyright © {currentYear} Audora | All Rights Reserved
          </p>
        </div>
      </footer>
    );
};