async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  const photographers = [
    {
      "city"        : "Paris",
      "country"     : "France",
      "id"          : 1,
      "name"        : "Ma data test",
      "portrait"    : "account.png",
      "price"       : 400,
      "tagline"     : "Ceci est ma data test",
    },
    {
      "city"        : "Londres",
      "country"     : "UK",
      "id"          : 2,
      "name"        : "Autre data test",
      "portrait"    : "account.png",
      "price"       : 500,
      "tagline"     : "Ceci est ma data test 2",
    },
  ];
  // et bien retourner le tableau photographers seulement une fois
  return ({
    photographers: [...photographers, ...photographers, ...photographers]});
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
