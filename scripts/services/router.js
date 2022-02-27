import exposeElement from "../utils/tools.js";
import {getNameById} from "./dataManager.js";
import index from "../pages/index.js";
import photographer from "../pages/photographer.js";
import render from "../components/navbar.js";

let page;
const pages = {
  index,
  photographer
};

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
  let nextTitle = "";
  const nextState = null;
  const header = document.querySelector("#headerContainer");
  const pathname = window.location.pathname;
  if (url[0]==="") url[0] = "index";
  switch (url[0]) {
    case "index":
      header.innerHTML = render("index");
      page = pages[url[0]](url);
      nextURL = pathname ;
      nextTitle = "Fisheye | La référence des photographes";
      document.title = "Fisheye | La référence des photographes";
      break;
    case "photographer":
      const photographerName = await getNameById(url[1]);
      header.innerHTML = render("photographer");
      page = pages[url[0]](url);
      nextURL = pathname + `?${url[0]}/${url[1]}`;
      nextTitle = `Fisheye | Coup d'oeil sur ${photographerName}`;
      document.title = `Fisheye | Coup d'oeil sur ${photographerName}`;
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