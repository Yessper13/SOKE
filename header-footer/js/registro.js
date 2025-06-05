class Usuario {
  constructor(nombre, correo, usuario, contrasena) {
    this.nombre = nombre;
    this.correo = correo;
    this.usuario = usuario;
    this.contrasena = contrasena;
  }

  // Puedes agregar métodos si lo necesitas, por ejemplo:
  
}
function FuncionParaRegistro(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;
  const confirmar = document.getElementById("confirmar").value;

  if (contrasena !== confirmar) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  // Obtener los usuarios existentes del localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

  if (usuarios[usuario]) {
    alert("El nombre de usuario ya está registrado.");
    return;
  }

  // Crear una instancia de la clase Usuario
  const nuevoUsuario = new Usuario(nombre, correo, usuario, contrasena);

  // Guardar el usuario en el objeto
  usuarios[usuario] = nuevoUsuario;

  // Guardar el objeto completo en localStorage
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Usuario registrado correctamente");

  // window.location.href = "login.html";
}
