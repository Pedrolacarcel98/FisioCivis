document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");
    const submenuBtn = document.getElementById("submenu-btn");
    const submenu = document.getElementById("submenu");

    // Alternar el menú hamburguesa en pantallas pequeñas
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("hidden"); // Muestra o esconde el menú
        menuBtn.textContent = menu.classList.contains("hidden") ? "☰" : "✖"; // Cambiar icono
    });

    // Alternar el submenú de "Servicios"
    submenuBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Evitar la acción predeterminada
        submenu.classList.toggle("hidden"); // Mostrar u ocultar el submenú
    });

    // Cerrar el submenú si se hace clic fuera de él
    document.addEventListener("click", (e) => {
        if (!submenu.contains(e.target) && e.target !== submenuBtn) {
            submenu.classList.add("hidden"); // Cerrar el submenú si no se hace clic en él
        }
    });
});
