document.getElementById('codigo_ingresado')?.addEventListener('input', function() {
  const codigo = document.getElementById('codigo_ingresado').value.trim();
  if (codigo === '1234') {
    // Mostrar los campos de cambio de contraseña
    document.getElementById('nueva_contrasena').style.display = 'block';
    document.getElementById('confirmar_contrasena').style.display = 'block';
    document.getElementById('btn-cambiar-contrasena').style.display = 'block';
  }
});

function cambiarContrasena() {
  event.preventDefault();
  const nueva = document.getElementById('nueva_contrasena').value;
  const confirmar = document.getElementById('confirmar_contrasena').value;
  const mensaje = document.getElementById('mensaje_cambio');

  if (nueva !== confirmar) {
    mensaje.textContent = 'Las contraseñas no coinciden.';
    mensaje.style.color = 'red';
    return;
  }

  // Recuperar el correo del input email
  const email = document.getElementById('email').value.trim();
  if (!email) {
    mensaje.textContent = 'No se encontró el correo para recuperación.';
    mensaje.style.color = 'red';
    return;
  }

  // Obtener usuarios del localStorage
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
  let usuarioEncontrado = null;
  for (let key in usuarios) {
    if (usuarios[key].correo === email) {
      usuarioEncontrado = usuarios[key];
      usuarios[key].contrasena = nueva;
      break;
    }
  }
  if (usuarioEncontrado) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    mensaje.textContent = 'Contraseña cambiada exitosamente.';
    mensaje.style.color = 'green';
    setTimeout(() => {
      window.location.href = 'IniciarSesion.html';
    }, 1500);
  } else {
    mensaje.textContent = 'Usuario no encontrado.';
    mensaje.style.color = 'red';
  }
}

// Función para buscar y mostrar el usuario por correo al ingresar el email
function buscarUsuarioPorCorreo() {
  const email = document.getElementById('email').value.trim();
  if (!email) return;
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
  let usuarioEncontrado = null;
  for (let key in usuarios) {
    if (usuarios[key].correo === email) {
      usuarioEncontrado = usuarios[key];
      break;
    }
  }
  // Puedes usar este usuarioEncontrado como necesites, por ejemplo mostrarlo en consola:
  if (usuarioEncontrado) {
    console.log('Usuario encontrado:', usuarioEncontrado);
    window.usuarioRecuperado = usuarioEncontrado; // Para acceso global si se requiere
  } else {
    console.log('No se encontró usuario con ese correo');
    window.usuarioRecuperado = null;
  }
}


function enviarCodigo(){ 
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje_cambio');

  // Validar si el campo está vacío
  if (!email) {
    mensaje.textContent = "Por favor ingresa tu correo.";
    mensaje.style.color = "red";
    return;
  }

  // Validar si existe el usuario con ese correo
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
  let existe = false;
  for (let key in usuarios) {
    if (usuarios[key].correo === email) {
      existe = true;
      break;
    }
  }
  if (!existe) {
    mensaje.textContent = "El usuario con ese correo no existe.";
    mensaje.style.color = "red";
    return;
  } else {
    mensaje.textContent = "Código enviado";
    mensaje.style.color = "green";
  }

}

document.getElementById('form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  enviarCodigo();
});





