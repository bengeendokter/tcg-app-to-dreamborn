import * as fs from 'fs';
import { isAllCards } from './types/all-cards';
import { isUserData } from './types/user-data';
import type { DreambornCollectionCard, DreambornDeck } from './types/dreamborn';
import { getDreambornCollection } from './dreamborn-collection';
import { getDreambornDeckList } from './dreamborn-deck';
import { importJson } from './import-json';
import { fetchJson } from './fetch-json';

// TODO add individual deck link input option

const inputBackupUrl: string = 'https://www.disneylorcana.com/sharing/backup?id=7fcf9ad0-eac2-4a11-9b00-07802471e7d4';

const ALL_CARDS_URL = 'https://lorcanajson.org/files/current/en/allCards.json' as const;
const ALL_CARDS_PATH = "./data/allCards.json" as const;
const USING_BACKUP_URL = true as const;
const USER_DATA_PATH = "./data/userdata.json" as const;
const OUTPUT_DIR = "./output" as const;

if(!URL.canParse(inputBackupUrl))
{
    throw Error(`${inputBackupUrl} is not a valid URL`);
}

const backupUrl: URL = new URL(inputBackupUrl);
const searchParams: URLSearchParams = backupUrl.searchParams;
if(!searchParams.has('id'))
{
    throw Error(`URL ${inputBackupUrl} does not contain a valid id parameter`);
}

const id: string | null = searchParams.get("id");
if(id === null || id.length === 0)
{
    throw Error(`URL ${inputBackupUrl} does not contain a valid id parameter`);
}

const userDataUrl = `https://sharing.lorcana.ravensburger.com/backup/${id}.json` as const;

// get allCards.json
let allCards: object;

try {
    // try to fetch the newest allCards.json
    allCards = await fetchJson(ALL_CARDS_URL);
}
catch {
    // if the fetch fails, use the local version
    console.warn(`Warning: Fetching ${ALL_CARDS_URL} failed. Using local version at ${ALL_CARDS_PATH}`);
    allCards = importJson(ALL_CARDS_PATH);
}

// check if allCards.json is of correct type
if (!isAllCards(allCards)) {
    throw Error(`Parsed object is not of type AllCards`);
}

// fetch or import userdata.json
let userData: object;

if (USING_BACKUP_URL) {
    // fetch userdata.json from backup URL
    userData = await fetchJson(userDataUrl);
}
else {
    // import userdata.json
    userData = importJson(USER_DATA_PATH);
}

// check if userdata.json is of correct type
if (!isUserData(userData)) {
    throw Error(`Parsed object is not of type UserData`);
}

// create collection.csv file
const dreambornCollection: DreambornCollectionCard[] = getDreambornCollection(allCards, userData);
const collectionHeader = "Set Number,Card Number,Variant,Count";
fs.writeFileSync(`${OUTPUT_DIR}/collection.csv`, [collectionHeader, ...dreambornCollection.map(card => [card.setNumber, card.cardNumber, card.variant, card.count].join(', '))].join('\n'), { encoding: 'utf-8' });

// create all deck.txt files
const dreambornDeckList: DreambornDeck[] = getDreambornDeckList(allCards, userData);
dreambornDeckList.forEach(deck => {
    const deckFileName = `${OUTPUT_DIR}/deck-${deck.name}.txt`;
    fs.writeFileSync(deckFileName, deck.cards.map(card => [card.count, card.fullName].join(' ')).join('\n'), { encoding: 'utf-8' });
});