// Importar la función para obtener los productos
import { obtenerProductos } from "./productos.js";
import { displayCart } from "./carro-compra.js";
import { loginUser } from "./login.js";

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("open-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcons = menuButton.querySelectorAll("svg");
  // Cargar el carrito del localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  displayCart(cart);
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
            displayCart(cart); // Mostrar el carrito si estamos en carrito.html
          }

          // Verificar si es la página de login
          const loginForm = document.getElementById("login-form");
          if (loginForm) {
            loginUser(); // Ejecutar la lógica de login si estamos en login.html
          }

          // Add the toggle form link event after loading login.html
          const toggleFormLink = document.getElementById("toggle-form");
          if (toggleFormLink) {
            document
              .getElementById("toggle-form")
              .addEventListener("click", function (e) {
                e.preventDefault();
                toggleForms();
              });
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
        const cart = JSON.parse(localStorage.getItem("cart")) || []; // Cargar el carrito del localStorage
        displayCart(cart); // Mostrar el carrito si el contenedor existe
      }
    })
    .catch((error) => {
      content.innerHTML =
        '<p class="text-red-500">Error al cargar la página de inicio.</p>';
      console.error("Error al cargar la página de inicio:", error);
    });
});

// Toggle function to switch between login and register forms
function toggleForms() {
  const loginSection = document.getElementById("login-section");
  const registerSection = document.getElementById("register-section");
  const toggleMessage = document.getElementById("toggle-message");

  if (loginSection && registerSection && toggleMessage) {
    // Toggle the hidden class on each section
    loginSection.classList.toggle("hidden");
    registerSection.classList.toggle("hidden");

    // Update the message and link text based on the visible form
    if (loginSection.classList.contains("hidden")) {
      toggleMessage.innerHTML =
        '¿Ya tienes una cuenta? <a href="#" id="toggle-form" class="text-blue-500 hover:underline">Inicia sesión aquí</a>';
    } else {
      toggleMessage.innerHTML =
        '¿No tienes una cuenta? <a href="#" id="toggle-form" class="text-blue-500 hover:underline">Regístrate aquí</a>';
    }

    // Re-add event listener after innerHTML update
    document
      .getElementById("toggle-form")
      .addEventListener("click", function (e) {
        e.preventDefault();
        toggleForms();
      });
  }
}
