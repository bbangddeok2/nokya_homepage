document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".pagination-dot");
  const videos = document.querySelectorAll(".hero-slide video");
  const controlButton = document.querySelector(".hero-control");

  const menuToggle = document.querySelector(".menu-toggle");
  const menuClose = document.querySelector(".menu-close");
  const fullMenu = document.querySelector(".full-menu");
  const body = document.body;

  let current = 0;
  const delay = 5000;
  let interval = null;
  let isPaused = false;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      const isActive = i === index;
      slide.classList.toggle("active", isActive);
      dots[i].classList.toggle("active", isActive);

      if (isActive) {
        if (!isPaused) {
          videos[i].play().catch(() => {});
        }
      } else {
        videos[i].pause();
        videos[i].currentTime = 0;
      }
    });

    current = index;
  }

  function nextSlide() {
    const next = (current + 1) % slides.length;
    showSlide(next);
  }

  function startAutoSlide() {
    stopAutoSlide();
    interval = setInterval(nextSlide, delay);
  }

  function stopAutoSlide() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function pauseSlider() {
    isPaused = true;
    stopAutoSlide();
    videos[current].pause();
    if (controlButton) controlButton.textContent = "Play";
  }

  function resumeSlider() {
    isPaused = false;
    videos[current].play().catch(() => {});
    startAutoSlide();
    if (controlButton) controlButton.textContent = "Pause";
  }

  function openMenu() {
    fullMenu.classList.add("active");
    body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
    fullMenu.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    fullMenu.classList.remove("active");
    body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    fullMenu.setAttribute("aria-hidden", "true");
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.index);
      showSlide(index);

      if (!isPaused) {
        startAutoSlide();
      }
    });
  });

  if (controlButton) {
    controlButton.addEventListener("click", () => {
      if (isPaused) {
        resumeSlider();
      } else {
        pauseSlider();
      }
    });
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", openMenu);
  }

  if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  showSlide(0);
  startAutoSlide();
});
