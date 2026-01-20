import React from "react";
import logo from "../assets/audora-logo.svg";
import diskwave from "../assets/auth/diskwave.svg";

export const VerifyOtpPage: React.FC = () => {
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
          <h1 className="hero-font text-3xl font-semibold">Verification</h1>
          <p className="mt-3 text-sm text-white/70">
            We sent a code to flo**********@gmail.com
          </p>
        </div>

        <form className="mt-12 space-y-6">
          <label htmlFor="otp" className="block">
            <span className="text-sm text-white/70">Enter OTP</span>
            <input
              id="otp"
              type="text"
              placeholder=""
              className="mt-3 w-full border-b border-white/15 bg-transparent pb-3 text-base font-semibold text-white placeholder-white/40 transition focus:border-[#f5b640] focus:outline-none"
            />
          </label>

          <div className="text-center">
            <p className="text-sm text-white/70">Didn't receive code?</p>
          </div>

          <button
            type="button"
            className="w-full rounded-full border border-[#f5b640]/70 bg-transparent px-10 py-3 text-sm font-semibold text-white transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5b640]/40"
          >
            Resend Code
          </button>

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-[#f5b640] via-[#f0a71e] to-[#d78919] px-10 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(214,137,25,0.35)] transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f6c15b]/40"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};
