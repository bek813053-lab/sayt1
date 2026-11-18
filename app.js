
document.addEventListener("DOMContentLoaded", () => {

  // MOBILE NAVBAR
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    const icon = menuToggle.querySelector("i");

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
  });

  // CLOSE MOBILE MENU AFTER CLICK
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");

      const icon = menuToggle.querySelector("i");
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    });
  });

  // CAROUSEL
  const track = document.getElementById("carouselTrack");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const dotsContainer = document.getElementById("carouselDots");

  const cards = [...track.querySelectorAll(".movie-card")];

  let currentIndex = 0;

  function getStep() {
    const card = cards[0];
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.gap) || 0;

    return card.getBoundingClientRect().width + gap;
  }

  function getMaxIndex() {
    return Math.max(
      0,
      Math.ceil(
        (track.scrollWidth - track.clientWidth) / getStep()
      )
    );
  }

  function updateCarousel() {
    const maxIndex = getMaxIndex();

    currentIndex = Math.min(currentIndex, maxIndex);

    track.scrollTo({
      left: currentIndex * getStep(),
      behavior: "smooth"
    });

    dotsContainer.innerHTML = "";

    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement("button");

      dot.className =
        "carousel-dot" + (i === currentIndex ? " active" : "");

      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

      dot.addEventListener("click", () => {
        currentIndex = i;
        updateCarousel();
      });

      dotsContainer.appendChild(dot);
    }

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;

    prevBtn.style.opacity = currentIndex === 0 ? ".35" : "1";
    nextBtn.style.opacity =
      currentIndex >= maxIndex ? ".35" : "1";
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < getMaxIndex()) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // DETECT MANUAL SWIPING
  let scrollTimeout;

  track.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      currentIndex = Math.round(track.scrollLeft / getStep());
      updateCarousel();
    }, 100);
  });

  // RESPONSIVE CAROUSEL
  window.addEventListener("resize", () => {
    currentIndex = Math.min(currentIndex, getMaxIndex());
    updateCarousel();
  });

  updateCarousel();

  // SMOOTH SCROLL FOR INTERNAL LINKS
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector(link.getAttribute("href"));

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

});
