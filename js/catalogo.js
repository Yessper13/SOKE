document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-productos");
  const inputBusqueda = document.getElementById("busqueda-producto");
  let productos = JSON.parse(localStorage.getItem("catalogo")) || [];

  function mostrarProductos(lista) {
    contenedor.innerHTML = ""; 

    lista.forEach(producto => {
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
              <a href="#" class="btn-eliminar-producto"><img src="../imagenes/delete.png" alt="eliminar" class="carrito-icono"></a>
            </div>
          </div>
        </div>
      `;

      
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

        const index = carrito.findIndex(p =>
          p.nombre === productoCarrito.nombre &&
          p.marca === productoCarrito.marca &&
          p.imagen === productoCarrito.imagen
        );

        if (index !== -1) {
          carrito[index].cantidad += 1;
        } else {
          carrito.push(productoCarrito);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarMensaje("Producto agregado al carrito");
      });

      
      card.querySelector('.btn-eliminar-producto').addEventListener('click', function (e) {
        e.preventDefault();

        if (!confirm(`¿Estás seguro de eliminar "${producto.nombre}"?`)) return;

        productos = productos.filter(p =>
          !(p.nombre === producto.nombre &&
            p.marca === producto.marca &&
            p.imagen === producto.imagen)
        );

        localStorage.setItem("catalogo", JSON.stringify(productos));
        mostrarProductos(productos);
        mostrarMensaje("Producto eliminado del catálogo");
      });

      contenedor.appendChild(card);
    });
  }

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

 
  inputBusqueda.addEventListener("input", function () {
    const texto = this.value.toLowerCase();
    const filtrados = productos.filter(p =>
      p.nombre.toLowerCase().includes(texto) ||
      p.marca.toLowerCase().includes(texto)
    );
    mostrarProductos(filtrados);
  });

  mostrarProductos(productos);


  function mostrarMensaje(texto) {
    const overlay = document.getElementById("mensaje-overlay");
    const toast = document.getElementById("mensaje-toast");

    toast.textContent = texto;
    overlay.classList.remove("oculto");

    setTimeout(() => {
      overlay.classList.add("oculto");
    }, 200);
  }
});

