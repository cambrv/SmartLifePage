// Función para mostrar la información del usuario
function displayUserInfo() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      // Injectar los detalles del usuario en los elementos HTML correspondientes
      document.getElementById("user-name").textContent = loggedInUser.name;
      document.getElementById("user-address").textContent = loggedInUser.address;
      document.getElementById("user-phone").textContent = loggedInUser.phone;
    } else {
      alert("Por favor inicie sesión antes de facturar.");
    //   window.location.href = "index.html?datka-page=login"; // Redirigir al login si no está logueado
    }
  }
  
  // Función para mostrar los detalles de la factura
  function displayInvoiceDetails() {
    const invoiceData = JSON.parse(localStorage.getItem("invoice"));
    const facturaContainer = document.getElementById("invoice-details");
  
    if (invoiceData && facturaContainer) {
      let facturaHTML = `<h2 class="text-2xl font-bold mb-4">Total: ${invoiceData.total.toFixed(2)} $</h2>`;
      facturaHTML += '<ul class="divide-y divide-gray-300">';
  
      // Mostrar cada producto en la factura
      invoiceData.items.forEach((item) => {
        facturaHTML += `
          <li class="flex items-center justify-between py-4">
            <div class="flex items-center">
              <img src="${item.imagen}" alt="${item.nombre}" class="h-16 w-16 object-cover mr-4 rounded-md">
              <div>
                <h3 class="font-semibold">${item.nombre}</h3>
                <p class="text-gray-500">${item.precio} $</p>
              </div>
            </div>
          </li>`;
      });
  
      facturaHTML += '</ul>';
      facturaContainer.innerHTML = facturaHTML;
    } else {
      console.error("No se encontraron datos de la factura o el contenedor no existe.");
    }
  }
  
  // Inicializar la página mostrando detalles del usuario y factura
  window.onload = function () {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      alert("Por favor inicie sesión antes de ver la factura.");
    //   window.location.href = "index.html?data-page=login"; // Redirigir al login si no hay sesión
      return; // Evitar ejecución si el usuario no está logueado
    }
  
    displayUserInfo();
    displayInvoiceDetails();
  };
  