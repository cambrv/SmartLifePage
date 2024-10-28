import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { db } from "../firebase-config.js";

// Función principal para manejar el login
export function loginUser() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

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
                    const userDoc = querySnapshot.docs[0].data();
                    localStorage.setItem('loggedInUser', JSON.stringify({
                        name: userDoc.usr_nombre,
                        address: userDoc.usr_direccion,
                        phone: userDoc.usr_telefono
                    }));
                    
                    alert("Inicio de sesión exitoso.");
                    window.location.href = "index.html";
                } else {
                    showError("error-message", "Credenciales incorrectas.");
                }
            } catch (error) {
                console.error("Error al iniciar sesión: ", error);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault();  // Evitar el envío del formulario por defecto

            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const name = document.getElementById('reg-name').value;
            const telefono = document.getElementById('reg-telefono').value;
            const direccion = document.getElementById('reg-direccion').value;

            try {
                // Agregar el nuevo usuario a la colección "usuario"
                await addDoc(collection(db, "usuario"), {
                    usr_email: email,
                    usr_pwd: password,
                    usr_nombre: name,
                    usr_telefono: telefono,
                    usr_direccion: direccion
                });
                alert("Registro exitoso.");
                window.location.href = "index.html";  // Redirigir a la página principal
            } catch (error) {
                console.error("Error al registrar el usuario: ", error);
                const errorMessage = document.getElementById('register-error-message');
                errorMessage.textContent = "Error al registrar el usuario. Inténtalo de nuevo.";
                errorMessage.classList.remove("hidden");
            }
        });
    } else {
        console.error('Formulario de registro no encontrado.');
    }
}

function showError(elementId, message) {
    const errorMessage = document.getElementById(elementId);
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}

loginUser();