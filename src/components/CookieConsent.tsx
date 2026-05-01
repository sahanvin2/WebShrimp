import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "loopingon_cookie_consent";
const LEGACY_STORAGE_KEY = "webshrimp_cookie_consent";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    setIsVisible(false);
  };

  const handleDecline = () => {
    sessionStorage.setItem(STORAGE_KEY, "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100] aspect-square w-72 animate-fade-up drop-shadow-2xl sm:w-80">
      <div className="flex h-full w-full flex-col justify-between rounded-[2rem] border border-border bg-white/90 p-7 backdrop-blur-2xl shadow-glow">
        <button
          onClick={handleDecline}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-brand-blue-soft hover:text-brand-blue"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mt-2 flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange-soft">
            <Cookie className="h-8 w-8 text-brand-orange" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-brand-navy">We Use Cookies</h3>
          <p className="px-1 text-sm leading-relaxed text-muted-foreground">
            We use cookies to improve your experience, personalize content, and analyze our site traffic.
          </p>
        </div>

        <div className="mt-4 flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full rounded-full border-border font-semibold transition-colors hover:bg-brand-blue-soft hover:text-brand-blue"
            onClick={handleDecline}
          >
            Decline
          </Button>
          <Button
            variant="cta"
            size="sm"
            className="w-full rounded-full transition-shadow shadow-orange hover:shadow-glow"
            onClick={handleAccept}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
