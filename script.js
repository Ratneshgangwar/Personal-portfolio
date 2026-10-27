/* ============================================================
   Portfolio Scripts — Ratnesh Gangwar
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 1. Mobile Menu Toggle ---------- */
  const menuButton = document.getElementById("menu-icon");
  const menuIconInner = menuButton ? menuButton.querySelector("i") : null;
  const navbar = document.querySelector(".navbar");

  const closeMenu = () => {
    if (!navbar || !menuButton || !menuIconInner) return;
    navbar.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    menuIconInner.classList.remove("bx-x");
    menuIconInner.classList.add("bx-menu");
  };

  const openMenu = () => {
    if (!navbar || !menuButton || !menuIconInner) return;
    navbar.classList.add("active");
    menuButton.setAttribute("aria-expanded", "true");
    menuIconInner.classList.remove("bx-menu");
    menuIconInner.classList.add("bx-x");
  };

  if (menuButton && navbar) {
    menuButton.addEventListener("click", () => {
      const isOpen = navbar.classList.contains("active");
      isOpen ? closeMenu() : openMenu();
    });
  }

  /* Close mobile menu when a nav link is clicked */
  document.querySelectorAll(".navbar a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  /* Close on Escape key */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* Close on outside click */
  document.addEventListener("click", (e) => {
    if (
      navbar &&
      navbar.classList.contains("active") &&
      !navbar.contains(e.target) &&
      !menuButton.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* ---------- 2. Active Nav Link on Scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar a");
  const header = document.querySelector(".header");

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 150; // offset for fixed header

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          link.removeAttribute("aria-current");
        });

        const active = document.querySelector(`.navbar a[href="#${id}"]`);
        if (active) {
          active.classList.add("active");
          active.setAttribute("aria-current", "page");
        }
      }
    });

    /* Sticky header class */
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 20);
    }
  };

  /* Throttle scroll for performance */
  let scrollTicking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          updateActiveLink();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    },
    { passive: true },
  );

  /* Run once on load */
  updateActiveLink();

  /* ---------- 3. Smooth Scroll Fallback (Safari) ---------- */
  /* CSS scroll-behavior handles modern browsers; this is a fallback */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#" || href.length < 2) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition =
          target.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  /* ---------- 4. ScrollReveal (if loaded) ---------- */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (typeof ScrollReveal !== "undefined" && !prefersReducedMotion) {
    const sr = ScrollReveal({
      reset: false, // don't re-animate on every scroll back (less annoying)
      distance: "60px",
      duration: 1200,
      delay: 100,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      viewFactor: 0.15,
    });

    sr.reveal(".home-content, .heading", { origin: "top" });
    sr.reveal(".home-img", { origin: "right", delay: 200 });
    sr.reveal(".about-img", { origin: "left" });
    sr.reveal(".about-content", { origin: "right" });
    sr.reveal(".services-box", { origin: "bottom", interval: 100 });
    sr.reveal(".portfolio-box", { origin: "bottom", interval: 120 });
    sr.reveal(".contact-card", { origin: "bottom", interval: 100 });
  }

  /* ---------- 5. Typed.js ---------- */
  if (typeof Typed !== "undefined") {
    const typedEl = document.querySelector(".multiple-text");
    if (typedEl && !prefersReducedMotion) {
      new Typed(".multiple-text", {
        strings: [
          "Full Stack Developer",
          "Frontend Developer",
          "React Developer",
          "UI/UX Enthusiast",
        ],
        typeSpeed: 70,
        backSpeed: 50,
        backDelay: 1500,
        startDelay: 300,
        loop: true,
        smartBackspace: true,
        showCursor: true,
        cursorChar: "|",
      });
    } else if (typedEl) {
      // Reduced-motion: show a single static label
      typedEl.textContent = "Full Stack Developer";
    }
  }
});
