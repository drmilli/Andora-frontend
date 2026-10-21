import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, Megaphone, Mic2, Radio, Tv } from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";

type RoleOption = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  /** Where signup for this role starts. Omitted while the role is unavailable. */
  to?: string;
  loginTo?: string;
  /** Roles the backend cannot create yet are shown, but not offered. */
  comingSoon?: boolean;
};

const ROLES: RoleOption[] = [
  {
    id: "artist",
    name: "Artist",
    description: "Upload your music and pay influencers to push it.",
    icon: <Mic2 className="h-5 w-5" />,
    to: "/signup",
    loginTo: "/login",
  },
  {
    id: "influencer",
    name: "Influencer",
    description: "Get paid to promote music to your audience.",
    icon: <Megaphone className="h-5 w-5" />,
    to: "/influencer-signup",
    loginTo: "/influencer-login",
  },
  {
    id: "radio",
    name: "Radio Station",
    description: "List your airtime and take bookings from artists.",
    icon: <Radio className="h-5 w-5" />,
    comingSoon: true,
  },
  {
    id: "tv",
    name: "TV Station",
    description: "Sell broadcast slots for music videos.",
    icon: <Tv className="h-5 w-5" />,
    comingSoon: true,
  },
];

export const SelectRole: React.FC = () => {
  return (
    <AuthLayout
      title="Make a selection."
      subtitle="Tell us how you'll be using Audora — you can't change this later."
      maxWidth="xl"
    >
      {/* One column on phones; the old 4-across grid squeezed each option to 80px */}
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ROLES.map((role) =>
          role.comingSoon ? (
            <div
              key={role.id}
              aria-disabled="true"
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 opacity-60"
            >
              <span className="mt-0.5 shrink-0 rounded-lg bg-white/5 p-2 text-white/40">
                {role.icon}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-white/70">{role.name}</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/40">
                    <Lock className="h-2.5 w-2.5" />
                    Soon
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-white/40">
                  {role.description}
                </p>
              </div>
            </div>
          ) : (
            <Link
              key={role.id}
              to={role.to!}
              aria-label={`Sign up as ${role.name}`}
              className="group flex items-start gap-3 rounded-xl border border-[#f5b640]/40 bg-white/[0.02] p-4 transition-colors hover:border-[#f5b640] hover:bg-[#f5b640]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5b640] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span className="mt-0.5 shrink-0 rounded-lg bg-[#f5b640]/10 p-2 text-[#f5b640]">
                {role.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-white">{role.name}</p>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#f5b640] transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mt-1 text-xs leading-relaxed text-white/60">
                  {role.description}
                </p>
              </div>
            </Link>
          )
        )}
      </div>

      <div className="mt-8 space-y-2 text-center text-sm">
        <p className="text-white/60">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#f5b640] underline-offset-4 transition hover:underline"
          >
            Log in as an artist
          </Link>
        </p>
        <p className="text-white/40 text-xs">
          Influencer?{" "}
          <Link
            to="/influencer-login"
            className="text-[#f5b640] underline-offset-4 transition hover:underline"
          >
            Log in here
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};
