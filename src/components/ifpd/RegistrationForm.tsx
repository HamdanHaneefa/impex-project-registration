import { useState } from "react";
import { CheckCircle2, Loader2, Phone, PartyPopper, ArrowRight, AlertCircle, XCircle } from "lucide-react";
import { submitRegistration } from "@/lib/registration";
import type { RegistrationData } from "@/types/registration";

type Props = { variant?: "hero" | "section"; id?: string };

export function RegistrationForm({ variant = "section", id }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");

  const dark = variant === "hero";
  const labelCls = dark ? "text-white/80" : "text-foreground/80";
  const inputCls = dark
    ? "bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/30"
    : "bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20";
  const cardCls = dark
    ? "bg-white/10 backdrop-blur-xl border border-white/20"
    : "bg-card border border-border shadow-elegant";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null); // Clear any previous errors
    
    try {
      const formData = new FormData(e.currentTarget);
      const data: RegistrationData = {
        fullName: formData.get('fullName') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        designation: formData.get('designation') as string,
        institute: formData.get('institute') as string,
        attendees: formData.get('attendees') as string,
        food: formData.get('food') as string,
      };

      const result = await submitRegistration(data);
      
      // Check if at least one storage succeeded
      if (result.sheetsSuccess || result.supabaseSuccess) {
        setSubmitted(true);
        
        // Log partial success warning (user won't see this)
        if (result.errors.length > 0) {
          console.warn('Partial success - some storage failed:', result.errors);
        }
      } else {
        throw new Error('Both storage systems failed');
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      
      // Set user-friendly error message
      if (error instanceof Error) {
        if (error.message.includes('not configured')) {
          setError('Registration system is not configured. Please contact support.');
        } else if (error.message.includes('Failed to fetch')) {
          setError('Network error. Please check your internet connection and try again.');
        } else if (error.message.includes('both primary and backup')) {
          setError('Unable to save registration. Please try again or contact support.');
        } else {
          setError('Failed to submit registration. Please try again or contact support.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- SUCCESS STATE ----------
  if (submitted) {
    return (
      <div id={id} className={`rounded-2xl p-6 sm:p-8 text-center ${cardCls}`}>
        <div className={`mx-auto h-14 w-14 rounded-full grid place-items-center ${dark ? "bg-white/15" : "bg-primary/10"}`}>
          <PartyPopper className={`h-7 w-7 ${dark ? "text-white" : "text-primary"}`} />
        </div>
        <h3 className={`mt-4 text-xl sm:text-2xl font-bold ${dark ? "text-white" : "text-foreground"}`}>
          Registration Successful{name ? `, ${name.split(" ")[0]}!` : "!"}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/80" : "text-muted-foreground"}`}>
          Your FREE seat for IFPD Meet 2026 is reserved. We'll contact you within 24 hours to confirm your registration.
        </p>
        <div className={`mt-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold ${dark ? "bg-white/15 text-white" : "bg-primary/10 text-primary"}`}>
          <CheckCircle2 className="h-3.5 w-3.5" /> Registration Confirmed
        </div>
      </div>
    );
  }

  // ---------- REGISTRATION FORM ----------
  return (
    <form id={id} onSubmit={handleSubmit} className={`rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-7 ${cardCls}`}>
      <div className="flex items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="min-w-0">
          <h3 className={`text-base sm:text-lg md:text-xl font-bold ${dark ? "text-white" : "text-foreground"}`}>
            <span className="line-through opacity-60 mr-2">₹9,999</span>
            <span className="text-green-500">Join FREE</span>
          </h3>
          <p className={`text-[11px] sm:text-xs md:text-sm ${dark ? "text-white/70" : "text-muted-foreground"}`}>
            First 50 participants only
          </p>
        </div>
        <span
          className={`shrink-0 inline-flex items-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider ${
            dark ? "bg-green-500/90 text-white" : "bg-green-500 text-white"
          }`}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
          </span>
          FREE Entry
        </span>
      </div>

      {/* Error Message */}
      {error && (
        <div className={`mb-4 rounded-lg p-3 sm:p-4 ${
          dark 
            ? "bg-red-500/20 border border-red-500/30" 
            : "bg-red-50 border border-red-200"
        }`}>
          <div className="flex items-start gap-2">
            <AlertCircle className={`h-4 w-4 sm:h-5 sm:w-5 shrink-0 mt-0.5 ${
              dark ? "text-red-300" : "text-red-600"
            }`} />
            <div className="flex-1 min-w-0">
              <h4 className={`text-xs sm:text-sm font-semibold ${
                dark ? "text-red-200" : "text-red-800"
              }`}>
                Registration Failed
              </h4>
              <p className={`mt-1 text-[11px] sm:text-xs ${
                dark ? "text-red-300" : "text-red-700"
              }`}>
                {error}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setError(null)}
              className={`shrink-0 ${dark ? "text-red-300 hover:text-red-200" : "text-red-600 hover:text-red-800"}`}
            >
              <XCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
        <div className="sm:col-span-2">
          <label className={`block text-[11px] sm:text-xs font-medium mb-1 sm:mb-1.5 ${labelCls}`}>Full Name *</label>
          <input
            required
            name="fullName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Anjali Menon"
            autoComplete="name"
            className={`w-full rounded-lg border px-3 sm:px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm outline-none transition-all ${inputCls}`}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={`block text-[11px] sm:text-xs font-medium mb-1 sm:mb-1.5 ${labelCls}`}>Phone Number *</label>
          <div className="relative">
            <Phone className={`absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 h-3.5 sm:h-4 w-3.5 sm:w-4 ${dark ? "text-white/50" : "text-muted-foreground"}`} />
            <input
              required
              type="tel"
              name="phone"
              placeholder="+91 98765 43210"
              autoComplete="tel"
              inputMode="tel"
              className={`w-full rounded-lg border pl-9 sm:pl-10 pr-3 sm:pr-3.5 py-2.5 sm:py-3 text-xs sm:text-sm outline-none transition-all ${inputCls}`}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className={`block text-[11px] sm:text-xs font-medium mb-1 sm:mb-1.5 ${labelCls}`}>Email Address *</label>
          <input
            required
            type="email"
            name="email"
            placeholder="your.email@example.com"
            autoComplete="email"
            className={`w-full rounded-lg border px-3 sm:px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm outline-none transition-all ${inputCls}`}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={`block text-[11px] sm:text-xs font-medium mb-1 sm:mb-1.5 ${labelCls}`}>Designation / Role *</label>
          <select
            required
            name="designation"
            className={`w-full rounded-lg border px-3 sm:px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm outline-none transition-all ${inputCls}`}
          >
            <option value="" className="text-muted-foreground">Select Role</option>
            <option value="principal" className="text-foreground">Principal / Head of School</option>
            <option value="owner" className="text-foreground">School Owner / Trustee</option>
            <option value="dean" className="text-foreground">College Principal / Dean</option>
            <option value="it-head" className="text-foreground">IT Head / Coordinator</option>
            <option value="procurement" className="text-foreground">Purchase / Procurement Head</option>
            <option value="corporate" className="text-foreground">Corporate Decision Maker</option>
            <option value="faculty" className="text-foreground">Teacher / Faculty</option>
            <option value="other" className="text-foreground">Other</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={`block text-[11px] sm:text-xs font-medium mb-1 sm:mb-1.5 ${labelCls}`}>Institute / Organization *</label>
          <input
            required
            name="institute"
            placeholder="School / College / Company Name"
            className={`w-full rounded-lg border px-3 sm:px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm outline-none transition-all ${inputCls}`}
          />
        </div>

        <div>
          <label className={`block text-[11px] sm:text-xs font-medium mb-1 sm:mb-1.5 ${labelCls}`}>Attendees *</label>
          <select
            required
            name="attendees"
            defaultValue="1"
            className={`w-full rounded-lg border px-3 sm:px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm outline-none transition-all ${inputCls}`}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n} className="text-foreground">
                {n}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={`block text-[11px] sm:text-xs font-medium mb-1 sm:mb-1.5 ${labelCls}`}>Food Preference *</label>
          <select
            required
            name="food"
            defaultValue="veg"
            className={`w-full rounded-lg border px-3 sm:px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm outline-none transition-all ${inputCls}`}
          >
            <option value="veg" className="text-foreground">Veg</option>
            <option value="non-veg" className="text-foreground">Non-Veg</option>
            <option value="jain" className="text-foreground">Jain</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`mt-4 sm:mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all ${
          dark
            ? "bg-white text-primary hover:bg-white/90 shadow-lg"
            : "bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-brand"
        } disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        {submitting ? (
          <><Loader2 className="h-3.5 sm:h-4 w-3.5 sm:w-4 animate-spin" /> Submitting…</>
        ) : (
          <>
            <span className="line-through opacity-60">₹9,999</span>
            <span>Join FREE Now</span>
            <ArrowRight className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
          </>
        )}
      </button>
      
      <p className={`mt-2.5 sm:mt-3 text-[10px] sm:text-[11px] text-center ${dark ? "text-white/60" : "text-muted-foreground"}`}>
        By registering you agree to receive event updates from Impex.
      </p>
    </form>
  );
}
