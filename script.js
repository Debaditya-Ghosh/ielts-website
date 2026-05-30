const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const header = document.querySelector("[data-header]");
const planButtons = document.querySelectorAll("[data-plan]");
const planCards = document.querySelectorAll("[data-plan-card]");
const bookingForm = document.querySelector("#booking-form");
const formStatus = document.querySelector(".form-status");
const whatsappButton = document.querySelector("#whatsapp-button");
const whatsappNumber = "918389071003";

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    siteNav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 20);
});

planButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.plan;
    const selectedCard = document.querySelector(`[data-plan-card="${selected}"]`);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    planButtons.forEach((item) => item.classList.toggle("active", item === button));
    planCards.forEach((card) => {
      card.classList.toggle("selected", card.dataset.planCard === selected);
    });

    selectedCard?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start"
    });
  });
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  whatsappButton?.click();
});

whatsappButton?.addEventListener("click", () => {
  if (!bookingForm.reportValidity()) {
    formStatus.textContent = "Fill the required details first, then send them on WhatsApp.";
    return;
  }

  const form = new FormData(bookingForm);
  const name = String(form.get("name") || "").trim();
  const age = String(form.get("age") || "").trim();
  const band = String(form.get("band") || "").trim();
  const testType = String(form.get("testType") || "").trim();
  const plan = String(form.get("plan") || "").trim();
  const date = String(form.get("date") || "").trim() || "Not decided yet";
  const worry = String(form.get("worry") || "").trim() || "I would like guidance after my band check.";
  const message = [
    "Hi Crackin', I want to book a free band check.",
    "",
    `Name: ${name}`,
    `Age group: ${age}`,
    `Target band: ${band}`,
    `IELTS test type: ${testType}`,
    `Preparation plan: ${plan}`,
    `Exam date: ${date}`,
    `Biggest IELTS worry: ${worry}`,
    "",
    "Please help me choose the right IELTS plan."
  ].join("\n");

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  formStatus.textContent = "Opening WhatsApp with your band check message.";
});
