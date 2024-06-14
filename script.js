const toggle = document.getElementById("menu-toggle");
const expNav = document.getElementById("expanded-navbar");

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
  threshold: 0.5, // Increased threshold
  rootMargin: "200px", // Increased root margin
});

imgTargets.forEach((img) => imgObserver.observe(img));
