import {
  deriveFlags,
  formatItems,
  getListMode,
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

function renderEmptyState(type) {
  if (type === "empty") {
    return `<li class="empty">Список пуст</li>`;
  }

  if (type === "no-results") {
    return `<li class="empty">Ничего не найдено</li>`;
  }

  return "";
}

export function render(currentState) {
  const { items, filter } = currentState;

  const visibleItems = getVisibleItems(items, filter);
  const stats = getStats(items, visibleItems);

  const mode = getListMode(currentState, visibleItems);

  switch (mode) {
    case "loading":
      renderLoading();
      break;

    case "error":
      renderError(currentState.requestError);
      break;

    case "emptyAll":
      renderEmptyAll();
      break;

    case "emptyFiltered":
      renderEmptyFiltered();
      break;

    case "normal":
      renderList(visibleItems);
      break;
  }

  const flags = deriveFlags(currentState, {
    inputValue: itemInput.value,
    error: errorBlock.textContent,
  });

  btnAdd.disabled = !flags.canAddItem;
  errorBlock.style.display = flags.hasError ? "block" : "none";

  preview.textContent = formatItems(visibleItems);
  totalCount.textContent = stats.total;
  visibleCount.textContent = stats.visible;

  function renderLoading() {
    itemsList.innerHTML = `<li class="empty">Загрузка...</li>`;
  }

  function renderError(errorText) {
    itemsList.innerHTML = `<li class="empty">Ошибка: ${errorText}</li>`;
  }

  function renderEmptyAll() {
    itemsList.innerHTML = `<li class="empty">Список пуст</li>`;
  }

  function renderEmptyFiltered() {
    itemsList.innerHTML = `<li class="empty">Ничего не найдено</li>`;
  }

  function renderList(items) {
    const html = items
      .map(
        (item) => `
      <li data-id="${item.id}">
        <span>${item.text}</span>
        <button data-role="delete">Delete</button>
      </li>
    `,
      )
      .join("");

    itemsList.innerHTML = html;
  }
}
