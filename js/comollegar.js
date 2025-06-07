function comoLlegar(nombre) {
    alert(`Cómo llegar a ${nombre}`);
  const coordenadas = {
    'K lond tapizados la bayadera': '6.240498877039471, -75.57447071703986', 
    'Cordobles': '6.240323014867005, -75.57391534016435',
    'Atmopel Bayadera': '6.2395852151540225, -75.57447493116315',
    'Mundimotos la bayadera': '6.239818960797631, -75.57391929841972',
  };

  const destino = coordenadas[nombre];
  if (destino) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destino}`;
    window.open(url, '_blank');
  } else {
    alert('No se encontraron coordenadas para este aliado.');
  }
}