import injectDOM from "./pages/index.js";
import {setDataManagerSource} from "./dataManager.js";
setDataManagerSource("http://localhost:5500/data/photographers.json");
injectDOM(document.querySelector(".photographer_section"));