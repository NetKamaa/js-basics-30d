import { state } from "./state.js";
import { formatItems, getStats, getVisibleItems } from "./utils.js";

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

export function render() {
  const { items, filter } = state;

  const visibleItems = getVisibleItems(items, filter);
  const stats = getStats(items, visibleItems);
  const html = visibleItems
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

  preview.textContent = formatItems(visibleItems);
  totalCount.textContent = stats.total;
  visibleCount.textContent = stats.visible;
}
