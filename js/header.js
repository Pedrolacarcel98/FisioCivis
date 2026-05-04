/**
 * FisioCivis Premium Header Logic
 */

(function() {
    function toggleMobileMenu(forceClose = false) {
        const mobileMenu = document.getElementById('mobileMenu');
        if (!mobileMenu) return;

        const isVisible = !mobileMenu.classList.contains('invisible');

        if (isVisible || forceClose) {
            // Cerrar
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            setTimeout(() => {
                mobileMenu.classList.add('invisible');
            }, 500);
            document.body.style.overflow = '';
        } else {
            // Abrir
            mobileMenu.classList.remove('invisible');
            // Timeout para asegurar que la transición de opacidad funcione
            setTimeout(() => {
                mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    }

    document.addEventListener('click', function(e) {
        // Abrir menú
        if (e.target.closest('#burgerBtn')) {
            toggleMobileMenu();
        }

        // Cerrar menú (botón X)
        if (e.target.closest('#closeMobileBtn')) {
            toggleMobileMenu(true);
        }

        // Acordeón de servicios
        if (e.target.closest('#mobileServBtn')) {
            const subMenu = document.getElementById('mobileSubMenu');
            const caret = document.getElementById('mobileCaret');
            if (subMenu) {
                const isClosed = subMenu.style.maxHeight === '0px' || !subMenu.style.maxHeight;
                subMenu.style.maxHeight = isClosed ? subMenu.scrollHeight + 'px' : '0px';
                caret.classList.toggle('rotate-180', isClosed);
            }
        }

        // Cerrar menú al hacer clic en cualquier enlace
        if (e.target.closest('#mobileMenu a')) {
            toggleMobileMenu(true);
        }
    });

    // Efecto Scroll Navbar
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add('h-16', 'shadow-2xl', 'bg-white/100');
            navbar.classList.remove('h-20', 'bg-white/95');
        } else {
            navbar.classList.add('h-20', 'bg-white/95');
            navbar.classList.remove('h-16', 'shadow-2xl', 'bg-white/100');
        }
    });
})();
