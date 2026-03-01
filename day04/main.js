import { initHandlers } from "./handlers.js";
import { render } from "./render.js";
import { getState, loadState, setState } from "./state.js";

setState(loadState());
initHandlers();
render(getState());
