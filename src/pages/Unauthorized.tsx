import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldOff, ArrowLeft, LogIn } from "lucide-react";
import logo from "../assets/audora-logo.svg";
import diskwave from "../assets/auth/diskwave.svg";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Unauthorized() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      {/* Decorative diskwave background */}
      <img
        src={diskwave}
        alt="Decorative vinyl waveform"
        className="pointer-events-none absolute inset-0 m-auto h-auto max-w-4xl opacity-80"
        style={{ width: "90vw" }}
      />

      <motion.div
        className="relative z-10 w-full max-w-lg px-6"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Logo */}
        <motion.div variants={fadeInUp} className="flex justify-center">
          <Link to="/">
            <img src={logo} alt="Audora" className="h-14 w-auto" />
          </Link>
        </motion.div>

        {/* Icon */}
        <motion.div
          variants={fadeInUp}
          className="mt-10 flex justify-center"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#f5b640]/30 bg-gradient-to-br from-[#f5b640]/20 via-[#f5b640]/5 to-transparent shadow-[0_0_60px_rgba(245,182,64,0.15)]">
            <ShieldOff className="h-12 w-12 text-[#f5b640]" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div variants={fadeInUp} className="mt-8 text-center">
          <h1 className="hero-font text-5xl font-bold text-[#f5b640]">403</h1>
          <h2 className="hero-font mt-3 text-2xl font-semibold text-white">
            Access Denied
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          className="mt-4 text-center text-sm leading-relaxed text-white/70 sm:text-base"
        >
          You don't have permission to access this page. If you believe this is
          an error, please contact support or try logging in with an authorized
          account.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:border-[#f5b640]/60 hover:bg-white/10 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            to="/login"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FFAD00] to-[#BD8000] px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:from-[#ffca52] hover:to-[#FFAD00] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5b640]/40 sm:w-auto"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Link>
        </motion.div>

        {/* Support link */}
        <motion.p
          variants={fadeInUp}
          className="mt-8 text-center text-xs text-white/40"
        >
          Need help?{" "}
          <Link
            to="/work-with-us"
            className="text-[#f5b640]/70 underline underline-offset-2 transition hover:text-[#f5b640]"
          >
            Contact Support
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

