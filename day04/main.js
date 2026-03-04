import { loadItemsFromApi } from "./api.js";
import { initHandlers } from "./handlers.js";
import { render } from "./render.js";
import { getState, loadState, saveState, setState } from "./state.js";

window.addEventListener("DOMContentLoaded", () => {
  init();
});

let isLoading = false;
let loadError = "";

async function init() {
  setState(loadState());
  initHandlers();

  if (getState().items.length === 0) {
    isLoading = true;
    render(getState(), { isLoading, loadError });

    try {
      const apiItems = await loadItemsFromApi();
      setState({ ...getState(), items: apiItems });
      saveState();
    } catch (e) {
      loadError = "Не удалось загрузить данные";
    } finally {
      isLoading = false;
    }
  }
  render(getState(), { isLoading, loadError });
}
