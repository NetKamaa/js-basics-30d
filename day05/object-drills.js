const human = {
  name: "Pavel",
  age: 19,
  city: "Seoul",
};

console.log(Object.keys(human));
console.log(Object.values(human));
console.log(Object.entries(human));

const counts = {
  orange: 2,
  banana: 5,
  apple: 1,
};

if (counts["apple"]) {
  counts["apple"] += 1;
} else {
  counts["apple"] = 1;
}
console.log(counts);

const items = [
  { id: 1, text: "Hello" },
  { id: 2, text: "World" },
];

const idT = items.find((x) => x.id === 2);
console.log(idT.text);

const settings = {
  theme: "dark",
  notifications: true,
  volume: 80,
};

for (const [key, value] of Object.entries(settings)) {
  console.log(`${key}: ${value}`);
}
