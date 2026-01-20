import React from "react";
import logo from "../assets/audora-logo.svg";
import diskwave from "../assets/auth/diskwave.svg";

export const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      <img
        src={diskwave}
        alt="Decorative vinyl waveform"
        className="pointer-events-none absolute inset-0 m-auto h-auto w-[90vw] max-w-3xl"
      />

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="flex justify-center">
          <img src={logo} alt="Audora" className="h-14 w-auto" />
        </div>

        <div className="mt-16 text-center">
          <h1 className="hero-font text-3xl font-semibold">Forgot Password?</h1>
          <p className="mt-3 text-sm text-white/70">
            Enter the email linked to your account to reset password
          </p>
        </div>

        <form className="mt-12 space-y-8">
          <label htmlFor="email" className="block">
            <span className="text-sm text-white/70">Enter email</span>
            <input
              id="email"
              type="email"
              placeholder=""
              className="mt-3 w-full border-b border-white/15 bg-transparent pb-3 text-base font-semibold text-white placeholder-white/40 transition focus:border-[#f5b640] focus:outline-none"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-[#f5b640] via-[#f0a71e] to-[#d78919] px-10 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(214,137,25,0.35)] transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f6c15b]/40"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};
