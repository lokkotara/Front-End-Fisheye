
import {
  debug,
  getMedias,
  getPhotographer,
  getTotalLikes,
  getUpdateLikes,
} from "../services/dataManager.js";

import Filter from "../components/Filter.js";
import Lightbox from "../components/Lightbox.js";
import {MediaPicture} from "../factories/MediaPicture.js";
import {MediaVideo} from "../factories/MediaVideo.js";
import {exposeElement} from "../utils/tools.js";
import {toggleModal, templateModal} from "../utils/contactForm.js";

exposeElement("toggleModal", toggleModal.bind(this));
exposeElement("toggleFilter", toggleFilter.bind(this));
exposeElement("manageLike", manageLike.bind(this));
exposeElement("sortBy", sortBy.bind(this));
exposeElement("submitForm", submitForm.bind(this));
exposeElement("showLightbox", showLightbox.bind(this));
exposeElement("next", next.bind(this));
exposeElement("previous", previous.bind(this));
exposeElement("closeLightbox", closeLightbox.bind(this));

let id;
let photographer;
let filter;
let lightbox;
let totalLikes    = null;
let medias        = [];
let mediasObject  = [];

export default function injectPage(array) {
  if (debug) console.time("injectPage");
  createContainer();
  id                    = parseInt(array[1]);
  photographer          = getPhotographer(id);
  medias                = getMedias(id);
  totalLikes            = getTotalLikes(photographer.id);
  const DOMTarget       = document.querySelector(".heading_section");
  filter                = initFilter(medias);
  DOMTarget.innerHTML   = templatePhotographerHTML(photographer);
  if (debug()) console.timeEnd("injectPage");
}

function createContainer() {
  const main            = document.querySelector("#mainContainer");
  const container       = document.createElement("div");
  main.innerHTML        = "";
  container.classList   = "heading_section";
  main.appendChild(container);
}

function templatePhotographerHTML(photographer) {
  return /*html*/`
    <section class="photographer_header" aria-label="En-tête de présentation du photographe">
      <section class="col">
        <h1>${photographer.name}</h1>
        <h2 class="photographerLocation">${photographer.city}, ${photographer.country}</h2>
        <p>${photographer.tagline}</p>
      </section>
      <section class="col">
        <button type="button" class="contact_button" onclick="toggleModal()">Contactez-moi</button>
      </section>
      <section class="col">
        <img src="${photographer.picture}" alt="${photographer.name}">
      </section>
    </section>
    <section class="filterArea">${filter.render()}</section>
    <section class="mediasGallery">${displayMedias()}</section>
    <section class="infoContainer">${templateInfosPhotographer()}</section>
    <article class="contact_modal hidden">${templateModal(photographer)}</article>
    <div class="lightbox hidden" tabindex="0">
      <div class="content"></div>
    </div>
		</div>
  `;
}

function templateInfosPhotographer() {
  return /*html*/`
    <span class="likesInfoContainer" aria-label="nombre de j'aime">
      <data class="likesInfo" value="${totalLikes} j'aime" aria-label="${totalLikes} j'aime">${totalLikes}</data>
      <span class="fa fa-heart"></span>
    </span>
    <data class="priceInfoContainer" value="${photographer.price}"  aria-label="Tarif de ${photographer.price} euros par jour">${photographer.price}€/jour</data>
  `;
}

function displayMedias(data) {
  medias = filter.sortFilterBy();
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

function manageLike(id, $event) {
  $event.stopPropagation();
  mediasObject.forEach(media => {
    if (media.id === id) {
      media.toggleLike();
      modifyLike(media.id, media.likes);
      const likes = getUpdateLikes(mediasObject);
      displayNewTotalLikes(likes);
    }
  });
}

function modifyLike(id, media) {
  const counterContainer = document.querySelector(`#counter_${id}`);
  const icon = counterContainer.nextElementSibling;
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
  toggleFilter();
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

function displayNewTotalLikes(value) {
  const likesInfo = document.querySelector(".likesInfo");
  likesInfo.innerHTML = value;
}

function submitForm(e) {
  e.preventDefault();
  const infosForm = [];
  const formRequest = {};
  const formInputs = document.forms["myform"].elements;
  for (let i = 0, size = formInputs.length; i < size; i++) {
    const obj = new Object();
    obj[formInputs[i].name] = formInputs[i].value;
    if (formInputs[i].localName === "input") infosForm.push(obj);
  }
  formRequest.formSenderInfos = infosForm;
  formRequest.formRecipientName = photographer.name;
  console.log(formRequest);//Affiche les infos dans la console pour cette version
  document.forms["myform"].reset();
  toggleModal(e);
}

function showLightbox(id) {
  const body = document.querySelector("body");
  const DOMTarget = document.querySelector(".lightbox");
  lightbox = new Lightbox(mediasObject, DOMTarget);
  lightbox.show(id);
  manageLightboxNav(DOMTarget);
  lightbox.manageLightboxNav();
  body.classList.add("noScroll");
}

function next() {
  lightbox.next();
  lightbox.manageLightboxNav();
}
function previous() {
  lightbox.previous();
  lightbox.manageLightboxNav();
}
function closeLightbox(DOMTarget) {
  const body = document.querySelector("body");
  lightbox.close();
  document.onkeydown = null;
  if (DOMTarget === undefined) DOMTarget = document.querySelector(".lightbox");
  DOMTarget.parentNode.children[1].children[0].lastElementChild.firstElementChild.focus();
  body.classList.remove("noScroll");
}

function manageLightboxNav(DOMTarget) {
  document.onkeydown = e => {
    switch (e.key) {
      case "ArrowLeft":
        previous();
        break;
      case "ArrowRight":
        next();
        break;
      case "Escape":
        closeLightbox(DOMTarget);
        break;
      case " ":
        const video = document.querySelector("#videoLightbox");
        if (video !== null) video
          .play()
          .then()
          .catch((error) => {
            console.error("Erreur: " + error);
          });
        break;
      default:
        break;
    }
  };
}