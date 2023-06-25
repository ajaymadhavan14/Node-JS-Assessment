import fetch from 'node-fetch';

const endpoints = [
  "https://dummyjson.com/products/1",
  "https://dummyjson.com/products/2",
  "https://dummyjson.com/products/3",
  "https://dummyjson.com/products/4",
  "https://dummyjson.com/products/5",
  "https://dummyjson.com/products/6",
  "https://dummyjson.com/products/7",
  "https://dummyjson.com/products/8",
  "https://dummyjson.com/products/9",
  "https://dummyjson.com/products/10",
  "https://dummyjson.com/products/11",
  "https://dummyjson.com/products/12",
  "https://dummyjson.com/products/13",
  "https://dummyjson.com/products/14",
  "https://dummyjson.com/products/15",
  "https://dummyjson.com/products/16",
  "https://dummyjson.com/products/17",
  "https://dummyjson.com/products/18",
  "https://dummyjson.com/products/19",
  "https://dummyjson.com/products/20"
];

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchAndProcessData() {
  const requests = endpoints.map(fetchData);
  const responses = await Promise.all(requests);

  const items = responses.map(({ title, price }) => ({ title, price }));
  const sortedItems = [...items].sort((a, b) => a.price - b.price);
  const mostExpensive = sortedItems[sortedItems.length - 1];

  const result = {
    items: sortedItems,
    mostExpensive: mostExpensive
  };

  return result;
}

fetchAndProcessData()
  .then(result => console.log(result))
  .catch(error => console.error(error));
