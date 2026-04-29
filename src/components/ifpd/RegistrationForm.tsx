import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

type Props = { variant?: "hero" | "section"; id?: string };

export function RegistrationForm({ variant = "section", id }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Shopify CRM integration will be wired in Phase 2
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
  };

  const dark = variant === "hero";
  const label = dark ? "text-white/80" : "text-foreground/80";
  const input = dark
    ? "bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white"
    : "bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary";

  if (done) {
    return (
      <div
        id={id}
        className={`rounded-2xl p-6 sm:p-8 text-center ${
          dark ? "bg-white/10 backdrop-blur border border-white/20" : "bg-card border border-border shadow-card"
        }`}
      >
        <div className={`mx-auto h-14 w-14 rounded-full grid place-items-center ${dark ? "bg-white/15" : "bg-primary/10"}`}>
          <CheckCircle2 className={`h-7 w-7 ${dark ? "text-white" : "text-primary"}`} />
        </div>
        <h3 className={`mt-4 text-xl sm:text-2xl font-bold ${dark ? "text-white" : "text-foreground"}`}>
          Your seat is reserved!
        </h3>
        <p className={`mt-2 text-sm ${dark ? "text-white/80" : "text-muted-foreground"}`}>
          Thank you for registering for IFPD Meet 2026. We've received your details and will reach out
          shortly with your confirmation and venue access pass.
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className={`rounded-2xl p-5 sm:p-7 ${
        dark
          ? "bg-white/10 backdrop-blur-xl border border-white/20"
          : "bg-card border border-border shadow-elegant"
      }`}
    >
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h3 className={`text-lg sm:text-xl font-bold ${dark ? "text-white" : "text-foreground"}`}>
            Reserve Your Free Seat
          </h3>
          <p className={`text-xs sm:text-sm ${dark ? "text-white/70" : "text-muted-foreground"}`}>
            Limited seats · Complimentary entry
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
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
          <label className={`block text-xs font-medium mb-1.5 ${label}`}>Full Name *</label>
          <input
            required
            name="fullName"
            placeholder="e.g. Anjali Menon"
            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors ${input}`}
          />
        </div>
        <div>
          <label className={`block text-xs font-medium mb-1.5 ${label}`}>Phone Number *</label>
          <input
            required
            type="tel"
            name="phone"
            placeholder="+91 ..."
            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors ${input}`}
          />
        </div>
        <div>
          <label className={`block text-xs font-medium mb-1.5 ${label}`}>Institute / Brand *</label>
          <input
            required
            name="institute"
            placeholder="School / Company name"
            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors ${input}`}
          />
        </div>
        <div>
          <label className={`block text-xs font-medium mb-1.5 ${label}`}>Number of Attendees *</label>
          <select
            required
            name="attendees"
            defaultValue="1"
            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors ${input}`}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n} className="text-foreground">
                {n} {n === 1 ? "person" : "people"}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={`block text-xs font-medium mb-1.5 ${label}`}>Food Preference *</label>
          <select
            required
            name="food"
            defaultValue="veg"
            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors ${input}`}
          >
            <option value="veg" className="text-foreground">Vegetarian</option>
            <option value="non-veg" className="text-foreground">Non-Vegetarian</option>
            <option value="jain" className="text-foreground">Jain</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors ${
          dark
            ? "bg-white text-primary hover:bg-white/90"
            : "bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-brand"
        } disabled:opacity-70`}
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Reserving…
          </>
        ) : (
          "Reserve My Free Seat"
        )}
      </button>
      <p className={`mt-3 text-[11px] text-center ${dark ? "text-white/60" : "text-muted-foreground"}`}>
        By registering you agree to receive event updates from IMPEX.
      </p>
    </form>
  );
}
