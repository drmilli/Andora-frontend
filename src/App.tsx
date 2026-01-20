import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import linesGraphic from "./assets/landing-page/audora-lines.png";
import previewScreen from "./assets/landing-page/audorascreen.svg";
import logo from "./assets/audora-logo.svg";
import cardOneGlow from "./assets/landing-page/first-card/card-1-above-light.png";
import cardOneBulb from "./assets/landing-page/first-card/light-bulb.png";
import cardOneStack from "./assets/landing-page/first-card/stack.png";
import cardOneWave from "./assets/landing-page/first-card/wave-right.svg";
import cardTwoGlow from "./assets/landing-page/second-card/above-light.png";
import cardTwoWave from "./assets/landing-page/second-card/bottom-wave.svg";
import cardTwoGlobe from "./assets/landing-page/second-card/globe.png";
import cardThreeGlow from "./assets/landing-page/third-card/above-light.svg";
import cardThreeStack from "./assets/landing-page/third-card/triple-stack.png";
import cardFourCorner from "./assets/landing-page/forth-card/top-left-coner-light.png";
import cardFourBeacon from "./assets/landing-page/forth-card/light-becon.png";
import cardFourChart from "./assets/landing-page/forth-card/chart.png";
import cardFiveCorner from "./assets/landing-page/firth-card/top-left-conner-light.png";
import cardFiveGlow from "./assets/landing-page/firth-card/lighten-joining.svg";
import blurFlameLeft from "./assets/landing-page/blur-flame.png";
import blurFlameRight from "./assets/landing-page/blur-flame2.png";
import mic from "./assets/landing-page/about-us/microphone.png";
import signer from "./assets/landing-page/about-us/signer.png";
import googleplay from "./assets/landing-page/footer/google-play.svg";
import appstore from "./assets/landing-page/footer/app-store.svg";
import {
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqCategory = {
  id: string;
  label: string;
  faqs: FaqItem[];
};

const faqCategories: FaqCategory[] = [
  {
    id: "general",
    label: "General Questions",
    faqs: [
      {
        question: "How do I change my account email?",
        answer:
          "Head to your profile settings, update the email field, and confirm the change through the verification link we will send to your new inbox.",
      },
      {
        question: "Is there a discount for yearly plans?",
        answer:
          "Yes! Switching to an annual subscription instantly saves you 20% compared to paying monthly. You can upgrade inside the billing preferences tab.",
      },
      {
        question: "What is your refund policy?",
        answer:
          "Our refund policy is no refund after payment. So please don't come and ask for refund because we are not giving you anything. Shishi you are not getting you scammer, after we have promoted your song.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We support major debit and credit cards, PayPal, Apple Pay, and bank transfers for enterprise accounts.",
      },
    ],
  },
  {
    id: "artists",
    label: "Artists",
    faqs: [
      {
        question: "Can I upload unreleased tracks?",
        answer:
          "Absolutely. Store drafts privately, share them securely with collaborators, and publish them when you are ready.",
      },
      {
        question: "Do you help with cover art distribution?",
        answer:
          "Yes, every release includes high-resolution artwork delivery to every platform alongside your audio files.",
      },
    ],
  },
  {
    id: "influencers",
    label: "Influencers",
    faqs: [
      {
        question: "How do I join the influencer roster?",
        answer:
          "Submit your media kit within the influencer portal. Our partnerships team will review and approve qualified creators within 48 hours.",
      },
      {
        question: "Can I track campaign performance?",
        answer:
          "Yes, every campaign includes real-time dashboards with reach, engagement, and payout status.",
      },
    ],
  },
  {
    id: "radios",
    label: "Radios",
    faqs: [
      {
        question: "Do you deliver broadcast-ready files?",
        answer:
          "We automatically convert your uploads into the correct format and loudness for radio syndication.",
      },
      {
        question: "Can stations schedule releases ahead of time?",
        answer:
          "Yes, programming teams can schedule and queue releases by release date, including territory restrictions if needed.",
      },
    ],
  },
  {
    id: "tvs",
    label: "TVs",
    faqs: [
      {
        question: "How are cue sheets handled?",
        answer:
          "Audora generates cue sheets automatically and submits them to performing rights organizations on your behalf.",
      },
      {
        question: "Do you support closed captioning?",
        answer:
          "Closed captions can be uploaded or auto-generated, and we deliver them to any partner that requires accessibility files.",
      },
    ],
  },
];

function App() {
  const [activeCategoryId, setActiveCategoryId] = useState(faqCategories[0].id);
  const [openQuestion, setOpenQuestion] = useState(
    faqCategories[0].faqs[2].question
  );

  const activeCategory =
    faqCategories.find((category) => category.id === activeCategoryId) ??
    faqCategories[0];

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategoryId) {
      return;
    }

    const selectedCategory = faqCategories.find(
      (category) => category.id === categoryId
    );
    setActiveCategoryId(categoryId);
    setOpenQuestion(selectedCategory?.faqs[0]?.question ?? "");
  };

  const handleQuestionToggle = (question: string) => {
    setOpenQuestion((current) => (current === question ? "" : question));
  };

  const socialPlatforms: Array<{ name: string; Icon: LucideIcon }> = [
    { name: "Facebook", Icon: Facebook },
    { name: "Twitter", Icon: Twitter },
    { name: "Instagram", Icon: Instagram },
    { name: "LinkedIn", Icon: Linkedin },
    { name: "YouTube", Icon: Youtube },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#050505] text-white">
      <div className="relative min-h-screen overflow-hidden rounded-b-[4rem] bg-gradient-to-b from-black via-[#1a1207] to-[#b27618]">
        <img
          src={linesGraphic}
          alt="Decorative waveform"
          className="pointer-events-none select-none absolute inset-x-0 bottom-[-6rem] mx-auto w-[115%] max-w-none opacity-90"
        />

        <header className="absolute inset-x-0 top-6 z-30">
          <nav className="mx-auto max-w-7xl px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Audora" className="h-8 w-auto" />
            </div>

            <ul className="hidden md:flex items-center gap-8 text-white/80 text-sm">
              <li className="hover:text-white">
                <a href="#home">Home</a>
              </li>
              <li className="hover:text-white">
                <a href="#offer">What we offer</a>
              </li>
              <li className="hover:text-white">
                <a href="#faq">FAQ</a>
              </li>
              <li className="hover:text-white">
                <a href="#about-us">About</a>
              </li>
              <li className="hover:text-white">
                <a href="#contact">Contact</a>
              </li>
              <li className="hover:text-white">
                <a href="/work-with-us">Work With Us</a>
              </li>
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
        <section
          id="home"
          className="hero-font relative z-10 flex min-h-screen flex-col items-center justify-start px-6 pt-24 pb-24 sm:pt-28"
        >
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
            <span className="mr-2">🚀</span>
            Distribute Your First Track
          </span>

          <h1 className="mt-10 max-w-4xl text-center text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            With <span className="text-[#f5b640]">Audora</span>, take your music
            from your device to the world
          </h1>

          <p className="mt-6 max-w-2xl text-center text-base text-white/80 sm:text-lg">
            Upload your songs and videos once, and we'll deliver them to top
            streaming platforms, radio stations, TV channels, and influencers.
          </p>

          <Link to="/login">
            <button className="mt-10 inline-flex items-center rounded-full bg-[#f5b640] px-8 py-3 text-base font-semibold text-black transition duration-200 hover:bg-[#ffca52] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40">
              Get Started for Free
            </button>
          </Link>

          <p className="mt-6 text-sm font-medium uppercase tracking-[0.3em] text-white/60">
            All at the beat of your palm.
          </p>

          <div className="mt-16 w-full max-w-5xl">
            <div className="relative rounded-[2.5rem] border border-white/10 bg-black/80 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.6)] backdrop-blur">
              <div className="rounded-[2rem] bg-gradient-to-br from-black via-[#120b05] to-[#281b0c] p-6">
                <img
                  src={previewScreen}
                  alt="Audora dashboard preview"
                  className="w-full"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-white/5" />
            </div>
          </div>
        </section>
      </div>
      <section id="offer" className="relative overflow-hidden py-24">
        <img
          src={blurFlameLeft}
          alt="Decorative blur"
          className="pointer-events-none absolute -left-32 top-[15%] w-72 opacity-70 blur-sm"
        />
        <img
          src={blurFlameRight}
          alt="Decorative blur"
          className="pointer-events-none absolute -right-24 bottom-0 w-72 opacity-70 blur-sm"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="hero-font text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Why Clients Stick With Us
            </h2>
            <p className="mt-4 text-base text-white/70 sm:text-lg">
              At Audora, we make it easier for artists to be heard, seen, and
              celebrated. Whether you&apos;re just starting out or already
              building your audience, we provide the tools, network, and support
              to take your music further.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="relative overflow-hidden rounded-[28px] border border-white/5 bg-gradient-to-br from-[#1f120a] via-[#0d0805] to-[#1a0d07] px-7 py-8 shadow-[0_30px_80px_rgba(8,0,0,0.55)] md:col-span-4">
              <img
                src={cardOneGlow}
                alt=""
                className="pointer-events-none absolute -top-20 left-1/2 w-[140%] -translate-x-1/2 opacity-80"
              />
              <img
                src={cardOneWave}
                alt=""
                className="pointer-events-none absolute -right-6 bottom-0 w-36 opacity-70"
              />
              <img
                src={cardOneBulb}
                alt=""
                className="pointer-events-none absolute left-4 top-6 w-14"
              />
              <img
                src={cardOneStack}
                alt=""
                className="pointer-events-none absolute left-1/2 bottom-6 w-32 -translate-x-1/2"
              />
              <div className="relative z-10">
                <h3 className="hero-font text-2xl font-semibold">
                  Artist Dashboard
                </h3>
                <p className="mt-4 text-sm text-white/75 sm:text-base">
                  Manage your entire music journey in one place – track
                  performance, view insights, and stay updated on every release.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-white/5 bg-gradient-to-br from-[#2d170b] via-[#120905] to-[#1b0d07] px-7 py-8 shadow-[0_30px_80px_rgba(8,0,0,0.55)] md:col-span-4">
              <img
                src={cardTwoGlow}
                alt=""
                className="pointer-events-none absolute -top-24 left-1/2 w-[130%] -translate-x-1/2 opacity-80"
              />
              <img
                src={cardTwoWave}
                alt=""
                className="pointer-events-none absolute inset-x-0 bottom-0 w-full opacity-60"
              />
              <img
                src={cardTwoGlobe}
                alt=""
                className="pointer-events-none absolute right-8 bottom-10 w-24"
              />
              <div className="relative z-10">
                <h3 className="hero-font text-2xl font-semibold">
                  Global Music Distribution
                </h3>
                <p className="mt-4 text-sm text-white/75 sm:text-base">
                  Upload your songs and videos once – we&apos;ll deliver them to
                  top streaming platforms, radio stations, and TV channels
                  worldwide. No hassle, no middlemen. Just pure reach.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-white/5 bg-gradient-to-br from-[#20170e] via-[#0e0a07] to-[#1a120b] px-7 py-8 shadow-[0_30px_80px_rgba(8,0,0,0.55)] md:col-span-4">
              <img
                src={cardThreeGlow}
                alt=""
                className="pointer-events-none absolute -top-16 left-1/2 w-[130%] -translate-x-1/2 opacity-80"
              />
              <img
                src={cardThreeStack}
                alt=""
                className="pointer-events-none absolute left-1/2 bottom-8 w-32 -translate-x-1/2"
              />
              <div className="relative z-10">
                <h3 className="hero-font text-2xl font-semibold">
                  Promotion Tracking Dashboard
                </h3>
                <p className="mt-4 text-sm text-white/75 sm:text-base">
                  Monitor the progress of every job you assign to influencers,
                  radio, or TV — see real-time updates, performance reports, and
                  completed tasks all in one place.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-white/5 bg-gradient-to-br from-[#221307] via-[#120805] to-[#0c0805] px-7 py-8 shadow-[0_30px_80px_rgba(8,0,0,0.55)] md:col-span-7">
              <img
                src={cardFourCorner}
                alt=""
                className="pointer-events-none absolute -top-16 left-0 w-64 opacity-70"
              />
              <img
                src={cardFourBeacon}
                alt=""
                className="pointer-events-none absolute right-10 top-12 w-20"
              />
              <img
                src={cardFourChart}
                alt=""
                className="pointer-events-none absolute left-8 bottom-10 w-32"
              />
              <div className="relative z-10">
                <h3 className="hero-font text-2xl font-semibold">
                  Media Management
                </h3>
                <p className="mt-4 text-sm text-white/75 sm:text-base">
                  Organize and upload your singles, albums, and videos easily.
                  Keep your content ready for release or distribution — all from
                  your dashboard.
                </p>
                <div className="mt-8 inline-flex items-center gap-4 rounded-full bg-white/5 px-5 py-3 text-left">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#f5b640]">
                      Total Media
                    </p>
                    <p className="hero-font text-2xl font-semibold text-white">
                      5,240
                    </p>
                  </div>
                  <span className="text-xs text-white/60">uploaded media</span>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-white/5 bg-gradient-to-br from-[#2c1808] via-[#120904] to-[#120804] px-7 py-8 shadow-[0_30px_80px_rgba(8,0,0,0.55)] md:col-span-5">
              <img
                src={cardFiveCorner}
                alt=""
                className="pointer-events-none absolute -top-12 left-0 w-64 opacity-70"
              />
              <img
                src={cardFiveGlow}
                alt=""
                className="pointer-events-none absolute right-0 bottom-0 w-[120%] opacity-70"
              />
              <div className="relative z-10">
                <h3 className="hero-font text-2xl font-semibold">
                  Influencer, Radio &amp; TV Promotions
                </h3>
                <p className="mt-4 text-sm text-white/75 sm:text-base">
                  Get your music promoted by trusted influencers, radio hosts,
                  and TV stations. With Audora, you can handpick promoters, set
                  your campaign goals, and reach the audience that truly
                  connects with your sound.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center gap-6 text-center md:flex-row md:justify-between">
            <p className="max-w-3xl text-sm text-white/70 sm:text-base md:text-left">
              Are you an artist? Click the Join Us button to on-board on Audora
              to make your music career experience smoother than ever.
            </p>
            <button className="inline-flex items-center rounded-full bg-[#f5b640] px-8 py-3 text-sm font-semibold text-black transition duration-200 hover:bg-[#ffca52] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5b640]/40">
              Join Us
            </button>
          </div>
        </div>
      </section>

      <section id="faq" className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/0 opacity-[0.15]" />
        <img
          src={blurFlameLeft}
          alt="Decorative blur"
          className="pointer-events-none absolute -left-24 top-1/4 w-80 opacity-70 blur-md"
        />
        <img
          src={blurFlameRight}
          alt="Decorative blur"
          className="pointer-events-none absolute -right-16 bottom-10 w-80 opacity-60 blur-lg"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="hero-font text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">FAQ</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.35em] text-white/50">
              You Ask. We&apos;ve Got You
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-[280px_minmax(0,1fr)]">
            <div className="space-y-3">
              {faqCategories.map((category) => {
                const isActive = category.id === activeCategoryId;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleCategoryChange(category.id)}
                    className={`group flex w-full items-center justify-between rounded-3xl border px-5 py-4 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "border-white/10 bg-gradient-to-r from-[#f5b640] via-[#f0a11c] to-[#d4861a] text-black shadow-[0_18px_40px_rgba(212,134,26,0.35)]"
                        : "border-white/10 bg-white/5 text-white/75 hover:border-[#f5b640]/60 hover:text-white"
                    }`}
                  >
                    <span className="hero-font text-base">
                      {category.label}
                    </span>
                    <ChevronRight />
                  </button>
                );
              })}
            </div>

            <div className="space-y-4">
              {activeCategory.faqs.map((faq) => {
                const isOpen = openQuestion === faq.question;

                return (
                  <div
                    key={faq.question}
                    className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
                      isOpen
                        ? "border-[#f5b640]/60 bg-white/10 shadow-[0_25px_65px_rgba(9,0,0,0.45)]"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleQuestionToggle(faq.question)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left"
                    >
                      <span className="hero-font text-lg font-medium text-white/90">
                        {faq.question}
                      </span>
                      <span className="text-2xl font-bold text-[#f5b640]">
                        {isOpen ? "-" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-white/10 px-6 pb-6 text-sm text-white/70">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div
            id="contact-cta"
            className="mt-16 flex flex-col justify-between gap-6 rounded-[32px] border border-white/10 bg-white/5 px-8 py-10 text-center md:flex-row md:text-left"
          >
            <div>
              <h3 className="hero-font text-xl font-semibold text-white">
                Still have questions?
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Please write to our friendly support team.
              </p>
            </div>
            <button className="self-center rounded-full bg-gradient-to-r from-[#f6c15b] via-[#f0a71e] to-[#d78919] px-8 py-3 text-sm font-semibold text-black shadow-[0_18px_30px_rgba(214,137,25,0.35)] transition-transform duration-200 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f6c15b]/50">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <section id="about-us" className="relative overflow-hidden py-28">
        <img
          src={blurFlameLeft}
          alt="Decorative blur"
          className="pointer-events-none absolute -left-24 top-10 w-80 opacity-60 blur-lg"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
            <div className="hero-font md:col-span-5">
              <img src={mic} alt="Golden microphone" className="mb-8 w-16" />
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                About Us
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/75 sm:text-lg">
                Audora is a platform built to empower musicians and creators by
                connecting them with the right audience, influencers, and media
                outlets. We believe great music deserves to be heard and our
                mission is to make music promotion simple, transparent, and
                effective.
              </p>
              <p className="mt-8 text-2xl font-semibold text-[#f5b640] sm:text-3xl">
                Audora - Your Sound, the World&apos;s Stage.
              </p>
            </div>

            <div className="md:col-span-7 flex items-start justify-end gap-6">
              <img
                src={signer}
                alt="Singer recording"
                className="h-[360px] w-[240px] rounded-[2.5rem] object-cover shadow-[0_25px_80px_rgba(10,0,0,0.6)]"
              />
              <div className="flex flex-col justify-end">
                <div className="h-[220px] w-[280px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1a0d07] via-[#120805] to-[#050302] shadow-[0_20px_60px_rgba(10,0,0,0.55)]">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_center,_rgba(245,182,64,0.18),_transparent_65%)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden py-28">
        <img
          src={blurFlameLeft}
          alt="Decorative blur"
          className="pointer-events-none absolute -left-24 top-10 w-96 opacity-70 blur-2xl"
        />
        <img
          src={blurFlameRight}
          alt="Decorative blur"
          className="pointer-events-none absolute -right-20 bottom-10 w-[26rem] opacity-60 blur-2xl"
        />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="hero-font text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Contact Us
            </h2>
            <p className="mt-4 text-base text-white/70 sm:text-lg">
              We&apos;d love to hear from you! Whether you&apos;re an artist,
              influencer, radio or TV partner, or just someone curious about
              what we do — we&apos;re always open to questions, feedback, and
              collaboration ideas.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12">
            <div className="flex items-center gap-3 text-left">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5b640] text-black">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 5.75A2.75 2.75 0 0 1 4.75 3h14.5A2.75 2.75 0 0 1 22 5.75v12.5A2.75 2.75 0 0 1 19.25 21H4.75A2.75 2.75 0 0 1 2 18.25V5.75Zm2.75-.25a.25.25 0 0 0-.25.25v.44l9.26 5.23a.75.75 0 0 0 .72 0L21.5 6.19v-.44a.25.25 0 0 0-.25-.25H4.75Zm14.5 14.5A.25.25 0 0 0 19.5 20H4.75a.25.25 0 0 0-.25.25V8.3l7.76 4.38a2.25 2.25 0 0 0 2.18 0l7.81-4.41v11.98Z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-white/80">Email</p>
                <p className="text-sm text-[#f5b640]">audora@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-left">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0a71e]/90 text-black">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m15.01 2.99 1.88-.95a1.75 1.75 0 0 1 2.24.62l1.48 2.32a1.75 1.75 0 0 1-.11 2.05l-2.07 2.59c-.3.38-.75.6-1.23.6h-.31c-.57 0-1.12-.2-1.55-.58l-1.16-1.01a.75.75 0 0 0-1.08.08c-.62.76-1.37 1.6-2.24 2.47-.87.87-1.7 1.62-2.47 2.23a.75.75 0 0 0-.08 1.08l1.01 1.16c.37.42.58.97.58 1.54v.31c0 .48-.21.93-.6 1.23l-2.6 2.07a1.75 1.75 0 0 1-2.04.11L3 20.87a1.75 1.75 0 0 1-.62-2.24l.95-1.88c.28-.56.78-.98 1.37-1.18 1.97-.67 4.16-2.14 6.57-4.55 2.41-2.41 3.88-4.6 4.55-6.57.2-.6.62-1.1 1.18-1.37Z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-white/80">
                  Phone number
                </p>
                <p className="text-sm text-[#f5b640]">
                  +(234) 812 - 345 - 6789
                </p>
              </div>
            </div>
          </div>

          <form className="mt-12 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col text-sm text-white/70">
                Name
                <input
                  type="text"
                  placeholder="Enter first and last name"
                  className="mt-2 rounded-[9px] border border-white/10 bg-white/5 px-5 py-4 text-base text-white placeholder-white/40 focus:border-[#f5b640] focus:outline-none focus:ring-2 focus:ring-[#f5b640]/40"
                />
              </label>
              <label className="flex flex-col text-sm text-white/70">
                Email
                <input
                  type="email"
                  placeholder="Enter email"
                  className="mt-2 rounded-[9px] border border-white/10 bg-white/5 px-5 py-4 text-base text-white placeholder-white/40 focus:border-[#f5b640] focus:outline-none focus:ring-2 focus:ring-[#f5b640]/40"
                />
              </label>
            </div>

            <label className="flex flex-col text-sm text-white/70">
              Message
              <textarea
                rows={6}
                placeholder="Enter message"
                className="mt-2 rounded-[9px] border border-white/10 bg-white/5 px-5 py-4 text-base text-white placeholder-white/40 focus:border-[#f5b640] focus:outline-none focus:ring-2 focus:ring-[#f5b640]/40"
              />
            </label>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-[9px] bg-gradient-to-r from-[#f6c15b] via-[#f0a71e] to-[#d78919] px-10 py-3 text-sm font-semibold text-black shadow-[0_15px_40px_rgba(214,137,25,0.35)] transition-transform duration-200 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f6c15b]/50"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
      <footer className="bg-gradient-to-b from-black via-[#2d1608] to-[#b27618]">
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <div className="hero-font">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Want product news and updates?
            </h2>
            <p className="mt-3 text-base text-white/70">
              Sign up for our newsletter to stay up to date
            </p>
          </div>

          <form className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-full border border-white/15 bg-white/10 px-6 py-4 text-base text-white placeholder-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.35)] focus:border-[#f5b640] focus:outline-none focus:ring-2 focus:ring-[#f5b640]/40 sm:max-w-md"
            />
            <button
              type="submit"
              className="min-w-[150px] rounded-full bg-gradient-to-r from-[#f5b640] via-[#f0a71e] to-[#d78919] px-8 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(214,137,25,0.35)] transition-transform duration-200 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f6c15b]/50"
            >
              Notify Me
            </button>
          </form>

          <p className="mt-6 text-sm text-white/70">
            We care about the protection of your data. Read our{" "}
            <a
              href="#privacy"
              className="underline decoration-[#f5b640] decoration-2 underline-offset-4 hover:text-white"
            >
              Privacy Policy.
            </a>
          </p>

          <div className="mt-10 flex justify-center gap-4">
            {socialPlatforms.map(({ name, Icon }) => (
              <span
                key={name}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label={name}
              >
                <Icon className="h-5 w-5" />
              </span>
            ))}
          </div>

          <div className="mt-12 text-sm text-white/70">
            Click to download our app. Download Now!
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#f5b640] via-[#f0a71e] to-[#d78919] px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(214,137,25,0.45)] transition hover:translate-y-[-2px]">
              <img src={appstore} alt="apple store" className=" w-5 h-5" />
              Apple Store
            </button>
            <button className="flex items-center gap-3 rounded-full border border-white/10 bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(0,0,0,0.2)] transition hover:translate-y-[-2px]">
              <img src={googleplay} alt="google play" className=" w-5 h-5" />
              Play Store
            </button>
          </div>

          <div className="mt-16 border-t border-white/10"></div>
          <p className="mt-6 text-sm text-white/70">
            Copyright © {currentYear} Audora | All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
