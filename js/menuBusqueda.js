document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.buscador form');
  const input = document.getElementById('buscador');
  const mapaImg = document.getElementById('mapa');
  const botonesContainer = document.getElementById('botonesMapa');

  // Imagen que aparece al hacer la búsqueda (puedes cambiar la URL)
  const imagenBusqueda = './Map/mapafind.png';

  // Imágenes para cada botón (cambia los src por tus imágenes)
  const imagenesBotones = {
    'K lond tapizados la bayadera': './Distribuidores/klond-logo.webp',
    'Cordobles': './Distribuidores/cordoblez.png',
    'Atmopel Bayadera': './Distribuidores/Atmopel.jpg',
    'Mundimotos la bayadera': './Distribuidores/Mundimotos.jpg',
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // evitar recarga

    const texto = input.value.trim();
    if (texto === '') return; // si está vacío no hace nada

    // Cambia la imagen del mapa principal
    mapaImg.src = imagenBusqueda;

    // Mostrar botones
    botonesContainer.style.display = 'flex';
    botonesContainer.style.gap = '10px';
    botonesContainer.style.justifyContent = 'center';
    botonesContainer.style.marginTop = '20px';

    // Vaciar botones previos por si hay
    botonesContainer.innerHTML = '';

    // Crear botones para cada lugar
    for (const nombre in imagenesBotones) {
      const btn = document.createElement('button');
      btn.textContent = nombre;
      btn.style.padding = '8px 12px';
      btn.style.borderRadius = '6px';
      btn.style.border = '1px solid #ccc';
      btn.style.cursor = 'pointer';
      btn.style.backgroundColor = '#fff';

      // Evento para cambiar imagen al hacer clic
      btn.addEventListener('click', () => {
       // Cambiar imagen al hacer clic
      mapaImg.src = imagenesBotones[nombre];

      // Mostrar botones debajo de la imagen
      const acciones = document.getElementById('accionesImagen');
      acciones.style.display = 'flex';
        // Opcional: actualizar los textos o enlaces si fueran dinámicos
      document.getElementById('comoLlegar').onclick = () =>  comoLlegar(nombre);
      document.getElementById('verCatalogo').onclick = () => { window.open('../html/catalogo.html')};
      });

      botonesContainer.appendChild(btn);
    }

    // Limpiar input después de buscar
    input.value = '';
  });
});



