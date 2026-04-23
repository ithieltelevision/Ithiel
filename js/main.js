/**
 * ==================== MENÚ LATERAL ====================
 * Controla la apertura, cierre y overlay del menú hamburguesa
 */

// Selección de elementos del DOM
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');

// Evento para ABRIR el menú - se ejecuta solo si existe el botón 'abrir'
if (document.getElementById('abrir')) {
    document.getElementById('abrir').onclick = () => { 
        if(menu) menu.classList.add('active');      // Muestra el menú
        if(overlay) overlay.classList.add('active'); // Muestra el overlay oscuro
    }
}

/**
 * Función para CERRAR el menú lateral
 * Elimina las clases 'active' del menú y del overlay
 */
function cerrar() { 
    if(menu) menu.classList.remove('active'); 
    if(overlay) overlay.classList.remove('active'); 
}

// Asigna evento de cierre al botón 'cerrar' (X) si existe
if (document.getElementById('cerrar')) document.getElementById('cerrar').onclick = cerrar;

// Asigna evento de cierre al overlay (clic fuera del menú)
if (overlay) overlay.onclick = cerrar;

/**
 * Función para volver al inicio de la página
 *desplazamiento suave hacia arriba y cierra el menú
 */
function irAlInicio() { 
    window.scrollTo({ top: 0, behavior: 'smooth' });  // Scroll suave al top
    cerrar();       
}

/*==== CARRUSEL DE IMÁGENES ====*/

let currentIndex = 0;          // Índice de la diapositiva actual (0-3)
const totalSlides = 4;         // Número total de diapositivas
const slidesContainer = document.getElementById('slides');  // Contenedor de slides
const dots = document.querySelectorAll('.dot');             // Puntos indicadores
let startX = 0;                 // Posición inicial del touch
let currentTranslate = 0;       // Posición actual de traslación
let prevTranslate = 0;          // Posición anterior de traslación
let animationID = 0;            // ID de la animación requestAnimationFrame
let timer;                      // Timer para el cambio automático

/**
 * Actualiza la posición del carrusel y los puntos indicadores
 */
function actualizarCarrusel() {
    if (!slidesContainer) return;
    // Calcula la traslación basada en el ancho de la ventana
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
    // Actualiza la clase 'active' en los puntos indicadores
    if (dots) dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
}

/**
 * Cambia a una diapositiva específica por índice
 * @param {number} idx - Índice de la diapositiva destino (0-3)
 */
function irASlide(idx) {
    if (!slidesContainer) return;
    currentIndex = idx;
    slidesContainer.style.transition = 'transform 0.5s cubic-bezier(0,.51,.07,.04)';
    actualizarCarrusel();
    reiniciarTimer();  // Reinicia el timer de cambio automático
}

/**
 * Avanza a la siguiente diapositiva (efecto "siguiente")
 */
function siguienteSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;  // Ciclo circular
    irASlide(currentIndex);
}

/**
 * Reinicia el intervalo de cambio automático*/
function reiniciarTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(siguienteSlide, 6000);  // Cambia cada 6 segundos
}

const slider = document.getElementById('slider');

/**
 * Manejador del evento touchstart (inicio del toque)
 * @param {TouchEvent} event - Evento táctil
 */
function touchStart(event) {
    if (!slidesContainer) return;
    startX = event.touches[0].clientX;        // Guarda posición inicial X
    clearInterval(timer);                      // Pausa el cambio automático
    slidesContainer.style.transition = 'none'; // Elimina transición para arrastre suave
    animationID = requestAnimationFrame(animation); // Inicia animación
}

/**
 * Manejador del evento touchmove (movimiento durante el toque)
 * @param {TouchEvent} event - Evento táctil
 */
function touchMove(event) {
    if (!slidesContainer || startX === 0) return;
    const currentX = event.touches[0].clientX;
    const diff = currentX - startX;            // Diferencia de desplazamiento
    
    // Efecto de resistencia en los bordes (no permite pasar del primero/último)
    if ((currentIndex === 0 && diff > 0) || (currentIndex === totalSlides - 1 && diff < 0)) {
        currentTranslate = prevTranslate + diff * 0.2;  // Resistencia (20%)
    } else {
        currentTranslate = prevTranslate + diff;         // Movimiento normal
    }
}

/* Determina si debe cambiar de diapositiva según la distancia arrastrada
 */
function touchEnd() {
    if (!slidesContainer) return;
    cancelAnimationFrame(animationID);
    const movedBy = currentTranslate - prevTranslate;  // Distancia total arrastrada
    
    // Umbral de 70px para cambiar de diapositiva
    if (movedBy < -70 && currentIndex < totalSlides - 1) currentIndex += 1;  // Deslizar izquierda
    if (movedBy > 70 && currentIndex > 0) currentIndex -= 1;                 // Deslizar derecha
    
    irASlide(currentIndex);
}

/** animación contin durant gesto*/
function animation() {
    setSliderPosition();
    if (startX !== 0) requestAnimationFrame(animation);
}

/** Aplica la transformación translateX al contenedor de slides */
function setSliderPosition() {
    if (slidesContainer) slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
}

// Asigna los event listeners para touch solo si existe el slider
if (slider) {
    slider.addEventListener('touchstart', touchStart);
    slider.addEventListener('touchend', touchEnd);
    slider.addEventListener('touchmove', touchMove);
     reiniciarTimer();
}

/**=== FILTROS DEL CATÁLOGO==*/
function filtrar(cat) {
    const items = document.querySelectorAll('.item');  // Todos los videos
    const btns = document.querySelectorAll('.btn-f');  // Botones de filtro
    
    // Remueve la clase 'active' de todos los botones
    btns.forEach(b => b.classList.remove('active'));
    
    // Marca el botón clickeado como activo
    if (event && event.target && event.target.tagName === 'BUTTON') {
        event.target.classList.add('active');
    } else if (document.getElementById('btn-todo')) {
        document.getElementById('btn-todo').classList.add('active');
    }
    
    // Muestra/oculta elementos según la categoría
    items.forEach(item => {
        item.style.display = (cat === 'todo' || item.classList.contains(cat)) ? 'block' : 'none';
    });
}

/** imagenes de ithiel */

// Variable global para compartir
let currentShareData = { title: '', url: '' };

function abrirImagen(url, titulo, descripcion) {
    const modal = document.getElementById('modalImagen');
    const imgFull = document.getElementById('imgFull');
    const btnDescargar = document.getElementById('btnDescargar');
    const txtTitulo = document.getElementById('modalTitulo');
    const txtDesc = document.getElementById('modalDescripcion');
    
    if (modal && imgFull) {
        // Asignar Imagen
        imgFull.src = url;
        
        // Asignar Texto
        txtTitulo.innerText = titulo;
        txtDesc.innerText = descripcion;
        
        // Configurar Descarga
        if (btnDescargar) {
            btnDescargar.href = url;
            btnDescargar.download = url.split('/').pop(); 
        }

        // Guardar datos para compartir
        currentShareData.title = titulo;
        currentShareData.url = window.location.href; // O puedes usar la URL de la imagen

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function cerrarImagen() {
    document.getElementById('modalImagen').style.display = 'none';
    document.body.style.overflow = 'auto';
}

/** Función para compartir usando la API nativa del navegador */
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
        // Fallback si el navegador no soporta Web Share
        alert("Copiado al portapapeles: " + currentShareData.url);
        navigator.clipboard.writeText(currentShareData.url);
    }
}

/*animacion de inicio*/
window.addEventListener('load',()=>{
    const loader=
    document.getElementById('loader');
    const TIEMPO_EXPOSIVION = 1200;// es igual a 1.2 segundo.
    
    if (loader){
        setTimeout(()=>{
            //1 inicio desvanecimiento(opavidad a 0
                loader .style.opacity = '0';
                
                setTimeout(() =>{
                    
                    loader.style.display='none';
                    
 document.body.style.overflow= 'auto';},600);//Espera que termine transicion de 0.6s del css
        },TIEMPO_EXPOSIVION);
        
        }
    });
        