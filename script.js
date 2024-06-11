// document.getElementById("menu-toggle").addEventListener("change", function () {
//   document.getElementById("navbar-links-menu").classList.toggle("hidden");
// });

var toggle = document.getElementById("menu-toggle");
var expNav = document.getElementById("expanded-navbar");

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
