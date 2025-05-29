let imagenBase64 = "";

// Clase Producto
class Producto {
  constructor(nombre, valor, marca, imagen) {
    this.nombre = nombre;
    this.valor = valor;
    this.marca = marca;
    this.imagen = imagen;
    this.precioOriginal = valor;
    this.precioDescuento = valor;
    this.estrellas = 4;
  }
}

// Guardar en localStorage
function guardarProductoEnStorage(producto) {
  let productos = JSON.parse(localStorage.getItem("catalogo")) || [];
  productos.push(producto);
  localStorage.setItem("catalogo", JSON.stringify(productos));
}

// Función para cambiar imagen
function cambiarImagen() {
  document.getElementById("fileInput").click();
}

// Al cargar DOM
document.addEventListener("DOMContentLoaded", () => {
  // Listener para cargar imagen
  const fileInput = document.getElementById("fileInput");
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagenBase64 = e.target.result;
          document.getElementById("previewImage").src = imagenBase64;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Listener para guardar producto
  document.getElementById("btnGuardar").addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value.trim();
    const valor = document.getElementById("valor").value.trim();
    const marca = document.getElementById("marca").value.trim();

    if (!nombre || !valor || !marca) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const imagenFinal = imagenBase64 || "../imagenes/imagen.png";
    const producto = new Producto(nombre, valor, marca, imagenFinal);
    guardarProductoEnStorage(producto);

    // Limpiar campos
    document.getElementById("nombre").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("marca").value = "";
    imagenBase64 = "";
    document.getElementById("previewImage").src = "../imagenes/imagen.png";

    alert("Producto agregado al catálogo.");
    window.location.href = "catalogo.html";
  });
});
