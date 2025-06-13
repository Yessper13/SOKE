let usuarioActivo = null;

try {
    usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
} catch (e) {
    console.error("Error al obtener usuarioActivo del localStorage:", e);
}

// Función para mostrar/ocultar menús según el tipo de usuario
function ajustarMenuPorTipoUsuario() {
    console.log("ajustarMenuPorTipoUsuario ejecutada");
    if (usuarioActivo && usuarioActivo.tipoUsuario) {
        const tipo = usuarioActivo.tipoUsuario.toLowerCase();

        // Oculta todos los específicos primero
        document.querySelectorAll('.nav-motociclista, .nav-distribuidor').forEach(el => {
            el.style.display = 'none';
        });

        // Muestra los comunes
        document.querySelectorAll('.nav-comun').forEach(el => {
            el.style.display = '';
        });

        // Muestra los del tipo correspondiente
        if (tipo === "motociclista") {
            document.querySelectorAll('.nav-motociclista').forEach(el => {
                el.style.display = '';
            });
        } else if (tipo === "distribuidor") {
            document.querySelectorAll('.nav-distribuidor').forEach(el => {
                el.style.display = '';
            });
        }
    }
}

// Ejecutar la función solo cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", ajustarMenuPorTipoUsuario);
