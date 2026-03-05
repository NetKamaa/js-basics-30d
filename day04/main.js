import { loadItems } from "./actions.js";
import { initHandlers } from "./handlers.js";
import { render } from "./render.js";
import { getState, loadState, setState } from "./state.js";

window.addEventListener("DOMContentLoaded", () => {
  init();
});

async function init() {
  setState(loadState());
  initHandlers();

  render(getState());

  if (getState().items.length === 0) {
    const p = loadItems();
    render(getState());
    await p;
  }

  render(getState());
}
