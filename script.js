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

// THEME SWITCHER: Pull either hanging string to switch between day and night themes.
const themeSwitch = document.querySelector(".theme-pull");
const themeButtons = document.querySelectorAll("[data-theme-choice]");
const themeStatus = document.querySelector(".theme-status");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
  const selectedTheme = theme === "dark" ? "dark" : "light";
  document.body.dataset.theme = selectedTheme;

  if (themeSwitch) {
    themeSwitch.classList.toggle("is-night", selectedTheme === "dark");
  }

  if (themeStatus) {
    themeStatus.textContent = selectedTheme === "dark" ? "NIGHT MODE" : "DAY MODE";
  }

  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === selectedTheme));
  });

  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", selectedTheme === "dark" ? "#0d141b" : "#f7f9fa");
  }

  try {
    localStorage.setItem("rajat-portfolio-theme", selectedTheme);
  } catch (error) {
    // Theme still works for this visit if browser storage is unavailable.
  }
}

// Restore the visitor's last choice; the portfolio starts in day mode by default.
let savedTheme = "light";
try {
  savedTheme = localStorage.getItem("rajat-portfolio-theme") || "light";
} catch (error) {
  savedTheme = "light";
}
applyTheme(savedTheme);

// Pull animation runs before applying the selected appearance.
themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const requestedTheme = button.dataset.themeChoice;
    button.classList.remove("is-pulling");
    void button.offsetWidth;
    button.classList.add("is-pulling");

    window.setTimeout(() => {
      applyTheme(requestedTheme);
      button.classList.remove("is-pulling");
    }, 180);
  });
});
