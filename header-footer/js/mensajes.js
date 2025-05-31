function mostrarMensaje(texto) {
    alert(mostrarMensaje)
  const popup = document.getElementById("mensaje-popup");
  const mensajeTexto = document.getElementById("mensaje-texto");
  if (popup && mensajeTexto) {
    mensajeTexto.textContent = texto;
    popup.classList.remove("oculto");
  }
}

function ocultarMensaje() {
  const popup = document.getElementById("mensaje-popup");
  if (popup) {
    popup.classList.add("oculto");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const aceptarBtn = document.getElementById("mensaje-aceptar");
  if (aceptarBtn) {
    aceptarBtn.addEventListener("click", ocultarMensaje);
  }
});
