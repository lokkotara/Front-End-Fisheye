
import {MediaPicture, MediaVideo} from "../factories/MediaFactory.js";
import {
  getMedias,
  getPhotographer,
  initDataManager,
} from "../services/dataManager.js";

import PhotographerFactory from "../factories/photographerFactory.js";
import {exposeElement} from "../utils/tools.js";
import toggleModal from "../utils/contactForm.js";

exposeElement("toggleModal", toggleModal.bind(this));
exposeElement("manageLike", manageLike.bind(this));

let id;
let photographer;
let medias = [];
const mediasObject = [];

export default async function injectPage(array) {
  createContainer();
  id = parseInt(array[1]);
  await initDataManager();
  medias = getMedias(id);
  return displayPhotographersTemplate(id);
}

function createContainer() {
  const main = document.querySelector("#mainContainer");
  main.innerHTML = "";
  const container = document.createElement("div");
  container.classList = "heading_section";
  main.appendChild(container);
}

// eslint-disable-next-line max-lines-per-function
function displayPhotographersTemplate(id) {
  photographer = new PhotographerFactory(getPhotographer(id));
  return /*html*/`
    <div class="photographer_header">
      <div class="col">
        <h1>${photographer.name}</h1>
        <p class="photographerLocation">${photographer.city}, ${photographer.country}</p>
        <p>${photographer.tagline}</p>
      </div>
      <div class="col">
        <button class="contact_button" onclick="toggleModal()">Contactez-moi</button>
      </div>
      <div class="col">
        <img src="${photographer.picture}">
      </div>
    </div>
    <div class="mediasGallery">${displayMedias()}</div>
    <div class="contact_modal hidden">
			<div class="modal">
				<header>
        <div class="modalTitleContainer">
          <h2>Contactez-moi</h2>
          <img src="assets/icons/close.svg" onclick="toggleModal()" />
        </div>
          <p class="modalTitleName">${photographer.name}</p>
        </header>
				<form>
					<div>
						<label>Prénom</label>
						<input type="search"/>
						<label>Nom</label>
						<input type="search"/>
						<label>Email</label>
						<input type="email"/>
						<label>Votre message</label>
						<input type="text-area"/>
					</div>
          <button class="contact_button">Envoyer</button>
				</form>
			</div>
		</div>
  `;
}

function displayMedias() {
  let html = "";
  medias.forEach(media => {
    if (media["image"] !== undefined) {
      const model = new MediaPicture(media);
      mediasObject.push(model);
      html += model.render();
    } else {
      const model = new MediaVideo(media);
      mediasObject.push(model);
      html += model.render();
    }
  });
  return html;
}

function manageLike(id) {
  mediasObject.forEach(media => {
    if (media.id === id) {
      media.toggleLike();
      modifyLike(media.id, media.renderLike());
    }
  });
}

function modifyLike(id, media) {
  const counterContainer = document.querySelector(`#counter${id}`);
  counterContainer.innerText = media;
}