import PhotographerFactory from "../factories/photographerFactory.js";
let photographerArray = [];
let photographers = null;
let media = null;
const isDebug = false; //Mettre à true pour afficher les temps d'execution des fonctions choisies

async function setDataManagerSource(source) {
  if (debug) console.time("setDataManagerSource");
  try {
    const query = await fetch(source);
    const response =  await query.json();
    photographers = response.photographers;
    media = response.media;
    photographerArray = getAllPhotographers();
  } catch (error) {
    console.error(error);
  }
  if (debug()) console.timeEnd("setDataManagerSource");
}

function getAllPhotographers() {
  photographerArray = [];
  photographers.forEach((photographer) => {
    photographerArray.push(new PhotographerFactory(photographer));
  });
  return photographerArray;
}

function getPhotographer(id) {
  return photographerArray.find(photographer => photographer["id"] === id);
}

function getMedias(id) {
  return media.filter(media => media["photographerId"] === id);
}

/**
 * Met à jour le nombre de likes total en cours de navigation
 *
 * @param   {Array<object>}  array  Le tableau des médias en cours de navigation
 *
 * @return  {Number}         Le total de likes
 */
function getUpdateLikes(array) {
  let sum = null;
  array.forEach(media => sum += media["likes"]);
  return sum;
}

/**
 * Récupère le nombre total de likes par défaut
 *
 * @param   {Number}  id  l'id du photographe
 *
 * @return  {Number}      Retourne le nombre total de likes
 */
function getTotalLikes(id) {
  const array = getMedias(id);
  let sum = null;
  array.forEach(media => sum += media["likes"]);
  return sum;
}

function getNameById(id) {
  const obj = photographers.find(photo => photo["id"] === parseInt(id));
  return obj.name;
}

function debug() {
  return isDebug;
}

export {
  debug,
  getAllPhotographers,
  getMedias,
  getNameById,
  getPhotographer,
  getTotalLikes,
  getUpdateLikes,
  setDataManagerSource,
};