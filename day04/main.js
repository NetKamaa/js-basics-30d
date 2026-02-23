let state = {
  items: [],
  filter: "",
};

function getAddValue() {
  return itemInput.value;
}

function getQueryValue() {
  return filterInput.value.trim();
}

function createItem(text) {
  const trimmed = text.trim();
  const id = Date.now();
  return {
    id,
    text: trimmed,
  };
}

function addItem(prevState, text) {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return prevState;
  }
  const newItem = createItem(trimmed);
  return {
    ...prevState,
    items: [...prevState.items, newItem],
  };
}

function removeItem(prevState, idToRemove) {
  return {
    ...prevState,
    items: prevState.items.filter((item) => item.id !== idToRemove),
  };
}

function formatItems(items) {
  if (items.length === 0) {
    return "Empty";
  } else {
    return items.map((item, index) => `#${index + 1}: ${item.text}`).join(", ");
  }
}

function getValidationError(text) {
  const trimmed = text.trim();
  if (trimmed.length === 0) return "Введите текст";
  if (trimmed.length > 60)
    return "Слишком длинный текст, длина не должна превышать 60 символов";
  else return "";
}

function getVisibleItems(items, text) {
  return items.filter((item) =>
    item.text.toLowerCase().includes(text.toLowerCase()),
  );
}

function getStats(items, visibleItems) {
  return {
    total: items.length,
    visible: visibleItems.length,
  };
}

function handleDelete(id) {
  state = removeItem(state, id);
  render();
}

function renderItems(items) {
  itemsList.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      handleDelete(item.id);
    });

    li.appendChild(deleteBtn);
    itemsList.appendChild(li);
  });
}

const itemInput = document.querySelector("#item-input");
const btnAdd = document.querySelector("#btnAdd");
const itemsList = document.querySelector("#items-list");
const preview = document.querySelector("#preview");
const filterInput = document.querySelector("#filter-input");
const totalCount = document.querySelector("#total-count");
const visibleCount = document.querySelector("#visible-count");
const errorBlock = document.createElement("p");

errorBlock.style.color = "red";
itemInput.parentNode.insertBefore(errorBlock, itemInput.nextSibling);

function render() {
  const visibleItems = getVisibleItems(state.items, state.filter);

  const stats = getStats(state.items, visibleItems);

  renderItems(visibleItems);

  preview.textContent = formatItems(visibleItems);
  totalCount.textContent = stats.total;
  visibleCount.textContent = stats.visible;
}

function handleAdd() {
  const text = getAddValue();
  const error = getValidationError(text);

  errorBlock.textContent = error;
  if (error) return;

  state = addItem(state, text);
  itemInput.value = "";
  render();
}

btnAdd.addEventListener("click", handleAdd);

itemInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleAdd();
  }
});

filterInput.addEventListener("input", () => {
  state.filter = getQueryValue();
  render();
});

render();
