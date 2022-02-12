import { getAllPhotographers, watchKeyNav } from "../services/dataManager.js";

export default async function pageIndex() {
  createContainer();
  const DOMTarget = document.querySelector(".photographer_section");
  let html = "";
  const photographers = await getAllPhotographers();
  photographers.forEach((photographer) => {
    html += photographer.getCard();
  });
  DOMTarget.innerHTML = html;
  watchKeyNav();
}

function createContainer() {
  const main = document.querySelector("#mainContainer");
  main.innerHTML = "";
  const container = document.createElement("section");
  container.classList = "photographer_section";
  main.appendChild(container);
}