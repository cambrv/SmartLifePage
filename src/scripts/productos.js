// Importar las funciones necesarias desde Firebase Firestore
import {
  collection,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';
import { db } from '/firebase-config.js'; 

// Función para obtener productos desde Firebase
export async function obtenerProductos() {
  try {
      // Referencia a la colección de productos
      const productosCollection = collection(db, "productos");

      // Obtener todos los documentos de la colección
      const productosSnapshot = await getDocs(productosCollection);

      // Convertir los datos en un array
      const productosList = productosSnapshot.docs.map((doc) => ({
        id: doc.id, // Agregar el ID del documento para el carrito
        ...doc.data(),
    }));
      console.log("Productos obtenidos:", productosList);

      // Llamar a la función para mostrar los productos en la página
      mostrarProductos(productosList);
  } catch (error) {
      console.error("Error al obtener productos:", error);
  }
}

// Función para mostrar los productos en el DOM
function mostrarProductos(productos) {
  const productosContainer = document.getElementById("product-list");

  if (!productosContainer) {
      console.error("El contenedor de productos no fue encontrado.");
      return;
  }

  // Limpiar el contenedor antes de agregar nuevos productos
  productosContainer.innerHTML = '';

  productos.forEach((producto) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto");

    const nombre = producto.prod_nombre || "Nombre no disponible";
    const desc = producto.prod_desc || "Nombre no disponible";
    const stock = producto.prod_stock || "Nombre no disponible";
    const precio = producto.prod_precio || "Precio no disponible";
    const url = producto.prod_url || "ruta/por/defecto.jpg"; // Imagen por defecto si no existe

    productoDiv.innerHTML = `
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img src="${url}" alt="${nombre}" class="h-full w-full object-cover object-center group-hover:opacity-75" />
          </div>
          <h3 class="mt-4 textbase text-gray-900 ">${nombre}</h3>
          <h5 class="text-sm text-gray-700">${desc}</h3>
          <p class="mt-1 text-lg font-medium text-gray-900">${precio} $</p>
          <p class="text-sm text-gray-700">${stock} producto(s) disponible(s)</p>
          <button class="bg-neutral-500 text-white p-2 rounded mt-2" data-id="${producto.id}" onclick="agregarAlCarrito('${producto.id}')">Agregar al carrito</button>
      `;

    productosContainer.appendChild(productoDiv);
});
}

// Función para agregar un producto al carrito
window.agregarAlCarrito = function(productId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Asegúrate de tener acceso al producto que deseas agregar
  const producto = Array.from(document.querySelectorAll('.producto')).find(p => 
      p.querySelector('button').getAttribute('data-id') === productId
  );

  if (producto) {
      const nombre = producto.querySelector('h3').textContent;
      const precio = parseFloat(producto.querySelector('p').textContent.replace('$', '').trim());
      const imagen = producto.querySelector('img').src; // Obtener la imagen
      const stock = producto.querySelector('p:nth-of-type(2)').textContent; // Obtener el stock

      // Agregar el producto al carrito
      cart.push({
          id: productId,
          nombre: nombre,
          precio: precio,
          imagen: imagen, // Agregar la imagen al carrito
          stock: stock, // Agregar el stock al carrito
      });

      // Guardar el carrito en el localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${nombre} ha sido agregado al carrito!`);
  }
};