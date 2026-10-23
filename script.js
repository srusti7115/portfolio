// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal sections as they scroll into view
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll(".section")
  .forEach((section) => revealObserver.observe(section));

// Highlight the nav link of the visible section
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) =>
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          )
        );
      }
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

document
  .querySelectorAll("main section[id]")
  .forEach((section) => sectionObserver.observe(section));

// Mobile menu
const toggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("nav-links");

function setMenu(open) {
  menu.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

toggle.addEventListener("click", () =>
  setMenu(!menu.classList.contains("open"))
);

navLinks.forEach((link) =>
  link.addEventListener("click", () => setMenu(false))
);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});