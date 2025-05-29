document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-productos");
  const productos = JSON.parse(localStorage.getItem("catalogo")) || [];

productos.forEach(producto => {
  const card = document.createElement("div");
  card.className = "card-producto";

 card.innerHTML = `
  <div class="card card-producto p-2 shadow-sm flex-row align-items-center">
    <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto ms-3">
    <div class="card-body">
      <h5 class="card-title producto-marca"><strong>${producto.marca}</strong></h5>
      <p class="card-text producto-nombre">${producto.nombre}</p>
      <div class="precio">
        <span class="precio-actual">$ ${producto.precioDescuento}</span>
        <span class="precio-original text-muted text-decoration-line-through">$ ${producto.precioOriginal}</span>
      </div>
      <div class="producto-estrellas mt-1">
        ${generarEstrellas(producto.estrellas || 3)}
      </div>
      <div class="producto-botones mt-2 acciones">
        <i class="bi bi-card-text fs-5"></i>
        <i class="bi bi-cart-plus fs-5"></i>
        <a href="#"><img src="../imagenes/carrito.png" alt="carrito" class="carrito-icono"></a>

      </div>
      
        
    </div>
  </div>
`;

  contenedor.appendChild(card);
});

  function generarEstrellas(num) {
    const total = 5;
    let estrellas = '';
    for (let i = 1; i <= total; i++) {
      estrellas += i <= num
        ? '<i class="bi bi-star-fill text-warning"></i>'
        : '<i class="bi bi-star text-secondary"></i>';
    }
    return estrellas;
  }
});