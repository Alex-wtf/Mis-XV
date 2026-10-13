
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  set,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

import { firebaseConfig } from "./firebase-config.js";

const formulario = document.getElementById("formularioRSVP");
const campo = document.getElementById("nombres");
const mensaje = document.getElementById("mensaje");

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre = campo.value.trim().replace(/\s+/g, " ");

  if (
    nombre.length < 3 ||
    nombre.length > 80 ||
    !/^[\p{L}\p{M} .'’-]+$/u.test(nombre) ||
    nombre.split(" ").length < 2
  ) {
    mensaje.textContent = "Escribí tu nombre y apellido, sin acompañantes.";
    return;
  }

  const botonEnviar = formulario.querySelector('button[type="submit"]');
  botonEnviar.disabled = true;

  mensaje.textContent = "Enviando confirmación...";

  try {
    await set(push(ref(db, "confirmaciones")), {
      nombre: nombre,
      fecha: serverTimestamp()
    });

    mensaje.textContent = "¡Tu asistencia quedó confirmada!";
    campo.value = "";

  } catch (error) {
    console.error("Error al guardar:", error);
    mensaje.textContent = "Error al enviar. Revisá Firebase.";
  } finally {
    botonEnviar.disabled = false;
  }
});