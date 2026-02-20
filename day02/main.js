const STORAGE_KEY = "day03_state";
let state = { count: 0, items: [] };

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) return;
  const parsed = JSON.parse(saved);
  if (typeof parsed.count === "number" && Array.isArray(parsed.items))
    state = parsed;
}

const counter = document.querySelector("#counter");
const btnPlus = document.querySelector("#btnPlus");
const btnMinus = document.querySelector("#btnMinus");
const btnReset = document.querySelector("#btnReset");

const input = document.querySelector("#listInput");
const btnAdd = document.querySelector("#btnAdd");
const list = document.querySelector("#list");

function render() {
  counter.textContent = state.count;

  list.innerHTML = "";

  state.items.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `${item} <button data-index="${index}">Delete</button>`;
    list.appendChild(li);
  });
}

btnPlus.addEventListener("click", () => {
  state.count++;
  saveState();
  render();
});

btnMinus.addEventListener("click", () => {
  state.count--;
  saveState();
  render();
});

btnReset.addEventListener("click", () => {
  state.count = 0;
  saveState();
  render();
});

function addItem() {
  const value = input.value.trim();
  if (!value) return;

  state.items.push(value);
  input.value = "";
  saveState();
  render();
}

btnAdd.addEventListener("click", addItem);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addItem();
});

list.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const index = Number(e.target.dataset.index);
    state.items.splice(index, 1);
    saveState();
    render();
  }
});
loadState();
render();
