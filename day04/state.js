import { normalizeText } from "./utils.js";

let state = {
  items: [],
  filter: "",

  requestStatus: "idle",
  requestError: "",
};

const DEFAULT_STATE = {
  items: [],
  filter: "",
};

const STORAGE_KEY = "todo_app_state";

export function getState() {
  return state;
}

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
  const hasItem = prevState.items.some((item) => item.id === idToRemove);
  if (!hasItem) return prevState;
  return {
    ...prevState,
    items: prevState.items.filter((item) => item.id !== idToRemove),
  };
}

export function setFilter(prevState, query) {
  const normalized = normalizeText(String(query ?? ""));

  if (normalized === prevState.filter) return prevState;

  return {
    ...prevState,
    filter: normalized,
  };
}

export function addItemAction(text) {
  const nextState = addItem(state, text);
  if (nextState !== state) state = nextState;
  return state;
}

export function removeItemAction(id) {
  const nextState = removeItem(state, id);
  if (nextState !== state) state = nextState;
  return state;
}

export function setFilterAction(query) {
  const nextState = setFilter(state, query);
  if (nextState !== state) state = nextState;
  return state;
}
