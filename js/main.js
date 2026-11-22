// Animación de entrada (Loader)
// Se oculta en cuanto el DOM está listo, sin esperar imágenes ni recursos externos.

(function () {
    const TIEMPO_EXPOSICION = 1200;
    let ocultado = false;

    function ocultarLoader() {
        if (ocultado) return;
        ocultado = true;

        const loader = document.getElementById('loader');
        if (!loader) {
            document.body.style.overflow = 'auto';
            return;
        }

        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 600);
    }

    function iniciarLoader() {
        setTimeout(ocultarLoader, TIEMPO_EXPOSICION);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciarLoader);
    } else {
        iniciarLoader();
    }

    // Red de seguridad: pase lo que pase, a los 3 s se libera la página
    setTimeout(ocultarLoader, 3000);
})();
