// Variables globales
let MAIN, MODAL_POST, BTN_SHOW_POST, BTN_CANCEL_POST, FORM, NOTES_CONTAINER, deferredPrompt;
const STORAGE_KEY = "quickJotNotes";
const OVERLAY = document.querySelector("#modal-overlay");
const DETAIL_TITLE = document.querySelector("#detail-title");
const DETAIL_DESC = document.querySelector("#detail-description");
const DETAIL_CLOSE_BTN = document.querySelector("#btn-detail-close");
const SNACKBAR = document.querySelector('#snackbar');

// Mostrar / cerrar modales
const ShowModalPost = () => MODAL_POST.classList.add("active");
const ClosePostModal = () => {
  MODAL_POST.classList.remove("active");
  FORM.reset();
};

function openDetailModal(title, description) {
  DETAIL_TITLE.textContent = title;
  DETAIL_DESC.textContent = description;
  OVERLAY.classList.add("active");
}

function closeDetailModal() {
  OVERLAY.classList.remove("active");
}



// Obtener descripción corta
const getShortDescription = (text, wordCount = 10) => {
  const words = text.split(/\s+/);
  return words.length <= wordCount ? text : words.slice(0, wordCount).join(" ") + "...";
};

const showSnackbar = (message, actionText = '', actionHandler = null) => {
  if (!SNACKBAR) return;

  const data = {
    message: message,
    timeout: 3000, // Duración: 3 segundos
  };

  if (actionText && actionHandler) {
    data.actionHandler = actionHandler;
    data.actionText = actionText;
  }

  SNACKBAR.MaterialSnackbar.showSnackbar(data);
};

// Crear y agregar tarjeta de nota
const addNoteCard = (title, description) => {
  const card = document.createElement("div");
  card.className = "demo-card-square mdl-card mdl-shadow--2dp";
  card.innerHTML = `
    <div class="mdl-card__title mdl-card--expand" style="background: var(--primary); color: var(--white);">
      <h2 class="mdl-card__title-text">${title}</h2>
    </div>
    <div class="mdl-card__supporting-text">${getShortDescription(description)}</div>
    <div class="mdl-card__actions mdl-card--border">
      <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect btn-view-details" style="color: var(--accent);">
        Ver detalles
      </button>
    </div>
  `;
  NOTES_CONTAINER.appendChild(card);

  card.querySelector(".btn-view-details").addEventListener("click", () => openDetailModal(title, description));

  if (window.componentHandler) componentHandler.upgradeElement(card);
};

// Guardar / obtener notas en localStorage
const saveNotesToStorage = notes => localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
const getNotesFromStorage = () => {
  const notes = localStorage.getItem(STORAGE_KEY);
  return notes ? JSON.parse(notes) : [];
};
const renderNotes = () => {
  NOTES_CONTAINER.innerHTML = "";
  getNotesFromStorage().forEach(({ title, description }) => addNoteCard(title, description));
};

// Evento PWA install
window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;
});

// Inicialización
window.addEventListener("load", async () => {
  MAIN = document.querySelector("#main");
  MODAL_POST = document.querySelector("#modal-post-section");
  BTN_SHOW_POST = document.querySelector("#btn-upload-post");
  BTN_CANCEL_POST = document.querySelector("#btn-post-cancel");
  FORM = document.querySelector("#note-form");
  NOTES_CONTAINER = document.querySelector("#notes-container");

  BTN_SHOW_POST.addEventListener("click", ShowModalPost);
  BTN_CANCEL_POST.addEventListener("click", ClosePostModal);
  DETAIL_CLOSE_BTN.addEventListener("click", closeDetailModal);

  OVERLAY.addEventListener("click", (e) => {
  if (e.target === OVERLAY) closeDetailModal();
});

  renderNotes();

  FORM.addEventListener("submit", e => {
    e.preventDefault();
    const title = document.querySelector("#title").value.trim();
    const description = document.querySelector("#description").value.trim();
    if (!title || !description) return;

    addNoteCard(title, description);
    const notes = getNotesFromStorage();
    notes.push({ title, description });
    saveNotesToStorage(notes);
    ClosePostModal();

    showSnackbar("¡Nota guardada correctamente!");
  });

  // Notificaciones
  await Notification.requestPermission();

  // Service Worker
const permission = await Notification.requestPermission();

if (permission === "granted") {
  if ('serviceWorker' in navigator) {
    try {
      const sw = await navigator.serviceWorker.register('./sw.js');
      const ready = await navigator.serviceWorker.ready;
      ready.showNotification("Mis Notas MG-PWA", {
        body: "La aplicación está lista y offline!",
        icon: "./src/images/icons/256X256.png",
        vibrate: [100, 50, 200],
      });
    } catch (err) {
      console.error("SW failed:", err);
    }
  }
} else {
  console.warn("El usuario no permitió notificaciones");
} 

  // Banner instalación
  const bannerInstall = document.querySelector("#banner-install");
  bannerInstall.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      console.log(choice.outcome === "accepted" ? "App instalada" : "Usuario rechazó");
    }
  });
});
