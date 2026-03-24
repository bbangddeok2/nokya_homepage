document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".pagination-dot");
  const videos = document.querySelectorAll(".hero-slide video");
  const controlButton = document.querySelector(".hero-control");

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
    controlButton.textContent = "Play";
  }

  function resumeSlider() {
    isPaused = false;
    videos[current].play().catch(() => {});
    startAutoSlide();
    controlButton.textContent = "Pause";
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

  showSlide(0);
  startAutoSlide();
});
