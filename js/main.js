// URL que recibirá los registros (Formspree, Google Apps Script, API propia...).
// Mientras esté vacía, el formulario solo valida y muestra el mensaje de éxito.
const FORM_ENDPOINT = "";

const form = document.getElementById("gift-form");
const msg = document.getElementById("form-msg");
const button = form.querySelector("button");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function showMessage(text, type) {
  msg.textContent = text;
  msg.className = `form-msg is-${type}`;
}

function validate() {
  const nombre = form.nombre;
  const correo = form.correo;
  const nombreOk = nombre.value.trim().length >= 2;
  const correoOk = EMAIL_RE.test(correo.value.trim());

  const privacidad = form.privacidad;
  const privacidadOk = privacidad.checked;

  nombre.setAttribute("aria-invalid", String(!nombreOk));
  correo.setAttribute("aria-invalid", String(!correoOk));
  privacidad.setAttribute("aria-invalid", String(!privacidadOk));

  if (!nombreOk) { nombre.focus(); return "Escribe tu nombre."; }
  if (!correoOk) { correo.focus(); return "Escribe un correo válido."; }
  if (!privacidadOk) { privacidad.focus(); return "Acepta el aviso de privacidad para continuar."; }
  return "";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const error = validate();
  if (error) return showMessage(error, "error");

  const data = {
    nombre: form.nombre.value.trim(),
    correo: form.correo.value.trim(),
  };

  button.disabled = true;
  showMessage("Enviando…", "ok");

  try {
    if (FORM_ENDPOINT) {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.statusText);
    }
    form.reset();
    showMessage(`¡Listo, ${data.nombre}! Tu obsequio quedó apartado. Te esperamos en el Stand C 609.`, "ok");
  } catch {
    showMessage("No pudimos registrar tu solicitud. Inténtalo de nuevo.", "error");
  } finally {
    button.disabled = false;
  }
});

form.addEventListener("input", (event) => {
  event.target.removeAttribute("aria-invalid");
});

// Cuenta regresiva al inicio del evento
const countdown = document.getElementById("countdown");
const start = new Date(countdown.dataset.start).getTime();
const end = new Date(countdown.dataset.end).getTime();
const label = countdown.querySelector(".countdown__label");
const units = Object.fromEntries(
  [...countdown.querySelectorAll("[data-unit]")].map((el) => [el.dataset.unit, el])
);
const pad = (n) => String(n).padStart(2, "0");

function tick() {
  const now = Date.now();
  if (now >= start) {
    countdown.classList.add("is-live");
    label.textContent = now < end
      ? "¡El evento está en curso! Visítanos en el Stand C 609"
      : "¡Gracias por visitarnos en Expo CIHAC 2026!";
    return clearInterval(timer);
  }
  let s = Math.floor((start - now) / 1000);
  units.d.textContent = pad(Math.floor(s / 86400)); s %= 86400;
  units.h.textContent = pad(Math.floor(s / 3600)); s %= 3600;
  units.m.textContent = pad(Math.floor(s / 60));
  units.s.textContent = pad(s % 60);
}
const timer = setInterval(tick, 1000);
tick();

// Aparición suave de las secciones al hacer scroll
const revealables = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  revealables.forEach((el) => observer.observe(el));
} else {
  revealables.forEach((el) => el.classList.add("is-visible"));
}
