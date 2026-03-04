export async function loadItemsFromApi() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) {
    throw new Error("Failed to load API");
  }
  const data = await response.json();
  const filteredData = data.filter((item) => {
    return typeof item.title === "string" && item.title.trim() !== "";
  });
  const limitedData = filteredData.slice(0, 10);
  const finalData = limitedData.map((item) => {
    return {
      id: item.id,
      text: item.title,
    };
  });
  return finalData;
}
