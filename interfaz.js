
// CONTROL DE LA MÚSICA

const audio = document.getElementById("audioFondo");
const botonMusica = document.getElementById("botonMusica");
const volumen = document.getElementById("volumen");

audio.volume = Number(volumen.value);

botonMusica.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      botonMusica.textContent = "❚❚";
    } catch (error) {
      alert("No se pudo reproducir la música.");
    }
  } else {
    audio.pause();
    botonMusica.textContent = "▶";
  }
});

volumen.addEventListener("input", () => {
  audio.volume = Number(volumen.value);
});

// ABRIR FORMULARIO DE ASISTENCIA

const botonConfirmar = document.getElementById("abrirConfirmacion");
const seccionConfirmar = document.getElementById("confirmar");

botonConfirmar.addEventListener("click", () => {
  seccionConfirmar.hidden = false;

  botonConfirmar.setAttribute("aria-expanded", "true");

  seccionConfirmar.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  const campoNombres = document.getElementById("nombres");

  if (campoNombres) {
    campoNombres.focus();
  }
});
