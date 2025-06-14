function mostrarMensaje(texto, tiempo = 10) {
    let contenedor = document.querySelector('.mensaje');
    if (!contenedor) return;

    contenedor.innerHTML = `
        <div class="mensaje-popup">
            <div class="mensaje-contenido">
                <p>${texto}</p>
                <button id="mensaje-aceptar">Aceptar</button>
            </div>
        </div>
    `;
    contenedor.classList.remove('oculto');

    // Ocultar automáticamente después de "tiempo" milisegundos
    let timeoutId = setTimeout(() => {
        contenedor.classList.add('oculto');
        contenedor.innerHTML = '';
    }, tiempo);

    document.getElementById('mensaje-aceptar').onclick = function() {
        clearTimeout(timeoutId);
        contenedor.classList.add('oculto');
        contenedor.innerHTML = '';
    };
}