import { useEffect } from "react";

/**
 * Adds .is-visible to elements with .reveal as they enter the viewport.
 * Call once at the top of a page.
 */
const useReveal = () => {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!els.length) return;

    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

export default useReveal;
