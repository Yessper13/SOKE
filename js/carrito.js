const cartContainer = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");

// Recuperar productos del localStorage
let cartItems = JSON.parse(localStorage.getItem('carrito')) || [];

function renderCart() {
  cartContainer.innerHTML = '';
  let total = 0;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p>El carrito está vacío.</p>';
    totalDisplay.textContent = '0.00';
    return;
  }

  cartItems.forEach((item, index) => {
    
    const itemTotal = item.valor * item.cantidad;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}" />
      <div class="cart-item-info">
        <h3>${item.nombre}</h3>
        <p class="supplier">Marca: ${item.marca}</p>
        <p><strong>Precio:</strong> $${Number(item.valor).toFixed(2)}</p>
      </div>
      <div class="cart-item-controls">
        <div class="quantity-controls">
          <button onclick="changeQuantity(${index}, -1)">−</button>
          <span>${item.cantidad}</span>
          <button onclick="changeQuantity(${index}, 1)">+</button>
        </div>
        <p><strong>Total:</strong> $${itemTotal.toFixed(2)}</p>
      </div>
    `;

    cartContainer.appendChild(cartItem);
  });

  totalDisplay.textContent = total.toFixed(2);
  localStorage.setItem('totalCarrito', total.toFixed(2));
}

function changeQuantity(index, delta) {
  cartItems[index].cantidad += delta;
  if (cartItems[index].cantidad < 1) cartItems[index].cantidad = 1;
  localStorage.setItem('carrito', JSON.stringify(cartItems));
  renderCart();
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  // Obtener usuario activo
  const usuario = JSON.parse(localStorage.getItem('usuarioActivo')) || { nombre: "Invitado" };

  // Crear pedido
  const pedido = {
    nombre: usuario.nombre,
    productos: cartItems.map(item => ({
      nombre: item.nombre,
      cantidad: item.cantidad,
      valor: item.valor
    })),
    total: cartItems.reduce((acc, item) => acc + item.valor * item.cantidad, 0),
    fecha: new Date().toISOString()
  };

  // Guardar pedido en localStorage
  let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  pedidos.push(pedido);
  localStorage.setItem('pedidos', JSON.stringify(pedidos));

  alert("Gracias por tu compra. Pedido realizado.");
  localStorage.removeItem('carrito');
  cartItems = [];
  renderCart();
  window.location.href = "../html/productoSeparado.html";
});

// Inicializar
renderCart();
