// Add a project when it has a shareable live URL or repository.
const projects = [
  // { name: "ServiceOS", type: "SAAS PRODUCT", status: "IN DEVELOPMENT", description: "A field-service platform concept for teams managing jobs, customers and operations.", url: "https://github.com/RajatPatelDev/your-repository" }
];

const grid = document.querySelector("#project-grid");
const empty = document.querySelector("#project-empty");
if (projects.length && grid && empty) {
  empty.hidden = true;
  grid.innerHTML = projects.map((p) => `
    <a class="project-card" href="${p.url}" target="_blank" rel="noreferrer">
      <div class="project-card-top"><span>${p.type}</span><span>${p.status}</span></div>
      <h3>${p.name}</h3><p>${p.description}</p>
      <span class="project-link">OPEN PROJECT ↗</span>
    </a>`).join("");
}
document.querySelector("#year").textContent = new Date().getFullYear();
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle?.setAttribute("aria-expanded", "false");
}));