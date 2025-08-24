// src/data-access/import-json.ts
import * as fs from "fs";
function importJson(filePath) {
  let importedJson;
  try {
    importedJson = fs.readFileSync(filePath, { encoding: "utf-8" });
  } catch (error) {
    throw Error(`Failed to read ${filePath}`);
  }
  let object;
  try {
    object = JSON.parse(importedJson);
  } catch (error) {
    throw Error(`Format of ${filePath} is not valid JSON`);
  }
  if (typeof object !== "object" || object === null) {
    throw Error(`Parsed ${filePath} is not an object`);
  }
  return object;
}

export {
  importJson
};
