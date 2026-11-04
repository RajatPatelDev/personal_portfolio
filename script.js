// PORTFOLIO SCRIPT — project content, footer year, and mobile navigation.
// PROJECT DATA: Add a project here when its live site or source repository is ready.
const projects = [
  // Example:
  // { name: "ServiceOS", type: "SAAS PRODUCT", status: "IN DEVELOPMENT", description: "A field-service platform concept for teams managing jobs, customers and operations.", url: "https://github.com/RajatPatelDev/your-repository" }
];

// PROJECT RENDERING: Builds the project cards from the projects array above.
const projectGrid = document.querySelector("#project-grid");
const projectEmpty = document.querySelector("#project-empty");

if (projects.length && projectGrid && projectEmpty) {
  projectEmpty.hidden = true;
  projectGrid.innerHTML = projects.map((project) => `
    <a class="project-card" href="${project.url}" target="_blank" rel="noreferrer">
      <div class="project-card-top"><span class="project-type">${project.type}</span><span class="project-state">${project.status}</span></div>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <span class="project-link">View project ↗</span>
    </a>
  `).join("");
}

// FOOTER YEAR: Keeps the copyright year current automatically.
document.querySelector("#year").textContent = new Date().getFullYear();
// MOBILE NAVIGATION: Opens and closes the menu on smaller screens.
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

// THEME SWITCHER: Click the hanging lamp to toggle between day and night.
const themeLamp = document.querySelector(".theme-pull");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
  const selectedTheme = theme === "dark" ? "dark" : "light";
  document.body.dataset.theme = selectedTheme;

  if (themeLamp) {
    const nightMode = selectedTheme === "dark";
    themeLamp.setAttribute("aria-pressed", String(nightMode));
    themeLamp.setAttribute("aria-label", nightMode ? "Switch to day mode" : "Switch to night mode");
    themeLamp.setAttribute("title", nightMode ? "Switch to day mode" : "Switch to night mode");
  }

  themeColorMeta?.setAttribute("content", selectedTheme === "dark" ? "#0d141b" : "#f7f9fa");

  try {
    localStorage.setItem("rajat-portfolio-theme", selectedTheme);
  } catch (error) {
    // Theme switching still works for this visit if storage is unavailable.
  }
}

// Restore the saved choice. New visitors start in day mode.
let savedTheme = "light";
try {
  savedTheme = localStorage.getItem("rajat-portfolio-theme") || "light";
} catch (error) {
  savedTheme = "light";
}
applyTheme(savedTheme);

// The lamp gently swings continuously; clicking it toggles the page theme.
themeLamp?.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  themeLamp.classList.remove("is-clicked");
  void themeLamp.offsetWidth;
  themeLamp.classList.add("is-clicked");
  applyTheme(nextTheme);
  window.setTimeout(() => themeLamp.classList.remove("is-clicked"), 420);
});
