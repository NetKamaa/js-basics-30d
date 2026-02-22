let state = {
  items: [
    { id: 1, text: "123" },
    { id: 2, text: "321" },
  ],
};

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
  const newItem = createItem(text);
  return {
    items: [...prevState.items, newItem],
  };
}

function removeItem(prevState, idToRemove) {
  return {
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

const itemInput = document.querySelector("#item-input");
const btnAdd = document.querySelector("#btnAdd");
const itemsList = document.querySelector("#items-list");
const preview = document.querySelector("#preview");

function render() {
  itemsList.innerHTML = "";

  state.items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      state = removeItem(state, item.id);
      render();
    });

    li.appendChild(deleteBtn);
    itemsList.appendChild(li);
  });

  preview.textContent = formatItems(state.items);
}

btnAdd.addEventListener("click", () => {
  const text = itemInput.value;
  state = addItem(state, text);
  itemInput.value = "";
  render();
});
render();
