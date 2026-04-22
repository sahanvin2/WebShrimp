import { useEffect } from "react";

/**
 * Adds .is-visible to elements with .reveal as they enter the viewport.
 * Call once at the top of a page.
 */
const useReveal = () => {
  useEffect(() => {
    const getPendingElements = () =>
      Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));

    if (typeof IntersectionObserver === "undefined") {
      getPendingElements().forEach((el) => el.classList.add("is-visible"));
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

    const observePending = () => {
      getPendingElements().forEach((el) => io.observe(el));
    };

    observePending();

    let rafId = 0;
    const mo = new MutationObserver(() => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        observePending();
        rafId = 0;
      });
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      mo.disconnect();
      io.disconnect();
    };
  }, []);
};

export default useReveal;
