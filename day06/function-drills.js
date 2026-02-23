const task1 = makeItem("  Купить   продукты  ");
const task2 = makeItem("Помыть машину");
const task3 = makeItem("Купить подарок");

const myTasks = [task1, task2, task3];

function normalizeText(text) {
  return text.replace(/ +/g, " ").trim();
}

function includesCI(text, query) {
  const textCase = text.toLowerCase();
  const queryCase = query.toLowerCase();
  return textCase.includes(queryCase);
}

function makeItem(text) {
  const id = Date.now();
  return {
    id,
    text,
  };
}

function removeById(items, id) {
  return items.filter((item) => item.id !== id);
}

function getStats(items, query) {
  const total = items.length;
  const filteredItems = items.filter((item) => includesCI(item.text, query));
  const visible = filteredItems.length;
  return {
    visible,
    total,
  };
}

const cleanText = normalizeText(task1.text);
console.log("Очищенный текст:", cleanText);

const stats = getStats(myTasks, "купить");

console.log("Результаты поиска:");
console.log(`Total задач: ${stats.total}`);
console.log(`Visible по запросу: ${stats.visible}`);
