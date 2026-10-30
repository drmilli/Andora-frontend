import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import logo from "../assets/audora-logo.svg";
import diskwave from "../assets/auth/diskwave.svg";
import {
  FileText,
  UserCheck,
  Music2,
  Sparkles,
  CreditCard,
  ShieldAlert,
  AlertCircle,
  Scale,
  MailCheck,
  Search,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ExternalLink,
  Info,
  ChevronLeft,

} from "lucide-react";

interface TermSection {
  id: string;
  number: string;
  title: string;
  tagline: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  plainEnglish: string;
  content: {
    heading: string;
    paragraphs: string[];
    subclauses?: { title: string; desc: string }[];
    bullets?: string[];
  }[];
}

const SECTIONS: TermSection[] = [
  {
    id: "acceptance",
    number: "01",
    title: "Acceptance & Eligibility",
    tagline: "Binding agreement and user requirements",
    badge: "Core Agreement",
    icon: FileText,
    plainEnglish:
      "By using Audora, you agree to these legal terms. You must be at least 18 years old (or have authorized parent/guardian consent) and legally permitted in your jurisdiction to enter into this contract.",
    content: [
      {
        heading: "1.1 The Legal Agreement",
        paragraphs: [
          "Welcome to Audora ('we', 'us', or 'our'). By creating an account, browsing our website, or utilizing any of our music distribution, marketing, or influencer campaign services (collectively, the 'Platform'), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions ('Terms').",
          "If you are accepting these Terms on behalf of an organization, company, or collective entity, you represent and warrant that you possess the full legal authority to bind said entity to these Terms.",
        ],
      },
      {
        heading: "1.2 Age and Capacity Requirements",
        paragraphs: [
          "The Platform is available exclusively to individuals who are at least 18 years of age, or the age of legal majority in their territory of residence. If you are between 13 and 17 years old, you may only use Audora under the direct supervision of a parent or legal guardian who agrees to be bound by these Terms on your behalf.",
        ],
        bullets: [
          "You must not have been previously suspended or permanently banned from Audora.",
          "You must not be prohibited from receiving services under international trade sanctions or local law.",
          "You agree to provide true, current, and verifiable information during onboarding.",
        ],
      },
      {
        heading: "1.3 Updates to These Terms",
        paragraphs: [
          "Audora periodically revises these Terms to reflect technical enhancements, regulatory developments, or new feature rollouts. When material modifications take place, we will notify registered users via email and highlight an updated timestamp at the top of this document.",
          "Continued engagement with the Platform after the effective date of revisions constitutes irrevocable acceptance of the modified Terms.",
        ],
      },
    ],
  },
  {
    id: "accounts",
    number: "02",
    title: "Accounts & Security",
    tagline: "Credentials, roles, and verification",
    badge: "Account Safety",
    icon: UserCheck,
    plainEnglish:
      "You are responsible for your account credentials. Keep your password confidential, provide accurate identity information, and notify us immediately if you suspect any unauthorized breach.",
    content: [
      {
        heading: "2.1 Registration and Accuracy",
        paragraphs: [
          "To access creator campaigns, influencer marketplace listings, or proprietary audio promotion tools, you must register a dedicated Audora account. You agree to submit accurate, complete, and un-expired personal or organizational information.",
          "Operating accounts with deceptive identities, impersonating artists or brand executives, or attempting to register automated dummy accounts will trigger immediate permanent suspension.",
        ],
      },
      {
        heading: "2.2 Account Security & Safeguards",
        paragraphs: [
          "You are solely responsible for maintaining the confidentiality of your login credentials and two-factor authentication tokens. You accept full liability for all actions taken under your account.",
        ],
        subclauses: [
          {
            title: "Immediate Breach Notice",
            desc: "You must notify Audora Support instantly at security@audora.io if you detect unauthorized entry or suspect credential compromise.",
          },
          {
            title: "Non-Transferability",
            desc: "Account ownership cannot be sold, rented, assigned, or transferred without prior written approval from Audora executives.",
          },
        ],
      },
      {
        heading: "2.3 Influencer & Artist Verification",
        paragraphs: [
          "Influencers, tastemakers, and record labels applying for verified status grant Audora permission to audit connected social media accounts, streaming analytics, and engagement metrics to ensure genuine audience authenticity.",
        ],
      },
    ],
  },
  {
    id: "intellectual-property",
    number: "03",
    title: "IP & Music Rights",
    tagline: "Copyright, audio ownership, and licenses",
    badge: "Music & Rights",
    icon: Music2,
    plainEnglish:
      "Artists and musicians retain 100% ownership of their music. By submitting tracks to Audora campaigns, you grant our verified creators and the platform a limited promotional license to play and showcase your music.",
    content: [
      {
        heading: "3.1 Ownership of User Music & Assets",
        paragraphs: [
          "Audora champions creator sovereignty: artists retain 100% of the underlying copyrights, master rights, publishing royalties, and intellectual property rights associated with their original audio files, artworks, and brand identifiers.",
          "Nothing in these Terms transfers, sells, or permanently assigns your intellectual property to Audora or any third-party creator.",
        ],
      },
      {
        heading: "3.2 Promotional License Grant",
        paragraphs: [
          "When you upload an audio file or launch a campaign on Audora, you grant us a non-exclusive, worldwide, royalty-free license to host, transcode, stream, and exhibit preview snippets strictly for platform operation and campaign execution.",
        ],
        subclauses: [
          {
            title: "Influencer Usage Rights",
            desc: "Creators who accept paid or organic review campaigns are granted a revocable, non-exclusive license to feature the audio within their campaign deliverables (e.g., TikTok videos, Instagram reels, YouTube shorts).",
          },
          {
            title: "Warranties of Originality",
            desc: "You warrant that your submitted tracks do not infringe any third-party sample licenses, mechanical rights, or performance royalties.",
          },
        ],
      },
      {
        heading: "3.3 DMCA & Copyright Infringement Notice",
        paragraphs: [
          "Audora respects intellectual property rights and acts promptly under the Digital Millennium Copyright Act (DMCA). If you believe your copyrighted sound recording or artwork has been posted without permission, contact copyright@audora.io with substantiated documentation.",
        ],
      },
    ],
  },
  {
    id: "creator-campaigns",
    number: "04",
    title: "Campaigns & Submissions",
    tagline: "Promotional guidelines and creator ethics",
    badge: "Marketplace Rules",
    icon: Sparkles,
    plainEnglish:
      "Campaigns must be genuine and transparent. Influencers must provide authentic editorial reviews and follow advertising disclosure standards (like #ad or #sponsored).",
    content: [
      {
        heading: "4.1 Artist Campaign Creation",
        paragraphs: [
          "Artists and record labels can commission curated influencer campaigns with designated budgets, genres, target demographics, and creative guidelines. All campaign briefs must comply with our community safety and decency standards.",
        ],
      },
      {
        heading: "4.2 Influencer Obligations & FTC Disclosures",
        paragraphs: [
          "Creators and influencers receiving compensation, gifted perks, or review rewards are legally mandated to declare promotional relationships in accordance with Federal Trade Commission (FTC) guidelines or relevant regional advertising authorities.",
        ],
        bullets: [
          "Clearly include visible and audible disclosures such as #ad, #sponsored, or 'Promoted Track'.",
          "Deliver reviews, placements, or playlist additions within the specified deadline agreed in the campaign brief.",
          "Deliver authentic, human reactions rather than artificial, scripted, or AI-synthesized feedback.",
        ],
      },
      {
        heading: "4.3 Quality Assurance & Guarantees",
        paragraphs: [
          "Audora guarantees campaign placement delivery according to the agreed milestones. However, because creative reaction and organic virality cannot be artificially forced, we do not guarantee specific follower gains, chart entries, or viral metric thresholds.",
        ],
      },
    ],
  },
  {
    id: "payments",
    number: "05",
    title: "Billing, Fees & Payouts",
    tagline: "Escrow, payment terms, and transactions",
    badge: "Financial Terms",
    icon: CreditCard,
    plainEnglish:
      "Campaign funds are held safely in escrow until deliverables are verified. Influencers receive prompt payouts, and platform transaction fees are clearly shown before checkout.",
    content: [
      {
        heading: "5.1 Payment Processing & Escrow",
        paragraphs: [
          "All credit card, debit, and digital wallet transactions on Audora are facilitated through PCI-DSS Level 1 compliant financial partners. When an artist funds a campaign, the total amount is safely secured in an escrow balance until the creator completes and validates their agreed task.",
        ],
      },
      {
        heading: "5.2 Platform Service Commissions",
        paragraphs: [
          "Audora retains a nominal percentage commission on successful transactions to cover hosting infrastructure, escrow verification, and creator dispute protections. All relevant fees are transparently displayed before any payment is authorized.",
        ],
        subclauses: [
          {
            title: "Creator Payout Schedules",
            desc: "Approved balances become available for payout within 3 to 5 business days following client milestone signoff, payable via supported banking or digital transfer methods.",
          },
          {
            title: "Taxes & Reporting",
            desc: "Users are independently responsible for documenting, filing, and paying all applicable regional, federal, and state income taxes on their earnings.",
          },
        ],
      },
      {
        heading: "5.3 Refunds and Dispute Windows",
        paragraphs: [
          "If an assigned creator fails to submit campaign deliverables within the contractual window, the campaign funds are instantly refunded to the artist's Audora wallet balance or original payment method.",
        ],
      },
    ],
  },
  {
    id: "acceptable-use",
    number: "06",
    title: "Acceptable Use Policy",
    tagline: "Prohibited actions and platform integrity",
    badge: "Compliance",
    icon: ShieldAlert,
    plainEnglish:
      "No bots, no fake streams, no harassment, and no unauthorized scraping. We keep Audora fair, genuine, and safe for all musicians and creators.",
    content: [
      {
        heading: "6.1 Anti-Fraud & Streaming Integrity",
        paragraphs: [
          "Audora enforces a strict zero-tolerance policy against inorganic engagement and artificial stream inflation. Any user engaging in bot farms, click manipulation, or deceptive playback spoofing will be permanently banned.",
        ],
        bullets: [
          "Never deploy automated bots, scrapers, or unauthorized API scripts against Audora services.",
          "Never purchase synthetic play counts, fraudulent followers, or fake social interactions.",
          "Never engineer recursive campaign loops designed to extract unauthorized fee rebates.",
        ],
      },
      {
        heading: "6.2 Prohibited Content & Behavior",
        paragraphs: [
          "Users may not upload, transmit, or promote content that contains:",
        ],
        subclauses: [
          {
            title: "Hate Speech & Defamation",
            desc: "Content promoting violence, discrimination, harassment, or vilification based on race, gender, religion, or sexual orientation.",
          },
          {
            title: "Malicious Software",
            desc: "Any audio container, file attachment, or code containing malware, trojans, ransomware, or malicious URL trackers.",
          },
          {
            title: "Unauthorized Third-Party IP",
            desc: "Uncredited bootlegs, unauthorized leaks, or stolen copyright masters without proven synchronization or distribution clearances.",
          },
        ],
      },
    ],
  },
  {
    id: "disclaimers",
    number: "07",
    title: "Disclaimers & Warranties",
    tagline: "Platform availability and warranty limits",
    badge: "Legal Notice",
    icon: AlertCircle,
    plainEnglish:
      "Audora is provided 'as is'. While we maintain high uptime and rock-solid security, we cannot guarantee the platform will be 100% bug-free or immune to third-party outages.",
    content: [
      {
        heading: "7.1 'As-Is' & 'As-Available' Provision",
        paragraphs: [
          "To the maximum extent permissible under applicable legal codes, the Audora platform, its underlying software, algorithms, and related tools are provided on an 'AS IS' and 'AS AVAILABLE' basis without warranties of any variety, whether express or implied.",
          "We disclaim all statutory warranties, including but not limited to merchantability, fitness for a particular commercial purpose, title, and non-infringement.",
        ],
      },
      {
        heading: "7.2 Third-Party Services & Links",
        paragraphs: [
          "Audora connects with third-party social media platforms, music streaming networks, and payment processors. We do not control and assume no responsibility for the uptime, content policies, or privacy mechanisms of external third-party services.",
        ],
      },
    ],
  },
  {
    id: "liability",
    number: "08",
    title: "Limitation of Liability",
    tagline: "Damages exclusion and liability ceiling",
    badge: "Risk Allocation",
    icon: Scale,
    plainEnglish:
      "Our financial liability to you is limited to the fees you paid to Audora over the past 12 months. We are not liable for indirect, incidental, or consequential losses.",
    content: [
      {
        heading: "8.1 Exclusion of Consequential Damages",
        paragraphs: [
          "Under no circumstances shall Audora, its directors, officers, employees, or partners be liable for any indirect, incidental, special, punitive, or consequential damages whatsoever.",
          "This includes without limitation damages for loss of profits, loss of anticipated royalties, loss of brand goodwill, loss of digital audio data, or work stoppage, regardless of whether Audora was forewarned of the possibility of such damages.",
        ],
      },
      {
        heading: "8.2 Aggregate Liability Cap",
        paragraphs: [
          "Audora's total aggregate liability arising out of or related to your use of the platform shall not exceed the total fees actually paid by you to Audora during the twelve (12) month period immediately preceding the event giving rise to liability, or $100 USD (whichever is greater).",
        ],
      },
      {
        heading: "8.3 Indemnification by User",
        paragraphs: [
          "You agree to defend, indemnify, and hold harmless Audora and its affiliates from and against any claims, damages, liabilities, costs, and expenses (including reasonable legal fees) arising from your breach of these Terms or unauthorized use of third-party copyrighted assets.",
        ],
      },
    ],
  },
  {
    id: "termination",
    number: "09",
    title: "Termination & Contact",
    tagline: "Account closure, disputes, and legal support",
    badge: "Resolution & Help",
    icon: MailCheck,
    plainEnglish:
      "You can close your account at any time. If you have questions, dispute notices, or need legal clarification, our compliance team is available at legal@audora.io.",
    content: [
      {
        heading: "9.1 Voluntary Account Closure",
        paragraphs: [
          "You may discontinue use of Audora and request the permanent deletion of your profile at any time through your dashboard settings or by emailing support@audora.io. Any pending payouts will be processed to your linked account prior to final closure.",
        ],
      },
      {
        heading: "9.2 Suspension and Termination by Audora",
        paragraphs: [
          "We reserve the right to suspend or terminate your account immediately, without prior notice or liability, in the event of any material violation of these Terms, suspected fraud, non-compliance with FTC rules, or regulatory decree.",
        ],
      },
      {
        heading: "9.3 Governing Law & Dispute Resolution",
        paragraphs: [
          "These Terms are governed by and construed in accordance with the substantive laws of the applicable commercial jurisdiction, without regard to conflict of law principles. Any dispute or claim arising out of these Terms shall be resolved via binding individual arbitration.",
        ],
      },
      {
        heading: "9.4 Contacting Our Legal Department",
        paragraphs: [
          "If you have inquiries concerning these Terms, copyright DMCA inquiries, or contractual clarifications, please submit your inquiry to our dedicated legal team:",
        ],
        subclauses: [
          {
            title: "Legal & Compliance Inquiries",
            desc: "legal@audora.io (Attn: General Counsel, Audora Platform)",
          },
          {
            title: "Copyright & DMCA Agent",
            desc: "copyright@audora.io (Authorized DMCA Designated Agent)",
          },
          {
            title: "Privacy Data Inquiries",
            desc: "privacy@audora.io (Data Protection Officer)",
          },
        ],
      },
    ],
  },
];

export default function Terms() {
  const [activeTab, setActiveTab] = useState<string>("acceptance");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return SECTIONS;
    const q = searchQuery.toLowerCase();
    return SECTIONS.filter(
      (sec) =>
        sec.title.toLowerCase().includes(q) ||
        sec.tagline.toLowerCase().includes(q) ||
        sec.badge.toLowerCase().includes(q) ||
        sec.plainEnglish.toLowerCase().includes(q) ||
        sec.content.some((c) =>
          c.heading.toLowerCase().includes(q) ||
          c.paragraphs.some((p) => p.toLowerCase().includes(q))
        )
    );
  }, [searchQuery]);

  const currentIndex = SECTIONS.findIndex((s) => s.id === activeTab);
  const prevSection = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null;
  const nextSection = currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null;



  return (
    <div className="relative min-h-screen bg-[#070709] text-gray-200 font-sans selection:bg-[#A67102]/30 selection:text-white antialiased">
      <SEO
        title="Terms & Conditions - Audora"
        description="Review the terms, policies, intellectual property rights, and user agreements for the Audora platform."
      />

      {/* Ambient background glow & vinyl waveform accent */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#A67102]/15 via-amber-500/5 to-transparent blur-3xl opacity-70" />
        <div className="absolute top-[35%] -left-48 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 -right-48 w-96 h-96 bg-[#A67102]/10 rounded-full blur-[120px]" />
        <img
          src={diskwave}
          alt=""
          className="pointer-events-none absolute inset-0 m-auto h-auto max-w-5xl opacity-15 mix-blend-screen"
          style={{ width: "85vw" }}
        />
      </div>

      {/* Top Glass Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070709]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-[#A67102]/50 group-hover:bg-[#A67102]/10 transition-all">
                <ArrowLeft className="w-4 h-4 text-gray-300 group-hover:text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <span className="hidden sm:inline font-medium">Back to Home</span>
            </Link>
            <div className="h-5 w-px bg-white/10 hidden sm:block" />
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Audora" className="h-7 w-auto" />
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Badge
              variant="outline"
              className="border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs px-2.5 py-1 font-mono hidden md:inline-flex"
            >
              v2.4 • Effective Oct 2026
            </Badge>



            <Link to="/privacy-policy">
              <Button
                variant="outline"
                size="sm"
                className="border-amber-500/40 text-amber-300 bg-amber-500/5 hover:bg-amber-500/15 hover:text-amber-200 text-xs h-8 px-3 gap-1"
              >
                Privacy Policy
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Headline */}
      <section className="relative z-10 pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              Legal Documentation & Governance
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Terms & Conditions
            </h1>
            <p className="mt-3 text-base text-gray-400 max-w-2xl leading-relaxed">
              Transparent, modern, and creator-first legal terms. Understand your rights, music ownership, payment protections, and platform guidelines.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-gray-400">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="text-white font-medium">Last Revised: October 2026</p>
              <p className="text-gray-400">Estimated read time: ~7 minutes</p>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Tabs
          value={activeTab}
          onValueChange={(val) => {
            setActiveTab(val);
            // Smooth scroll content area into view on mobile
            if (window.innerWidth < 768) {
              const el = document.getElementById("terms-content-area");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          orientation="vertical"
          className="flex flex-col lg:flex-row gap-8 items-start"
        >
   
          <aside className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-24">
            <div className="bg-[#0f0f13]/90 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
            
              <div className="relative mb-4">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter terms & clauses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl pl-9 pr-8 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Sections ({filteredSections.length})
                </span>
                <span className="text-[11px] text-amber-400/80 font-mono">
                  Radix UI • Vertical
                </span>
              </div>

 
              <TabsList
                variant="line"
                className="w-full flex flex-col gap-1.5 bg-transparent p-0 h-auto items-stretch"
              >
                {filteredSections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeTab === sec.id;

                  return (
                    <TabsTrigger
                      key={sec.id}
                      value={sec.id}
                      className={`group relative w-full text-left justify-start px-3.5 py-3 rounded-xl transition-all duration-200 border cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-amber-500/15 to-transparent border-amber-500/40 text-white shadow-[0_0_20px_rgba(217,119,6,0.12)]"
                          : "bg-transparent border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
                      }`}
                    >
                   
                      <span
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-200 ${
                          isActive
                            ? "h-7 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                            : "h-0 bg-transparent"
                        }`}
                      />

                      <div className="flex items-center gap-3 w-full">
                        <div
                          className={`flex items-center justify-center w-9 h-9 rounded-lg border transition-colors shrink-0 ${
                            isActive
                              ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                              : "bg-white/[0.04] border-white/5 text-gray-400 group-hover:text-gray-300"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-semibold truncate group-hover:text-white">
                              {sec.title}
                            </span>
                            <span className="text-[10px] font-mono text-gray-400 shrink-0">
                              {sec.number}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 truncate mt-0.5 font-normal">
                            {sec.tagline}
                          </p>
                        </div>

                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform shrink-0 ${
                            isActive
                              ? "text-amber-400 translate-x-0.5"
                              : "text-gray-600 group-hover:text-gray-400"
                          }`}
                        />
                      </div>
                    </TabsTrigger>
                  );
                })}

                {filteredSections.length === 0 && (
                  <div className="py-8 text-center text-xs text-gray-500">
                    No section matched "{searchQuery}"
                  </div>
                )}
              </TabsList>

             
              <div className="mt-6 pt-5 border-t border-white/10 px-2">
                <div className="rounded-xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 p-3.5 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-white">
                      Need clarification?
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Have questions regarding licensing or artist partnerships? Our legal counsel is available.
                  </p>
                  <a
                    href="mailto:legal@audora.io"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors mt-1"
                  >
                    Contact Legal Team
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          <div
            id="terms-content-area"
            className="flex-1 w-full min-w-0"
          >
            {SECTIONS.map((sec) => {
              const Icon = sec.icon;

              return (
                <TabsContent
                  key={sec.id}
                  value={sec.id}
                  className="m-0 focus-visible:outline-none"
                >
                  <div className="bg-[#0f0f13]/90 border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
     
                    <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/10 via-transparent to-transparent rounded-tr-2xl pointer-events-none" />

                   
                    <div className="relative z-10 border-b border-white/10 pb-6 mb-8">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <Badge
                            variant="outline"
                            className="border-amber-500/30 bg-amber-500/10 text-amber-300 font-mono text-xs px-2.5 py-0.5"
                          >
                            Section {sec.number} of {SECTIONS.length.toString().padStart(2, "0")}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="bg-white/5 border border-white/10 text-gray-300 text-xs px-2.5 py-0.5"
                          >
                            {sec.badge}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-400 font-mono">
                          AUDORA-TOC-REV-{sec.number}
                        </span>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/30 text-amber-400 shrink-0 shadow-[0_0_20px_rgba(217,119,6,0.15)]">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            {sec.title}
                          </h2>
                          <p className="text-sm text-gray-400 mt-1">
                            {sec.tagline}
                          </p>
                        </div>
                      </div>
                    </div>


                    <div className="relative z-10 space-y-8 text-gray-300">
                      {sec.content.map((block, idx) => (
                        <section
                          key={idx}
                          className="border-b border-white/5 pb-7 last:border-b-0 last:pb-0"
                        >
                          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            {block.heading}
                          </h3>

                          <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
                            {block.paragraphs.map((p, pIdx) => (
                              <p key={pIdx}>{p}</p>
                            ))}
                          </div>

                          {block.bullets && (
                            <ul className="mt-4 space-y-2.5">
                              {block.bullets.map((b, bIdx) => (
                                <li
                                  key={bIdx}
                                  className="flex items-start gap-2.5 text-sm text-gray-300"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                    
                          {block.subclauses && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
                              {block.subclauses.map((sub, sIdx) => (
                                <div
                                  key={sIdx}
                                  className="rounded-xl bg-white/[0.03] border border-white/10 p-3.5 hover:border-amber-500/20 transition-colors"
                                >
                                  <h5 className="text-xs font-semibold text-amber-200 mb-1">
                                    {sub.title}
                                  </h5>
                                  <p className="text-xs text-gray-400 leading-relaxed">
                                    {sub.desc}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </section>
                      ))}
                    </div>

                    {/* Section Footer Navigation (Previous / Next) */}
                    <div className="relative z-10 mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                      {prevSection ? (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab(prevSection.id);
                            window.scrollTo({ top: 180, behavior: "smooth" });
                          }}
                          className="w-full sm:w-auto inline-flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all"
                        >
                          <ChevronLeft className="w-4 h-4 text-amber-400" />
                          <div className="text-left">
                            <span className="block text-[10px] text-gray-400 uppercase font-mono">
                              Previous
                            </span>
                            <span className="truncate max-w-[140px] block font-semibold text-white">
                              {prevSection.title}
                            </span>
                          </div>
                        </button>
                      ) : (
                        <div />
                      )}

                      <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
                        <span>Was this clear?</span>
                        <button
                          type="button"
                          className="hover:text-amber-400 transition-colors px-1 py-0.5 rounded"
                          onClick={(e) => {
                            const target = e.currentTarget;
                            target.innerText = "✓ Thanks!";
                            target.classList.add("text-amber-400");
                          }}
                        >
                          👍 Yes
                        </button>
                        <span>•</span>
                        <a
                          href="mailto:support@audora.io?subject=Terms%20Clarification"
                          className="hover:text-amber-400 transition-colors"
                        >
                          Need help
                        </a>
                      </div>

                      {nextSection ? (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab(nextSection.id);
                            window.scrollTo({ top: 180, behavior: "smooth" });
                          }}
                          className="w-full sm:w-auto inline-flex items-center justify-end gap-2 text-xs font-medium text-gray-400 hover:text-white px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/15 hover:border-amber-500/50 transition-all text-right"
                        >
                          <div className="text-right">
                            <span className="block text-[10px] text-amber-400 uppercase font-mono">
                              Next
                            </span>
                            <span className="truncate max-w-[140px] block font-semibold text-white">
                              {nextSection.title}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-amber-400" />
                        </button>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      </main>

      {/* Global Minimal Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#050507] py-8 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Audora" className="h-5 w-auto opacity-70" />
            <span>© {new Date().getFullYear()} Audora Technologies Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-5 text-gray-400">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">
              Terms of Service
            </Link>
            <span>•</span>
            <a href="mailto:legal@audora.io" className="hover:text-white transition-colors">
              legal@audora.io
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}