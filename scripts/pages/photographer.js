
import {
  getMedias,
  getPhotographer,
  initDataManager,
} from "../services/dataManager.js";

import PhotographerFactory from "../factories/photographerFactory.js";
import {exposeElement} from "../utils/tools.js";
import toggleModal from "../utils/contactForm.js";

exposeElement("toggleModal", toggleModal.bind(this));

let id;
let photographer;
let medias = [];

export default async function injectPage(array) {
  createContainer();
  id = parseInt(array[1]);
  await initDataManager();
  medias = getMedias(id);
  console.log(medias);
  return displayPhotographersTemplate(id);
}

function createContainer() {
  const main = document.querySelector("#main");
  main.innerHTML = "";
  const container = document.createElement("div");
  container.classList = "heading_section";
  main.appendChild(container);
}

function displayPhotographersTemplate(id) {
  photographer = new PhotographerFactory(getPhotographer(id));
  return /*html*/`
    <div class="photographer_header">
      <div class="col">
        <h1>${photographer.name}</h1>
        <p>${photographer.city}, ${photographer.country}</p>
        <p>${photographer.tagline}</p>
      </div>
      <div class="col">
        <button class="contact_button" onclick="toggleModal()">Contactez-moi</button>
      </div>
      <div class="col">
        <img src="${photographer.picture}">
      </div>
    </div>
    <div id="contact_modal">
			<div class="modal hidden">
				<header>
          <h2>Contactez-moi</h2>
          <img src="assets/icons/close.svg" onclick="toggleModal()" />
        </header>
				<form>
					<div>
						<label>Prénom</label>
						<input />
					</div>
          <button class="contact_button">Envoyer</button>
				</form>
			</div>
		</div>
  `;
}