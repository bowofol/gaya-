const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    document.body.classList.remove("nav-open");
    menuButton?.setAttribute("aria-label", "Open navigation");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.body.classList.remove("nav-open");
    menuButton?.setAttribute("aria-label", "Open navigation");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

document.querySelector(".subscribe-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
});

const revealTargets = document.querySelectorAll(
  [
    ".story-copy",
    ".photo-collage img",
    ".service-card",
    ".menus .section-heading",
    ".menu-item",
    ".testimonials .section-heading",
    ".testimonial-grid article",
    ".chefs .section-heading",
    ".chef-grid article",
    ".footer-top",
    ".footer-main > *",
  ].join(",")
);

revealTargets.forEach((element, index) => {
  element.classList.add("reveal");
  element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.16,
    }
  );

  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}
