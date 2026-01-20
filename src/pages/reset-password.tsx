import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/audora-logo.svg";
import diskwave from "../assets/auth/diskwave.svg";

export const ResetPasswordPage: React.FC = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      <img
        src={diskwave}
        alt="Decorative vinyl waveform"
        className="pointer-events-none absolute inset-0 m-auto h-auto w-[90vw] max-w-3xl opacity-25"
      />

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="flex justify-center">
          <img src={logo} alt="Audora" className="h-14 w-auto" />
        </div>

        <div className="mt-16 text-center">
          <h1 className="hero-font text-3xl font-semibold">Password Reset</h1>
          <p className="mt-3 text-sm text-white/70">Reset your password</p>
        </div>

        <form className="mt-12 space-y-8">
          <label htmlFor="new-password" className="block">
            <span className="text-sm text-white/70">New Password</span>
            <div className="relative mt-3">
              <input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder=""
                className="w-full border-b border-white/15 bg-transparent pb-3 pr-10 text-base font-semibold text-white placeholder-white/40 transition focus:border-[#f5b640] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 transition hover:text-white"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </label>

          <label htmlFor="confirm-password" className="block">
            <span className="text-sm text-white/70">Confirm Password</span>
            <div className="relative mt-3">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder=""
                className="w-full border-b border-white/15 bg-transparent pb-3 pr-10 text-base font-semibold text-white placeholder-white/40 transition focus:border-[#f5b640] focus:outline-none"
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

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-[#f5b640] via-[#f0a71e] to-[#d78919] px-10 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(214,137,25,0.35)] transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f6c15b]/40"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};
