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

function getPhotographers() {
  return photographers;
}

export {
  getPhotographers,
  setDataManagerSource,
  initDataManager,
};