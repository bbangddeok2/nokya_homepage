document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".pagination-dot");
  const videos = document.querySelectorAll("video");

  let current = 0;
  const delay = 5000;
  let interval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);

      if (i === index) {
        videos[i].play();
      } else {
        videos[i].pause();
        videos[i].currentTime = 0;
      }
    });

    current = index;
  }

  function nextSlide() {
    let next = (current + 1) % slides.length;
    showSlide(next);
  }

  function start() {
    interval = setInterval(nextSlide, delay);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.index);
      showSlide(index);
      clearInterval(interval);
      start();
    });
  });

  showSlide(0);
  start();
});
