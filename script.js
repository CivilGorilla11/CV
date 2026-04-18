document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const body = document.body;

  // Mobile Menu
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    sidebar.classList.toggle("active");
    body.classList.toggle("menu-open");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (sidebar.classList.contains("active") && 
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      menuToggle.classList.remove("active");
      sidebar.classList.remove("active");
      body.classList.remove("menu-open");
    }
  });

  // Scroll Reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("reveal");
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.education-card, .summary-container, .section').forEach(el => {
    el.classList.add("reveal-hidden");
    observer.observe(el);
  });

  // Stop typewriter cursor blinking after animation
  const typewriter = document.querySelector(".typewriter-fixed");
  if (typewriter) {
    setTimeout(() => {
      typewriter.style.borderRightColor = "transparent";
    }, 7000);
  }
});