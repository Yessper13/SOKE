document.addEventListener("DOMContentLoaded", function() {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) {
        // Si no hay usuario activo, redirige al login
        window.location.href = "IniciarSesion.html";
        return;
    }

    // Nombre
    document.querySelector('.perfil-nombre').textContent = usuario.nombre;

    // Detalles
    const detalles = document.querySelector('.perfil-detalles');
    detalles.innerHTML = `
        <div class="perfil-detalles-item"><strong>Dirección:</strong> ${usuario.direccion || 'No registrada'}</div>
        <div class="perfil-detalles-item"><strong>Teléfono:</strong> ${usuario.telefono || 'No registrado'}</div>
        <div class="perfil-detalles-item"><strong>Correo:</strong> ${usuario.correo}</div>
        <div class="perfil-detalles-item"><strong>Cédula:</strong> ${usuario.cedula || 'No registrada'}</div>
    `;

    document.querySelector('.cerrar-sesion-btn').addEventListener('click', function() {
        localStorage.removeItem("usuarioActivo");
        window.location.href = "IniciarSesion.html";
    });
});