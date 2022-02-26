import {definePage} from "./services/router.js";
import {setDataManagerSource} from "./services/dataManager.js";

await setDataManagerSource("http://localhost:5500/data/photographers.json");
definePage();
watchKeyNav();

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