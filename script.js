document.addEventListener("DOMContentLoaded", () => {
 
  /* ─── YEAR ─── */
  document.getElementById("year").textContent = new Date().getFullYear();
 
  /* ─── CUSTOM CURSOR ─── */
  const dot  = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  let mx = 0, my = 0, rx = 0, ry = 0;
 
  document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
  (function animCursor() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    dot.style.left  = mx + "px";
    dot.style.top   = my + "px";
    ring.style.left = rx + "px";
    ring.style.top  = ry + "px";
    requestAnimationFrame(animCursor);
  })();
 
  document.querySelectorAll("a, button, .stag, .stat-card, .cert-card, .tl-card").forEach(el => {
    el.addEventListener("mouseenter", () => {
      ring.style.width  = "54px";
      ring.style.height = "54px";
      ring.style.borderColor = "rgba(0,245,212,0.9)";
    });
    el.addEventListener("mouseleave", () => {
      ring.style.width  = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "rgba(0,245,212,0.6)";
    });
  });
 
  /* ─── ROLE TYPEWRITER ─── */
  const roles = [
    "Software Dev Student",
    "Help Desk Pro",
    "Networking Intern",
    "Future Full-Stack Dev"
  ];
  let ri = 0, ci = 0, deleting = false;
  const roleEl = document.getElementById("roleText");
 
  function typeRole() {
    const current = roles[ri];
    if (!deleting) {
      roleEl.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; setTimeout(typeRole, 1800); return; }
    } else {
      roleEl.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(typeRole, deleting ? 45 : 80);
  }
  typeRole();
 
  /* ─── MOBILE MENU ─── */
  const toggle  = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
 
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    sidebar.classList.toggle("active");
  });
  document.addEventListener("click", e => {
    if (sidebar.classList.contains("active") &&
        !sidebar.contains(e.target) &&
        !toggle.contains(e.target)) {
      toggle.classList.remove("active");
      sidebar.classList.remove("active");
    }
  });
 
  /* ─── ACTIVE NAV ON SCROLL ─── */
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-item");
 
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(n => n.classList.remove("active"));
        const active = document.querySelector(`.nav-item[data-section="${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { threshold: 0.4 });
 
  sections.forEach(s => navObserver.observe(s));
 
  /* ─── SMOOTH NAV CLICK ─── */
  navItems.forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(item.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
      // close mobile
      toggle.classList.remove("active");
      sidebar.classList.remove("active");
    });
  });
 
  /* ─── SCROLL REVEAL ─── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObs.unobserve(entry.target);
 
        /* ── Animate stat counters ── */
        entry.target.querySelectorAll(".stat-card[data-count]").forEach(card => {
          animateCount(card);
        });
 
        /* ── Animate skill bars ── */
        entry.target.querySelectorAll(".skill-bar-row[data-level]").forEach(row => {
          const fill = row.querySelector(".bar-fill");
          fill.style.width = row.dataset.level + "%";
        });
 
        /* ── Animate progress rings ── */
        entry.target.querySelectorAll(".ring-fill[data-pct]").forEach(ring => {
          const pct = parseFloat(ring.dataset.pct) / 100;
          const circ = 2 * Math.PI * 24;
          ring.style.strokeDasharray = (pct * circ) + " " + circ;
        });
      }
    });
  }, { threshold: 0.15 });
 
  document.querySelectorAll(".fade-up").forEach(el => revealObs.observe(el));
 
  function animateCount(card) {
    const target  = +card.dataset.count;
    const suffix  = card.dataset.suffix;
    const numEl   = card.querySelector(".stat-num");
    const sfxEl   = card.querySelector(".stat-suffix");
    sfxEl.textContent = suffix;
    let start = null;
    const dur = 1200;
    function step(ts) {
      if (!start) start = ts;
      const pct  = Math.min((ts - start) / dur, 1);
      const ease = 1 - Math.pow(1 - pct, 3);
      numEl.textContent = Math.round(ease * target);
      if (pct < 1) requestAnimationFrame(step);
      else numEl.textContent = target;
    }
    requestAnimationFrame(step);
  }
 
  /* ─── SKILLS TABS ─── */
  const tabBtns     = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
 
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
 
      // animate bars on tab switch
      if (btn.dataset.tab === "dev") {
        document.querySelectorAll(".skill-bar-row[data-level]").forEach(row => {
          const fill = row.querySelector(".bar-fill");
          fill.style.width = "0%";
          setTimeout(() => { fill.style.width = row.dataset.level + "%"; }, 50);
        });
      }
    });
  });
 
  /* ─── GLITCH on name hover ─── */
  const nameEl = document.querySelector(".name");
  if (nameEl) {
    nameEl.addEventListener("mouseenter", () => {
      nameEl.style.animation = "glitch 0.4s steps(2) 2";
    });
    nameEl.addEventListener("animationend", () => {
      nameEl.style.animation = "";
    });
  }
 
});
