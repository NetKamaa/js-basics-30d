import { normalizeText } from "./utils.js";

export let state = {
  items: [],
  filter: "",
};

export function setState(nextState) {
  state = nextState;
}

export function addItem(prevState, text) {
  const trimmed = normalizeText(text);
  if (!trimmed) return prevState;

  const newItem = {
    id: Date.now(),
    text: trimmed,
  };

  return {
    ...prevState,
    items: [...prevState.items, newItem],
  };
}

export function removeItem(prevState, idToRemove) {
  return {
    ...prevState,
    items: prevState.items.filter((item) => item.id !== idToRemove),
  };
}

export function setFilter(prevState, query) {
  return {
    ...prevState,
    filter: normalizeText(query),
  };
}
