const contenedor = document.getElementById('contenedor-carrito');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
      contenedor.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
      carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');

        div.innerHTML = `
          <img src="${producto.imagen}" alt="Imagen del producto">
            <div class="info">
                <div class="nombre">${producto.nombre}</div>
                <div class="marca">Marca: ${producto.marca}</div>
                <div class="valor">Valor: $${producto.valor}</div>
                <div class="cantidad">Cantidad: ${producto.cantidad}</div>
            </div>
        `;

        contenedor.appendChild(div);
      });
    }