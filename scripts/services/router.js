import {exposeElement} from "../utils/tools.js";
import index from "../pages/index.js";
import photographer from "../pages/photographer.js";

const pages = {
  index,
  photographer
};

let page;
exposeElement("page", page); //TODO enlever après débug
exposeElement("changePage", changePage.bind(this));

function definePage() {
  const query = window.location.href.split("?")[1];
  const locationArray = query ? query.split("/") : [""];
  changePage(locationArray);
}

/**
 * @param {Array.<string>} url
 * @return {void} injecte la page dans le DOM
 */
async function changePage(url){
  let DOMTarget;
  if (url[0] === "") url[0] = "index";
  switch (url[0]) {
    case "index":
      page = await pages[url[0]](url);
      DOMTarget = document.querySelector(".photographer_section");
      break;
    case "photographer":
      page = await pages[url[0]](url);
      DOMTarget = document.querySelector(".heading_section");
      break;
    default:
      page = "<h1>404</h1>";
      break;
  }
  DOMTarget.innerHTML = page;
}

export {
  changePage,
  definePage
};