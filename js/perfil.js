document.addEventListener("DOMContentLoaded", function() {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) {
        // Si no hay usuario activo, redirige al login
        window.location.href = "IniciarSesion.html";
        return;
    }

    // Nombre
    document.querySelector('.perfil-nombre').textContent = usuario.nombre;

    // NO MODIFICAR detalles.innerHTML, así se mantienen los inputs y spans del HTML
    // Si quieres mostrar los datos del usuario, solo actualiza los valores:
    document.getElementById('direccion-text').textContent = usuario.direccion || 'No registrada';
    document.getElementById('direccion-input').value = usuario.direccion || '';
    document.getElementById('telefono-text').textContent = usuario.telefono || 'No registrado';
    document.getElementById('telefono-input').value = usuario.telefono || '';
    document.getElementById('correo-text').textContent = usuario.correo || '';
    document.getElementById('correo-input').value = usuario.correo || '';
    document.getElementById('cedula-text').textContent = usuario.cedula || 'No registrada';
    document.getElementById('cedula-input').value = usuario.cedula || '';

    document.querySelector('.cerrar-sesion-btn').addEventListener('click', function() {
        localStorage.removeItem("usuarioActivo");
        window.location.href = "IniciarSesion.html";
    });

    // --- Código de edición y guardado ---
    const editarBtn = document.getElementById('editar-btn');
    const guardarBtn = document.getElementById('guardar-btn');

    const campos = [
        {text: 'direccion-text', input: 'direccion-input', key: 'direccion'},
        {text: 'telefono-text', input: 'telefono-input', key: 'telefono'},
        {text: 'correo-text', input: 'correo-input', key: 'correo'},
        {text: 'cedula-text', input: 'cedula-input', key: 'cedula'}
    ];

    editarBtn.addEventListener('click', function() {
        campos.forEach(campo => {
            document.getElementById(campo.text).classList.add('d-none');
            document.getElementById(campo.input).classList.remove('d-none');
        });
        editarBtn.classList.add('d-none');
        guardarBtn.classList.remove('d-none');
    });

    guardarBtn.addEventListener('click', function() {
        campos.forEach(campo => {
            const valor = document.getElementById(campo.input).value;
            document.getElementById(campo.text).textContent = valor;
            document.getElementById(campo.text).classList.remove('d-none');
            document.getElementById(campo.input).classList.add('d-none');
            usuario[campo.key] = valor;
        });
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        guardarBtn.classList.add('d-none');
        editarBtn.classList.remove('d-none');
    });
});