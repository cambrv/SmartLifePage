import { collection, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';
import { db } from '../firebase-config.js';

// Función principal para manejar el login
export function loginUser() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();  // Evitar el envío del formulario por defecto

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // Consultar la base de datos para encontrar el usuario
                const usersRef = collection(db, "usuario");
                const q = query(usersRef, where("usr_email", "==", email), where("usr_pwd", "==", password));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0].data();  // Assuming the first result is the logged-in user
                    // Store user details in localStorage
                    localStorage.setItem('loggedInUser', JSON.stringify({
                        name: userDoc.usr_nombre,
                        address: userDoc.usr_direccion,
                        phone: userDoc.usr_telefono
                    }));
                    
                    alert("Inicio de sesión exitoso.");
                    window.location.href = "index.html";  // Redirect to the main page
                } else {
                    // Incorrect credentials
                    const errorMessage = document.getElementById('error-message');
                    errorMessage.textContent = "Credenciales incorrectas.";
                    alert("Credenciales incorrectas");
                    errorMessage.classList.remove("hidden");
                }
            } catch (error) {
                console.error("Error al iniciar sesión: ", error);
            }
        });
    } else {
        console.error('Formulario de login no encontrado.');
    }
}
