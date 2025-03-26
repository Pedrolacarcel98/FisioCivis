// Autor: Pedro Lacárcel

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
      // Si el menú está oculto, lo mostramos con display flex en dirección columna (para móviles)
      if (menu.classList.contains("hidden")) {
        menu.classList.remove("hidden");
        menu.classList.add("flex", "flex-col");
      } else {
        // De lo contrario, lo ocultamos
        menu.classList.add("hidden");
        menu.classList.remove("flex", "flex-col");
      }
    });
  }
});
