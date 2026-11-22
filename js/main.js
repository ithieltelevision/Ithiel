
// Este archivo carga todos los módulos y la animación de entrada

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Los módulos ya están cargados por los script tags en el HTML
});

// Animación de entrada (Loader)
// Animación de entrada (Loader)
// Se activa con el DOM listo (no se espera a que carguen imágenes ni recursos pesados)
deleteLoader();

function deleteLoader() {
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
}

// Red de seguridad: si por algún motivo (localStorage bloqueado, error de script, etc.)
// el DOMContentLoaded ya pasó o no se disparó, libera el loader tras 3 segundos.
setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader && loader.style.display !== 'none') {
        loader.style.opacity = '0';
        loader.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}, 3000);
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
