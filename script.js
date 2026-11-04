// Add projects here when their live site or source repository is ready.
const projects = [
  // Example:
  // { name: "ServiceOS", type: "SAAS PRODUCT", status: "IN DEVELOPMENT", description: "A field-service platform concept for teams managing jobs, customers and operations.", url: "https://github.com/RajatPatelDev/your-repository" }
];

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

document.querySelector("#year").textContent = new Date().getFullYear();
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