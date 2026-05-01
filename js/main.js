
// Este archivo carga todos los módulos y la animación de entrada

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Los módulos ya están cargados por los script tags en el HTML
});

// Animación de entrada (Loader)
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const TIEMPO_EXPOSICION = 1200;
    
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 600);
        }, TIEMPO_EXPOSICION);
    }
});