// ========== FILTROS DEL CATÁLOGO ==========
function filtrar(cat) {
    const items = document.querySelectorAll('.item');
    const btns = document.querySelectorAll('.btn-f');
    
    btns.forEach(b => b.classList.remove('active'));
    
    if (event && event.target && event.target.tagName === 'BUTTON') {
        event.target.classList.add('active');
    } else if (document.getElementById('btn-todo')) {
        document.getElementById('btn-todo').classList.add('active');
    }
    
    items.forEach(item => {
        if (cat === 'todo' || item.classList.contains(cat)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

window.filtrar = filtrar;