document.getElementById("menu-toggle").addEventListener("click", function () {
  const menu = document.getElementById("menu");

  if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
      setTimeout(() => {
          menu.classList.add("opacity-100", "scale-100");
          menu.classList.remove("opacity-0", "scale-95");
      }, 10);
  } else {
      menu.classList.add("opacity-0", "scale-95");
      menu.classList.remove("opacity-100", "scale-100");

      setTimeout(() => {
          menu.classList.add("hidden");
      }, 300);
  }
});
