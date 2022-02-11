import { getAllPhotographers } from "../services/dataManager.js";

export default async function pageIndex() {
  createContainer();
  let html = "";
  const photographers = await getAllPhotographers();
  photographers.forEach((photographer) => {
    html += photographer.getCard();
  });
  return html;
}

function createContainer() {
  const main = document.querySelector("#mainContainer");
  main.innerHTML = "";
  const container = document.createElement("div");
  container.classList = "photographer_section";
  main.appendChild(container);
}