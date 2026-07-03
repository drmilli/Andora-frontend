import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import cardOneGlow from ".././assets/landing-page/first-card/card-1-above-light.png";
import cardOneBulb from ".././assets/landing-page/first-card/light-bulb.png";
import cardOneStack from ".././assets/landing-page/first-card/stack.png";
import cardOneWave from ".././assets/landing-page/first-card/wave-right.svg";
import cardTwoGlow from ".././assets/landing-page/second-card/above-light.png";
import cardTwoWave from ".././assets/landing-page/second-card/bottom-wave.svg";
import cardTwoGlobe from ".././assets/landing-page/second-card/globe.png";
import cardThreeGlow from ".././assets/landing-page/third-card/above-light.svg";
import cardThreeStack from ".././assets/landing-page/third-card/triple-stack.png";
import cardFourCorner from ".././assets/landing-page/forth-card/top-left-coner-light.png";
import cardFourBeacon from ".././assets/landing-page/forth-card/light-becon.png";
import cardFourChart from ".././assets/landing-page/forth-card/chart.png";
import cardFiveCorner from ".././assets/landing-page/firth-card/top-left-conner-light.png";
import cardFiveGlow from ".././assets/landing-page/firth-card/lighten-joining.svg";
import blurFlameLeft from ".././assets/landing-page/blur-flame.png";
import blurFlameRight from ".././assets/landing-page/blur-flame2.png";
import mic from ".././assets/landing-page/mic.png";
import singer from ".././assets/landing-page/image1.png";

import {
  ChevronRight,
  Headphones,
} from "lucide-react";
import { SEO } from ".././components/SEO";
import { useInstallPrompt } from ".././hooks/useInstallPrompt";
import { InstallBanner } from ".././components/InstallBanner";

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
          "All payments made on Audora are non-refundable. Once a payment has been completed and a track or album has been submitted for distribution, the service is considered rendered and processing begins immediately.",
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

function Home() {
  const { isInstallable, promptInstall, isIOS } = useInstallPrompt();
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

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -8,
      transition: { duration: 0.3 },
      boxShadow: "0 25px 50px -12px rgba(245, 182, 64, 0.25)"
    }
  };

  return (
    <div className="bg-[#050505] text-white p-0 md:p-4">
      <SEO
        title="Audora - Your Sound, the World's Stage"
        description="Audora connects musicians with influencers and media outlets to amplify their reach. Promote your music effectively today."
      />
      <InstallBanner show={isInstallable} onInstall={promptInstall} isIOS={isIOS} />
      <div className="relative overflow-hidden rounded-b-[2rem] bg-gradient-to-b from-black md:h-auto h-[100vh] via-[#1a1207] to-[#b27618]">
         
        {/* <img
          src={linesGraphic}
          alt="Decorative waveform"
          className="hidden md:block animate-wave pointer-events-none select-none absolute inset-x-0 bottom-[-6rem] mx-auto w-[115%] max-w-none opacity-90"
        /> */}

       
        <motion.section
          id="home"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="hero-font relative z-10 flex min-h-screen flex-col items-center justify-start px-6 pt-24 pb-24 sm:pt-28"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
          >
            <span className="mr-2">🚀</span>
            Distribute Your First Track
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="mt-10 max-w-4xl text-center text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            With <span className="text-[#f5b640]">Audora</span>, take your music
            from your device to the world
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-center text-base text-white/80 sm:text-lg"
          >
            Upload your songs and videos once, and we'll deliver them to top
            streaming platforms, radio stations, TV channels, and influencers.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Link to="/login">
              <button className="mt-10  text-white inline-flex items-center rounded-lg bg-gradient-to-r from-[#FFAD00] to-[#BD8000] px-10 py-5 text-base font-semibold text-black transition duration-200 hover:bg-[#ffca52] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40">
                <Headphones className="w-6 h-6 mr-2" /> Get Started for Free
              </button>
            </Link>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-sm text-center font-medium uppercase tracking-[0.3em] text-white/60"
          >
            All at the beat of your palm.
          </motion.p>

          <div className="animate-fade-in-up delay-400 mt-16 w-full max-w-5xl">
            {/* <div className="relative rounded-[2.5rem] border border-white/10 bg-black/80 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.6)] backdrop-blur">
              <div className="rounded-[2rem] bg-gradient-to-br from-black via-[#120b05] to-[#281b0c] p-6">
                <img
                  src={previewScreen}
                  alt="Audora dashboard preview"
                  className="w-full"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-white/5" />
            </div> */}
          </div>
        </motion.section>
      </div>
      <section id="about-us" className="relative overflow-hidden py-0 md:py-28">
        <motion.img
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 0.6, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          src={blurFlameRight}
          alt="Decorative blur"
          className="pointer-events-none absolute -left-24 top-10 w-80 opacity-60 blur-lg"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="hero-font md:col-span-5"
            >
              <img src={mic} alt="Golden microphone " className="w-50" />
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="md:col-span-7 flex items-start justify-end gap-6"
            >
              <img
                src={singer}
                alt="Singer recording"
                className="h-[617px] w-[701px]  object-cover shadow-[0_25px_80px_rgba(10,0,0,0.6)]"
              />
            </motion.div>
          </div>
        </div>
      </section>
      <section id="offer" className="relative overflow-hidden py-10 md:py-24">
        <motion.img
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 0.7, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          src={blurFlameLeft}
          alt="Decorative blur"
          className="pointer-events-none absolute -left-32 top-[15%] w-72 opacity-70 blur-sm"
        />
        <motion.img
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 0.7, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          src={blurFlameRight}
          alt="Decorative blur"
          className="pointer-events-none absolute -right-24 bottom-0 w-72 opacity-70 blur-sm"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hero-font text-center"
          >
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Why Clients Stick With Us
            </h2>
            <p className="mt-4 text-base text-white/70 sm:text-lg">
              At Audora, we make it easier for artists to be heard, seen, and
              celebrated. Whether you&apos;re just starting out or already
              building your audience, we provide the tools, network, and support
              to take your music further.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12 "
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative overflow-hidden rounded-[28px] border border-white/5 bg-gradient-to-br from-[#1f120a] via-[#0d0805] to-[#1a0d07]  p-6 shadow-[0_30px_80px_rgba(8,0,0,0.55)] md:col-span-4"
            >
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
                className="pointer-events-none absolute right-40 bottom-20 w-14"
              />
              <img
                src={cardOneStack}
                alt=""
                className="pointer-events-none absolute left-1/2 bottom-6 w-50 -translate-x-1/2"
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
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative overflow-hidden rounded-[28px] border border-white/5 bg-gradient-to-br from-[#2d170b] via-[#120905] to-[#1b0d07]  p-6 shadow-[0_30px_80px_rgba(8,0,0,0.55)] md:col-span-4"
            >
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
                className="pointer-events-none absolute  right-35 bottom-0 w-24"
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
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative overflow-hidden rounded-[28px] border border-white/5 bg-gradient-to-br from-[#20170e] via-[#0e0a07] to-[#1a120b]  p-6 shadow-[0_30px_80px_rgba(8,0,0,0.55)] md:col-span-4"
            >
              <img
                src={cardThreeGlow}
                alt=""
                className="pointer-events-none absolute -top-16 left-1/2 w-[130%] -translate-x-1/2 opacity-80"
              />
              <img
                src={cardThreeStack}
                alt=""
                className="pointer-events-none absolute left-1/2 bottom-8 w-50 -translate-x-1/2"
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
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative overflow-hidden rounded-[28px] border border-white/5 bg-gradient-to-br from-[#221307] via-[#120805] to-[#0c0805] px-7 py-8 shadow-[0_30px_80px_rgba(8,0,0,0.55)] md:col-span-7"
            >
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
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative overflow-hidden rounded-[28px] border border-white/5 bg-gradient-to-br from-[#2c1808] via-[#120904] to-[#120804] px-7 py-8 shadow-[0_30px_80px_rgba(8,0,0,0.55)] md:col-span-5"
            >
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
            </motion.div>
          </motion.div>

          <div className="mt-16 flex flex-col items-center gap-6 text-center md:flex-row md:justify-between">
            <p className="max-w-3xl text-sm text-white/70 sm:text-base md:text-left">
              Are you an artist? Click the Join Us button to on-board on Audora
              to make your music career experience smoother than ever.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center rounded-lg bg-[#FFAD00] px-8 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-[#ffca52] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5b640]/40"
            >
              Join Us
            </motion.button>
          </div>
        </div>
      </section>

      <section id="faq" className="relative overflow-hidden py-10 md:py-24">
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
                    className={`group flex w-full items-center justify-between rounded-3xl border px-5 py-4 text-sm font-medium transition-all duration-200 ${isActive
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
                    className={`overflow-hidden rounded-3xl border transition-all duration-300 ${isOpen
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
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-white/10 px-6 pb-6 text-sm text-white/70"
                        >
                          <div className="pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
    </div>
  );
}

export default Home;