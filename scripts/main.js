import {definePage} from "./services/router.js";
import {setDataManagerSource} from "./services/dataManager.js";

setDataManagerSource("http://localhost:5500/data/photographers.json");
definePage();