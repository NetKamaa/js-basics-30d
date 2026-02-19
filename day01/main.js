console.log("Day 01: OK");
console.log(new Date());

let name = "Pavel";
let age = 19;
let isStudent = true;
let city = "Hrodna";
console.log(typeof name);
console.log(typeof age);
console.log(typeof isStudent);
console.log(typeof city);
if (age >= 18) {
  console.log(age);
} else {
  console.log(`18 больше чем ${age}`);
}

let numbers = [3, 1, 7, 2];
let sumArray = numbers.reduce((a, b) => a + b);
let maxArray = Math.max(...numbers);
console.log(sumArray);
console.log(maxArray);

let user = { name: "Pavel", age: 19, skills: ["reading", "writing"] };
let output = [];
for (let key in user) {
  if (key === "skills") {
    output.push(`skills: ${user[key].join(", ")}`);
  } else {
    output.push(user[key]);
  }
}
console.log(output.join(", "));
