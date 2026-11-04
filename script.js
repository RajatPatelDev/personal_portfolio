// PORTFOLIO SCRIPT
// Keep project content in this data array; the renderer builds the cards below.
const projects = [
  // Example:
  // {
  //   name: "ServiceOS",
  //   type: "SAAS PRODUCT",
  //   status: "IN DEVELOPMENT",
  //   description: "A field-service platform concept for teams managing jobs, customers and operations.",
  //   url: "https://github.com/RajatPatelDev/your-repository"
  // }
];

// PROJECT RENDERING
const projectGrid = document.querySelector("#project-grid");
const projectEmpty = document.querySelector("#project-empty");

function createProjectCard(project) {
  const card = document.createElement("a");
  card.className = "project-card";
  card.href = project.url;
  card.target = "_blank";
  card.rel = "noopener noreferrer";

  const cardTop = document.createElement("div");
  cardTop.className = "project-card-top";

  const type = document.createElement("span");
  type.className = "project-type";
  type.textContent = project.type;

  const status = document.createElement("span");
  status.className = "project-state";
  status.textContent = project.status;

  const title = document.createElement("h3");
  title.textContent = project.name;

  const description = document.createElement("p");
  description.textContent = project.description;

  const linkLabel = document.createElement("span");
  linkLabel.className = "project-link";
  linkLabel.textContent = "View project ↗";

  cardTop.append(type, status);
  card.append(cardTop, title, description, linkLabel);

  return card;
}

function isValidProject(project) {
  if (!project || typeof project !== "object") return false;

  const requiredText = ["name", "type", "status", "description", "url"];
  if (!requiredText.every((key) => typeof project[key] === "string" && project[key].trim())) {
    return false;
  }

  try {
    const url = new URL(project.url, window.location.href);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

if (projectGrid && projectEmpty) {
  const validProjects = projects.filter(isValidProject);
  const cards = document.createDocumentFragment();

  validProjects.forEach((project) => {
    cards.append(createProjectCard(project));
  });

  projectGrid.replaceChildren(cards);
  projectEmpty.hidden = validProjects.length > 0;
}

// FOOTER YEAR
const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// MOBILE NAVIGATION
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

function closeNavigation() {
  nav?.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNavigation();
});

document.addEventListener("click", (event) => {
  if (!nav?.classList.contains("open")) return;

  const target = event.target;
  if (!(target instanceof Node)) return;

  if (!nav.contains(target) && !menuToggle?.contains(target)) {
    closeNavigation();
  }
});

// THEME SWITCHER
const themeLamp = document.querySelector(".theme-pull");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const themeStorageKey = "rajat-portfolio-theme";

function getSavedTheme() {
  try {
    return localStorage.getItem(themeStorageKey) || "light";
  } catch {
    return "light";
  }
}

function applyTheme(theme) {
  const selectedTheme = theme === "dark" ? "dark" : "light";
  const isDark = selectedTheme === "dark";

  document.body.dataset.theme = selectedTheme;

  if (themeLamp) {
    themeLamp.setAttribute("aria-pressed", String(isDark));
    themeLamp.setAttribute(
      "aria-label",
      isDark ? "Switch to day mode" : "Switch to night mode"
    );
    themeLamp.setAttribute(
      "title",
      isDark ? "Switch to day mode" : "Switch to night mode"
    );
  }

  themeColorMeta?.setAttribute(
    "content",
    isDark ? "#0d141b" : "#f7f9fa"
  );

  try {
    localStorage.setItem(themeStorageKey, selectedTheme);
  } catch {
    // The theme remains usable for the current visit without storage.
  }
}

// New visitors start in day mode; returning visitors keep their preference.
applyTheme(getSavedTheme());

themeLamp?.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";

  themeLamp.classList.remove("is-clicked");
  void themeLamp.offsetWidth;
  themeLamp.classList.add("is-clicked");

  applyTheme(nextTheme);

  window.setTimeout(() => {
    themeLamp.classList.remove("is-clicked");
  }, 420);
});
