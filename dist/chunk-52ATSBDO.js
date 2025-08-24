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
  importJson
} from "./chunk-45UF73YP.js";
import {
  getDreambornCollection
} from "./chunk-PJXZMLNE.js";
import {
  isUserData
} from "./chunk-VFEXTBBY.js";
import {
  CONFIG
} from "./chunk-TYBPGEGC.js";
import {
  getDreambornDeckList
} from "./chunk-BNAZSP5J.js";

// src/backup-collection.ts
async function backupCollection(backupUrl) {
  const backupId = parseUrlId(backupUrl);
  const apiBackupUrl = `https://sharing.lorcana.ravensburger.com/backup/${backupId}.json`;
  const allCards = await getAllCards();
  let userData;
  if (CONFIG.USING_BACKUP_URL) {
    userData = await fetchJson(apiBackupUrl);
  } else {
    userData = importJson(CONFIG.USER_DATA_PATH);
  }
  if (!isUserData(userData)) {
    throw Error(`Parsed object is not of type UserData`);
  }
  const collection = getDreambornCollection(allCards, userData);
  const decks = getDreambornDeckList(allCards, userData);
  return { collection, decks };
}

export {
  backupCollection
};
