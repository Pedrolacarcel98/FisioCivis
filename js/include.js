document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-include]").forEach(el => {
        let file = el.getAttribute("data-include");
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`Error al cargar ${file}`);
                return response.text();
            })
            .then(data => el.innerHTML = data)
            .catch(error => console.error(error));
    });
});
