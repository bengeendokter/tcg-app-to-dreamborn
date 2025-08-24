import {
  MODE
} from "./chunk-2INFF2F6.js";
import {
  backupCollection
} from "./chunk-52ATSBDO.js";
import {
  backupDeck
} from "./chunk-YA4NIFOM.js";
import "./chunk-J642RKD5.js";
import "./chunk-XVFEZNAP.js";
import "./chunk-FKV2URI3.js";
import "./chunk-YTCMBWC4.js";
import "./chunk-45UF73YP.js";
import "./chunk-PJXZMLNE.js";
import "./chunk-Y6YBLUTX.js";
import "./chunk-VFEXTBBY.js";
import {
  CONFIG
} from "./chunk-TYBPGEGC.js";
import "./chunk-BNAZSP5J.js";

// src/main.ts
import * as fs from "fs";
var deckUrl = "https://www.disneylorcana.com/sharing/deck?id=897ce782-f5a7-4fdb-845e-1a89aafdd369";
var backupUrl = "https://www.disneylorcana.com/sharing/backup?id=7fcf9ad0-eac2-4a11-9b00-07802471e7d4";
var outputDirectory = CONFIG.DEFAULT_OUTPUT_DIRECTORY;
var mode = MODE.DECK;
async function main() {
  switch (mode) {
    case MODE.COLLECTION:
      const { collection, decks } = await backupCollection(backupUrl);
      const collectionHeader = "Set Number,Card Number,Variant,Count";
      fs.writeFileSync(`${outputDirectory}/collection.csv`, [collectionHeader, ...collection.map((card) => [card.setNumber, card.cardNumber, card.variant, card.count].join(", "))].join("\n"), { encoding: "utf-8" });
      decks.forEach((deck) => {
        const deckFileName2 = `${outputDirectory}/deck-${deck.name}.txt`;
        fs.writeFileSync(deckFileName2, deck.cards.map((card) => [card.count, card.fullName].join(" ")).join("\n"), { encoding: "utf-8" });
      });
      return;
    case MODE.DECK:
      const dreambornDeck = await backupDeck(deckUrl);
      const deckFileName = `${outputDirectory}/${dreambornDeck.name}.txt`;
      fs.writeFileSync(deckFileName, dreambornDeck.cards.map((card) => [card.count, card.fullName].join(" ")).join("\n"), { encoding: "utf-8" });
      return;
    default:
      mode;
      throw Error(`Invalid mode: ${mode}`);
  }
}
await main();
