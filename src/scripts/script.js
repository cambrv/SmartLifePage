document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('open-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcons = menuButton.querySelectorAll('svg');

    // Manejo del botón de menú móvil
    menuButton.addEventListener('click', () => {
        // Alternar la visibilidad del menú móvil
        mobileMenu.classList.toggle('hidden');

        // Alternar entre mostrar los íconos de abrir y cerrar
        menuIcons.forEach(icon => icon.classList.toggle('hidden'));
    });

    // Manejo de la carga de archivos HTML en el contenedor principal
    const links = document.querySelectorAll('[data-page]');
    const content = document.getElementById('content');

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const page = this.getAttribute('data-page');

            // Fetch para obtener el contenido de la página seleccionada
            fetch(page)
                .then(response => response.text())
                .then(data => {
                    content.innerHTML = data;

                    // Cerrar el menú móvil automáticamente después de hacer clic en un enlace (solo en móvil)
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        menuIcons.forEach(icon => icon.classList.toggle('hidden'));
                    }
                })
                .catch(error => {
                    content.innerHTML = '<p class="text-red-500">Error al cargar la página.</p>';
                });
        });
    });

    // Cargar la página inicial por defecto (inicio.html)
    fetch('inicio.html')
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;
        })
        .catch(error => {
            content.innerHTML = '<p class="text-red-500">Error al cargar la página de inicio.</p>';
        });
});
