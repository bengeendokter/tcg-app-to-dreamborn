import {
  isAllCards
} from "./chunk-FKV2URI3.js";
import {
  fetchJson
} from "./chunk-YTCMBWC4.js";
import {
  importJson
} from "./chunk-45UF73YP.js";
import {
  CONFIG
} from "./chunk-TYBPGEGC.js";

// src/data-access/all-cards.ts
async function getAllCards() {
  let allCards;
  try {
    allCards = await fetchJson(CONFIG.ALL_CARDS_URL);
  } catch {
    console.warn(`Warning: Fetching ${CONFIG.ALL_CARDS_URL} failed. Using local version at ${CONFIG.ALL_CARDS_PATH}`);
    allCards = importJson(CONFIG.ALL_CARDS_PATH);
  }
  if (!isAllCards(allCards)) {
    throw Error(`Parsed object is not of type AllCards`);
  }
  return allCards;
}

export {
  getAllCards
};
