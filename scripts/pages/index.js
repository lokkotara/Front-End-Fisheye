import { getAllPhotographers } from "../services/dataManager.js";
export default function pageIndex() {
  createContainer();
  const DOMTarget = document.querySelector(".photographer_section");
  let html = "";
  const photographers = getAllPhotographers();
  photographers.forEach((photographer) => html += photographer.getCard());
  DOMTarget.innerHTML = html;
}

function createContainer() {
  const main = document.querySelector("#mainContainer");
  main.innerHTML = "";
  const container = document.createElement("section");
  container.classList = "photographer_section";
  main.appendChild(container);
}