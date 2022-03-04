import {definePage} from "./services/router.js";
import {setDataManagerSource} from "./services/dataManager.js";

await setDataManagerSource("./data/photographers.json");
definePage();
watchKeyNav();

/**
 * Permet de simuler le clic lors de l'appui sur la touche 'entrée'
 *
 */
function watchKeyNav() {
  document.onkeyup = (e) => {
    if (
      e.key === "Enter" &&
      e.target.localName !== "body" &&
      e.target.onclick !== null
    ) {
      e.preventDefault();
      document.activeElement.onclick(e);
    }
  };
}