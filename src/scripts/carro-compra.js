import {
  doc,
  updateDoc,
  increment,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { db } from "/firebase-config.js";

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Obtener carrito del localStorage

// Función para mostrar el carrito
export function displayCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  if (!cartItemsContainer) {
    console.error("El contenedor del carrito no se encuentra.");
    return; // Salir de la función si el contenedor no existe
  }
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="text-red-500 mt-5 mb-5">El carrito está vacío.</p>';
    return;
  }

  // Encabezado del carrito
  const headerHTML = `
    <div class="mt-8">
        <div class="flow-root">
            <ul role="list" class="-my-6 divide-y divide-gray-200">
`;
  cartItemsContainer.innerHTML += headerHTML;

  cart.forEach((producto) => {
    const productoDiv = `
        <li class="flex py-6">
            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="h-full w-full object-cover object-center" />
            </div>
            <div class="ml-4 flex flex-1 flex-col">
                <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <a href="#">${producto.nombre}</a>
                        </h3>
                        <p class="ml-4">${producto.precio} $</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">${producto.stock}</p>
                </div>
                <div class="flex flex-1 items-end justify-between text-sm">
                <p class="text-neutral-500"></p>
                    <div class="flex">
                        <button
                            type="button"
                            class="font-medium text-red-600 hover:text-red-500"
                            data-id="${producto.id}"
                            onclick="removeFromCart('${producto.id}')"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </li>
    `;
    cartItemsContainer.innerHTML += productoDiv; // Agregar cada producto al contenedor del carrito
  });
  // Cierre de la lista
  cartItemsContainer.innerHTML += `
   </ul>
</div>
</div>
`;

  // Mostrar total de la compra
  const total = cart.reduce((acc, item) => acc + item.precio, 0);
  const footerHTML = `
<div class="border-t border-gray-200 px-4 py-6 sm:px-6">
<div class="flex justify-between text-base font-medium text-gray-900">
   <p>Subtotal</p>
   <p>${total.toFixed(2)} $</p>
</div>
<p class="mt-0.5 text-sm text-gray-500"> IVA incluido. </p>
<div class="mt-6">
   <button
       id="checkout-btn"
       class="flex items-center justify-center rounded-md border border-transparent bg-neutral-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-neutral-700"
       onclick="facturar()"
   >
       Facturar
   </button>
</div>

</div>
`;
  cartItemsContainer.innerHTML += footerHTML; // Agregar el pie de página al contenedor del carrito
}
// Función para facturar
export async function facturar() {
  const total = cart.reduce((sum, item) => sum + item.precio, 0);
  // Almacenar el total y detalles de la factura en localStorage
  localStorage.setItem("invoice", JSON.stringify({ total, items: cart }));
  console.log(
    "Datos para la factura" + JSON.parse(localStorage.getItem("invoice"))
  );
  // Lógica para reducir el stock en Firebase
  for (const item of cart) {
    await reduceStock(item.id, 1); // Reducir stock en 1
  }
  cart = []; // Limpiar el carrito
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Carro limpio" + JSON.parse(localStorage.getItem("cart")));
  // Redirigir a la página de factura
  window.location.href = "factura.html";
}

// Función para reducir el stock en Firebase
async function reduceStock(productId, quantity) {
  console.log(`Reduciendo stock del producto con ID: ${productId}`);
  const productRef = doc(db, "productos", productId);
  try {
    await updateDoc(productRef, {
      prod_stock: increment(-quantity), // Reducir stock
    });
    console.log("Stock reducido correctamente");
  } catch (error) {
    console.error("Error al reducir stock:", error);
  }
}

// Función para eliminar un producto del carrito
export function removeFromCart(productId) {
  // Filtrar el carrito para que solo contenga productos que no coincidan con el ID a eliminar
  cart = cart.filter((product) => product.id !== productId);

  // Actualizar el carrito en localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Mostrar nuevamente el carrito actualizado
  displayCart();
}

// Mostrar el carrito
displayCart();

// Exponer funciones globalmente para el uso de 'onclick' en HTML
window.facturar = facturar;
window.removeFromCart = removeFromCart;
window.displayCart = displayCart;
