import { loadItemsFromApi } from "./api.js";
import { getState, saveState, setState } from "./state.js";

export async function loadItems() {
  setState({ ...getState(), requestStatus: "loading", requestError: "" });

  try {
    const items = await loadItemsFromApi();
    setState({
      ...getState(),
      items,
      requestStatus: "success",
      requestError: "",
    });

    saveState();
  } catch (e) {
    setState({
      ...getState(),
      requestStatus: "error",
      requestError: e?.message || "Не удалось загрузить данные",
    });
  }
}
