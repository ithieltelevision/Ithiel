// ========== CARRUSEL DE IMÁGENES ==========
let currentIndex = 0;
const totalSlides = 4;
const slidesContainer = document.getElementById('slides');
const dots = document.querySelectorAll('.dot');
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let timer;

function actualizarCarrusel() {
    if (!slidesContainer) return;
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
    if (dots) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
}

function setSliderPosition() {
    if (slidesContainer) {
        slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
    }
}

function irASlide(idx) {
    if (!slidesContainer) return;
    currentIndex = idx;
    slidesContainer.style.transition = 'transform 0.5s cubic-bezier(0,.51,.07,.04)';
    actualizarCarrusel();
    reiniciarTimer();
}

function siguienteSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    irASlide(currentIndex);
}

function reiniciarTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(siguienteSlide, 6000);
}

function touchStart(event) {
    if (!slidesContainer) return;
    startX = event.touches[0].clientX;
    clearInterval(timer);
    slidesContainer.style.transition = 'none';
    animationID = requestAnimationFrame(animation);
}

function touchMove(event) {
    if (!slidesContainer || startX === 0) return;
    const currentX = event.touches[0].clientX;
    const diff = currentX - startX;
    
    if ((currentIndex === 0 && diff > 0) || (currentIndex === totalSlides - 1 && diff < 0)) {
        currentTranslate = prevTranslate + diff * 0.2;
    } else {
        currentTranslate = prevTranslate + diff;
    }
}

function touchEnd() {
    if (!slidesContainer) return;
    cancelAnimationFrame(animationID);
    const movedBy = currentTranslate - prevTranslate;
    
    if (movedBy < -70 && currentIndex < totalSlides - 1) currentIndex += 1;
    if (movedBy > 70 && currentIndex > 0) currentIndex -= 1;
    
    irASlide(currentIndex);
    startX = 0;
}

function animation() {
    setSliderPosition();
    if (startX !== 0) requestAnimationFrame(animation);
}

const slider = document.getElementById('slider');
if (slider) {
    slider.addEventListener('touchstart', touchStart);
    slider.addEventListener('touchend', touchEnd);
    slider.addEventListener('touchmove', touchMove);
    reiniciarTimer();
}