// main.js: runs in the browser and adds two small features.

// ---- 1. Phone menu: the "Menu" button opens and closes the sidebar menu ----
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menu-toggle");

function setMenu(open) {
  sidebar.classList.toggle("is-open", open);          // CSS shows/hides the menu
  menuToggle.setAttribute("aria-expanded", open);      // tells screen readers the state
  menuToggle.textContent = open ? "Close" : "Menu";
}

menuToggle.addEventListener("click", () => {
  setMenu(!sidebar.classList.contains("is-open"));
});

// Close the menu after tapping a menu link (so it doesn't cover the page)
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

// ---- 2. Highlight the menu link of the section you're viewing ----
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px" } // counts a section as "current" near mid-screen
);

sections.forEach((section) => observer.observe(section));