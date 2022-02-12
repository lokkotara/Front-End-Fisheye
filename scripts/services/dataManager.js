import PhotographerFactory from "../factories/photographerFactory.js";

let src;
let photographers = null;
let photographerArray = [];
let media = null;

function setDataManagerSource(source) {
  src = source;
}

async function initDataManager() {
  try {
    const query = await fetch(src);
    const response =  await query.json();
    photographers = response.photographers;
    media = response.media;
  } catch (error) {
    console.error(error);
  }
}

async function getAllPhotographers() {
  if (photographers === null) await initDataManager();
  photographerArray = [];
  photographers.forEach((photographer) => {
    const photographerModel = new PhotographerFactory(photographer);
    photographerArray.push(photographerModel);
  });
  return photographerArray;
}

async function getPhotographer(id) {
  if (photographerArray.length < 1) await getAllPhotographers();
  for (const photographer of photographerArray) {
    if (photographer["id"] === id) {
      return photographer;
    }
  }
}

async function getMedias(id) {
  if (media === null) await initDataManager();
  const array = media.filter(media => media["photographerId"] === id);
  return array;
}
function getUpdateLikes(array) {
  let sum = null;
  array.forEach(media => sum += media["likes"]);
  return sum;
}
async function getTotalLikes(id) {
  const array = await getMedias(id);
  let sum = null;
  array.forEach(media => sum += media["likes"]);
  return sum;
}

async function getNameById(id) {
  let name;
  photographers = await getAllPhotographers();
  photographers.forEach((photographer) => {
    if (photographer["id"] === id) {
      name = photographer["name"];
    }
  });
  return name;
}

function watchKeyNav() {
  document.onkeyup = e => {
    if (e.key === "Enter" && e.explicitOriginalTarget.localName !== "body") document.activeElement.onclick(e.target.onclick);
  };
}

export {
  getAllPhotographers,
  getMedias,
  getNameById,
  getPhotographer,
  getTotalLikes,
  getUpdateLikes,
  setDataManagerSource,
  initDataManager,
  watchKeyNav,
};