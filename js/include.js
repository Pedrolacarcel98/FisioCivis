document.addEventListener('DOMContentLoaded', () => {
    // Function to include HTML content
    function includeHTML() {
        const elements = document.querySelectorAll('[data-include]');
        elements.forEach(el => {
            const file = el.getAttribute('data-include');
            if (file) {
                fetch(file)
                    .then(response => response.text())
                    .then(data => {
                        el.innerHTML = data;
                        el.removeAttribute('data-include');
                        includeHTML(); // Recursively call to handle nested includes
                    })
                    .then(() => {
                        // Attach event listener after content is loaded
                        document.getElementById('menu-toggle').addEventListener('click', () => {
                            const menu = document.getElementById('menu');
                            menu.classList.toggle('hidden');
                        });
                    });
            }
        });
    }
    includeHTML();
});