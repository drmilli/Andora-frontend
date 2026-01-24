import React from "react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthInput } from "../components/auth/AuthInput";
import { AuthButton } from "../components/auth/AuthButton";

export const ResetPasswordPage: React.FC = () => {
  return (
    <AuthLayout
      title="Password Reset"
      subtitle="Reset your password"
      maxWidth="md"
    >
      <form className="mt-12 space-y-8">
        <AuthInput
          id="new-password"
          label="New Password"
          type="password"
          placeholder=""
          required
        />

        <AuthInput
          id="confirm-password"
          label="Confirm Password"
          type="password"
          placeholder=""
          required
        />

        <AuthButton type="submit">Reset</AuthButton>
      </form>
    </AuthLayout>
  );
};
