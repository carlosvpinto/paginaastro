
// Este script espera a que la página cargue y luego muestra el contenido
// con una suave animación de aparición.

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
   
    // Añadimos la clase 'visible' para activar la transición CSS
    setTimeout(() => {
        container.classList.add('visible');
    }, 100); // Un pequeño retraso para asegurar que la transición se aplique
});