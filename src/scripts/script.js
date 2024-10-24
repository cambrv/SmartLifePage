// Importar la función para obtener los productos
import { obtenerProductos } from "./productos.js";
import { displayCart } from "./carro-compra.js"; // Si tienes una función de carrito
import { loginUser } from "./login.js"; // Si tienes lógica de login

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("open-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcons = menuButton.querySelectorAll("svg");

  // Manejo del botón de menú móvil
  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    menuIcons.forEach((icon) => icon.classList.toggle("hidden"));
  });

  // Manejo de la carga de archivos HTML en el contenedor principal
  const links = document.querySelectorAll("[data-page]");
  const content = document.getElementById("content");

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const page = this.getAttribute("data-page");

      // Fetch para obtener el contenido de la página seleccionada
      fetch(page)
        .then((response) => response.text())
        .then((data) => {
          content.innerHTML = data;
          console.log("Contenido cargado:", page);

          // Verificar si es la página de productos
          const productosContainer = document.getElementById("product-list");
          if (productosContainer) {
            obtenerProductos(); // Cargar productos si estamos en productos.html
          }

          // Verificar si es la página del carrito
          const cartContainer = document.getElementById("cart-items");
          if (cartContainer) {
              console.log("Existe cart");
            displayCart(); // Mostrar el carrito si estamos en carrito.html
          }

          // Verificar si es la página de login
          const loginForm = document.getElementById("login-form");
          if (loginForm) {
            loginUser(); // Ejecutar la lógica de login si estamos en login.html
          }

          // Cerrar el menú móvil automáticamente después de hacer clic en un enlace
          if (!mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.add("hidden");
            menuIcons.forEach((icon) => icon.classList.toggle("hidden"));
          }
        })
        .catch((error) => {
          content.innerHTML =
            '<p class="text-red-500">Error al cargar la página.</p>';
          console.error("Error al cargar la página:", error);
        });
    });
  });

  // Cargar la página inicial por defecto (inicio.html)
  fetch("inicio.html")
    .then((response) => response.text())
    .then((data) => {
      content.innerHTML = data;

      const productosContainer = document.getElementById("product-list");
      if (productosContainer) {
        obtenerProductos(); // Cargar productos si el contenedor existe
      }
      // Verificar si es la página del carrito (cuando carga inicio.html)
      const cartContainer = document.getElementById("cart-items");
      if (cartContainer) {
        displayCart(); // Mostrar el carrito si el contenedor existe
      }
    })
    .catch((error) => {
      content.innerHTML =
        '<p class="text-red-500">Error al cargar la página de inicio.</p>';
      console.error("Error al cargar la página de inicio:", error);
    });
});
