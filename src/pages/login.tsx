import React from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthInput } from "../components/auth/AuthInput";
import { AuthButton } from "../components/auth/AuthButton";
import { SocialButton } from "../components/auth/SocialButton";

export const LoginPage: React.FC = () => {
  return (
    <AuthLayout
      title="Login"
      subtitle="Welcome back! Login to start your journey."
      maxWidth="md"
    >
      <div className="mt-8">
        <SocialButton>Login with Google</SocialButton>
      </div>

      <div className="relative mt-8 flex items-center">
        <div className="flex-grow border-t border-white/15" />
        <span className="mx-4 text-xs uppercase tracking-[0.3em] text-white/50">
          Or
        </span>
        <div className="flex-grow border-t border-white/15" />
      </div>

      <form className="mt-8 space-y-6">
        <AuthInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          required
        />

        <AuthInput
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
        />

        <div className="flex justify-end pt-1">
          <Link
            to="/forgot-password"
            className="text-sm text-white/70 transition hover:text-white"
          >
            Forgot password?
          </Link>
        </div>

        <AuthButton type="submit">Login</AuthButton>
      </form>

      <p className="mt-8 text-center text-sm text-white/70">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="text-[#f5b640] transition hover:text-[#ffca52]"
        >
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
};
