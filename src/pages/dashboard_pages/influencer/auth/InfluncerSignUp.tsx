import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../../../components/auth/AuthLayout";
import { AuthInput } from "../../../../components/auth/AuthInput";
import { CountrySelect } from "../../../../components/auth/CountrySelect";
import { AuthButton } from "../../../../components/auth/AuthButton";
import { useInfluencerAuth } from "../../../../hooks/auth/useInfluencerAuth";


export const InfluencerSignup: React.FC = () => {
  const { register, error } = useInfluencerAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") || "");
    const passwordConfirmation = String(
      form.get("password_confirmation") || password
    );

    try {
      const data = await register({
        firstname: String(form.get("firstname") || ""),
        surname: String(form.get("surname") || ""),
        username: String(form.get("username") || ""),
        email: String(form.get("email") || ""),
        role: "influencer",
        password,
        password_confirmation: passwordConfirmation,
      });

      navigate("/dashboard", {
        state: {
          signupSuccess: true,
          username: data.user?.username || String(form.get("username")),
        },
      });
    } catch (err) {
      console.error("Influencer signup error:", err);
    }
  };
  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Let's Get Started With Your 30 Day Free Trial"
      maxWidth="xl"
      diskwaveSize="92vw"
    >


      <div className="relative mt-6 flex items-center">
        <div className="flex-grow border-t border-white/15" />
        <span className="mx-3 text-[0.7rem] uppercase tracking-[0.25em] text-white/50">
          Or
        </span>
        <div className="flex-grow border-t border-white/15" />
      </div>

      <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AuthInput
            label="First Name"
            type="text"
            placeholder="Enter first name"
            required
            name="firstname"
          />
          <AuthInput
            label="Surname"
            type="text"
            placeholder="Enter surname"
            required
            name="surname"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AuthInput
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            required
            name="email"
          />
          <AuthInput
            label="Username"
            type="text"
            placeholder="Enter username"
            required
            name="username"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CountrySelect
            label="Country"
            name="country"
            placeholder="Select Country"
            required
          />
          <AuthInput
            label="Address"
            type="text"
            placeholder="Enter Address"
            required
            name="address"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
          <CountrySelect
            label="Platforms"
            name="platforms"
            placeholder="Select Platforms"
            required
          />
          <CountrySelect
            label="Engagement Rate"
            name="engagement_rate"
            placeholder="Select Engagement Rate"
            required
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
          <AuthInput
            label="Follower Count"
            type="number"
            placeholder="Enter follower count"
          />
          <AuthInput
            label="Price Rate"
            type="text"
            placeholder="Enter price rate"
          />
        </div>


        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter password"
            required
            name="password"
          />
          <AuthInput
            label="Re-type Password"
            type="password"
            placeholder="Re-enter password"
            required
            name="password_confirmation"
          />
        </div>


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
          to="/influncer-login"
          className="text-[#f5b640] transition hover:text-[#ffca52]"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};
