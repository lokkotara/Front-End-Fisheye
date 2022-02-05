let src;
let photographers = null;
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
  return photographers;
}

function getPhotographer(id) {
  for (const photographer of photographers) {
    if (photographer["id"] === id) {
      return photographer;
    }
  }
}

function getMedias(id) {
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