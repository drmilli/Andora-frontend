import React from "react";
import { cn } from "@/lib/utils";

interface AuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  children,
  className,
  type = "submit",
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(
        "w-full rounded-full bg-linear-to-r from-[#f5b640] via-[#f0a71e] to-[#d78919] px-9 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(214,137,25,0.35)] transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f6c15b]/40 disabled:opacity-50 disabled:hover:scale-100",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
