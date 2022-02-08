import {exposeElement} from "../utils/tools.js";
import index from "../pages/index.js";
import photographer from "../pages/photographer.js";
import render from "../components/navbar.js";

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
  let nextURL;
  const nextTitle = "";
  const nextState = null;
  const header = document.querySelector("#headerContainer");
  const pathname = window.location.pathname;
  if (url[0]==="") url[0] = "index";
  switch (url[0]) {
    case "index":
      header.innerHTML = render("index");
      page = await pages[url[0]](url);
      DOMTarget = document.querySelector(".photographer_section");
      DOMTarget.innerHTML = page;
      nextURL = pathname ;
      break;
    case "photographer":
      header.innerHTML = render("photographer");
      page = pages[url[0]](url);
      nextURL = pathname + `?${url[0]}/${url[1]}`;
      // DOMTarget = document.querySelector(".heading_section");
      // DOMTarget.innerHTML = page;
      break;
    default:
      DOMTarget = document.querySelector(".heading_section");
      page = "<h1>404</h1>";
      DOMTarget.innerHTML = page;
      break;
  }
  window.history.pushState(nextState, nextTitle,  nextURL);
  window.history.replaceState(nextState, nextTitle,  nextURL);
}
export {
  changePage,
  definePage
};