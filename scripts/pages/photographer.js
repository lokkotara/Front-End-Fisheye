
import {MediaPicture, MediaVideo} from "../factories/MediaFactory.js";
import {
  getMedias,
  getPhotographer,
  getTotalLikes,
  getUpdateLikes,
  watchKeyNav,
} from "../services/dataManager.js";

import Filter from "../components/Filter.js";
import Lightbox from "../components/Lightbox.js";
import {exposeElement} from "../utils/tools.js";
import toggleModal from "../utils/contactForm.js";

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

export default async function injectPage(array) {
  createContainer();
  id                    = parseInt(array[1]);
  photographer          = await getPhotographer(id);
  medias                = await getMedias(id);
  totalLikes            = await getTotalLikes(photographer.id);
  const DOMTarget       = document.querySelector(".heading_section");
  filter                = initFilter(medias);
  DOMTarget.innerHTML   = templatePhotographerHTML(photographer);
  watchKeyNav();
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
      <section class="col" aria-label="Infos concernant le photographe">
        <h1>${photographer.name}</h1>
        <h2 class="photographerLocation">${photographer.city}, ${photographer.country}</h2>
        <p>${photographer.tagline}</p>
      </section>
      <section class="col" aria-hidden="true">
        <button type="button" class="contact_button" onclick="toggleModal(event)">Contactez-moi</button>
      </section>
      <section class="col">
        <img src="${photographer.picture}" alt="${photographer.name}">
      </section>
    </section>
    <section class="filterArea">${filter.render()}</section>
    <section class="mediasGallery">${displayMedias()}</section>
    <section class="infoContainer">${templateInfosPhotographer()}</section>
    <article class="contact_modal hidden">${templateModal()}</article>
    <div class="lightbox hidden" tabindex="0">
      <div class="content"></div>
    </div>
		</div>
  `;
}

function templateModal() {
  return /*html*/`
    <div class="modal" role="dialog">
      <header>
        <section class="modalTitleContainer">
          <p>Contactez-moi</p>
          <img src="assets/icons/close.svg" onclick="toggleModal(event)" alt="Icone pour fermer la modale" tabindex="0"/>
        </section>
        <p class="modalTitleName">${photographer.name}</p>
      </header>
      <form name="myform" id="myform" method="dialog">
        <div>
          <label for="senderFirstName">Prénom</label>
          <input type="text" name="senderFirstName"id="senderFirstName" required/>
          <label for="senderLastName">Nom</label>
          <input type="text" name="senderLastName" id="senderLastName" required/>
          <label for="senderEmail">Email</label>
          <input type="email" name="senderEmail" id="senderEmail" required/>
          <label for="senderContent">Votre message</label>
          <textarea rows="3" name="senderContent" id="senderContent" required></textarea>
        </div>
        <button class="formButton" type="button" onclick="submitForm(event)">Envoyer</button>
      </form>
    </div>
  `;
}

function templateInfosPhotographer() {
  return /*html*/`
    <span class="likesInfoContainer">
      <data class="likesInfo" value="${totalLikes}">${totalLikes}</data>
      <span class="fa fa-heart" aria-hidden="true"></span>
    </span>
    <data class="priceInfoContainer" value="${photographer.price}">${photographer.price}€/jour</data>
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
  const DOMTarget = document.querySelector(".lightbox");
  lightbox = new Lightbox(mediasObject, DOMTarget);
  lightbox.show(id);
  DOMTarget.focus();
  manageLightboxNav(DOMTarget);
}

function next() {
  lightbox.next();
}
function previous() {
  lightbox.previous();
}
function closeLightbox(DOMTarget) {
  lightbox.close();
  document.onkeydown = null;
  if (DOMTarget === undefined) DOMTarget = document.querySelector(".lightbox");
  DOMTarget.parentNode.children[1].children[0].lastElementChild.firstElementChild.focus();
  toggleAllExceptLightbox();
}

function manageLightboxNav(DOMTarget) {
  toggleAllExceptLightbox();
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
        const video = document.querySelector("#test");
        if (video   !== null) video
          .play()
          .then(() => {
            console.log("Yay ! La vidéo est lancée !");
          })
          .catch((error) => {
            console.error("Erreur: " + error);
          });
        break;
      default:
        break;
    }
  };
}

function toggleAllExceptLightbox() {
  const sections = document.querySelectorAll("section");
  const header = document.querySelector("#headerContainer");
  sections.forEach(section => {
    section.classList.toggle("hidden");
  });
  header.classList.toggle("hidden");
}