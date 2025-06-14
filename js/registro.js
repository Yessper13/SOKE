class Usuario {
  constructor(tipoUsuario, nombre, correo, cedula, direccion, telefono, usuario, contrasena) {
    this.tipoUsuario = tipoUsuario;
    this.nombre = nombre;
    this.correo = correo;
    this.cedula = cedula;
    this.direccion = direccion;
    this.telefono = telefono;
    this.usuario = usuario;
    this.contrasena = contrasena;
  }

  // Puedes agregar métodos si lo necesitas, por ejemplo obtener usuarios
   static obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
  }

  // Método estático: verificar credenciales
  
  static verificarCredenciales(usuario, contrasena) {
    const usuariosObj = Usuario.obtenerUsuarios();
    const usuarios = Object.values(usuariosObj); // Convertimos el objeto a array
    // Buscar el usuario que coincida
    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);
    if (usuarioEncontrado) {
      // Retornar el objeto completo con todos los atributos
      return usuarioEncontrado;
    }
    return null;
  }

  // Método estático para obtener el usuario en sesión
  static obtenerUsuarioSesion() {
    return JSON.parse(localStorage.getItem('usuarioSesion'));
  }

}
function FuncionParaRegistro(event) {
  event.preventDefault();
  const tipoUsuario = document.getElementById("tipoUsuario").value;
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;
  const confirmar = document.getElementById("confirmar").value;

  if (contrasena !== confirmar) {
    mostrarMensaje("Las contraseñas no coinciden.");
    return;
  }

  // Obtener los usuarios existentes del localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

  if (usuarios[usuario]) {
    mostrarMensaje("El nombre de usuario ya está registrado.");
    return;
  }

  // Crear una instancia de la clase Usuario
  const nuevoUsuario = new Usuario(tipoUsuario,nombre, correo, usuario, contrasena);

  // Guardar el usuario en el objeto
  usuarios[usuario] = nuevoUsuario;

  // Guardar el objeto completo en localStorage
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  mostrarMensaje("Usuario registrado correctamente");

   window.location.href = "IniciarSesion.html";
}
function registrarUsuario(event) {
    event.preventDefault();
    const tipoUsuario = document.getElementById("tipoUsuario").value;
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const cedula = document.getElementById("cedula").value;
    const direccion = document.getElementById("direccion").value;
    const telefono = document.getElementById("telefono").value;
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;
    const confirmar = document.getElementById("confirmar").value;

    if (contrasena !== confirmar) {
        mostrarMensaje("Las contraseñas no coinciden.");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.some(u => u.usuario === usuario)) {
        mostrarMensaje("El nombre de usuario ya está registrado.");
        return;
    }
    if (usuarios.some(u => u.correo === correo)) {
        mostrarMensaje("El correo ya está registrado.");
        return;
    }
    if (usuarios.some(u => u.cedula === cedula)) {
        mostrarMensaje("La cédula ya está registrada.");
        return;
    }

    // Crear el usuario con los nuevos campos
    const nuevoUsuario = {
        tipoUsuario,
        nombre,
        correo,
        cedula,
        direccion,
        telefono,
        usuario,
        contrasena
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mostrarMensaje("Usuario registrado correctamente");
    window.location.href = "IniciarSesion.html";
}


