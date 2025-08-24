// src/data-access/fetch-json.ts
async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(`Failed to fetch data from ${url}`);
  }
  const result = await response.json();
  if (typeof result !== "object" || result === null) {
    throw Error(`Fetched data from ${url} is not an object`);
  }
  return result;
}

export {
  fetchJson
};
