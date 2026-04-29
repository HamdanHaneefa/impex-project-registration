import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Users,
  Rocket,
  Lightbulb,
  Award,
  Mic2,
  Monitor,
  PenTool,
  Video,
  Hand,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import logo from "@/assets/impex-logo.png";
import heroImg from "@/assets/ifpd-event-hero.jpg";
import speakerImg from "@/assets/speaker-renjith.jpg";
import { Countdown } from "@/components/ifpd/Countdown";
import { RegistrationForm } from "@/components/ifpd/RegistrationForm";
import { StickyCTA } from "@/components/ifpd/StickyCTA";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/ifpd-meet")({
  head: () => ({
    meta: [
      { title: "IFPD Meet 2026 — Register Free | IMPEX" },
      {
        name: "description",
        content:
          "Join IFPD Meet 2026 on 9 May at Mount Ridge International, Manjeri. Experience AI smart displays, xMeet collaboration, keynote by Mr. Renjith Kesav. Reserve your free seat.",
      },
      { property: "og:title", content: "IFPD Meet 2026 — Register Free" },
      {
        property: "og:description",
        content: "9 May 2026 · Mount Ridge International, Manjeri · 10 AM – 3 PM. Smart Learning Displays, AI Whiteboards & xMeet live demos.",
      },
    ],
  }),
  component: IFPDMeet,
});

function IFPDMeet() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main>
        <Hero />
        <Experience />
        <Speaker />
        <WhyAttend />
        <Urgency />
        <FinalRegister />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}

function TopBar() {
  return (
    <header className="absolute top-0 inset-x-0 z-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="IMPEX" className="h-7 md:h-8 w-auto brightness-0 invert" />
          <span className="hidden sm:inline text-xs font-semibold tracking-widest text-white/80 uppercase">
            IFPD Meet 2026
          </span>
        </div>
        <a
          href="#register"
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white px-4 py-2 text-sm font-semibold hover:bg-white/20"
        >
          Register <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100vh] overflow-hidden text-white">
      {/* Background */}
      <img
        src={heroImg}
        alt="IFPD Meet 2026 venue"
        className="absolute inset-0 h-full w-full object-cover"
        width={1536}
        height={1024}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.16_0.02_270)/0.92] via-[oklch(0.22_0.08_12)/0.85] to-[oklch(0.48_0.22_13)/0.75]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 px-3.5 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-80 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest">
              Limited Seats · By Invitation
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
          >
            IFPD Meet <span className="text-gradient bg-gradient-to-r from-white to-[oklch(0.85_0.12_14)] bg-clip-text text-transparent">2026</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-white/85 max-w-xl"
          >
            The flagship gathering for educators, institution heads and corporate leaders — experience the future of
            smart learning, AI whiteboards & hybrid collaboration, live.
          </motion.p>

          {/* Event details strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 max-w-xl"
          >
            <DetailChip icon={Calendar} label="9 May 2026" />
            <DetailChip icon={Clock} label="10 AM – 3 PM" />
            <DetailChip icon={MapPin} label="Manjeri" />
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-7"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60 mb-2">
              Event begins in
            </p>
            <Countdown />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <a
              href="#register"
              className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-6 py-3.5 text-sm font-semibold hover:bg-white/90 shadow-brand"
            >
              Reserve My Free Seat <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 backdrop-blur px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/15"
            >
              What to Expect
            </a>
          </motion.div>
        </div>

        {/* Hero registration form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <RegistrationForm variant="hero" id="register" />
        </motion.div>
      </div>
    </section>
  );
}

function DetailChip({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white/8 backdrop-blur border border-white/15 px-3 py-2.5">
      <Icon className="h-4 w-4 text-white/80 shrink-0" />
      <span className="text-xs sm:text-sm font-semibold text-white truncate">{label}</span>
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
        {title}
      </h2>
      {sub && <p className="mt-3 text-muted-foreground text-base sm:text-lg">{sub}</p>}
    </div>
  );
}

const experiences = [
  {
    icon: Monitor,
    title: "Smart Learning Displays",
    desc: "AI-powered interactive flat panels designed for classrooms and boardrooms.",
  },
  {
    icon: PenTool,
    title: "AI Whiteboard Solutions",
    desc: "Intelligent touch-enabled whiteboards demonstrated live on stage.",
  },
  {
    icon: Video,
    title: "xMeet Collaboration",
    desc: "Hybrid meeting systems bridging physical and digital workspaces.",
  },
  {
    icon: Hand,
    title: "Live Experience Zones",
    desc: "Hands-on demo areas where attendees can touch and test the technology.",
  },
];

function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 bg-gradient-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="What to Experience"
            title="An immersive day with the future of smart learning"
            sub="Four signature experience zones, each designed to let you see, touch and try IMPEX innovations."
          />
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {experiences.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.05}>
              <div className="group h-full rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card hover:shadow-elegant transition-all hover:-translate-y-1">
                <div className="h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center shadow-brand">
                  <e.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="mt-4 text-base sm:text-lg font-bold text-foreground">{e.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Speaker() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader eyebrow="Featured Speaker" title="A keynote you don't want to miss" />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-elegant grid md:grid-cols-5">
            <div className="md:col-span-2 relative bg-gradient-hero">
              <img
                src={speakerImg}
                alt="Mr. Renjith Kesav"
                loading="lazy"
                width={768}
                height={960}
                className="h-full w-full object-cover aspect-[4/5] md:aspect-auto"
              />
            </div>
            <div className="md:col-span-3 p-6 sm:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                <Mic2 className="h-3.5 w-3.5" /> Guest Speaker
              </div>
              <h3 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                Mr. Renjith Kesav
              </h3>
              <p className="mt-3 text-base sm:text-lg font-semibold text-primary">
                "Future-Ready Education: Challenges, Strategies & Smart Solutions"
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                A leading voice on education innovation, Mr. Renjith Kesav brings deep insight into how
                institutions can navigate AI, hybrid learning and the next generation of classroom
                technology. Expect a candid, forward-looking session packed with practical takeaways.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["AI in Classrooms", "Hybrid Learning", "Smart Strategy"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const reasons = [
  {
    icon: Users,
    title: "Power Networking",
    desc: "School owners, college heads & corporate decision-makers in one room.",
  },
  {
    icon: Rocket,
    title: "Exclusive Product Launch",
    desc: "First look at IMPEX's latest smart learning innovations — the xSeries.",
  },
  {
    icon: Lightbulb,
    title: "Industry Insights",
    desc: "Forward-looking perspectives on education and smart workplaces.",
  },
  {
    icon: Award,
    title: "Premium Experience",
    desc: "Curated venue, gourmet meals, and a professionally organised event.",
  },
];

function WhyAttend() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Why Attend"
            title="Four compelling reasons to be in the room"
          />
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-elegant transition-all hover:-translate-y-1">
                <div className="h-11 w-11 rounded-xl bg-accent grid place-items-center">
                  <r.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-base sm:text-lg font-bold text-foreground">{r.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Urgency() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 sm:p-12 text-center shadow-brand">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white blur-3xl" />
            </div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur border border-white/30 px-3.5 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-white" />
                <span className="text-xs font-semibold uppercase tracking-widest text-white">
                  Seats Are Filling Fast
                </span>
              </div>
              <h2 className="mt-4 text-2xl sm:text-4xl font-bold text-primary-foreground leading-tight">
                Don't miss your spot at IFPD Meet 2026
              </h2>
              <p className="mt-3 text-primary-foreground/85 max-w-2xl mx-auto">
                Limited invitations remain. Reserve your free seat now to secure access, premium seating
                and the welcome kit.
              </p>
              <a
                href="#register-bottom"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-primary px-6 py-3.5 text-sm font-semibold hover:bg-white/90"
              >
                Reserve My Free Seat <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalRegister() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Last Step"
            title="Reserve your free seat"
            sub="Fill in your details and we'll confirm your invitation by phone within 24 hours."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <RegistrationForm id="register-bottom" />
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--surface-darker)] text-white py-14 mt-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="IMPEX" className="h-7 brightness-0 invert" />
            <span className="text-xs font-semibold tracking-widest text-white/70 uppercase">
              IFPD Meet 2026
            </span>
          </div>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            The flagship IMPEX gathering for the future of smart learning, AI whiteboards and hybrid
            collaboration.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest text-white/60 uppercase mb-3">
            Event Details
          </p>
          <ul className="space-y-2 text-sm text-white/85">
            <li className="flex items-start gap-2"><Calendar className="h-4 w-4 mt-0.5 text-primary" /> Saturday, 9 May 2026</li>
            <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 text-primary" /> 10:00 AM – 3:00 PM</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary" /> Mount Ridge International,<br />Pandikkad Road, Manjeri</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest text-white/60 uppercase mb-3">
            Organiser Contact
          </p>
          <ul className="space-y-2 text-sm text-white/85">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +91 00000 00000</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> events@impex.example</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row gap-3 items-center justify-between">
        <p className="text-xs text-white/60">© {new Date().getFullYear()} IMPEX. All rights reserved.</p>
        <p className="text-xs text-white/60">Organised by IMPEX · IFPD Meet 2026</p>
      </div>
    </footer>
  );
}
