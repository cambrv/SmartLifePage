// Importa las funciones necesarias desde Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyD-bY4bPP3TG96Od4wbj1SQ0MmL4r7ELv8",
  authDomain: "ls-ecuador.firebaseapp.com",
  projectId: "ls-ecuador",
  storageBucket: "ls-ecuador.appspot.com",
  messagingSenderId: "92937002683",
  appId: "1:92937002683:web:3ea46dd0aaee47f9c4939e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { db };