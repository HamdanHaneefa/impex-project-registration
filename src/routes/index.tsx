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
  Building2,
  GraduationCap,
  Briefcase,
  Target,
  CheckCircle,
  Zap,
  Shield,
  Globe,
  Play,
} from "lucide-react";
import logo from "@/assets/impex-logo.png";
import heroImg from "@/assets/ifpd-event-hero.jpg";
import { Countdown } from "@/components/ifpd/Countdown";
import { RegistrationForm } from "@/components/ifpd/RegistrationForm";
import { StickyCTA } from "@/components/ifpd/StickyCTA";
import { Reveal } from "@/components/site/Reveal";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IFPD Meet 2026 — Join FREE (First 50) | Impex" },
      {
        name: "description",
        content:
          "Join IFPD Meet 2026 on 9 May at Mount Ridge International Convention Centre, Manjeri, Kerala. Experience AI smart displays, xMeet collaboration, keynote by Mr. Renjith Kesav. FREE for first 50 participants!",
      },
      { property: "og:title", content: "IFPD Meet 2026 — Join FREE (First 50)" },
      {
        property: "og:description",
        content:
          "9 May 2026 · Mount Ridge International Convention Centre, Manjeri, Kerala · 10 AM – 3 PM. Smart Learning Displays, AI Whiteboards & xMeet live demos. FREE for first 50 participants!",
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
        <WhatIsIFPD />
        <Speaker />
        <WhoShouldAttend />
        <Experience />
        <XSeriesShowcase />
        <AboutImpex />
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
  const [logoLoaded, setLogoLoaded] = useState(false);
  
  return (
    <header className="absolute top-0 inset-x-0 z-30 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-9 md:h-10">
            {!logoLoaded && <div className="h-9 md:h-10 w-24 bg-white/20 animate-pulse rounded" />}
            <img 
              src={logo} 
              alt="Impex" 
              className={`h-9 md:h-10 w-auto brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-opacity duration-300 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setLogoLoaded(true)}
            />
          </div>
          <span className="hidden sm:inline text-xs font-bold tracking-widest text-white uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            IFPD Meet 2026
          </span>
        </div>
        <a
          href="#register"
          className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2.5 text-sm font-bold hover:bg-white/30 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          <span className="hidden sm:inline">Register</span>
          <span className="sm:hidden">Register</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const [imgLoaded, setImgLoaded] = useState(false);
  
  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 animate-pulse" />
      )}
      <img
        src={heroImg}
        alt="IFPD Meet 2026 venue"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        width={1536}
        height={1024}
        onLoad={() => setImgLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/45 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-32 sm:pb-24 grid lg:grid-cols-2 gap-6 lg:gap-14 items-center min-h-screen">
        <div className="space-y-5 sm:space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm sm:text-base lg:text-lg font-medium text-white/90 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
          >
            Struggling to keep your institution ahead in AI-driven education?
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)' }}
          >
            IFPD Meet{" "}
            <span className="text-white">
              2026
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-3 md:flex-row md:gap-2 md:flex-wrap"
          >
            <div className="flex items-center gap-3 rounded-3xl bg-black/70 backdrop-blur-md border border-white/20 px-5 py-3 md:px-7 md:py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
              <Calendar className="h-5 w-5 text-white shrink-0" />
              <span className="text-sm font-bold text-white whitespace-nowrap">9 May 2026</span>
            </div>
            <div className="flex items-center gap-3 rounded-3xl bg-black/70 backdrop-blur-md border border-white/20 px-5 py-3 md:px-7 md:py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
              <Clock className="h-5 w-5 text-white shrink-0" />
              <span className="text-sm font-bold text-white whitespace-nowrap">10 AM – 3 PM</span>
            </div>
            <a 
              href="https://maps.app.goo.gl/guRwj3hVagK21Yyu5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-3xl bg-black/70 backdrop-blur-md border border-white/20 px-5 py-3 md:px-7 md:py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:bg-black/80 transition-all"
            >
              <MapPin className="h-5 w-5 text-white shrink-0" />
              <span className="text-sm font-bold text-white whitespace-nowrap">Manjeri, Kerala</span>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
          >
            The flagship gathering for educators, institution heads and corporate leaders — experience the
            future of smart learning, AI whiteboards & hybrid collaboration, live.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-white mb-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              Event begins in
            </p>
            <Countdown />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3"
          >
            <a
              href="#register"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-primary px-5 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold hover:bg-white/90 shadow-[0_4px_20px_rgba(255,255,255,0.3)] hover:shadow-[0_6px_24px_rgba(255,255,255,0.4)] transition-all"
            >
              <span className="line-through opacity-60">₹9,999</span>
              <span>Join FREE Now</span>
              <ArrowRight className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
            </a>
            <a
              href="#experience"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 bg-black/40 backdrop-blur-md px-5 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold text-white hover:bg-black/60 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            >
              What to Expect
            </a>
          </motion.div>


        </div>

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

function WhatIsIFPD() {
  return (
    <section className="py-12 sm:py-16 bg-background border-b border-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5" /> What is IFPD?
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Interactive Flat Panel Display
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            IFPD represents the next generation of smart classroom and boardroom technology — combining touch interactivity, AI capabilities, and seamless collaboration tools in one powerful display system.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function WhoShouldAttend() {
  const attendees = [
    { icon: GraduationCap, title: "School Leaders", items: ["Principals", "Head of Schools", "School Owners & Trustees"] },
    { icon: Building2, title: "College Leadership", items: ["College Principals", "Deans", "Academic Directors"] },
    { icon: Briefcase, title: "Decision Makers", items: ["IT Heads", "Procurement Heads", "Corporate Leaders"] },
    { icon: Users, title: "Educators", items: ["Teachers", "Faculty Members", "Training Coordinators"] },
  ];

  return (
    <section className="py-10 sm:py-24 bg-gradient-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Who Should Attend"
            title="This event is designed for education & corporate leaders"
            sub="If you're responsible for technology decisions, classroom innovation, or institutional growth — this is for you."
          />
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-6 sm:mt-10">
          {attendees.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-card hover:shadow-elegant transition-all">
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-primary/10 grid place-items-center">
                  <a.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-bold text-foreground">{a.title}</h3>
                <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
                  {a.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function XSeriesShowcase() {
  const features = [
    { icon: Monitor, title: "4K Ultra HD Display", desc: "Crystal-clear visuals for immersive learning" },
    { icon: PenTool, title: "20-Point Touch", desc: "Multiple users can interact simultaneously" },
    { icon: Zap, title: "AI-Powered Tools", desc: "Smart recognition and auto-enhancement" },
    { icon: Video, title: "Built-in Camera", desc: "Seamless video conferencing integration" },
    { icon: Shield, title: "Eye Care Technology", desc: "Anti-glare and blue light protection" },
    { icon: Globe, title: "Cloud Integration", desc: "Access content from anywhere, anytime" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Product Showcase"
            title="Experience the xSeries IFPD"
            sub="Live demonstrations of Impex's flagship Interactive Flat Panel Display series"
          />
        </Reveal>

        {/* Video Placeholder */}
        <Reveal delay={0.1}>
          <div className="mt-10 rounded-3xl overflow-hidden border border-border bg-card shadow-elegant">
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 hover:bg-white/20 transition-all cursor-pointer">
                    <Play className="h-8 w-8 sm:h-10 sm:w-10 text-white ml-1" />
                  </div>
                  <p className="text-white text-sm sm:text-base font-semibold">Watch xSeries Product Demo</p>
                  <p className="text-white/60 text-xs sm:text-sm mt-1">2:30 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 6 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-10">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card hover:shadow-elegant transition-all">
                <div className="h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center shadow-brand">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="mt-4 text-base sm:text-lg font-bold text-foreground">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Certifications */}
        <Reveal delay={0.2}>
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">Certified & Trusted</h3>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-semibold">ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-semibold">CE Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-semibold">RoHS Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-semibold">3-Year Warranty</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AboutImpex() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-subtle">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="About Impex"
            title="Know More About Impex IFPD"
            sub="Leading the smart education revolution across India"
          />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-10">
          <Reveal delay={0.1}>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Impex is committed to transforming education through cutting-edge technology. We bring world-class Interactive Flat Panel Displays to schools, colleges, and corporate training centers across India.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">Why Choose Impex?</h3>
                <ul className="space-y-3">
                  {[
                    "10+ years of experience in EdTech",
                    "5000+ installations nationwide",
                    "24/7 customer support",
                    "Comprehensive training programs",
                    "Competitive pricing with flexible EMI",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {/* Event Promo Video Placeholder */}
            <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-elegant">
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 mb-3 hover:bg-primary/30 transition-all cursor-pointer">
                      <Play className="h-8 w-8 text-primary ml-1" />
                    </div>
                    <p className="text-foreground text-sm font-semibold">IFPD Meet 2026 Invitation</p>
                    <p className="text-muted-foreground text-xs mt-1">1:45 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DetailChip({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/30 px-3 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
      <Icon className="h-4 w-4 text-white shrink-0" />
      <span className="text-xs sm:text-sm font-bold text-white truncate drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">{label}</span>
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
  { icon: Monitor, title: "Smart Learning Displays", desc: "AI-powered interactive flat panels for classrooms" },
  { icon: PenTool, title: "AI Whiteboard Solutions", desc: "Intelligent touch-enabled whiteboards live on stage" },
  { icon: Video, title: "xMeet Collaboration", desc: "Hybrid meeting systems for modern workspaces" },
  { icon: Hand, title: "Live Experience Zones", desc: "Hands-on demo areas to touch and test technology" },
];

function Experience() {
  return (
    <section id="experience" className="py-10 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="What to Experience"
            title="4 Signature Experience Zones"
            sub="See, touch, and try Impex innovations in action"
          />
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {experiences.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.05}>
              <div className="group h-full rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-card hover:shadow-elegant transition-all hover:-translate-y-1">
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-gradient-primary grid place-items-center shadow-brand">
                  <e.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                </div>
                <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-bold text-foreground">{e.title}</h3>
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
  const [speakerImgLoaded, setSpeakerImgLoaded] = useState(false);
  
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader eyebrow="Featured Speaker" title="Keynote You Can't Miss" />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-elegant grid md:grid-cols-5">
            <div className="md:col-span-2 relative bg-gradient-hero">
              {!speakerImgLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
              )}
              <img
                src="/Mr.-Renjith Kesav.jpeg"
                alt="Mr. Renjith Kesav"
                loading="lazy"
                width={768}
                height={960}
                className={`h-full w-full object-cover aspect-[4/5] md:aspect-auto transition-opacity duration-500 ${speakerImgLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setSpeakerImgLoaded(true)}
              />
            </div>
            <div className="md:col-span-3 p-6 sm:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                <Mic2 className="h-3.5 w-3.5" /> Guest Speaker
              </div>
              <h3 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                Mr. Renjith Kesav
              </h3>
              <a
                href="https://www.linkedin.com/in/renjitravikeshav/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium transition-colors w-fit"
                style={{ color: '#0A66C2' }}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn Profile
              </a>
              <p className="mt-3 text-base sm:text-lg font-semibold text-primary">
                "Future-Ready Education: Challenges, Strategies & Smart Solutions"
              </p>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                Leading voice on education innovation. Expect practical insights on AI, hybrid learning, and next-gen classroom technology.
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
  { icon: Users, title: "Power Networking", desc: "Connect with 100+ school owners, college heads & corporate decision-makers" },
  { icon: Rocket, title: "Exclusive Product Launch", desc: "First look at Impex's latest xSeries innovations before market release" },
  { icon: Lightbulb, title: "Industry Insights", desc: "Learn future trends in AI-driven education from leading experts" },
  { icon: Award, title: "Premium Experience", desc: "Curated venue, gourmet meals, and professionally organized event" },
];

function WhyAttend() {
  return (
    <section className="py-10 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader 
            eyebrow="Why Attend" 
            title="4 Compelling Reasons to Join Us"
            sub="Make the most of this exclusive opportunity"
          />
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <div className="relative h-full rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-card hover:shadow-elegant transition-all hover:-translate-y-1">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg">
                  {i + 1}
                </div>
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-accent grid place-items-center">
                  <r.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-bold text-foreground">{r.title}</h3>
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
                <span className="text-xl font-bold">FREE for first 50 participants!</span><br />
                Limited seats available. Register now to secure your spot.
              </p>
              <a
                href="#register-bottom"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-primary px-6 py-3.5 text-sm font-semibold hover:bg-white/90"
              >
                <span className="line-through opacity-60">₹9,999</span>
                <span>Join FREE Now</span>
                <ArrowRight className="h-4 w-4" />
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
            title="Join FREE — First 50 Only"
            sub="Fill in your details to secure your complimentary seat. Limited spots available!"
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
  const [footerLogoLoaded, setFooterLogoLoaded] = useState(false);
  
  return (
    <footer className="bg-[var(--surface-darker)] text-white py-14 mt-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="relative h-7">
              {!footerLogoLoaded && <div className="h-7 w-20 bg-white/20 animate-pulse rounded" />}
              <img 
                src={logo} 
                alt="Impex" 
                className={`h-7 brightness-0 invert transition-opacity duration-300 ${footerLogoLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setFooterLogoLoaded(true)}
              />
            </div>
            <span className="text-xs font-semibold tracking-widest text-white/70 uppercase">
              IFPD Meet 2026
            </span>
          </div>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            The flagship Impex gathering for the future of smart learning, AI whiteboards and hybrid
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
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" /> 
              <a 
                href="https://maps.app.goo.gl/guRwj3hVagK21Yyu5"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Mount Ridge International Convention Centre,<br />Manjeri, Kerala
              </a>
            </li>
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
        <p className="text-xs text-white/60">© {new Date().getFullYear()} Impex. All rights reserved.</p>
        <p className="text-xs text-white/60">Organised by Impex · IFPD Meet 2026</p>
      </div>
    </footer>
  );
}
