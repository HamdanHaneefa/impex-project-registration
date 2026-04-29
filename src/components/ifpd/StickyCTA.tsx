import { useEffect, useState } from "react";

export function StickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-3 pb-3 transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href="#register"
        className="block w-full text-center rounded-full bg-gradient-primary text-primary-foreground font-semibold py-3.5 shadow-brand"
      >
        Reserve My Free Seat →
      </a>
    </div>
  );
}
