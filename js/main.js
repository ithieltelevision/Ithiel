// Oculta el loader de página sin esperar a que terminen de cargar las imágenes o videos.
(function () {
    const TIEMPO_EXPOSICION = 1200;
    let loaderOculto = false;

    function ocultarLoader() {
        if (loaderOculto) return;
        loaderOculto = true;

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
        document.addEventListener('DOMContentLoaded', iniciarLoader, { once: true });
    } else {
        iniciarLoader();
    }

    // Seguridad adicional para que el contenido nunca quede tapado por el loader.
    setTimeout(ocultarLoader, 3000);
})();

// Muestra la animación de Ithiel TV mientras cargan imágenes y reproductores.
(function () {
    const EXCLUDED_IMAGES = '.loader-logo, .spinner-png, .logo-main, .f-logo';

    function finalizarCarga(wrapper) {
        if (!wrapper || !wrapper.classList.contains('media-pending')) return;
        wrapper.classList.remove('media-pending');
        wrapper.classList.add('media-loaded');
    }

    function prepararImagen(img) {
        if (img.matches(EXCLUDED_IMAGES)) return;

        let wrapper = img.parentElement;
        if (!wrapper || !wrapper.classList.contains('media-loading-wrapper')) {
            wrapper = document.createElement('span');
            wrapper.className = 'media-loading-wrapper';
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);
        }

        // Mantiene las proporciones y estilos propios de cada imagen.
        if (img.closest('.grid-card')) wrapper.classList.add('media-grid-wrapper');
        if (img.classList.contains('conocenos-img')) wrapper.classList.add('media-conocenos-wrapper');
        if (img.id === 'imgFull') wrapper.classList.add('media-modal-wrapper');

        if (!img.getAttribute('src')) return;

        wrapper.classList.add('media-pending');
        wrapper.classList.remove('media-loaded');

        if (!img.dataset.mediaListeners) {
            img.dataset.mediaListeners = 'true';
            img.addEventListener('load', () => finalizarCarga(wrapper), { once: true });
            img.addEventListener('error', () => finalizarCarga(wrapper), { once: true });
        }

        // Las imágenes en caché pueden estar listas antes de registrar los eventos.
        if (img.complete) {
            finalizarCarga(wrapper);
        }
    }

    function prepararIframe(iframe) {
        const wrapper = iframe.closest('.vid') || iframe.parentElement;
        if (!wrapper) return;

        wrapper.classList.add('media-video-wrapper');
        if (iframe.dataset.mediaListeners) return;

        iframe.dataset.mediaListeners = 'true';
        wrapper.classList.add('media-pending');
        iframe.addEventListener('load', () => finalizarCarga(wrapper), { once: true });
        iframe.addEventListener('error', () => finalizarCarga(wrapper), { once: true });
    }

    function prepararMedios(root) {
        if (!root) return;

        if (root.matches && root.matches('img')) prepararImagen(root);
        if (root.matches && root.matches('iframe')) prepararIframe(root);

        if (root.querySelectorAll) {
            root.querySelectorAll('img').forEach(prepararImagen);
            root.querySelectorAll('iframe').forEach(prepararIframe);
        }
    }

    function iniciarAnimacionesMedios() {
        prepararMedios(document);

        // Atiende imágenes agregadas después, como la imagen abierta en el modal.
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.target.tagName === 'IMG') {
                    prepararImagen(mutation.target);
                }
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) prepararMedios(node);
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['src']
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciarAnimacionesMedios, { once: true });
    } else {
        iniciarAnimacionesMedios();
    }
})();
