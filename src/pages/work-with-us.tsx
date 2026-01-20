import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/audora-logo.svg";
import heroImage from "../assets/work-with-us-sections/in-studio.png";
import sectionOneImage from "../assets/work-with-us-sections/section-1.png";
import sectionTwoImage from "../assets/work-with-us-sections/section-2.png";
import sectionThreeImage from "../assets/work-with-us-sections/section-3.png";
import sectionFourImage from "../assets/work-with-us-sections/section-4.png";
import smilingGirlImage from "../assets/work-with-us-sections/smiling-girl.png";
import smilingGuyImage from "../assets/work-with-us-sections/smiling-guy.png";
import signer from "../assets/landing-page/about-us/signer.png";
import blurFlameLeft from "../assets/landing-page/blur-flame.png";
import mic from "../assets/landing-page/about-us/microphone.png";

export const navLinks: Array<{
  label: string;
  href: string;
  isActive?: boolean;
}> = [
  { label: "Home", href: "/" },
  { label: "What we offer", href: "/#offer" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/#about-us" },
  { label: "Contact Us", href: "/#contact" },
  { label: "Work With Us", href: "/work-with-us", isActive: true },
];

export const opportunityHighlights: Array<{
  title: string;
  description: string;
  image: string;
  metric: string;
}> = [
  {
    title: "Creator Campaigns",
    description:
      "Deploy branded challenges, reviews, and live drops with vetted hosts across podcasts, YouTube, and social audio.",
    image: sectionOneImage,
    metric: "2.5x avg. engagement lift",
  },
  {
    title: "Sync & Broadcast",
    description:
      "Place your artists on radio and TV lineups with ready-to-air assets, clearance support, and localized rollouts.",
    image: sectionTwoImage,
    metric: "120+ broadcast partners",
  },
  {
    title: "Influencer Partnerships",
    description:
      "Pair campaigns with storytellers who already love the culture—curated to match your tone, territory, and goals.",
    image: sectionThreeImage,
    metric: "Verified roster in 14 countries",
  },
  {
    title: "Performance Analytics",
    description:
      "Track every deliverable with transparent dashboards, conversion insights, and automated payout workflows.",
    image: sectionFourImage,
    metric: "Live impact dashboards",
  },
];

export const processSteps: Array<{ title: string; description: string }> = [
  {
    title: "Discovery & Scoping",
    description:
      "We co-create the brief, define your KPIs, and audit existing assets so our teams can plug in seamlessly.",
  },
  {
    title: "Talent Matchmaking",
    description:
      "Our partnership leads handpick hosts, influencers, and broadcasters, then align schedules and publishing windows.",
  },
  {
    title: "Production & Launch",
    description:
      "We manage creative direction, deliverables, and approvals, making sure every asset is on-brand and on time.",
  },
  {
    title: "Measurement & Iteration",
    description:
      "Your dashboard shows reach, engagement, and spend in real-time—so we can optimize quickly and scale what works.",
  },
];

export const testimonials: Array<{
  quote: string;
  name: string;
  role: string;
  image: string;
}> = [
  {
    quote:
      "Audora connected our newsroom with hosts who actually understood our audience. We filled a full programming block within two weeks.",
    name: "Oluwaseyi Martins",
    role: "Senior Producer, Pulse NG",
    image: smilingGirlImage,
  },
  {
    quote:
      "From contracts to campaign metrics, everything lives in one place. It feels like an in-house team, without the overhead.",
    name: "Marcos Alvarez",
    role: "Marketing Lead, SONI México",
    image: smilingGuyImage,
  },
];

export const WorkWithUsPage: React.FC = () => {
  return (
    <div className="relative bg-black text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(245,182,64,0.12),_transparent_55%)]" />

      <div className=" min-h-[100dvh] max-h-[100dvh] overflow-y-clip">
        <header className="absolute inset-x-0 top-6 z-30">
          <nav className="mx-auto max-w-7xl px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Audora" className="h-8 w-auto" />
            </div>

            <ul className="hidden md:flex items-center gap-8 text-white/80 text-sm">
              {navLinks.map((link) => (
                <li key={link.label} className="hover:text-white">
                  <a
                    href={link.href}
                    className={link.isActive ? "text-white" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden md:block">
              <Link to="/login">
                <button className="rounded-full bg-[#f5b640] px-4 py-2 text-sm font-semibold text-black">
                  Get Started
                </button>
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto w-full max-w-7xl px-6">
          <section className="relative flex flex-col justify-end overflow-visible pt-36 lg:pt-40">
            <div className="relative isolate h-full min-h-[400px] lg:min-h-[540px]">
              <div className="h-full overflow-hidden rounded-[36px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                <img
                  src={heroImage}
                  alt="Creators recording in studio"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-[36px] ring-1 ring-inset ring-white/5" />
            </div>

            <div className="mt-8 flex justify-center lg:absolute  lg:right-0 lg:bottom-[190px] lg:mt-0 lg:block">
              <div className="relative z-10 w-full max-w-sm rounded-[24px] border border-white/10 bg-[#0f0f0f] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.55)] lg:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                  Partner With Audora
                </p>
                <h1 className="mt-4 text-2xl font-semibold leading-snug text-white md:text-3xl">
                  Let's Build the <span className="text-[#f5b640]">Future</span>{" "}
                  of Music Promotion{" "}
                  <span className="text-[#f5b640]">Together.</span>
                </h1>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  Audora bridges the gap between artists and the world. As a
                  media partner or influencer ally, you amplify powerful sounds
                  across stations and screens while joining a movement that
                  redefines music reach.
                </p>
                <div className="mt-6">
                  <Link to="/signup" className="inline-flex">
                    <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f5b640] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#f7c769]">
                      Get Started
                      <span
                        aria-hidden="true"
                        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/20"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="h-3 w-3 text-black"
                          stroke="currentColor"
                        >
                          <path
                            d="M4.5 10H15.5"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.5 5L15.5 10L10.5 15"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <section id="about-us" className="relative overflow-hidden py-28">
        <div className=" h-[130px] w-[200px] flex justify-center items-center text-[40px] font-medium rounded-b-full  bg-[#765001] absolute top-0 left-[100px]">
          Radio
        </div>
        <img
          src={blurFlameLeft}
          alt="Decorative blur"
          className="pointer-events-none absolute -left-24 top-10 w-80 opacity-60 blur-lg"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
            <div className="hero-font md:col-span-5">
              <img
                src={mic}
                alt="Golden microphone"
                className="mb-8 w-[400px]"
              />
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                What We Need
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/75 sm:text-lg">
                Audora connects artists with audiences and Radio remains a key
                part of that story.As a radio partner, you’ll get early access
                to new music, feature trending songs, and build direct
                connections with artists seeking airplay and promotion.Together,
                we’ll amplify great sound and make discovery easier for
                everyone.
              </p>
              <p className="mt-8 text-2xl font-semibold text-[#f5b640] sm:text-3xl">
                Audora - Your Sound, the World&apos;s Stage.
              </p>
            </div>

            <div className="md:col-span-7 flex items-start justify-end gap-6">
              <img
                src={signer}
                alt="Singer recording"
                className="h-[400px] w-[300px] rounded-[2.5rem] object-cover shadow-[0_25px_80px_rgba(10,0,0,0.6)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New section added after about-us: smiling guy on the LEFT, text on the RIGHT, larger image */}
      <section id="host-opportunity" className="relative overflow-hidden py-28">
        <img
          src={blurFlameLeft}
          alt="Decorative blur"
          className="pointer-events-none absolute -right-24 top-12 w-80 opacity-60 blur-lg rotate-12"
        />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
            {/* Left column: enlarged smiling guy image */}
            <div className="md:col-span-6 flex items-center justify-start">
              <div className="relative w-full max-w-2xl md:max-w-none">
                {/* Larger image: allow it to be taller and wider on larger screens */}
                <img
                  src={smilingGuyImage}
                  alt="Smiling host"
                  className="w-full max-w-[720px] h-auto rounded-[28px] object-cover shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
                />
                {/* decorative overlay / flame blur */}
                <img
                  src={sectionThreeImage}
                  alt="Decorative overlay"
                  className="pointer-events-none absolute -right-16 -bottom-10 w-56 opacity-50 blur-sm"
                />
                {/* small badge on image */}
                <div className="absolute top-6 left-6 flex items-center gap-3 rounded-full bg-black/60 px-4 py-2 text-sm">
                  <img src={mic} alt="mic" className="h-5 w-5" />
                  <span className="font-medium text-white/90">
                    Host Opportunities
                  </span>
                </div>
              </div>
            </div>

            {/* Right column: text + CTA */}
            <div className="md:col-span-6">
              <div className="hero-font max-w-xl md:ml-8">
                <img src={mic} alt="Microphone" className="mb-6 w-28" />
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                  What we need
                </h2>

                <p className="mt-6 text-base leading-relaxed text-white/75 sm:text-lg">
                  Audora connects creators with audiences and TV brings their stories to life.
                  As a TV partner, you’ll get early access to new music and visuals, feature exclusive artist content, and collaborate on promotions that showcase rising talents.
                  Together, we’ll amplify creativity and entertainment across screens.
                </p>

                <p className="mt-6 text-sm leading-relaxed text-white/60">
                  Placeholder: We'll tailor opportunities to your audience size,
                  region, and show format — from short sponsored reads to full
                  co-produced episodes.
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <Link to="/signup" className="inline-flex">
                    <button className="inline-flex items-center gap-2 rounded-full bg-[#f5b640] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#f7c769]">
                      Get Started
                    </button>
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
