import {
  getMedias,
  getPhotographer,
  initDataManager,
} from "../dataManager.js";
import PhotographerFactory from "../factories/photographerFactory.js";
let DOM;
let photographer;
let medias = [];

export default async function injectPage(domTarget, id) {
  DOM = domTarget;
  await initDataManager();
  displayPhotographersTemplate(id);
  medias = getMedias(id);
  console.log(medias);
  displayAlbum();
}

function displayPhotographersTemplate(id) {
  photographer = new PhotographerFactory(getPhotographer(id));
  DOM.innerHTML = /*html*/`
    <div class="photographer_header">
      <div class="col">
        <h1>${photographer.name}</h1>
        <p>${photographer.city}, ${photographer.country}</p>
        <p>${photographer.tagline}</p>
      </div>
      <div class="col">
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
      </div>
      <div class="col">
        <img src="${photographer.picture}">
      </div>
    </div>
  `;
}

function displayAlbum() {
  const folder = photographer.name.split(" ")[0];
  console.log(folder);
  medias.forEach(media => {
    DOM.innerHTML += `
      <div class="image">
        <img src="./assets/images/${folder}/${media.image}" alt="${media["alt-text"]}" style="height:200px;width:200px;object-fit:cover;">
        <span>${media.image}</span>
      </div>
    `;
  });
}