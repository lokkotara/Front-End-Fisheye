import PhotographerFactory from "../factories/photographerFactory.js";

let src;
let photographers = null;
let photographerModelArray;
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
  const photographerArray = [];
  if (photographers === null) await initDataManager();
  console.log(photographers);
  photographers.forEach((photographer) => {
    const photographerModel = new PhotographerFactory(photographer);
    photographerArray.push(photographerModel);
  });
  return photographerArray;
}

async function getPhotographer(id) {
  const photographerArray = await getAllPhotographers();
  for (const photographer of photographerArray) {
    if (photographer["id"] === id) {
      console.log(photographer);
      return photographer;
    }
  }
}

async function getMedias(id) {
  if (media === null) await initDataManager();
  const array = media.filter(media => media["photographerId"] === id);
  return array;
}

export {
  getAllPhotographers,
  getMedias,
  getPhotographer,
  setDataManagerSource,
  initDataManager,
};