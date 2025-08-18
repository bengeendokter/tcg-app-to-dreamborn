import * as fs from 'fs';

console.log("main.ts is running");

// TODO try to fetch the latest version of allCards.json

// if the fetch fails, use the local version
const ALL_CARDS_PATH = "allCards.json" as const;
const importedAllCardsJson: string = fs.readFileSync(ALL_CARDS_PATH, { encoding: 'utf-8' });

// parse the JSON string into an object
const parsedAllCardsJson: unknown = JSON.parse(importedAllCardsJson);

console.log("importedAllCardsJson", importedAllCardsJson);

// check if allCards.json is of correct type

// import userdata.json

// check if userdata.json is of correct type

// create collection.csv file

// create all deck.txt files