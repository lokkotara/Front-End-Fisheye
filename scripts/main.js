import injectDOM from "./pages/index.js";
import injectPage from "./pages/photographer.js";
import {setDataManagerSource} from "./dataManager.js";
setDataManagerSource("http://localhost:5500/data/photographers.json");
definePage();

function definePage() {
  const params = (new URL(document.location)).searchParams;
  const url = window.location.pathname;
  switch (url) {
    case "/photographer.html":
      injectPage(document.querySelector("#main"), Number(params.get("id")));
      break;

    default:
      injectDOM(document.querySelector(".photographer_section"));
      break;
  }
}