import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("webshrimp_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("webshrimp_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    sessionStorage.setItem("webshrimp_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100] w-72 sm:w-80 aspect-square animate-fade-up drop-shadow-2xl">
      <div className="w-full h-full bg-white/90 backdrop-blur-2xl border border-border shadow-glow rounded-[2rem] p-7 flex flex-col justify-between">
        <button 
          onClick={handleDecline}
          className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full text-muted-foreground hover:bg-brand-blue-soft hover:text-brand-blue transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex-1 flex flex-col items-center justify-center text-center mt-2">
          <div className="h-16 w-16 rounded-full bg-brand-orange-soft flex items-center justify-center mb-4">
            <Cookie className="h-8 w-8 text-brand-orange" />
          </div>
          <h3 className="text-xl font-bold text-brand-navy mb-2">We Use Cookies</h3>
          <p className="text-sm text-muted-foreground leading-relaxed px-1">
            We use cookies to improve your experience, personalize content, and analyze our site traffic.
          </p>
        </div>

        <div className="flex gap-3 mt-4">
          <Button variant="outline" size="sm" className="w-full rounded-full border-border hover:bg-brand-blue-soft hover:text-brand-blue font-semibold transition-colors" onClick={handleDecline}>
            Decline
          </Button>
          <Button variant="cta" size="sm" className="w-full rounded-full shadow-orange hover:shadow-glow transition-shadow" onClick={handleAccept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
