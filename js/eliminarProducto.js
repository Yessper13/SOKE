function eliminar(boton) {

    const card = boton.closest('.card-producto');
    if (card) {
        card.remove();
        mostrarMensaje("Producto eliminado");
        function home() {
  // Redirigir a la página principal
  window.location.href = "index.html";  
}



    }
}