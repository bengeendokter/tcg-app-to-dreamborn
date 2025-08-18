import * as fs from 'fs';
import { isAllCards } from './all-cards';

// TODO try to fetch the latest version of allCards.json

// if the fetch fails, use the local version
const ALL_CARDS_PATH = "allCards.json" as const;
let importedAllCardsJson: string;

try {
    importedAllCardsJson= fs.readFileSync(ALL_CARDS_PATH, { encoding: 'utf-8' });
}
catch (error) {
    throw Error("Failed to read allCards.json file");
}

// parse the JSON string into an object
let parsedAllCardsJson: unknown;

try {
    parsedAllCardsJson = JSON.parse(importedAllCardsJson);
}
catch (error) {
    throw Error("Format of allCards.json is not valid JSON");
}

if (typeof parsedAllCardsJson !== 'object' || parsedAllCardsJson === null) {
    throw Error("Parsed allCards.json is not an object");
}

// check if allCards.json is of correct type
if(!isAllCards(parsedAllCardsJson)) {
    throw Error("Parsed allCards.json is not of type AllCards");
}

console.log("parsedAllCardsJson", parsedAllCardsJson);

// import userdata.json

// check if userdata.json is of correct type

// create collection.csv file

// create all deck.txt files