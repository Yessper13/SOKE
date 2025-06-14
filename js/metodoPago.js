// metodopago.js

// 1) Asegúrate de “atrapar” el elemento <span id="total"> que definiste en carrito.js
//    (Debe existir en el HTML antes de que se ejecute este script).
const totalDisplay = document.getElementById("total");

// Mapeo entre IDs y rutas de imagen
const imagenesMetodo = {
  efectivo: "../imagenes/efectivo.png",
  transferencia: "../imagenes/transferencia.png",
  mastercard: "../imagenes/card.png"
};

document.querySelectorAll(".boton-pago").forEach(boton => {
  boton.addEventListener("click", function () {
    const metodo = this.id;

    // Ocultar sección de selección
    document.getElementById("seleccion-metodo").style.display = "none";

    // Mostrar tarjeta de pago
    const tarjeta = document.getElementById("tarjeta-pago");
    tarjeta.style.display = "block";

    // Actualizar icono y título según el método
    document.getElementById("titulo-metodo").textContent =
      metodo.charAt(0).toUpperCase() + metodo.slice(1);

    document.getElementById("icono-metodo").innerHTML = `
      <img src="${imagenesMetodo[metodo]}" alt="${metodo}" />
    `;

    // 2) Ahora totalDisplay sí está definido: lo formateamos y mostramos
    //    (ej. "1.234.567COP")
    const totalNumero = parseFloat(localStorage.getItem('totalCarrito')) || 0;
    document.getElementById("total-pagar").value =
    `$${totalNumero.toLocaleString('es-CO')}COP`;
  });
});


document.getElementById("btn-confirmar").addEventListener("click", function (e) {
  e.preventDefault(); // Evita comportamiento por defecto

  const correo = document.getElementById("correo").value;
  const nombre = document.getElementById("nombre").value;
  const cedula = document.getElementById("cedula").value;

  if (!correo || !nombre || !cedula) {
    mostrarMensaje("Por favor completa todos los campos.");
    return;
  }

  mostrarMensaje("¡Gracias por tu compra! La factura será enviada a tu correo.");

  // Limpiar carrito solo al confirmar
  localStorage.removeItem('carrito');
  localStorage.removeItem('totalCarrito');

  // Redireccionar si lo deseas
  window.location.href = "../html/paginadepedidos.html";
});

document.addEventListener("DOMContentLoaded", function () {
  const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));
  if (usuario) {
    const correoInput = document.getElementById("correo");
    const nombreInput = document.getElementById("nombre");
    const cedulaInput = document.getElementById("cedula");
    if (correoInput && usuario.correo) correoInput.value = usuario.correo;
    if (nombreInput && usuario.nombre) nombreInput.value = usuario.nombre;
    if (cedulaInput && usuario.cedula) cedulaInput.value = usuario.cedula;
  }
});

//