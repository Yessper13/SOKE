function mostrarMensaje(texto) {
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

    document.getElementById('mensaje-aceptar').onclick = function() {
        contenedor.classList.add('oculto');
        contenedor.innerHTML = '';
    };
}


