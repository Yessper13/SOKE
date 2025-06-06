function eliminar(boton) {
    // Subir hasta la tarjeta del producto (puedes ajustar según la estructura exacta del DOM)
    const card = boton.closest('.card-producto');
    if (card) {
        card.remove();
        mostrarMensaje("Producto eliminado");
    }
}