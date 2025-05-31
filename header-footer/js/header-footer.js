// headerLoader.js
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector('.header');
  if (header) {
    fetch("../header-footer/header.html")  
      .then(response => response.text())
      .then(data => {
        header.innerHTML = data;
      });
  }
});

// footerLoader.js
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector('.footer');
  if (footer) {
    fetch("../header-footer/footer.html")
      .then(response => response.text())
      .then(data => {
        footer.innerHTML = data;
      });
  }
});