// src/util/parse-url-id.ts
function parseUrlId(url) {
  if (!URL.canParse(url)) {
    throw Error(`${url} is not a valid URL`);
  }
  const parsableUrl = new URL(url);
  const searchParams = parsableUrl.searchParams;
  if (!searchParams.has("id")) {
    throw Error(`URL ${url} does not contain a valid id parameter`);
  }
  const id = searchParams.get("id");
  if (id === null || id.length === 0) {
    throw Error(`URL ${url} does not contain a valid id parameter`);
  }
  return id;
}

export {
  parseUrlId
};
