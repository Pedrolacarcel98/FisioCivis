function includeHTML(callback) {
    const elements = document.querySelectorAll("[data-include]"); // Busca elementos con 'data-include'
    let remaining = elements.length;

    if (remaining === 0) {
        if (callback) callback(); // Si no hay elementos, ejecuta el callback de inmediato
        return;
    }

    elements.forEach(el => {
        const file = el.getAttribute("data-include");
        fetch(file)
            .then(response => response.text())
            .then(data => {
                el.innerHTML = data;
                el.removeAttribute("data-include"); // Limpia el atributo una vez cargado

                remaining--; 
                if (remaining === 0 && callback) callback(); // Ejecuta el callback cuando termine
            })
            .catch(error => console.error("Error cargando", file, error));
    });
}
