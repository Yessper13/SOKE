document.getElementById("btn-tienda").addEventListener("click", function(event) {
  event.preventDefault(); // Evita redirección por ahora
  ocultarMensaje();
});

document.getElementById("btn-domicilio").addEventListener("click", function(event) {
  event.preventDefault();
  ocultarMensaje();
});

function ocultarMensaje() {
  const overlay = document.getElementById("mensaje-overlay");
  overlay.style.display = "none";
}
