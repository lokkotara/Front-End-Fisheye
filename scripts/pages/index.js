import { getAllPhotographers } from "../services/dataManager.js";

export default function pageIndex() {
  createContainer();
  const DOMTarget     = document.querySelector(".photographerSection");
  let   html          = "";
  const photographers = getAllPhotographers();
  photographers.forEach((photographer) => html += photographer.getCard());
  DOMTarget.innerHTML = html;
}

function createContainer() {
  const main            = document.querySelector("#mainContainer");
  main.innerHTML        = "";
  const container       = document.createElement("div");
  container.classList   = "photographerSection";
  main.appendChild(container);
}