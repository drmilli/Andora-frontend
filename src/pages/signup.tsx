import React from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthInput } from "../components/auth/AuthInput";
import { AuthButton } from "../components/auth/AuthButton";
import { SocialButton } from "../components/auth/SocialButton";

export const SignupPage: React.FC = () => {
  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Let's Get Started With Your 30 Day Free Trial"
      maxWidth="xl"
      diskwaveSize="92vw"
    >
      <div className="mt-6">
        <SocialButton>Sign Up with Google</SocialButton>
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
          <AuthInput
            label="First Name"
            type="text"
            placeholder="Enter first name"
            required
          />
          <AuthInput
            label="Last Name"
            type="text"
            placeholder="Enter last name"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AuthInput
            label="Username"
            type="text"
            placeholder="Choose a username"
            required
          />
          <AuthInput
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter password"
            required
          />
          <AuthInput
            label="Re-type Password"
            type="password"
            placeholder="Re-enter password"
            required
          />
        </div>

        <AuthInput
          label="Promo code"
          type="text"
          placeholder="Enter promo code"
        />

        <label className="flex items-start gap-3 text-xs font-medium text-white/70">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-white/40 bg-transparent accent-[#f5b640]"
            required
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

        <AuthButton type="submit">Sign Up</AuthButton>
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
    </AuthLayout>
  );
};
