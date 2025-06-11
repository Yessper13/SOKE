function iniciarSesion(event) {
    event.preventDefault();
    const usuario = document.getElementById("username").value;
    const contrasena = document.getElementById("password").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (!Array.isArray(usuarios)) usuarios = [];

    // Busca por usuario o correo
    const user = usuarios.find(u =>
        (u.usuario === usuario || u.correo === usuario) && u.contrasena === contrasena
    );

    if (user) {
        localStorage.setItem("usuarioActivo", JSON.stringify(user));
        document.getElementById("message").textContent = "Bienvenido a SOKE";
        window.location.href = "paginabienvenida.html";
    } else {
        document.getElementById("message").textContent = "Usuario o contraseña incorrectos.";
    }
}