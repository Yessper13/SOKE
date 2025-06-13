function goBack() {
  alert("Regresando a la página anterior...");
}

function handleNavClick(destination) {
  alert(`Navegando a: ${destination}`);
}

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main.main");
  main.innerHTML = "";

  let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

  // Asegura que todos los pedidos tengan la propiedad 'estado'
  let actualizo = false;
  pedidos.forEach(pedido => {
    if (!pedido.estado) {
      pedido.estado = "pendiente";
      actualizo = true;
    }
  });
  if (actualizo) {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  }

  if (pedidos.length === 0) {
    main.innerHTML = "<p>No hay pedidos realizados.</p>";
    return;
  }

  pedidos.forEach((pedido, idx) => {
    const card = document.createElement("div");
    card.className = "card pedido-card";

    // Estado visual
    let estadoTexto = "";
    let estadoImg = "";
    if (pedido.estado === "pendiente") {
      estadoTexto = `<span class="badge bg-warning text-dark">Pendiente</span>`;
      estadoImg = `<img src="../Icons/pendiente.png" alt="Pendiente" class="estado-img">`;
    } else if (pedido.estado === "enviado") {
      estadoTexto = `<span class="badge bg-primary">Enviado</span>`;
      estadoImg = `<img src="../Icons/enviado.png" alt="Enviado" class="estado-img">`;
    } else if (pedido.estado === "entregado") {
      estadoTexto = `<span class="badge bg-success">Entregado</span>`;
      estadoImg = `<img src="../Icons/entregado.png" alt="Entregado" class="estado-img">`;
    }

    // Botón según estado
    let boton = "";
    if (pedido.estado === "pendiente") {
      boton = `<button class="btn btn-primary btn-enviar w-100 nav-distribuidor" data-idx="${idx}">Enviar</button>`;
    } else if (pedido.estado === "enviado") {
      boton = `<button class="btn btn-success btn-entregar w-100 nav-motociclista" data-idx="${idx}">Recibido</button>`;
    }

    card.innerHTML = `
      <div class="pedido-info flex-grow-1">
        <h3>${pedido.nombre}</h3>
        <div class="details">${tiempoTranscurrido(pedido.fecha)}</div>
        <div class="price">${pedido.total.toLocaleString('es-CO', {style: 'currency', currency: 'COP'})}</div>
        <ul style="margin-top:10px;">
          ${pedido.productos.map(prod => `
            <li>${prod.nombre} x${prod.cantidad} - ${Number(prod.valor).toLocaleString('es-CO', {style: 'currency', currency: 'COP'})}</li>
          `).join('')}
        </ul>
      </div>
      <div class="pedido-estado-col">
        <div class="estado-badge mb-2">${estadoTexto}</div>
        <div class="estado-img-box mb-2">${estadoImg}</div>
        <div class="pedido-acciones">${boton}</div>
      </div>
    `;
    main.appendChild(card);
  });

  // Delegación de eventos para los botones
  main.addEventListener("click", function(e) {
    if (e.target.classList.contains("btn-enviar")) {
      const idx = e.target.getAttribute("data-idx");
      pedidos[idx].estado = "enviado";
      localStorage.setItem('pedidos', JSON.stringify(pedidos));
      location.reload();
    }
    if (e.target.classList.contains("btn-entregar")) {
      const idx = e.target.getAttribute("data-idx");
      pedidos[idx].estado = "entregado";
      localStorage.setItem('pedidos', JSON.stringify(pedidos));
      location.reload();
    }
  });
});

// Función para mostrar tiempo transcurrido
function tiempoTranscurrido(fechaISO) {
  const fecha = new Date(fechaISO);
  const ahora = new Date();
  const minutos = Math.floor((ahora - fecha) / 60000);
  if (minutos < 1) return "Ahora";
  if (minutos === 1) return "Hace 1 minuto";
  return `Hace ${minutos} minutos`;
}

// Al crear el pedido...
const pedido = {
  nombre: usuario.nombre,
  productos: cartItems.map(item => ({
    nombre: item.nombre,
    cantidad: item.cantidad,
    valor: item.valor
  })),
  total: cartItems.reduce((acc, item) => acc + item.valor * item.cantidad, 0),
  fecha: new Date().toISOString(),
  estado: "pendiente" // NUEVO
};
