import React from "react";
import logo from "../../assets/audora-logo.svg";
import diskwave from "../../assets/auth/diskwave.svg";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  maxWidth?: "md" | "xl";
  diskwaveSize?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  maxWidth = "md",
  diskwaveSize = "90vw",
}) => {
  const maxWidthClass = maxWidth === "xl" ? "max-w-xl" : "max-w-md";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      <img
        src={diskwave}
        alt="Decorative vinyl waveform"
        className="pointer-events-none absolute inset-0 m-auto h-auto max-w-4xl opacity-80"
        style={{ width: diskwaveSize }}
      />

      <div className={`relative z-10 w-full ${maxWidthClass} px-6`}>
        <div className="flex justify-center">
          <img src={logo} alt="Audora" className="h-14 w-auto" />
        </div>

        <div className="mt-8 text-center">
          <h1 className="hero-font text-3xl font-semibold">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-white/70">{subtitle}</p>}
        </div>

        {children}
      </div>
    </div>
  );
};
