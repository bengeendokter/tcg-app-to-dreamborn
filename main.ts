import * as fs from 'fs';
import { isAllCards } from './all-cards';

// TODO try to fetch the latest version of allCards.json

// if the fetch fails, use the local version
const ALL_CARDS_PATH = "allCards.json" as const;
let importedAllCardsJson: string;

try {
    importedAllCardsJson = fs.readFileSync(ALL_CARDS_PATH, { encoding: 'utf-8' });
}
catch (error) {
    throw Error(`Failed to read ${ALL_CARDS_PATH}`);
}

// parse the allCards.json string into an object
let parsedAllCardsJson: unknown;

try {
    parsedAllCardsJson = JSON.parse(importedAllCardsJson);
}
catch (error) {
    throw Error(`Format of ${ALL_CARDS_PATH} is not valid JSON`);
}

if (typeof parsedAllCardsJson !== 'object' || parsedAllCardsJson === null) {
    throw Error(`Parsed ${ALL_CARDS_PATH} is not an object`);
}

// check if allCards.json is of correct type
if (!isAllCards(parsedAllCardsJson)) {
    throw Error(`Parsed ${ALL_CARDS_PATH} is not of type AllCards`);
}

console.log("parsedAllCardsJson", parsedAllCardsJson);

// import userdata.json
const USER_DATA_PATH = "userdata.json" as const;
let importedUserDataJson: string;

try {
    importedUserDataJson = fs.readFileSync(USER_DATA_PATH, { encoding: 'utf-8' });
}
catch (error) {
    throw Error(`Failed to read ${USER_DATA_PATH}`);
}

// parse the allCards.json string into an object
let parsedUserDataJson: unknown;

try {
    parsedUserDataJson = JSON.parse(importedUserDataJson);
}
catch (error) {
    throw Error(`Format of ${USER_DATA_PATH} is not valid JSON`);
}

if (typeof parsedUserDataJson !== 'object' || parsedUserDataJson === null) {
    throw Error(`Parsed ${USER_DATA_PATH} is not an object`);
}

console.log("parsedUserDataJson", parsedUserDataJson);

// check if userdata.json is of correct type

// create collection.csv file

// create all deck.txt files