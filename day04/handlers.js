import {
  addItemAction,
  getState,
  removeItemAction,
  saveState,
  setFilterAction,
} from "./state.js";

import {
  btnAdd,
  errorBlock,
  filterInput,
  itemInput,
  itemsList,
} from "./render.js";

import { render } from "./render.js";
import { getValidationError } from "./utils.js";

function handleAdd() {
  const text = itemInput.value;
  const error = getValidationError(text);

  errorBlock.textContent = error;

  if (error) {
    render(getState());
    return;
  }

  addItemAction(text);
  saveState();

  itemInput.value = "";
  errorBlock.textContent = "";

  render(getState());
}

function handleFilterChange() {
  setFilterAction(filterInput.value);
  saveState();
  render(getState());
}

function handleListClick(event) {
  const btn = event.target;

  if (btn.dataset.role !== "delete") return;

  const li = btn.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);
  if (!Number.isFinite(id)) return;

  removeItemAction(id);
  saveState();
  render(getState());
}

export function initHandlers() {
  btnAdd.addEventListener("click", handleAdd);

  itemInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") handleAdd();
  });

  itemInput.addEventListener("input", () => {
    render(getState());
  });

  filterInput.addEventListener("input", handleFilterChange);

  itemsList.addEventListener("click", handleListClick);
}
