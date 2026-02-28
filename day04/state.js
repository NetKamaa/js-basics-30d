import { normalizeText } from "./utils.js";

export let state = {
  items: [],
  filter: "",
};

const DEFAULT_STATE = {
  items: [],
  filter: "",
};

const STORAGE_KEY = "todo_app_state";

export function setState(nextState) {
  state = nextState;
}

export function saveState() {
  const dataToSave = {
    version: 1,
    items: state.items,
    filter: state.filter,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
}

export function loadState() {
  const savedState = localStorage.getItem(STORAGE_KEY);

  if (savedState === null) return { ...DEFAULT_STATE };

  let parsedState;

  try {
    parsedState = JSON.parse(savedState);
  } catch (error) {
    return { ...DEFAULT_STATE };
  }
  if (
    !parsedState ||
    typeof parsedState !== "object" ||
    !Array.isArray(parsedState.items)
  ) {
    return { ...DEFAULT_STATE };
  }

  const validItems = parsedState.items.filter((item) => {
    return (
      item &&
      typeof item === "object" &&
      typeof item.id === "number" &&
      typeof item.text === "string"
    );
  });

  const filter =
    typeof parsedState.filter === "string" ? parsedState.filter : "";

  return {
    items: validItems,
    filter,
  };
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
