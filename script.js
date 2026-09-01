const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const faqItems = document.querySelectorAll(".faq-item");
const revealItems = document.querySelectorAll(".reveal");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const menuAberto = nav.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(menuAberto));
    menuToggle.setAttribute("aria-label", menuAberto ? "Fechar menu" : "Abrir menu");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
    });
  });
}

faqItems.forEach((item) => {
  const button = item.querySelector("button");

  if (!button) return;

  button.addEventListener("click", () => {
    const shouldOpen = !item.classList.contains("active");

    faqItems.forEach((faqItem) => {
      const faqButton = faqItem.querySelector("button");
      faqItem.classList.remove("active");

      if (faqButton) {
        faqButton.setAttribute("aria-expanded", "false");
      }
    });

    if (shouldOpen) {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

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
    threshold: 0.12,
  }
);

revealItems.forEach((element) => observer.observe(element));

const yearNode = document.querySelector("#year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}