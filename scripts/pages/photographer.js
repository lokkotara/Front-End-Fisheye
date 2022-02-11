
import {MediaPicture, MediaVideo} from "../factories/MediaFactory.js";
import {
  getMedias,
  getPhotographer,
} from "../services/dataManager.js";

import Filter from "../components/Filter.js";
import {exposeElement} from "../utils/tools.js";
import toggleModal from "../utils/contactForm.js";

exposeElement("toggleModal", toggleModal.bind(this));
exposeElement("toggleFilter", toggleFilter.bind(this));
exposeElement("manageLike", manageLike.bind(this));
exposeElement("sortBy", sortBy.bind(this));

let id;
let photographer;
let filter;
let medias = [];
let mediasObject = [];

export default async function injectPage(array) {
  createContainer();
  id = parseInt(array[1]);
  photographer = await getPhotographer(id);
  medias = await getMedias(id);
  const DOMTarget = document.querySelector(".heading_section");
  filter = initFilter(medias);
  DOMTarget.innerHTML = displayPhotographersTemplate(photographer);
}

function createContainer() {
  const main = document.querySelector("#mainContainer");
  main.innerHTML = "";
  const container = document.createElement("div");
  container.classList = "heading_section";
  main.appendChild(container);
}

function displayPhotographersTemplate(photographer) {
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
    <div class="filterArea">${filter.render()}</div>
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

function displayMedias(data) {
  console.log(filter.sortFilterBy("Popularité"));
  let html = "";
  mediasObject = [];
  if (data) medias = data;
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
      modifyLike(media.id, media.likes);
    }
  });
}
function modifyLike(id, media) {
  const counterContainer = document.querySelector(`#counter_${id}`);
  const icon = counterContainer.nextElementSibling;
  console.log(icon);
  icon.classList.toggle("iconFull");
  counterContainer.innerText = media;
}

function initFilter(medias) {
  return new Filter(medias);
}
function toggleFilter() {
  const filterArea = document.querySelector(".filterArea");
  filter.toggle();
  filterArea.innerHTML = filter.render();
}
function updateFilter(html) {
  const filterArea = document.querySelector(".filterArea");
  filterArea.innerHTML = html;
}

function sortBy(type) {
  const newObjectArray = filter.sortFilterBy(type);
  const HTML = displayMedias(newObjectArray);
  updateMediasGallery(HTML);
  const newContent = filter.updateFilterOrder(type);
  updateFilter(newContent);
}

function updateMediasGallery(html) {
  const mediasGallery = document.querySelector(".mediasGallery");
  mediasGallery.innerHTML = html;
}