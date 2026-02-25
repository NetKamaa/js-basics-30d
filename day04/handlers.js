import {
  btnAdd,
  errorBlock,
  filterInput,
  itemInput,
  itemsList,
  render,
} from "./render.js";
import { addItem, removeItem, setFilter, setState, state } from "./state.js";
import { getValidationError } from "./utils.js";

function handleAdd() {
  const text = itemInput.value;
  const error = getValidationError(text);

  errorBlock.textContent = error;
  if (error) return;

  const nextState = addItem(state, text);
  setState(nextState);

  itemInput.value = "";
  render();
}

function handleFilterChange() {
  const nextState = setFilter(state, filterInput.value);
  setState(nextState);
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
