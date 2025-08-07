let MAIN;
let MODAL_POST;
let BTN_SHOW_POST;
let BTN_CANCEL_POST;
let FORM;
let NOTES_CONTAINER;
let deferredPrompt;

const STORAGE_KEY = "quickJotNotes";
const OVERLAY = document.querySelector("#modal-overlay");
const DETAIL_TITLE = document.querySelector("#detail-title");
const DETAIL_DESC = document.querySelector("#detail-description");
const DETAIL_CLOSE_BTN = document.querySelector("#btn-detail-close");

// Mostrar modal
const ShowModalPost = () => {
  MODAL_POST.classList.add("active");
};

// Cerrar modal
const ClosePostModal = () => {
  MODAL_POST.classList.remove("active");
  FORM.reset();
};

const openDetailModal = (title, description) => {
  DETAIL_TITLE.textContent = title;
  DETAIL_DESC.textContent = description;
  OVERLAY.classList.add("active");
};

const closeDetailModal = () => {
  OVERLAY.classList.remove("active");
};

// Obtener descripción corta
const getShortDescription = (text, wordCount = 10) => {
  const words = text.split(/\s+/);
  if (words.length <= wordCount) return text;
  return words.slice(0, wordCount).join(" ") + "...";
};

// Crear y agregar card al DOM
const addNoteCard = (title, description) => {
  const card = document.createElement("div");
  card.className = "demo-card-square mdl-card mdl-shadow--2dp";

  const shortDescription = getShortDescription(description, 10);

  card.innerHTML = `
  <div class="mdl-card__title mdl-card--expand" style="background: var(--primary); color: var(--white);">
    <h2 class="mdl-card__title-text">${title}</h2>
  </div>
  <div class="mdl-card__supporting-text">${shortDescription}</div>
  <div class="mdl-card__actions mdl-card--border">
    <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect btn-view-details" style="color: var(--accent);">
      Ver detalles
    </button>
  </div>
`;


  NOTES_CONTAINER.appendChild(card);

  const btnView = card.querySelector(".btn-view-details");
  btnView.addEventListener("click", () => {
    openDetailModal(title, description);
  });

  if (window.componentHandler) {
    componentHandler.upgradeElement(card);
  }
};

const saveNotesToStorage = (notes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

const getNotesFromStorage = () => {
  const notes = localStorage.getItem(STORAGE_KEY);
  return notes ? JSON.parse(notes) : [];
};

const renderNotes = () => {
  NOTES_CONTAINER.innerHTML = "";
  const notes = getNotesFromStorage();
  notes.forEach(({ title, description }) => addNoteCard(title, description));
};

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("Evento por defecto anulado")
  e.preventDefault(); //Prevenir el comportamiento por defecto del navegador
  deferredPrompt = e; //Guardar el evento para usarlo después
});

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

  renderNotes();

  FORM.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value.trim();
    const description = document.querySelector("#description").value.trim();

    if (title && description) {
      addNoteCard(title, description);

      const notes = getNotesFromStorage();
      notes.push({ title, description });
      saveNotesToStorage(notes);

      ClosePostModal();
    }
  });

  if (navigator.serviceWorker) {
    const basePath = location.hostname === "localhost" ? "" : "/Quick-jot-MG";
    try {
      const res = await navigator.serviceWorker.register(`${basePath}/sw.js`);
      if (res) {
        console.log("Service Worker registered successfully.");
      }
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }

  const bannerInstall = document.querySelector("#banner-install");
  bannerInstall.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Mostrar el banner de instalación
      const response = await deferredPrompt.userChoice; // Esperar respuesta del usuario
      if (response.outcome === "accepted") {
        console.log("Usuario aceptó la instalación de la PWA");
      }
    }
  });
});
