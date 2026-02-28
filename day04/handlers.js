import {
  btnAdd,
  errorBlock,
  filterInput,
  itemInput,
  itemsList,
  render,
} from "./render.js";
import {
  addItem,
  removeItem,
  saveState,
  setFilter,
  setState,
  state,
} from "./state.js";
import { getValidationError } from "./utils.js";

function handleAdd() {
  const text = itemInput.value;
  const error = getValidationError(text);

  errorBlock.textContent = error;

  if (error) return;

  const prevState = state;
  const nextState = addItem(state, text);

  if (nextState === state) return;

  setState(nextState);
  saveState();

  itemInput.value = "";
  render();
}

function handleFilterChange() {
  const nextState = setFilter(state, filterInput.value);
  setState(nextState);
  saveState();
  render();
}

function handleListClick(event) {
  const btn = event.target;
  if (btn.dataset.role !== "delete") return;

  const li = btn.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);
  const nextState = removeItem(state, id);
  setState(nextState);
  saveState();
  render();
}

export function initHandlers() {
  btnAdd.addEventListener("click", handleAdd);

  itemInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  });

  filterInput.addEventListener("input", handleFilterChange);

  itemsList.addEventListener("click", handleListClick);
}
