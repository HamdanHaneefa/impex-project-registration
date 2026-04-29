import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, ShieldCheck, Phone, RotateCw, PartyPopper } from "lucide-react";

type Props = { variant?: "hero" | "section"; id?: string };
type Step = "details" | "otp" | "done";

export function RegistrationForm({ variant = "section", id }: Props) {
  const [step, setStep] = useState<Step>("details");
  const [submitting, setSubmitting] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [resendIn, setResendIn] = useState(0);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const dark = variant === "hero";
  const labelCls = dark ? "text-white/80" : "text-foreground/80";
  const inputCls = dark
    ? "bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/30"
    : "bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20";
  const cardCls = dark
    ? "bg-white/10 backdrop-blur-xl border border-white/20"
    : "bg-card border border-border shadow-elegant";

  // Resend cooldown
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  const startOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700)); // UI placeholder — no backend yet
    setSubmitting(false);
    setResendIn(30);
    setStep("otp");
    setTimeout(() => inputsRef.current[0]?.focus(), 60);
  };

  const verifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setStep("done");
  };

  const handleOtpChange = (i: number, raw: string) => {
    const v = raw.replace(/\D/g, "").slice(-1);
    setOtp((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
    if (v && i < 5) inputsRef.current[i + 1]?.focus();
  };

  const handleOtpKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) inputsRef.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) inputsRef.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 5) inputsRef.current[i + 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const data = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!data) return;
    e.preventDefault();
    const next = ["", "", "", "", "", ""];
    for (let i = 0; i < data.length; i++) next[i] = data[i];
    setOtp(next);
    inputsRef.current[Math.min(data.length, 5)]?.focus();
  };

  const otpComplete = otp.every((d) => d !== "");
  const maskedPhone = phone ? phone.replace(/.(?=.{4})/g, "•") : "your number";

  // ---------- DONE ----------
  if (step === "done") {
    return (
      <div id={id} className={`rounded-2xl p-6 sm:p-8 text-center ${cardCls}`}>
        <div className={`mx-auto h-14 w-14 rounded-full grid place-items-center ${dark ? "bg-white/15" : "bg-primary/10"}`}>
          <PartyPopper className={`h-7 w-7 ${dark ? "text-white" : "text-primary"}`} />
        </div>
        <h3 className={`mt-4 text-xl sm:text-2xl font-bold ${dark ? "text-white" : "text-foreground"}`}>
          Booking confirmed{name ? `, ${name.split(" ")[0]}!` : "!"}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/80" : "text-muted-foreground"}`}>
          Your seat for IFPD Meet 2026 is reserved. We've sent a confirmation to {maskedPhone}.
          You'll receive your venue access pass closer to the event date.
        </p>
        <div className={`mt-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold ${dark ? "bg-white/15 text-white" : "bg-primary/10 text-primary"}`}>
          <CheckCircle2 className="h-3.5 w-3.5" /> Phone Verified
        </div>
      </div>
    );
  }

  // ---------- OTP ----------
  if (step === "otp") {
    return (
      <form id={id} onSubmit={verifyOtp} className={`rounded-2xl p-5 sm:p-7 ${cardCls}`}>
        <div className="flex items-start gap-3 mb-5">
          <div className={`h-10 w-10 shrink-0 rounded-xl grid place-items-center ${dark ? "bg-white/15" : "bg-primary/10"}`}>
            <ShieldCheck className={`h-5 w-5 ${dark ? "text-white" : "text-primary"}`} />
          </div>
          <div className="min-w-0">
            <h3 className={`text-lg sm:text-xl font-bold ${dark ? "text-white" : "text-foreground"}`}>
              Verify your phone
            </h3>
            <p className={`text-xs sm:text-sm mt-0.5 ${dark ? "text-white/70" : "text-muted-foreground"}`}>
              Enter the 6-digit code sent to <span className="font-semibold">{maskedPhone}</span>
            </p>
          </div>
        </div>

        <div className="flex justify-between gap-1.5 sm:gap-2.5" onPaste={handleOtpPaste}>
          {otp.map((d, i) => (
            <input
              key={i}
              ref={(el) => { inputsRef.current[i] = el; }}
              value={d}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onKeyDown={(e) => handleOtpKey(i, e)}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              aria-label={`Digit ${i + 1}`}
              className={`flex-1 min-w-0 aspect-square max-w-[52px] rounded-xl border text-center text-lg sm:text-xl font-bold outline-none transition-all ${inputCls}`}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={!otpComplete || submitting}
          className={`mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all ${
            dark ? "bg-white text-primary hover:bg-white/90" : "bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-brand"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Verifying…</>) : "Verify & Confirm Booking"}
        </button>

        <div className="mt-4 flex items-center justify-between gap-3 text-xs">
          <button
            type="button"
            onClick={() => setStep("details")}
            className={`underline-offset-2 hover:underline ${dark ? "text-white/70" : "text-muted-foreground"}`}
          >
            ← Edit number
          </button>
          <button
            type="button"
            disabled={resendIn > 0}
            onClick={() => setResendIn(30)}
            className={`inline-flex items-center gap-1.5 font-semibold ${dark ? "text-white" : "text-primary"} disabled:opacity-50`}
          >
            <RotateCw className="h-3 w-3" />
            {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}
          </button>
        </div>
      </form>
    );
  }

  // ---------- DETAILS ----------
  return (
    <form id={id} onSubmit={startOtp} className={`rounded-2xl p-5 sm:p-7 ${cardCls}`}>
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="min-w-0">
          <h3 className={`text-lg sm:text-xl font-bold ${dark ? "text-white" : "text-foreground"}`}>
            Reserve Your Free Seat
          </h3>
          <p className={`text-xs sm:text-sm ${dark ? "text-white/70" : "text-muted-foreground"}`}>
            Limited seats · Complimentary entry
          </p>
        </div>
        <span
          className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
            dark ? "bg-white/15 text-white" : "bg-primary/10 text-primary"
          }`}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
          </span>
          Live
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="sm:col-span-2">
          <label className={`block text-xs font-medium mb-1.5 ${labelCls}`}>Full Name *</label>
          <input
            required
            name="fullName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Anjali Menon"
            autoComplete="name"
            className={`w-full rounded-lg border px-3.5 py-3 text-sm outline-none transition-all ${inputCls}`}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={`block text-xs font-medium mb-1.5 ${labelCls}`}>Phone Number *</label>
          <div className="relative">
            <Phone className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${dark ? "text-white/50" : "text-muted-foreground"}`} />
            <input
              required
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              autoComplete="tel"
              inputMode="tel"
              className={`w-full rounded-lg border pl-10 pr-3.5 py-3 text-sm outline-none transition-all ${inputCls}`}
            />
          </div>
          <p className={`mt-1.5 text-[11px] ${dark ? "text-white/55" : "text-muted-foreground"}`}>
            We'll send a one-time code to verify your number.
          </p>
        </div>
        <div>
          <label className={`block text-xs font-medium mb-1.5 ${labelCls}`}>Institute / Brand *</label>
          <input
            required
            name="institute"
            placeholder="School / Company"
            className={`w-full rounded-lg border px-3.5 py-3 text-sm outline-none transition-all ${inputCls}`}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${labelCls}`}>Attendees *</label>
            <select
              required
              name="attendees"
              defaultValue="1"
              className={`w-full rounded-lg border px-2.5 py-3 text-sm outline-none transition-all ${inputCls}`}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n} className="text-foreground">
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${labelCls}`}>Food *</label>
            <select
              required
              name="food"
              defaultValue="veg"
              className={`w-full rounded-lg border px-2.5 py-3 text-sm outline-none transition-all ${inputCls}`}
            >
              <option value="veg" className="text-foreground">Veg</option>
              <option value="non-veg" className="text-foreground">Non-Veg</option>
              <option value="jain" className="text-foreground">Jain</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all ${
          dark
            ? "bg-white text-primary hover:bg-white/90"
            : "bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-brand"
        } disabled:opacity-70`}
      >
        {submitting ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Sending OTP…</>
        ) : (
          <>Send OTP & Continue <ShieldCheck className="h-4 w-4" /></>
        )}
      </button>
      <p className={`mt-3 text-[11px] text-center ${dark ? "text-white/60" : "text-muted-foreground"}`}>
        By registering you agree to receive event updates from IMPEX.
      </p>
    </form>
  );
}
