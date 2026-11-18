import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthInput } from "../components/auth/AuthInput";
import { AuthButton } from "../components/auth/AuthButton";
import { requestPasswordReset } from "../services/auth";
import { apiErrorMessage } from "../lib/influencer";

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) return setError("Enter the email linked to your account.");
    try {
      setSubmitting(true);
      setError(null);
      await requestPasswordReset(value);
      navigate("/verify-otp");
    } catch (err) {
      setError(apiErrorMessage(err, "Could not send the reset code. Try again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter the email linked to your account to reset password"
      maxWidth="md"
    >
      <form className="mt-12 space-y-8" onSubmit={onSubmit} noValidate>
        <AuthInput
          id="email"
          label="Enter email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-400" role="alert">{error}</p>}

        <AuthButton type="submit" disabled={submitting}>
          {submitting ? "Sending..." : "Enter"}
        </AuthButton>
      </form>
    </AuthLayout>
  );
};
