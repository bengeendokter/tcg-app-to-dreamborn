import {
  parseUrlId
} from "./chunk-J642RKD5.js";
import {
  getAllCards
} from "./chunk-XVFEZNAP.js";
import {
  fetchJson
} from "./chunk-YTCMBWC4.js";
import {
  isUserDataDeck
} from "./chunk-VFEXTBBY.js";
import {
  getDreambornDeck
} from "./chunk-BNAZSP5J.js";

// src/backup-deck.ts
async function backupDeck(deckUrl) {
  const deckId = parseUrlId(deckUrl);
  const apiDeckUrl = `https://sharing.lorcana.ravensburger.com/deck/${deckId}.json`;
  const allCards = await getAllCards();
  const userDataDeck = await fetchJson(apiDeckUrl);
  if (!isUserDataDeck(userDataDeck)) {
    throw Error(`Parsed object is not of type UserDataDeck`);
  }
  return getDreambornDeck(allCards, userDataDeck, "shared-deck");
}

export {
  backupDeck
};
