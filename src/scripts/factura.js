window.onload = function () {
    const invoiceData = JSON.parse(localStorage.getItem('invoice'));
    const facturaContainer = document.getElementById("invoice-details");
    
    if (invoiceData && facturaContainer) {
        // Mostrar el total y los productos en la factura
        let facturaHTML = `<h2 class="text-2xl font-bold mb-4">Total: ${invoiceData.total.toFixed(2)} $</h2>`;
        facturaHTML += '<ul class="divide-y divide-gray-300">';
        
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
};
