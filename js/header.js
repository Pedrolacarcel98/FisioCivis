// header.js
function initHeaderMenu() {
  const burger   = document.getElementById('burger');
  const mainMenu = document.getElementById('mainMenu');
  const servBtn  = document.getElementById('servBtn');
  const subMenu  = document.getElementById('subMenu');
  const caret    = document.getElementById('caret');

  if (!burger || !mainMenu) return; // todavía no existe el header

  /* --- Botón hamburguesa --- */
  burger.addEventListener('click', () => {
    mainMenu.classList.toggle('-translate-y-full');
  });

  /* --- Submenú Servicios (solo <768 px) --- */
  if (servBtn && subMenu) {
    subMenu.classList.add('hidden');      // oculto por defecto en móvil
    servBtn.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        subMenu.classList.toggle('hidden');
        caret?.classList.toggle('rotate-180');
      }
    });
  }
}

/* Comprueba si el header ya está y, si no, espera a que se inserte */
function waitForHeaderAndInit() {
  if (document.getElementById('burger')) {
    initHeaderMenu();
    return;                     // listo
  }

  /* Observa cambios en el DOM hasta que aparezca #burger */
  const obs = new MutationObserver(() => {
    if (document.getElementById('burger')) {
      initHeaderMenu();
      obs.disconnect();
    }
  });
  obs.observe(document.body, { childList: true, subtree: true });
}

/* Lanza la espera cuando el documento base se haya cargado */
document.addEventListener('DOMContentLoaded', waitForHeaderAndInit);
