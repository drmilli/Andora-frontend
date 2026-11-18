import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/audora-logo.svg";
import diskwave from "../assets/auth/diskwave.svg";
import { getResetEmail, requestPasswordReset, verifyResetCode } from "../services/auth";
import { apiErrorMessage } from "../lib/influencer";

// "florence@gmail.com" -> "flo*****@gmail.com"
const maskEmail = (email: string) => {
  const [name, domain] = email.split("@");
  if (!domain) return email;
  return `${name.slice(0, 3)}${"*".repeat(Math.max(name.length - 3, 3))}@${domain}`;
};

export const VerifyOtpPage: React.FC = () => {
  const navigate = useNavigate();
  const email = getResetEmail();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!/^\d{6}$/.test(otp.trim())) return setError("Enter the 6-digit code from the email.");
    try {
      setSubmitting(true);
      setError(null);
      await verifyResetCode(email, otp.trim());
      navigate("/reset-password");
    } catch (err) {
      setError(apiErrorMessage(err, "That code didn't work. Check it and try again."));
    } finally {
      setSubmitting(false);
    }
  };

  const resend = async () => {
    if (!email) return;
    try {
      setResending(true);
      setError(null);
      await requestPasswordReset(email);
      setNotice("A new code is on its way.");
    } catch (err) {
      setError(apiErrorMessage(err, "Could not resend the code."));
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      <img
        src={diskwave}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 m-auto h-auto w-[90vw] max-w-3xl opacity-25"
      />

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="flex justify-center">
          <img src={logo} alt="Audora" className="h-14 w-auto" />
        </div>

        <div className="mt-16 text-center">
          <h1 className="hero-font text-3xl font-semibold">Verification</h1>
          <p className="mt-3 text-sm text-white/70">
            {email ? `We sent a code to ${maskEmail(email)}` : "Start by entering your email."}
          </p>
        </div>

        {!email ? (
          <div className="mt-12 text-center">
            <Link to="/forgot-password" className="text-[#f5b640] underline">
              Go to Forgot Password
            </Link>
          </div>
        ) : (
          <form className="mt-12 space-y-6" onSubmit={onSubmit} noValidate>
            <label htmlFor="otp" className="block">
              <span className="text-sm text-white/70">Enter OTP</span>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="mt-3 w-full border-b border-white/15 bg-transparent pb-3 text-base font-semibold tracking-[0.5em] text-white placeholder-white/40 transition focus:border-[#f5b640] focus:outline-none"
              />
            </label>

            {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
            {notice && !error && <p className="text-sm text-green-400" role="status">{notice}</p>}

            <div className="text-center">
              <p className="text-sm text-white/70">Didn't receive code? Check spam, or resend.</p>
            </div>

            <button
              type="button"
              onClick={resend}
              disabled={resending}
              className="w-full rounded-full border border-[#f5b640]/70 bg-transparent px-10 py-3 text-sm font-semibold text-white transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5b640]/40 disabled:opacity-50"
            >
              {resending ? "Sending..." : "Resend Code"}
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-gradient-to-r from-[#f5b640] via-[#f0a71e] to-[#d78919] px-10 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(214,137,25,0.35)] transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f6c15b]/40 disabled:opacity-50"
            >
              {submitting ? "Verifying..." : "Verify"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
