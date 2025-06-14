document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('.header');
    if (header) {
        fetch("../header-footer/header.html")  
            .then(response => response.text())
            .then(data => {
                header.innerHTML = data;

                // Carga Bootstrap JS dinámicamente si es necesario
                const bootstrapScript = document.createElement('script');
                bootstrapScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
                document.body.appendChild(bootstrapScript);

                // Espera a que permisosAcceso.js esté cargado antes de llamar la función
                if (typeof ajustarMenuPorTipoUsuario === 'function') {
                    ajustarMenuPorTipoUsuario();
                } else {
                    // Si el script no está cargado aún, espera a que lo esté
                    const script = document.createElement('script');
                    script.src = "../js/permisosAcceso.js";
                    script.onload = () => {
                        if (typeof ajustarMenuPorTipoUsuario === 'function') {
                            ajustarMenuPorTipoUsuario();
                        }
                    };
                    document.body.appendChild(script);
                }
            });
    }

    const footer = document.querySelector('.footer');
    if (footer) {
        fetch("../header-footer/footer.html")
            .then(response => response.text())
            .then(data => {
                footer.innerHTML = data;
            });
    }

    // Clonar menú base en los menús de móvil y desktop
    function clonarMenu() {
        const menuBase = document.getElementById('menu-base');
        if (!menuBase) return;
        const menuMobile = document.getElementById('menu-mobile');
        const menuDesktop = document.getElementById('menu-desktop');
        if (menuMobile) {
            menuMobile.innerHTML = menuBase.innerHTML;
        }
        if (menuDesktop) {
            menuDesktop.innerHTML = menuBase.innerHTML;
        }
    }

    // Espera a que el header esté cargado antes de clonar el menú
    setTimeout(clonarMenu, 100);

    // Botón cerrar sesión del header
    document.querySelectorAll('a.nav-link[href="../index.html"], a.nav-link[href="./index.html"]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem("usuarioActivo");
            window.location.href = "../html/IniciarSesion.html";
        });
    });
});
