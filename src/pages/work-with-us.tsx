import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/audora-logo.svg";
import heroImage from "../assets/work-with-us-sections/image2.png";
import sectionOneImage from "../assets/work-with-us-sections/section-1.png";
import sectionTwoImage from "../assets/work-with-us-sections/section-2.png";
import sectionThreeImage from "../assets/work-with-us-sections/section-3.png";
import sectionFourImage from "../assets/work-with-us-sections/section-4.png";
import influencer from "../assets/work-with-us-sections/image5.png";
import tvpresenter from "../assets/work-with-us-sections/image3.png";
import mic from "../assets/landing-page/mic.png";
import { SEO } from "../components/SEO";
import { Headphones } from "lucide-react";
import radiopresenter from "../assets/work-with-us-sections/image4.png";

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
      image: influencer,
    },
    {
      quote:
        "From contracts to campaign metrics, everything lives in one place. It feels like an in-house team, without the overhead.",
      name: "Marcos Alvarez",
      role: "Marketing Lead, SONI México",
      image: tvpresenter,
    },
  ];

export const WorkWithUsPage: React.FC = () => {
  return (
    <div className="relative bg-black text-white">
      <SEO
        title="Work With Us - Audora"
        description="Join Audora as a media partner or influencer. Amplify powerful sounds and redefine music reach."
      />

      <div className="min-h-screen overflow-x-hidden">

        <main className="mx-auto w-full max-w-7xl pt-32 px-6">
          <section className="relative overflow-hidden rounded-tl-[80px] bg-[#0a0a0a] min-h-[500px] lg:min-h-[640px] border border-white/5">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={heroImage}
                alt="Creators recording in studio"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content Box - Desktop (overlaps image) */}
            <div className="relative z-10 hidden lg:flex min-h-[550px] items-end justify-end">
              <div className="w-1/2 h-100 absolute top-60 right-0  bg-black p-12 xl:p-12 rounded-tl-[80px] ">
                <h1 className="hero-font text-3xl xl:text-4xl font-semibold leading-[1.15] text-white">
                  Lets Build the <span className="text-[#f5b640]">Future</span> of{" "}
                  Music Promotion <span className="text-[#f5b640]">Together.</span>
                </h1>
                <p className="mt-8 text-lg leading-relaxed text-white/80 max-w-xl">
                  Audora bridges the gap between artists and the world. As a
                  media (Radio, and TV station) or influencer partner, you'll
                  help promote powerful sounds across airwaves and screens.
                </p>
                <div className="mt-10 mb-50">
                  <Link to="/signup">
                    <button className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r bg-[#FFAD00] to-[#BD8000] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#f7c769] shadow-[0_10px_30px_rgba(245,182,64,0.3)]">
                      <Headphones className="w-5 h-5" />
                      Get Started
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Content Box - Mobile/Tablet */}
            <div className="relative z-10 flex lg:hidden h-full flex-col justify-end p-8 sm:p-12">
              <div className="rounded-3xl bg-black/90 p-8 backdrop-blur-md border border-white/10">
                <h1 className="hero-font text-3xl font-semibold leading-tight text-white">
                  Lets Build the <span className="text-[#f5b640]">Future</span>{" "}
                  Together.
                </h1>
                <p className="mt-4 text-base text-white/80">
                  Audora bridges the gap between artists and the world. Partner
                  with us to redefine music reach.
                </p>
                <div className="mt-6">
                  <Link to="/signup">
                    <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#f5b640] px-6 py-3.5 text-sm font-semibold text-black">
                      Get Started
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Radio Section */}
        <section id="radio-opportunity" className="relative  bg-black">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[850px] px-8">
            {/* Text Column */}
            <div className=" justify-center p-10 lg:p-24 relative ">
              {/* Badge Pill */}
              <div className=" h-[130px] w-[200px] flex justify-center items-center text-[40px] font-medium rounded-b-full  bg-[#A67102] absolute top-0 left-[100px]">
                Radio
              </div>

              <div className="mt-20">
                <img src={mic} alt="Golden microphone" className="mb-8" />
                <h2 className="hero-font text-4xl lg:text-6xl font-bold text-white mb-6">
                  What we need
                </h2>
                <p className="text-lg lg:text-xl leading-relaxed text-white/75 mb-10 max-w-xl">
                  As a radio partner, you’ll get early access to new music,
                  feature trending songs, and build direct connections with
                  artists seeking airplay and promotion.
                </p>
                <Link to="/login">
                  <button className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-[#FFAD00] to-[#BD8000] px-8 lg:px-10 py-4 lg:py-5 text-base font-semibold text-white transition hover:opacity-90 shadow-xl">
                    <Headphones className="w-6 h-6" />
                    Get Started for Free
                  </button>
                </Link>
              </div>
            </div>

            {/* Image Column */}
            <div className="relative h-[400px] lg:h-auto overflow-hidden">
              <img
                src={radiopresenter}
                alt="Radio presenter"
                className="absolute inset-0 h-[919px] w-[617px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* TV Section */}
        <section id="tv-opportunity" className="relative  bg-black">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[850px]">
            {/* Image Column (Left on Desktop) */}
            <div className="relative h-[400px] lg:h-auto overflow-hidden lg:order-1">
              <img
                src={tvpresenter}
                alt="TV presenter"
                className="absolute right-0  w-[603px] h-[898px] object-cover"
              />
            </div>

            {/* Text Column (Right on Desktop) */}
            <div className="flex flex-col justify-center p-8 lg:p-24 relative lg:order-2">
              {/* Badge Pill (Top Right) */}
              <div className=" h-[130px] w-[200px] flex justify-center items-center text-[40px] font-medium rounded-b-full  bg-[#A67102] absolute top-0 right-32">
                Tv
              </div>

              <div className="mt-20">
                 <img src={mic} alt="Golden microphone" className="" />
                <h2 className="hero-font text-4xl lg:text-6xl font-bold text-white mb-6">
                  What we need
                </h2>
                <p className="text-lg lg:text-xl leading-relaxed text-white/75 mb-10 max-w-xl">
                  As a TV partner, you’ll get early access to new music and visuals,
                  feature exclusive artist content, and collaborate on
                  promotions that showcase rising talents.
                </p>
                <Link to="/login">
                  <button className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-[#FFAD00] to-[#BD8000] px-8 lg:px-10 py-4 lg:py-5 text-base font-semibold text-white transition hover:opacity-90 shadow-xl">
                    <Headphones className="w-6 h-6" />
                    Get Started for Free
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Influencer Section */}
        <section id="influencer-opportunity" className="relative border-t border-white/5 bg-black">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[850px] px-10">
            {/* Text Column */}
            <div className="flex flex-col justify-center p-8 lg:p-24 relative">
              {/* Badge Pill */}
           <div className=" h-[130px] w-[200px] flex justify-center items-center text-[30px] font-medium rounded-b-full  bg-[#A67102] absolute top-0 left-[100px]">
             Influencer
              </div>

              <div className="mt-20">
                <img src={mic} alt="Golden microphone" className="mb-8" />
                <h2 className="hero-font text-4xl lg:text-6xl font-bold text-white mb-6">
                  What we need
                </h2>
                <p className="text-lg lg:text-xl leading-relaxed text-white/75 mb-10 max-w-xl">
                  Audora is where music meets influence.
                  Get early access to trending songs, partner with artists for content,
                  and help amplify their sound across your platforms.
                </p>
                <Link to="/login">
                  <button className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-[#FFAD00] to-[#BD8000] px-8 lg:px-10 py-4 lg:py-5 text-base font-semibold text-white transition hover:opacity-90 shadow-xl">
                    <Headphones className="w-6 h-6" />
                    Get Started for Free
                  </button>
                </Link>
              </div>
            </div>

            {/* Image Column */}
            <div className="relative h-[400px] lg:h-auto overflow-hidden">
              <img
                src={influencer}
                alt="Influencer"
                className="absolute inset-0 w-[617px] h-[926px] object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
