const toggle = document.getElementById("menu-toggle");
const expNav = document.getElementById("expanded-navbar");
const tempBanner = document.getElementById("temp-banner");
const dismissBtn = document.getElementById("dismiss-btn");

if (window.location.pathname === "/") {
  window.location.replace("/index.html");
}

window.addEventListener("scroll", () => {
  if (expNav.classList.contains("flex")) {
    expNav.classList.remove("flex");
    expNav.classList.add("hidden");
  }
});

toggle.addEventListener("click", () => {
  if (expNav.classList.contains("hidden")) {
    expNav.classList.remove("hidden");
    expNav.classList.add("flex");
  } else {
    expNav.classList.remove("flex");
    expNav.classList.add("hidden");
  }
});

// Reveal Sections

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Lazy loading Images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.2, // Increased threshold
  rootMargin: "300px", // Increased root margin
});

imgTargets.forEach((img) => imgObserver.observe(img));

// Close Temp Banner

dismissBtn.addEventListener("click", (e) => {
  tempBanner.classList.add("hidden");
});

// Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector("#arrow-left");
  const btnRight = document.querySelector("#arrow-right");
  const dotContainer = document.querySelector("#dots");
  const carousel = document.querySelector("#hero");
  let currentSlide = 0;
  const maxSlide = slides.length;
  let autoSlideInterval;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}" aria-label="${i}"></button>`,
      );
    });
  };

  const activateDot = function (slide) {
    const currentPage = window.location.pathname.split("/").pop();

    // Check if the current page is faq.html
    if (currentPage === "faq.html") {
      return;
    }
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      if (i === slide) {
        s.classList.add("active");
      } else {
        s.classList.remove("active");
      }
    });
  };

  // Next Slide
  const nextSlide = () => {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const startAutoSlide = () => {
    autoSlideInterval = setInterval(nextSlide, 10000); // Change slide every 10 seconds
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  const init = function () {
    const currentPage = window.location.pathname.split("/").pop();
    // Check if the current page is faq.html
    if (currentPage.startsWith("faq")) {
      return;
    }
    createDots();
    activateDot(0);
    goToSlide(0); // Initialize the first slide as active
    startAutoSlide(); // Start automatic sliding
  };
  init();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const slide = Number(e.target.dataset.slide); // Ensure slide is a number
      console.log(slide); // For debugging
      goToSlide(slide);
      activateDot(slide);
    }
  });

  carousel.addEventListener("mouseenter", stopAutoSlide); // Pause auto sliding on hover
  carousel.addEventListener("mouseleave", startAutoSlide); // Resume auto sliding on mouse leave
};

slider();
