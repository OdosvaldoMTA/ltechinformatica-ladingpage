const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const menuLinks = document.querySelectorAll(".menu a");
const parallaxTarget = document.querySelector("[data-parallax]");
const header = document.querySelector(".header");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

if (header) {
  const syncHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  syncHeaderState();
  window.addEventListener("scroll", syncHeaderState, { passive: true });
}

if (parallaxTarget && !prefersReducedMotion) {
  const updateParallax = (event) => {
    const rect = parallaxTarget.getBoundingClientRect();
    const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 6;

    parallaxTarget.style.setProperty("--parallax-x", offsetX.toFixed(2));
    parallaxTarget.style.setProperty("--parallax-y", offsetY.toFixed(2));
  };

  const resetParallax = () => {
    parallaxTarget.style.setProperty("--parallax-x", "0");
    parallaxTarget.style.setProperty("--parallax-y", "0");
  };

  parallaxTarget.addEventListener("pointermove", updateParallax);
  parallaxTarget.addEventListener("pointerleave", resetParallax);
}
