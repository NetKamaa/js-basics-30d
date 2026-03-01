import { state } from "./state.js";
import {
  deriveFlags,
  formatItems,
  getStats,
  getVisibleItems,
} from "./utils.js";

export const itemInput = document.querySelector("#item-input");
export const btnAdd = document.querySelector("#btnAdd");
export const filterInput = document.querySelector("#filter-input");
export const itemsList = document.querySelector("#items-list");
export const preview = document.querySelector("#preview");
export const totalCount = document.querySelector("#total-count");
export const visibleCount = document.querySelector("#visible-count");

export const errorBlock = document.createElement("p");
errorBlock.style.color = "red";
itemInput.parentNode.insertBefore(errorBlock, itemInput.nextSibling);

let lastListHTML = "";

function renderEmptyState(type) {
  if (type === "empty") {
    return `<li class="empty">Список пуст</li>`;
  }

  if (type === "no-results") {
    return `<li class="empty">Ничего не найдено</li>`;
  }

  return "";
}

export function render() {
  const { items, filter } = state;

  const visibleItems = getVisibleItems(items, filter);
  const stats = getStats(items, visibleItems);

  let viewState = "normal";

  if (items.length === 0) {
    viewState = "empty";
  } else if (visibleItems.length === 0) {
    viewState = "no-results";
  }

  let html = "";

  if (viewState === "normal") {
    html = visibleItems
      .map(
        (item) => `
      <li data-id="${item.id}">
        <span>${item.text}</span>
        <button data-role="delete">Delete</button>
      </li>
    `,
      )
      .join("");
  } else {
    html = renderEmptyState(viewState);
  }

  if (html !== lastListHTML) {
    itemsList.innerHTML = html;
    lastListHTML = html;
  }

  const flags = deriveFlags(state, {
    inputValue: itemInput.value,
    error: errorBlock.textContent,
  });

  btnAdd.disabled = !flags.canAddItem;

  errorBlock.style.display = flags.hasError ? "block" : "none";

  preview.textContent = formatItems(visibleItems);
  totalCount.textContent = stats.total;
  visibleCount.textContent = stats.visible;
}
