import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthInput } from "../components/auth/AuthInput";
import { AuthButton } from "../components/auth/AuthButton";
import { getResetToken, resetPassword } from "../services/auth";
import { apiErrorMessage } from "../lib/influencer";

const MIN_LENGTH = 8;

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const resetToken = getResetToken();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetToken) return;
    if (password.length < MIN_LENGTH) return setError(`Use at least ${MIN_LENGTH} characters.`);
    if (password !== confirm) return setError("The passwords don't match.");
    try {
      setSubmitting(true);
      setError(null);
      await resetPassword(resetToken, password, confirm);
      navigate("/login", { state: { passwordReset: true } });
    } catch (err) {
      setError(apiErrorMessage(err, "Could not reset your password. Start again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Password Reset" subtitle="Reset your password" maxWidth="md">
      {!resetToken ? (
        <p className="mt-12 text-center text-sm text-white/70">
          This reset link has expired.{" "}
          <Link to="/forgot-password" className="text-[#f5b640] underline">Start again</Link>
        </p>
      ) : (
        <form className="mt-12 space-y-8" onSubmit={onSubmit} noValidate>
          <AuthInput
            id="new-password"
            label="New Password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <AuthInput
            id="confirm-password"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          {error && <p className="text-sm text-red-400" role="alert">{error}</p>}

          <AuthButton type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Reset"}
          </AuthButton>
        </form>
      )}
    </AuthLayout>
  );
};
