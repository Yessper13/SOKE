function iniciarSesion(event) {
    event.preventDefault();
  const usuario = document.getElementById("username").value;
  const contrasena = document.getElementById("password").value;
  const usuarioValido = Usuario.verificarCredenciales(usuario, contrasena);
  if (usuarioValido) {
    // Guardar usuario en sesión
    localStorage.setItem('usuarioSesion', JSON.stringify(usuarioValido));
    document.getElementById("message").textContent="Bienvenido a SOKE"
    window.location.href="Paginabienvenida.html"
    document.getElementById("message").value=""
  } else {
    document.getElementById("message").textContent="Datos invalidos"
  }
}