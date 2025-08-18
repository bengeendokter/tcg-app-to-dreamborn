import * as fs from 'fs';
import { isAllCards } from './types/all-cards';
import { isUserData } from './types/user-data';
import { DreambornCollectionCard, DreambornDeck } from './types/dreamborn';
import { getDreambornCollection } from './dreamborn-collection';
import { getDreambornDeckList } from './dreamborn-deck';

// TODO try to fetch the latest version of allCards.json

// if the fetch fails, use the local version
const ALL_CARDS_PATH = "./data/allCards.json" as const;
let importedAllCardsJson: string;

try {
    importedAllCardsJson = fs.readFileSync(ALL_CARDS_PATH, { encoding: 'utf-8' });
}
catch (error) {
    throw Error(`Failed to read ${ALL_CARDS_PATH}`);
}

// parse the allCards.json string into an object
let allCards: unknown;

try {
    allCards = JSON.parse(importedAllCardsJson);
}
catch (error) {
    throw Error(`Format of ${ALL_CARDS_PATH} is not valid JSON`);
}

if (typeof allCards !== 'object' || allCards === null) {
    throw Error(`Parsed ${ALL_CARDS_PATH} is not an object`);
}

// check if allCards.json is of correct type
if (!isAllCards(allCards)) {
    throw Error(`Parsed ${ALL_CARDS_PATH} is not of type AllCards`);
}

// import userdata.json
const USER_DATA_PATH = "./data/userdata.json" as const;
let importedUserDataJson: string;

try {
    importedUserDataJson = fs.readFileSync(USER_DATA_PATH, { encoding: 'utf-8' });
}
catch (error) {
    throw Error(`Failed to read ${USER_DATA_PATH}`);
}

// parse the allCards.json string into an object
let userData: unknown;

try {
    userData = JSON.parse(importedUserDataJson);
}
catch (error) {
    throw Error(`Format of ${USER_DATA_PATH} is not valid JSON`);
}

if (typeof userData !== 'object' || userData === null) {
    throw Error(`Parsed ${USER_DATA_PATH} is not an object`);
}

// check if userdata.json is of correct type
if (!isUserData(userData)) {
    throw Error(`Parsed ${USER_DATA_PATH} is not of type UserData`);
}

// create collection.csv file
const dreambornCollection: DreambornCollectionCard[] = getDreambornCollection(allCards, userData);
console.log("dreambornCollection", dreambornCollection);

// create all deck.txt files
const dreambornDeckList: DreambornDeck[] = getDreambornDeckList(allCards, userData);
console.log("dreambornDeckList", dreambornDeckList);