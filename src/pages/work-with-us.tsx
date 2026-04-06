import React from "react";
import { Link } from "react-router-dom";
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

        <main className="mx-auto w-full max-w-[1578px] pt-20 md:pt-28 px-0 sm:px-6">
          <section className="relative overflow-hidden rounded-t-[30px] md:rounded-t-[80px] bg-[#0a0a0a] min-h-[450px] md:min-h-[600px] lg:min-h-[990px] border border-white/5">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={heroImage}
                alt="Creators recording in studio"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content Box - Desktop only (overlaps image) */}
            <div className="relative top-80 z-10 hidden lg:flex min-h-[500px] md:min-h-[600px] lg:min-h-[680px] items-center justify-end ">
              <div className="w-full md:w-[60%] h-[600px] bg-black p-8 md:p-12 rounded-tl-[80px] self-end ">
                <h1 className="hero-font text-3xl tablet:text-4xl xl:text-6xl font-semibold leading-[1.15] text-white">
                  Lets Build the <span className="text-[#f5b640]">Future</span> of{" "}
                  Music Promotion <br /> <span className="text-[#f5b640]">Together.</span>
                </h1>
                <p className="mt-6 text-base md:text-3xl leading-relaxed text-white/80 w-full ">
                  Audora bridges the gap between artists and the world. As a
                  media (Radio, and TV station) or influencer partner, you'll
                  help promote powerful sounds across airwaves and screens.
                </p>
                <div className="mt-8">
                  <Link to="/signup">
                    <button className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#FFAD00] to-[#BD8000] px-10 py-4 text-base font-semibold text-white transition hover:opacity-90 shadow-[0_10px_30px_rgba(245,182,64,0.3)]">
                      <Headphones className="w-5 h-5" />
                      Get Started
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Content Box - Mobile & Medium */}
            <div className="relative top-55    z-10 flex lg:hidden h-full flex-col justify-end items-end p-0 sm:p-6 pb-12">
              <div className=" bg-black/85 rounded-tl-[20px] w-95 h-[500px] p-6 sm:p-8 backdrop-blur-md border border-white/10 shadow-2xl">
                <h1 className="hero-font text-3xl  font-semibold leading-tight text-white ">
                  Lets Build the <span className="text-[#f5b640]">Future</span> of{" "}
                  Music Promotion <br /> <span className="text-[#f5b640]">Together.</span>
                </h1>
                <p className="mt-3 text-lg sm:text-base text-white/80 line-clamp-3">
                  Audora bridges the gap between artists and the world. Partner
                  with us to redefine music reach.
                </p>
                <div className="mt-5">
                  <Link to="/signup">
                    <button className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#FFAD00] to-[#BD8000] px-10 py-4 text-base font-semibold text-white transition hover:opacity-90 shadow-[0_10px_30px_rgba(245,182,64,0.3)]">
                      <Headphones className="w-5 h-5" />
                      Get Started
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Radio Section */}
        <section id="radio-opportunity" className="relative bg-black overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[850px] px-0 md:px-8">

            {/* Image Column */}
            <div className="relative h-[380px] md:h-[560px] lg:h-auto overflow-hidden order-2 lg:order-2">


              <img
                src={radiopresenter}
                alt="Radio presenter"
                className="absolute inset-0 md:h-[919px] md:w-[765px] w-full h-full object-cover object-center"
              />
            </div>

            {/* Text Column — comes AFTER image on mobile (order-2), BEFORE image on desktop (order-1) */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-24 relative order-1 lg:order-1">
              {/* Badge Pill — desktop only */}
              <div className="h-[90px] md:h-[130px] w-[120px] md:w-[200px] flex justify-center items-center text-2xl md:text-[40px] font-medium rounded-b-full bg-[#A67102] absolute top-0 left-0 md:left-11 z-20 ">
                Radio
              </div>

              <div className="mt-6 lg:mt-20">
                <img src={mic} alt="Golden microphone" className="mb-6 md:mb-8 w-12 md:w-auto mt-10 md:mt-0" />
                <h2 className="hero-font text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6">
                  What we need
                </h2>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/75 mb-8 md:mb-10 max-w-xl">
                  As a radio partner, you'll get early access to new music,
                  feature trending songs, and build direct connections with
                  artists seeking airplay and promotion.
                </p>
                <Link to="/login">
                  <button className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-[#FFAD00] to-[#BD8000] px-6 md:px-8 lg:px-10 py-3.5 md:py-4 lg:py-5 text-sm md:text-base font-semibold text-white transition hover:opacity-90 shadow-xl">
                    <Headphones className="w-5 h-5 md:w-6 md:h-6" />
                    Get Started
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* TV Section */}
        <section id="tv-opportunity" className="relative bg-black overflow-hidden border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[850px] px-0 md:px-30">
            {/* Image Column — first on mobile/md (DOM order), left on lg+ */}
            <div className="relative h-[380px] md:h-[560px] lg:h-auto overflow-hidden order-2 lg:order-2">


              <img
                src={tvpresenter}
                alt="Radio presenter"
                className="absolute inset-0 md:h-[919px] md:w-[865px] w-full h-full  object-cover"
              />
            </div>



            {/* Text Column — second on mobile/md, right on lg+ */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-24 relative order-1 lg:order-2">
              {/* Badge Pill — desktop only */}
              <div className="h-[90px] md:h-[130px] w-[120px] md:w-[200px] flex justify-center items-center text-2xl md:text-[40px] font-medium rounded-b-full bg-[#A67102] absolute top-0 left-0 md:left-[79%]  z-20 ">
                Tv
              </div>


              <div className="mt-6 lg:mt-10">
                <img src={mic} alt="Golden microphone" className="mb-6 md:mb-8 w-12 md:w-auto mt-10 md:mt-0" />
                <h2 className="hero-font text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6">
                  What we need
                </h2>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/75 mb-8 md:mb-10 max-w-xl">
                  As a TV partner, you'll get early access to new music and visuals,
                  feature exclusive artist content, and collaborate on
                  promotions that showcase rising talents.
                </p>
                <Link to="/login">
                  <button className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-[#FFAD00] to-[#BD8000] px-6 md:px-8 lg:px-10 py-3.5 md:py-4 lg:py-5 text-sm md:text-base font-semibold text-white transition hover:opacity-90 shadow-xl">
                    <Headphones className="w-5 h-5 md:w-6 md:h-6" />
                    Get Started for Free
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Influencer Section */}
        <section id="influencer-opportunity" className="relative border-t border-white/5 bg-black overflow-hidden relative order-1 lg:order-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[850px] px-0 md:px-10">
            {/* Image Column — first on mobile/md, second on lg+ */}
            <div className="relative h-[380px] md:h-[560px] lg:h-auto overflow-hidden order-2 lg:order-2">


              <img
                src={influencer}
                alt="Radio presenter"
                className="absolute inset-0 md:h-[919px] md:w-[765px] w-full h-full  object-cover"
              />
            </div>

            {/* Text Column — second on mobile/md, first on lg+ */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-24 relative order-1 lg:order-1">
              {/* Badge Pill — desktop only */}
              <div className="h-[90px] md:h-[130px] w-[120px] md:w-[200px] flex justify-center items-center text-2xl md:text-[30px] font-medium rounded-b-full bg-[#A67102] absolute top-0 left-0 md:left-20 z-20 ">
                Influencer
              </div>

              <div className="mt-6 lg:mt-20">
                <img src={mic} alt="Golden microphone" className="mb-6 md:mb-8 w-12 md:w-auto mt-10 md:mt-0" />
                <h2 className="hero-font text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6">
                  What we need
                </h2>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/75 mb-8 md:mb-10 max-w-xl">
                  Audora is where music meets influence.
                  Get early access to trending songs, partner with artists for content,
                  and help amplify their sound across your platforms.
                </p>
                <Link to="/login">
                  <button className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-[#FFAD00] to-[#BD8000] px-6 md:px-8 lg:px-10 py-3.5 md:py-4 lg:py-5 text-sm md:text-base font-semibold text-white transition hover:opacity-90 shadow-xl">
                    <Headphones className="w-5 h-5 md:w-6 md:h-6" />
                    Get Started for Free
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
