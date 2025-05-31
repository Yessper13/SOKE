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
            <span class="precio-actual">$${producto.precioDescuento}</span>
            <span class="precio-original text-muted text-decoration-line-through">$${producto.precioOriginal}</span>
          </div>
          <div class="producto-estrellas mt-1">
            ${generarEstrellas(producto.estrellas || 3)}
          </div>
          <div class="producto-botones mt-2 acciones">
            <i class="bi bi-card-text fs-5"></i>
            <i class="bi bi-cart-plus fs-5"></i>
            <a href="#" class="agregar-al-carrito"><img src="../imagenes/carrito.png" alt="carrito" class="carrito-icono"></a>
          </div>
        </div>
      </div>
    `;

    // Evento al hacer clic en el carrito
    card.querySelector('.agregar-al-carrito').addEventListener('click', function (e) {
      e.preventDefault();

      const productoCarrito = {
        nombre: producto.nombre,
        valor: producto.precioDescuento,
        marca: producto.marca,
        imagen: producto.imagen,
        cantidad: 1
      };

      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

      // Buscar si el producto ya existe (puedes usar un ID si lo tienes)
      const index = carrito.findIndex(p =>
        p.nombre === productoCarrito.nombre &&
        p.marca === productoCarrito.marca &&
        p.imagen === productoCarrito.imagen
      );

      if (index !== -1) {
        // Ya existe: incrementar cantidad
        carrito[index].cantidad += 1;
      } else {
        // No existe: agregar con cantidad 1
        carrito.push(productoCarrito);
      }

      // Guardar actualizado
      localStorage.setItem('carrito', JSON.stringify(carrito));

      // Redirigir al carrito
      
    });

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
