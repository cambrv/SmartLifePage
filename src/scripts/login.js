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
                    // Usuario autenticado correctamente
                    window.location.href = "index.html";  // Redirigir a la página principal
                    alert("Inicio de sesión exitoso.");
                } else {
                    // Usuario no encontrado o credenciales incorrectas
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
