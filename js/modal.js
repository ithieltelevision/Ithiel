// ========== MODAL DE IMÁGENES ==========
let currentShareData = { title: '', url: '' };

function abrirImagen(url, titulo, descripcion) {
    const modal = document.getElementById('modalImagen');
    const imgFull = document.getElementById('imgFull');
    const btnDescargar = document.getElementById('btnDescargar');
    const txtTitulo = document.getElementById('modalTitulo');
    const txtDesc = document.getElementById('modalDescripcion');
    
    if (modal && imgFull) {
        imgFull.src = url;
        txtTitulo.innerText = titulo;
        txtDesc.innerText = descripcion;
        
        if (btnDescargar) {
            btnDescargar.href = url;
            btnDescargar.download = url.split('/').pop();
        }
        
        currentShareData.title = titulo;
        currentShareData.url = window.location.href;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function cerrarImagen() {
    const modal = document.getElementById('modalImagen');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

async function compartirContenido() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: currentShareData.title,
                text: 'Mira este contenido en Ithiel TV: ' + currentShareData.title,
                url: currentShareData.url
            });
        } catch (err) {
            console.log('Error al compartir:', err);
        }
    } else {
        alert("Copiado al portapapeles: " + currentShareData.url);
        navigator.clipboard.writeText(currentShareData.url);
    }
}

window.abrirImagen = abrirImagen;
window.cerrarImagen = cerrarImagen;
window.compartirContenido = compartirContenido;