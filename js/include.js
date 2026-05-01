// js/include.js - Versión unificada
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. CARGAR SIDEBAR ==========
    if (!document.querySelector('.sidebar')) {
        fetch('components/sidebar.html')
            .then(response => {
                if (!response.ok) throw new Error('Error al cargar sidebar');
                return response.text();
            })
            .then(html => {
                // Insertar después del loader si existe, o al inicio
                const loader = document.getElementById('loader');
                if (loader) {
                    loader.insertAdjacentHTML('afterend', html);
                } else {
                    document.body.insertAdjacentHTML('afterbegin', html);
                }
                iniciarMenu(); // Activar eventos del menú
            })
            .catch(error => console.error('Error loading sidebar:', error));
    }
    
    // ========== 2. CARGAR FOOTER ==========
    if (!document.querySelector('footer')) {
        fetch('components/footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Error al cargar footer');
                return response.text();
            })
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
            })
            .catch(error => console.error('Error loading footer:', error));
    }
});

// =====.Js DEL MENÚ ==========
function iniciarMenu() {
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');
    const abrirBtn = document.getElementById('abrir');
    const cerrarBtn = document.getElementById('cerrar');
    
    if (!menu || !overlay) return;
    
    // Abrir menú
    if (abrirBtn) {
        abrirBtn.onclick = () => {
            menu.classList.add('active');
            overlay.classList.add('active');
        };
    }
    
    // Cerrar menú (botón X)
    if (cerrarBtn) {
        cerrarBtn.onclick = () => {
            menu.classList.remove('active');
            overlay.classList.remove('active');
        };
    }
    
    // Cerrar menú (clic en overlay)
    overlay.onclick = () => {
        menu.classList.remove('active');
        overlay.classList.remove('active');
    };
}

// ========== FUNCIÓN GLOBAL IR AL INICIO ==========
window.irAlInicio = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');
    if (menu) menu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
};