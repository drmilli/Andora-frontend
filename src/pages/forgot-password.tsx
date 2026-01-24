import React from "react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthInput } from "../components/auth/AuthInput";
import { AuthButton } from "../components/auth/AuthButton";

export const ForgotPasswordPage: React.FC = () => {
  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter the email linked to your account to reset password"
      maxWidth="md"
    >
      <form className="mt-12 space-y-8">
        <AuthInput
          id="email"
          label="Enter email"
          type="email"
          placeholder=""
          required
        />

        <AuthButton type="submit">Enter</AuthButton>
      </form>
    </AuthLayout>
  );
};
