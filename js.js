const book = document.getElementById('book');
const cover = document.getElementById('cover');
const pages = Array.from(document.querySelectorAll('.page')); // Todas las páginas internas
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const closeBookBtn = document.getElementById('closeBookBtn');

let currentPageNumber = -1; // -1: Portada, 0: Primera página interna, 1: Segunda, etc.
const totalPages = pages.length; // Número de páginas internas

// Función para inicializar el estado del libro (cerrado)
function initializeBook() {
    cover.classList.remove('flipped');

    // Ocultar todas las páginas internas y resetear sus estados
    pages.forEach(page => {
        page.classList.remove('current-right', 'flipped-right');
        page.style.zIndex = '0'; // Resetear z-index
        page.style.visibility = 'hidden'; // Asegurarse de que estén ocultas
    });

    // Ocultar botones de navegación y cerrar libro
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    closeBookBtn.style.display = 'none';

    currentPageNumber = -1; // Volver al estado de portada
}

// Inicializar el libro al cargar la página
window.onload = initializeBook;

// Función para abrir el libro (voltea la portada)
function openBook() {
    // Si el libro ya está abierto, no hacemos nada
    if (currentPageNumber !== -1) return;
    cover.classList.add('flipped');

    // Esperar a que la portada gire
    setTimeout(() => {
        currentPageNumber = 0; // Estamos en la primera página interna
        showPage(); // Muestra la primera página

        // Mostrar botones de navegación y cerrar
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        closeBookBtn.style.display = 'block';
    }, 1000); // Coincide con la duración de la transición de la portada
}

// Función para mostrar la página actual y las ya volteadas
function showPage() {
    // Resetear el estado de todas las páginas
    pages.forEach((page, index) => {
        page.classList.remove('current-right', 'flipped-right');
        page.style.zIndex = '0'; // Z-index bajo por defecto
        page.style.visibility = 'hidden'; // Ocultar todas
    });

    // La página actual (a la derecha)
    if (currentPageNumber >= 0 && currentPageNumber < totalPages) {
        pages[currentPageNumber].classList.add('current-right');
        pages[currentPageNumber].style.zIndex = totalPages + 1; // La más alta
        pages[currentPageNumber].style.visibility = 'visible';
    }

    // Las páginas ya volteadas (a la izquierda)
    for (let i = 0; i < currentPageNumber; i++) {
        pages[i].classList.add('flipped-right');
        pages[i].style.zIndex = totalPages - i; // Apilarlas correctamente, la última volteada encima
        pages[i].style.visibility = 'visible';
    }

    // Ajustar visibilidad de los botones de navegación
    prevBtn.style.display = (currentPageNumber > -1) ? 'block' : 'none'; // Mostrar si no estamos en la portada
    nextBtn.style.display = (currentPageNumber < totalPages - 1) ? 'block' : 'none';
}


// Función para voltear a la página siguiente
function nextPage() {
    if (currentPageNumber < totalPages - 1) {
        // La página actual se "voltea" y se convierte en una página volteada a la izquierda
        pages[currentPageNumber].classList.remove('current-right');
        pages[currentPageNumber].classList.add('flipped-right');
        pages[currentPageNumber].style.zIndex = totalPages - currentPageNumber; // Ajustar z-index para apilamiento

        currentPageNumber++; // Avanzar al siguiente índice
        showPage(); // Mostrar la nueva página actual
    }
}

// Función para voltear a la página anterior
function prevPage() {
    if (currentPageNumber > 0) {
        // La página que estaba a la derecha se oculta o se "des-voltea"
        pages[currentPageNumber].classList.remove('current-right');
        pages[currentPageNumber].style.visibility = 'hidden';

        currentPageNumber--; // Retroceder al índice anterior

        // La nueva página a la derecha
        pages[currentPageNumber].classList.remove('flipped-right'); // Quitar flipped si la tenía
        pages[currentPageNumber].classList.add('current-right');
        pages[currentPageNumber].style.zIndex = totalPages + 1;
        pages[currentPageNumber].style.visibility = 'visible';

        showPage(); // Volver a mostrar las páginas en su estado correcto
    } else if (currentPageNumber === 0) {
        // Si estamos en la primera página interna, cerrar el libro
        closeBook();
    }
}


// Función para cerrar el libro completamente
function closeBook() {
    // Voltear la portada de vuelta
    cover.classList.remove('flipped');

    // Ocultar y resetear todas las páginas internas
    pages.forEach(page => {
        page.classList.remove('current-right', 'flipped-right');
        page.style.zIndex = '0';
        page.style.visibility = 'hidden';
    });

    // Ocultar botones de navegación y cerrar
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    closeBookBtn.style.display = 'none';

    currentPageNumber = -1; // Resetear al estado de portada
}

// Asignar eventos a los botones
prevBtn.addEventListener('click', prevPage);
nextBtn.addEventListener('click', nextPage);
closeBookBtn.addEventListener('click', closeBook);

// Evento para abrir el libro (desde el botón de la portada)
document.querySelector('.abrir-btn').addEventListener('click', openBook);