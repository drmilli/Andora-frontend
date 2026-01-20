import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/audora-logo.svg";
import diskwave from "../assets/auth/diskwave.svg";

export const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      <img
        src={diskwave}
        alt="Decorative vinyl waveform"
        className="pointer-events-none absolute inset-0 m-auto h-auto w-[92vw] max-w-4xl opacity-20"
      />

      <div className="relative z-10 w-full max-w-xl px-6">
        <div className="flex justify-center">
          <img src={logo} alt="Audora" className="h-12 w-auto" />
        </div>

        <div className="mt-6 text-center">
          <h1 className="hero-font text-2xl font-semibold sm:text-3xl">
            Create an Account
          </h1>
          <p className="mt-2 text-xs font-medium text-white/70">
            Let&apos;s Get Started With Your 30 Day Free Trial
          </p>
        </div>

        <div className="mt-6">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-[#f5b640]/70 bg-transparent px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5b640]/40"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
                fill="#EA4335"
              />
            </svg>
            Sign Up with Google
          </button>
        </div>

        <div className="relative mt-6 flex items-center">
          <div className="flex-grow border-t border-white/15" />
          <span className="mx-3 text-[0.7rem] uppercase tracking-[0.25em] text-white/50">
            Or
          </span>
          <div className="flex-grow border-t border-white/15" />
        </div>

        <form className="mt-5 space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-xs font-medium text-white/70">
                First Name
              </span>
              <input
                type="text"
                placeholder="Enter first name"
                className="mt-2 w-full border-b border-white/15 bg-transparent pb-2 text-sm font-semibold text-white placeholder-white/40 transition focus:border-[#f5b640] focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-white/70">
                Last Name
              </span>
              <input
                type="text"
                placeholder="Enter last name"
                className="mt-2 w-full border-b border-white/15 bg-transparent pb-2 text-sm font-semibold text-white placeholder-white/40 transition focus:border-[#f5b640] focus:outline-none"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-xs font-medium text-white/70">
                Username
              </span>
              <input
                type="text"
                placeholder="Choose a username"
                className="mt-2 w-full border-b border-white/15 bg-transparent pb-2 text-sm font-semibold text-white placeholder-white/40 transition focus:border-[#f5b640] focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-white/70">
                Email Address
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full border-b border-white/15 bg-transparent pb-2 text-sm font-semibold text-white placeholder-white/40 transition focus:border-[#f5b640] focus:outline-none"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-xs font-medium text-white/70">
                Password
              </span>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full border-b border-white/15 bg-transparent pb-2 pr-10 text-sm font-semibold text-white placeholder-white/40 transition focus:border-[#f5b640] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 transition hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </label>
            <label className="block">
              <span className="text-xs font-medium text-white/70">
                Re-type Password
              </span>
              <div className="relative mt-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  className="w-full border-b border-white/15 bg-transparent pb-2 pr-10 text-sm font-semibold text-white placeholder-white/40 transition focus:border-[#f5b640] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 transition hover:text-white"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-medium text-white/70">
              Promo code
            </span>
            <input
              type="text"
              placeholder="Enter promo code"
              className="mt-2 w-full border-b border-white/15 bg-transparent pb-2 text-sm font-semibold text-white placeholder-white/40 transition focus:border-[#f5b640] focus:outline-none"
            />
          </label>

          <label className="flex items-start gap-3 text-xs font-medium text-white/70">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-white/40 bg-transparent accent-[#f5b640]"
            />
            <span>
              I have read agree to the{" "}
              <a
                href="#terms"
                className="text-[#f5b640] transition hover:text-[#ffca52]"
              >
                Terms &amp; Condition.
              </a>
            </span>
          </label>

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-[#f5b640] via-[#f0a71e] to-[#d78919] px-8 py-2.5 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(214,137,25,0.35)] transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f6c15b]/40"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-5 text-center text-xs font-medium text-white/70">
          Already Have Account?{" "}
          <Link
            to="/login"
            className="text-[#f5b640] transition hover:text-[#ffca52]"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
