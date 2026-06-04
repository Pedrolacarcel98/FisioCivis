/**
 * Lógica del carrusel de reseñas manual.
 * Refinado para: Alturas uniformes, scroll suave uno a uno y responsive total.
 */
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('carousel-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (!container || !window.googleReviews) return;

    // Función para generar las estrellas en HTML
    const getStarsHTML = (rating) => {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += `<svg class="w-4 h-4 sm:w-5 sm:h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-200'}" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>`;
        }
        return stars;
    };

    // Renderizar reseñas con estructura de altura uniforme y control estricto de texto y desbordamiento
    const renderReviews = () => {
        container.innerHTML = window.googleReviews.map(review => `
            <div class="carousel-item min-w-[85%] sm:min-w-[45%] lg:min-w-[31%] max-w-[85%] sm:max-w-[45%] lg:max-w-[31%] snap-center shrink-0 flex py-4">
                <div class="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-50 flex flex-col w-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 h-[400px] overflow-hidden">
                    <!-- Cabecera Tarjeta: Estrellas y Fecha -->
                    <div class="flex justify-between items-start mb-4 shrink-0">
                        <div class="flex items-center gap-0.5">
                            ${getStarsHTML(review.rating)}
                        </div>
                        <span class="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-widest">${review.relative_time_description}</span>
                    </div>

                    <!-- Contenido: Texto con wrap forzado y scroll interno -->
                    <div class="flex-grow overflow-y-auto mb-6 pr-2 custom-scrollbar overflow-x-hidden">
                        <p class="text-gray-600 italic text-sm sm:text-base leading-relaxed whitespace-normal break-words">
                            "${review.text}"
                        </p>
                    </div>

                    <!-- Pie Tarjeta: Usuario -->
                    <div class="flex items-center gap-4 pt-4 border-t border-gray-50 shrink-0 mt-auto">
                        <div class="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-teal-400 to-blue-900 flex items-center justify-center text-white font-bold text-lg uppercase shadow-inner">
                            ${review.profile_photo_url ? 
                                `<img src="${review.profile_photo_url}" alt="${review.author_name}" class="w-full h-full object-cover rounded-full">` : 
                                review.author_name.charAt(0)}
                        </div>
                        <div class="min-w-0 flex-1">
                            <h4 class="font-bold text-blue-900 text-sm sm:text-base truncate">${review.author_name}</h4>
                        </div>
                        <div class="ml-auto shrink-0">
                            <img src="/images/icons/Google-Review-Symbol.png" alt="Google Review" class="w-14 sm:w-16 h-auto opacity-90 object-contain">
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    };


    renderReviews();

    // Lógica de desplazamiento precisa
    const getScrollStep = () => {
        const firstItem = container.querySelector('.carousel-item');
        return firstItem ? firstItem.offsetWidth + 24 : container.offsetWidth; // 24 es el gap (gap-6 = 1.5rem = 24px)
    };

    const scrollNext = () => {
        const maxScroll = container.scrollWidth - container.offsetWidth;
        if (container.scrollLeft >= maxScroll - 5) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
        }
    };

    const scrollPrev = () => {
        if (container.scrollLeft <= 5) {
            container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
        }
    };

    if (nextBtn) nextBtn.addEventListener('click', () => {
        scrollNext();
        resetAutoplay();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        scrollPrev();
        resetAutoplay();
    });

    // Autoplay refinado (pasando de 1 en 1)
    let autoplayInterval;
    const startAutoplay = () => {
        autoplayInterval = setInterval(scrollNext, 5000);
    };

    const resetAutoplay = () => {
        clearInterval(autoplayInterval);
        startAutoplay();
    };

    startAutoplay();

    // Pausar al interactuar
    container.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    container.addEventListener('mouseleave', startAutoplay);
    container.addEventListener('touchstart', () => clearInterval(autoplayInterval), {passive: true});
});
